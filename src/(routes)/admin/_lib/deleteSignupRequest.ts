// POST: 회원가입 요청 거절
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AUTHORITY_KOR_TO_ENG } from '../../../_constants/constants';
import axios from 'axios';
import { ISignupReq } from '../type';

interface ISignupProps {
    signupReq: ISignupReq;
}
const useRejectSignupRequest = () => {
    const queryClient = useQueryClient();
    const rejectReqURL = `/api/manager/reject-signup`;

    return useMutation({
        mutationFn: async ({ signupReq }: ISignupProps) =>
            await axios.post(rejectReqURL, {
                loginId: signupReq.loginId,
                memberAuthority: AUTHORITY_KOR_TO_ENG[signupReq.memberAuthority],
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['signups'] });
        },
    });
};
export default useRejectSignupRequest;
