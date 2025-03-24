// DELETE: 앨범 삭제
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { PAGE_ROUTE } from '../../../_constants/constants';

const useDeleteAlbumPost = (boardId: string) => {
    const navigate = useNavigate();
    const albumDeletionURL = `/api/post/delete`;

    return useMutation<AxiosResponse, AxiosError, string>({
        mutationFn: async () => await axios.delete(albumDeletionURL, { params: { postId: boardId } }),
        onSuccess: () => {
            navigate(`/${PAGE_ROUTE.PHOTOALBUMS}`);
        },
        onError: () => {
            alert('앨범 삭제에 실패했습니다.');
        },
    });
};
export default useDeleteAlbumPost;
