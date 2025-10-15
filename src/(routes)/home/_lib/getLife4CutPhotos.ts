// GET: 인생네컷 사진 조회
import { useQuery } from '@tanstack/react-query';
import { ISlidingPhoto } from '../type';
import axios from 'axios';
import { LIFE4CUT_SIZE } from '../../../_constants/constants';

export const useGetLife4CutPhotos = (inView: boolean) => {
    return useQuery<ISlidingPhoto[]>({
        queryKey: ['photo-zone'],
        queryFn: async () =>
            await axios
                .get('/api/life4cut', {
                    params: {
                        size: LIFE4CUT_SIZE,
                    },
                })
                .then(res => res.data.response.dtoList),
        retry: 0,
        gcTime: 0,
        enabled: inView,
    });
};
