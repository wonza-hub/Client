// DELETE: 댓글 삭제
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';

const useDeleteComment = () => {
    const queryClient = useQueryClient();
    const { boardId } = useParams();

    return useMutation<AxiosResponse, Error, number>({
        mutationFn: async commentId => {
            const commentDeletionURL = `/api/comment/delete/${commentId}`;
            return await axios.delete(commentDeletionURL);
        },

        // 클라이언트 업데이트
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['album', boardId] });
        },
        onError: () => {
            window.alert('댓글 삭제에 실패하였습니다.');
        },
    });
};
export default useDeleteComment;
