// COMPONENT: 사진 게시판 게시물 좋아요 버튼
import { FaHeart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { CircleActivationButton as Button } from '../../../../_components/button/CircleActivationButton';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { IPhotoAlbumData } from '../../types';
import usePostPhotoAlbumLike from '../../_lib/postPhotoAlbumLike';

export default function PhotoAlbumLikeBtn() {
    const { boardId } = useParams();
    const queryClient = useQueryClient();

    // 캐시에서 좋아요 수, 여부 가져오기
    const {
        photoPostDto: { likeCount },
        memberLiked,
    } = queryClient.getQueryData<IPhotoAlbumData>(['album', boardId]);
    const { mutate: updateAlbumLike } = usePostPhotoAlbumLike();

    const handleButtonClick = useCallback(() => {
        updateAlbumLike();
    }, [updateAlbumLike]);

    return (
        <Button
            onClick={handleButtonClick}
            content={
                memberLiked ? (
                    <div className='flex flex-col justify-between'>
                        <FaHeart className='text-2xl text-red-400' />
                        <span className='bottom-0 w-full text-center text-[0.6rem]'>{likeCount}</span>
                    </div>
                ) : (
                    <div className='flex flex-col justify-between'>
                        <FaHeart className='text-2xl text-slate-300' />
                        <span className='bottom-0 w-full text-center text-[0.6rem]'>{likeCount}</span>
                    </div>
                )
            }
        />
    );
}
