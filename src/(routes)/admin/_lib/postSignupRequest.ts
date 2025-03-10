// POST: 회원가입 요청 승인
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { AUTHORITY_KOR_TO_ENG } from '../../../_constants/constants';
import { ISignupReq } from '../type';

interface ISignupProps {
    signupReq: ISignupReq;
}
const useApproveSignupRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ signupReq }: ISignupProps) => {
            const approveReqURL = `/api/manager/approve-signup`;
            return await axios.post(approveReqURL, {
                loginId: signupReq.loginId,
                memberAuthority: AUTHORITY_KOR_TO_ENG[signupReq.memberAuthority],
            });
        },
        // 클라이언트 업데이트
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['signups'] });
        },
    });
};
export default useApproveSignupRequest;
