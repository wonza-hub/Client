import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import isServerError from '../_errors/isServerError';

// POST: 출석 등록
export function usePostMyAttendance() {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse, AxiosError>({
        mutationFn: async () => {
            const myAttdURL = `/api/attendance`;
            return await axios.post(myAttdURL);
        },
        // 클라이언트 업데이트
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
            if (e.response.status === 403) {
                errorMessage = '권한이 없는 사용자입니다';
            } else if (e.response.status === 401) {
                errorMessage = '로그인 후 다시 시도해주세요.';
            } else if (e.response.status === 409) {
                errorMessage = '오늘은 이미 출석하셨습니다! 내일도 방문해주세요!';
            } else if (e.response.status === 500) {
                errorMessage = '출석 등록에 실패하였습니다. 관리자에게 문의해주세요.';
            }
            alert(errorMessage);
        },
        retry: 0,
    });
}
