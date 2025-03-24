// POST: 댓글 수정
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';

interface IModifiedCommentProps {
    commentId: number;
    updateValue: string;
}

const useUpdateComment = () => {
    const queryClient = useQueryClient();
    const { boardId } = useParams();

    return useMutation<AxiosResponse, Error, IModifiedCommentProps>({
        mutationFn: async ({ commentId, updateValue }) => {
            const commentUpdateURL = `/api/comment/modify/${commentId}`;
            return await axios.post(commentUpdateURL, {
                content: updateValue,
            });
        },

        // 클라이언트 업데이트
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['album', boardId] });
        },
        onError: () => {
            window.alert('댓글 수정에 실패하였습니다.');
        },
    });
};

export default useUpdateComment;
