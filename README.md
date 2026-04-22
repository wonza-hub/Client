<div align="center">
<img src="https://github.com/user-attachments/assets/ca2219a0-73f3-4eee-bd4c-47b2d178e1f9" width="100px"/>
</div>

<div align="center">
<h2>
NestNet
</h2>
<h5>
충북대학교 소프트웨어학과 네스트넷 공식 홈페이지 (프론트엔드)
</h5>
<a href="https://nnet.cbnu.ac.kr/">배포 링크 (운영 중단)</a>
<br />
<small>
2023.07~2024.02
</small>
</div>

###### 개발 배경

기존 홈페이지는 2005년에 제작되어 유지보수 문서가 부재해 유지보수가 불가했고, UI/UX가 다소 좋지 않았습니다. 이에 필수적인 정보들만 제공하는 간결하고 정돈된 홈페이지를 제작하고자 했습니다.

###### 시작 가이드

```bash
    yarn install
    yarn vite
```
###### 서비스 아키텍처
<div align="center">
    <img src="https://github.com/user-attachments/assets/dff81261-4259-4f2d-9766-9ca05680315e" width="640px"/>
</div>

## 개발환경

### Language
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

### Build
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

### Framework & Libraries
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/-Tanstack%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)

## 담당 기능

- **메인:** 최신 글, 주간·월간 출석 순위 확인, 일일 출석 체크, 페이지·게시판 바로가기, 동아리 활동 중 찍은 인생네컷 사진 배너
- **갤러리 목록:** 무한스크롤, 썸네일 호버 시 게시물 정보 제공, 게시물 등록
- **갤러리 상세:** 상세 내 사진 목록 확인, 댓글창 접기·펼치기, 댓글 CRUD, 개별 사진 다운로드
- **관리자 회원 관리:** 회원 권한 수정·탈퇴, 가입 요청 승인·거절

## 미리보기

<p align="center">
    <img src="https://github.com/user-attachments/assets/e360e432-7c2a-4ed5-aabc-176f6021c555" width="300px">
</p>

<p align="center">
    <img src="https://github.com/user-attachments/assets/cd24b03b-4dab-4ac2-88c2-d5923c179720" width="300px">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/9356f246-9eba-42ef-9f94-e202d44105d6" width="300px">
</p>

<p align="center">
    <img src="https://github.com/user-attachments/assets/910cfb63-67b1-4214-ab28-5ebef2e45f99" width="300px">
</p>

<p align="center">
    <img src="https://github.com/user-attachments/assets/8c0c4d87-7928-4583-b62e-97a87cd701f6" width="300px">
</p>


<p align="center">
    <img src="https://github.com/user-attachments/assets/32e5041f-87d4-4155-b2d5-070a98c486cb" width="300px">
</p>


<p align="center">
    <img src="https://github.com/user-attachments/assets/dafa9c55-c7dd-48ea-9fe1-199980df6575" width="300px">
</p>


<p align="center">
    <img src="https://github.com/user-attachments/assets/2405a65d-30c7-4655-9537-dd0e56f58176" width="300px">
</p>

### 문제 해결

#### Web Worker와 OffscreenCanvas API로 대용량 이미지 업로드 최적화

##### 문제 및 원인

<div align='center'>
<img width="470" height="441" alt="image" src="https://github.com/user-attachments/assets/0c894901-c12e-4504-b894-cdd03d910c31" />
</div>

- **대용량 이미지 다중 업로드 시 텍스트 입력 지연:** 대용량(주로 5MB 이상) 이미지의 다중 업로드 진행 중에 게시글 제목 및 설명 타이핑에 프리징(Freezing) 현상이 생겼습니다. 기존의 이미지 리사이징 및 포맷 변환을 수행하는 라이브러리가 메인 스레드에서 동작하여 UI 렌더링 작업을 차단했기 때문이었습니다.

##### 해결 과정

<div align='center'>
    <img width="520" alt="image 13" src="https://github.com/user-attachments/assets/55cc620f-340f-4ff1-9fac-a4c114e5db3b" />
</div>

- OffscreenCanvas 기반의 이미지 리사이징 등의 이미지 최적화를 수행하는 Web Worker를 생성하고 해당 Worker를 사용하는 커스텀 훅을 구현했습니다.

##### 결과
- 대용량 이미지 업로드 시 UI 렌더링 블로킹 해결
##### 배운 점
- **기술 등장 배경에 대한 이해:** 리팩토링을 통해 특정 API가 등장한 배경에 대해 더욱 깊이 공감할 수 있었습니다. 새로운 개념을 학습할 때 단순히 보고 듣는 것보다 직접 문제를 해결하는 과정에서 쉽게 체화되는 것을 느꼈습니다.

---


#### 텍스트 압축을 통한 전송 최적화

<div align='center'>
    <img width="480" alt="image 2" src="https://github.com/user-attachments/assets/445f09c1-e6cc-4695-b52e-7d533b0e2129" />
</div>


##### 문제 및 원인
- Lighthouse 성능 측정 결과, 텍스트 압축을 수행하지 않아 `‘Enable Text compression’` 경고 문구가 발생했습니다. 압축 기능을 제공하는 CDN을 사용하지 않는 온프레미스 서버라서 직접 압축을 수행해야 했습니다.
##### 해결 과정
- Vite에 관련 플러그인 설치 후 gzip, brotli 압축을 진행하고, Nginx 설정 파일에 압축 파일 제공을 명시했습니다. 또한 Dockerfile의 `RUN` 명령어에 nginx용 brotli 압축 관련 패키지를 설치하는 스크립트를 작성했습니다.
##### 결과
- 응답 헤더 내 `Content-Encoding` 에 압축 확장자 표시 및 메인 페이지 기준 네트워크 전송량 약 40% 감소
##### 배운 점
- 브라우저가 수행하는 요청과 서버의 응답에서 HTTP 헤더의 역할에 대해 이해하게 되었고, 배포 환경에서 제공되는 기능이 제한적이더라도 적절한 도구와 설정을 조합해 최적의 성능을 구현할 수 있다는 점을 배웠습니다.

---
#### 

### 🤝 팀원 소개

| 담당       | 이름   | GitHub 아이디                                     |
| ---------- | ------ | ------------------------------------------------- |
| 백엔드     | 김성호 | [kksshh0612](https://github.com/kksshh0612)       |
| 프론트엔드 | 김강민 | [rlarkdals1202](https://github.com/rlarkdals1202) |
| 프론트엔드 | 허원일 | [wonza-hub](https://github.com/wonza-hub)         |
