// POST: 사진 게시판 게시물 수정
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { PAGE_ROUTE, TIME_OUT } from '../../../_constants/constants';
import isServerError from '../../../_errors/isServerError';

const useUpdatePhotoAlbumPost = () => {
    const navigate = useNavigate();
    const photoAlbumUpdateURL = `/api/photo-post/modify`;

    return useMutation<AxiosResponse, AxiosError, FormData>({
        mutationFn: async formData =>
            await axios.post(photoAlbumUpdateURL, formData, {
                withCredentials: true,
                timeout: TIME_OUT,
                headers: { 'Content-Type': 'multipart/form-data' },
            }),
        onSuccess: () => {
            navigate(`/${PAGE_ROUTE.PHOTOALBUMS}`);
        },
        onError: e => {
            let errorMessage = '';

            if (isServerError(e) && e.response.data && e?.response?.data?.error.message) {
                errorMessage = e.response.data.error.message;
                alert(errorMessage);

                return;
            }

            switch (e.response.status) {
                case 403:
                    errorMessage = '권한이 없는 사용자입니다';
                    break;
                case 401:
                    errorMessage = '로그인 후 다시 시도해주세요.';
                    break;
                case 500:
                    errorMessage = '게시물 수정에 실패하였습니다. 관리자에게 문의해주세요.';
                    break;
                default:
                    errorMessage = '알 수 없는 오류가 발생했습니다.';
                    break;
            }

            alert(errorMessage);
        },
    });
};

export default useUpdatePhotoAlbumPost;
