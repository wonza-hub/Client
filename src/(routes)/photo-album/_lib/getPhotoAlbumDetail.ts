// GET: 앨범 단건 조회 함수
import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IPhotoAlbumData } from '../types';

const useGetPhotoAlbumDetail = (boardId: string) => {
    const albumURL = `/api/photo-post/${boardId}`;

    return useSuspenseQuery<IPhotoAlbumData>({
        queryKey: ['album', boardId],
        queryFn: async () => await axios.get(albumURL).then(res => res.data.response),
        retry: false,
        refetchOnWindowFocus: false,
    });
};

export default useGetPhotoAlbumDetail;
