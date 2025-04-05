// POST: 사진게시판 게시물 좋아요 요청
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { IPhotoAlbumData } from '../types';
import { IServerErrorResponse } from '../../../_types/type';

export default function usePostPhotoAlbumLike() {
    const queryClient = useQueryClient();
    const { boardId } = useParams();

    return useMutation<AxiosResponse, AxiosError<IServerErrorResponse>>({
        // 낙관적 업데이트
        onMutate: async () => {
            // 진행 중인 쿼리 취소
            await queryClient.cancelQueries({ queryKey: ['album', boardId] });

            // 기존 상태 백업
            const {
                photoPostDto: { likeCount },
                memberLiked,
            } = queryClient.getQueryData<IPhotoAlbumData>(['album', boardId]);
            const previousLikeState = memberLiked;
            const previousLikeCount = likeCount;

            // 새 상태 계산
            const newLikeState = !previousLikeState;
            const newLikeCount = previousLikeState ? previousLikeCount - 1 : previousLikeCount + 1;

            // 캐시 데이터 업데이트
            queryClient.setQueryData(['album', boardId], (oldData: IPhotoAlbumData) => ({
                ...oldData,
                photoPostDto: {
                    ...oldData.photoPostDto,
                    likeCount: newLikeCount,
                },
                memberLiked: newLikeState,
            }));

            // 백업 데이터 반환 (onError에서 사용)
            return {
                previousLikeState,
                previousLikeCount,
            };
        },
        mutationFn: () => {
            const { memberLiked: isLiked } = queryClient.getQueryData<IPhotoAlbumData>(['album', boardId]);

            return axios.post(
                `/api/post/${isLiked ? 'like' : 'cancel-like'}`,
                { postId: boardId },
                {
                    headers: { Authorization: localStorage.getItem('access_token') },
                },
            );
        },
        // 에러 시 롤백
        onError: (_error, _variables, { previousLikeState, previousLikeCount }) => {
            queryClient.setQueryData(['album', boardId], (oldData: IPhotoAlbumData) => ({
                ...oldData,
                photoPostDto: {
                    ...oldData.photoPostDto,
                    likeCount: previousLikeCount,
                },
                memberLiked: previousLikeState,
            }));
        },
        onSettled: () =>
            queryClient.invalidateQueries({
                queryKey: ['album', boardId],
                // refetchType: 'none',
            }),
    });
}
