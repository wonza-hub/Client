// DELETE: 회원 탈퇴
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { IMember } from '../type';

const useDeleteMember = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id }: IMember) => {
            const deleteMemberURL = `/api/manager/member-withdraw?member-id=${id}`;
            return await axios.delete(deleteMemberURL);
        },
        // 클라이언트 업데이트
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['members'] });
        },
    });
};
export default useDeleteMember;
