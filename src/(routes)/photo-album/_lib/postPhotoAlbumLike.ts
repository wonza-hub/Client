// POST: 사진게시판 게시물 좋아요 요청
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { IPhotoAlbumData } from '../types';
import { IServerErrorResponse } from '../../../_types/type';
import { useRef } from 'react';

export default function usePostPhotoAlbumLike() {
    const queryClient = useQueryClient();
    const { boardId } = useParams();

    // 디바운스 타이머를 위한 ref
    const timerRef = useRef<number | null>(null);

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
        mutationFn: async ({ isLiked }) => {
            // 이전 타이머가 있으면 취소
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            // 디바운스 구현
            return new Promise<AxiosResponse>((resolve, reject) => {
                timerRef.current = setTimeout(() => {
                    axios
                        .post(`/api/post/${isLiked ? 'cancel-like' : 'like'}`, { postId: boardId })

                        .then(resolve)
                        .catch(reject);
                }, 1000);
            });
        },
        // 에러 시 롤백
        onError: (_error, { isLiked }, { previousLikeState, previousLikeCount }) => {
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
