// GET: 스크롤 시 다음 페이지의 앨범데이터를 가져오는 함수
import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import { IPhotoAlbumMetaData } from '../types';

const getNextPhotoAlbums: QueryFunction<IPhotoAlbumMetaData[], ['albums'], number> = async ({ pageParam }) => {
    const photoAlbumPagesURL = `/api/photo-post`;

    return await axios.get(photoAlbumPagesURL, { params: { page: pageParam } }).then(res => res.data.response.dtoList);
};

export default getNextPhotoAlbums;
