import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import isServerError from '../../../_errors/isServerError';

// POST: 출석 등록
export function usePostMyAttendance() {
    const queryClient = useQueryClient();
    const myAttendanceURL = `/api/attendance`;

    return useMutation<AxiosResponse, AxiosError>({
        mutationFn: async () => await axios.post(myAttendanceURL),
        onSuccess: () => {
            alert('출석 완료!');
            queryClient.invalidateQueries({ queryKey: ['attendance-statistics'] });
        },
        onError: async e => {
            let errorMessage = '';

            if (isServerError(e) && e.response.data && e?.response?.data?.message) {
                errorMessage = e.response.data.message;
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
                case 409:
                    errorMessage = '오늘은 이미 출석하셨습니다! 내일도 방문해주세요!';
                    break;
                case 500:
                    errorMessage = '출석 등록에 실패하였습니다. 관리자에게 문의해주세요.';
                    break;
                default:
                    errorMessage = '알 수 없는 오류가 발생했습니다.';
                    break;
            }

            alert(errorMessage);
        },
        retry: 0,
    });
}
