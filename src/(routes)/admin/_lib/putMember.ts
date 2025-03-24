// POST: 회원 권한 수정
import axios from 'axios';
import { AUTHORITY_KOR_TO_ENG } from '../../../_constants/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IUpdatedMember } from '../type';

const useUpdateMember = () => {
    const queryClient = useQueryClient();
    const authorityChangeURL = `/api/manager/change-authority`;

    return useMutation({
        mutationFn: async ({ updatedMemberId, updatedValues }: IUpdatedMember) =>
            await axios.post(authorityChangeURL, {
                id: updatedMemberId,
                memberAuthority: AUTHORITY_KOR_TO_ENG[updatedValues.memberAuthority],
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['members'] });
        },
    });
};
export default useUpdateMember;
