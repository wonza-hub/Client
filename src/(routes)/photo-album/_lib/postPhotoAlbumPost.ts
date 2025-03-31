import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { PAGE_ROUTE, TIME_OUT } from '../../../_constants/constants';
import isServerError from '../../../_errors/isServerError';
import { NavigateFunction } from 'react-router-dom';

const useCreatePhotoAlbumPost = (navigate: NavigateFunction) => {
    const photoAlbumPostURL = `/api/photo-post/post`;

    return useMutation<AxiosResponse, AxiosError, FormData>({
        mutationFn: async (formData: FormData) =>
            axios?.post(photoAlbumPostURL, formData, {
                timeout: TIME_OUT,
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            }),
        onSuccess: () => {
            alert('게시물 등록에 성공하였습니다.');
            location.reload();
        },
        onError: e => {
            let errorMessage = '알 수 없는 에러가 발생했습니다. 관리자에게 문의해주세요.';

            // 서버 에러 확인
            if (isServerError(e) && e.response.data && e?.response?.data?.message) {
                errorMessage = e.response.data.message;
                alert(errorMessage);

                return;
            }

            // 상태 코드에 따른 메시지 설정
            switch (e.response.status) {
                case 403:
                    errorMessage = '권한이 없는 사용자입니다';
                    break;
                case 401:
                    errorMessage = '로그인 후 다시 시도해주세요.';
                    break;
                case 500:
                    errorMessage = '게시물 등록에 실패하였습니다. 관리자에게 문의해주세요.';
                    break;
                default:
                    break;
            }

            alert(errorMessage);
        },
    });
};
export default useCreatePhotoAlbumPost;
