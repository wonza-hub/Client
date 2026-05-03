// COMPONENT: 사진 게시판 게시물 좋아요 버튼
import { FaHeart } from 'react-icons/fa';
import { CircleActivationButton as Button } from '../../../../_components/button/CircleActivationButton';
import usePostPhotoAlbumLike from '../../_lib/postPhotoAlbumLike';

interface IPhotoAlbumLikeBtnProps {
    memberLiked: boolean;
    likeCount: number;
}
export default function PhotoAlbumLikeBtn({ memberLiked, likeCount }: IPhotoAlbumLikeBtnProps) {
    const { mutate: updateAlbumLike } = usePostPhotoAlbumLike();

    const handleButtonClick = () => {
        updateAlbumLike({ isLiked: memberLiked });
    };

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
