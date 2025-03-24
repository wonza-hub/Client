// GET: 회원 목록 조회
import { useQuery } from '@tanstack/react-query';
import { IMember } from '../type';
import axios from 'axios';
import { AUTHORITY_ENG_TO_KOR } from '../../../_constants/constants';

const useGetMembers = () => {
    const allMembersURL = `/api/manager/member-info`;

    return useQuery<IMember[]>({
        queryKey: ['members'],
        queryFn: async () =>
            await axios.get(allMembersURL).then(res => {
                const members: IMember[] = res.data.response.dtoList;

                return members.map(member => ({
                    ...member,
                    memberAuthority: AUTHORITY_ENG_TO_KOR[member.memberAuthority] ?? '-',
                }));
            }),
        refetchOnWindowFocus: false,
    });
};
export default useGetMembers;
