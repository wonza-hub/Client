import { useSuspenseQuery } from '@tanstack/react-query';
import { INewPost } from '../type';
import axios from 'axios';

// GET: 최신 글 조회
export const useGetNewPosts = () => {
    const recentPostsURL = `/api/post/recent-posts`;

    return useSuspenseQuery<INewPost[]>({
        queryKey: ['recent-posts'],
        queryFn: async () => await axios.get(recentPostsURL).then(res => res.data.response.dtoList),
        retry: 0,
    });
};
