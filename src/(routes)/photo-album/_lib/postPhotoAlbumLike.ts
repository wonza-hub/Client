// POST: 사진게시판 게시물 좋아요 요청
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { IPhotoAlbumData } from '../types';
import { IServerErrorResponse } from '../../../_types/type';

export default function usePostPhotoAlbumLike() {
    const queryClient = useQueryClient();
    const { boardId } = useParams();

    return useMutation<AxiosResponse, AxiosError<IServerErrorResponse>, { isLiked: boolean }>({
        // 낙관적 업데이트
        onMutate: async ({ isLiked }) => {
            // 진행 중인 쿼리 취소
            await queryClient.cancelQueries({ queryKey: ['album', boardId] });

            // 기존 상태 백업
            const {
                photoPostDto: { likeCount },
                memberLiked,
            } = queryClient.getQueryData<IPhotoAlbumData>(['album', boardId]);
            const previousLikeState = memberLiked;
            const previousLikeCount = likeCount;

            // 낙관적 업데이트 적용
            queryClient.setQueryData(['album', boardId], (oldData: IPhotoAlbumData) => ({
                ...oldData,
                photoPostDto: {
                    ...oldData.photoPostDto,
                    likeCount: oldData.photoPostDto.likeCount + (isLiked ? -1 : 1),
                },
                memberLiked: !oldData.memberLiked,
            }));

            // 백업 데이터 반환 (onError에서 사용)
            return {
                previousLikeState,
                previousLikeCount,
            };
        },
        mutationFn: ({ isLiked }) => {
            return axios.post(`/api/post/${isLiked ? 'cancel-like' : 'like'}`, { postId: boardId });
        },
        // 에러 시 롤백
        onError: (_error, { isLiked }, { previousLikeState, previousLikeCount }) => {
            console.log(_error);
            queryClient.setQueryData(['album', boardId], (oldData: IPhotoAlbumData) => ({
                ...oldData,
                photoPostDto: {
                    ...oldData.photoPostDto,
                    likeCount: previousLikeCount,
                },
                memberLiked: previousLikeState,
            }));

            alert(`좋아요${isLiked ? ' 취소' : '에'} 실패했습니다.`);
        },
        onSettled: () => {
            return queryClient.invalidateQueries({
                queryKey: ['album', boardId],
                // refetchType: 'none',
            });
        },
    });
}
