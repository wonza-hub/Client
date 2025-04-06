import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import isServerError from '../../../_errors/isServerError';

// POST: 사진 등록
export const usePostLife4CutPhoto = () => {
    const queryClient = useQueryClient();
    const photoZoneURL = '/api/life4cut/save';

    return useMutation<AxiosResponse, AxiosError, FormData>({
        mutationFn: async fileFormData => await axios.post(photoZoneURL, fileFormData),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['photo-zone'] }),
        onError: async e => {
            let errorMessage = '알 수 없는 에러가 발생했습니다. 관리자에게 문의해주세요.';

            // 서버 에러 처리
            if (isServerError(e) && e.response.data?.error.message) {
                errorMessage = e.response.data.error.message;
                alert(errorMessage);

                return;
            }

            // 상태 코드에 따른 에러 메시지 처리
            switch (e.response.status) {
                case 403:
                    errorMessage = '권한이 없는 사용자입니다.';
                    break;
                case 401:
                    errorMessage = '사진은 로그인 후 올릴 수 있습니다!';
                    break;
                case 404:
                    errorMessage = '사진 등록에 실패하였습니다.';
                    break;
                case 500:
                    errorMessage = '사진 등록에 실패하였습니다. 관리자에게 문의해주세요.';
                    break;
                default:
                    break;
            }

            alert(errorMessage);
        },
    });
};
