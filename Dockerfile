ARG version=1.28.0
FROM nginx:${version}-alpine AS builder
ARG version

WORKDIR /usr/src/app

# 필수 패키지 및 Brotli 빌드를 위한 패키지 설치
RUN apk add --update --no-cache \
    git pcre-dev openssl-dev zlib-dev linux-headers build-base \
    brotli-dev wget \
    && wget http://nginx.org/download/nginx-${version}.tar.gz \
    && tar zxf nginx-${version}.tar.gz \
    && git clone https://github.com/google/ngx_brotli.git \
    && cd ngx_brotli \
    && git submodule update --init --recursive \
    && cd ../nginx-${version} \
    && ./configure --add-dynamic-module=../ngx_brotli --with-compat --with-file-aio --with-threads \
    && make modules

# Node 빌드 설정
FROM node:alpine AS node_builder

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY ./ ./
RUN yarn build

# NGINX 빌드 후 최종 이미지 설정
FROM nginx:${version}-alpine

ARG version

# Brotli 모듈 복사
COPY --from=builder /usr/src/app/nginx-${version}/objs/ngx_http_brotli_filter_module.so /usr/lib/nginx/modules/
COPY --from=builder /usr/src/app/nginx-${version}/objs/ngx_http_brotli_static_module.so /usr/lib/nginx/modules/

# 앱 빌드 결과물 복사
COPY --from=node_builder /usr/src/app/dist /usr/share/nginx/html

# 기본 NGINX 설정 파일 삭제
RUN rm /etc/nginx/conf.d/default.conf

# Custom 설정파일 복사
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
