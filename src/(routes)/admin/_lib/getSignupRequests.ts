// GET: 회원가입 요청 목록 조회
import { useQuery } from '@tanstack/react-query';
import { ISignupReq } from '../type';
import axios from 'axios';
import { AUTHORITY_ENG_TO_KOR } from '../../../_constants/constants';
const useGetSignupRequests = () => {
    const signupReqsURL = `/api/manager/signup-request`;

    return useQuery<ISignupReq[]>({
        queryKey: ['signups'],
        queryFn: async () =>
            await axios.get(signupReqsURL).then(res => {
                const signupRequests: ISignupReq[] = res.data.response.dtoList;

                return signupRequests.map(req => ({
                    ...req,
                    memberAuthority: AUTHORITY_ENG_TO_KOR[req.memberAuthority] ?? '-',
                }));
            }),
        refetchOnWindowFocus: false,
    });
};
export default useGetSignupRequests;
