// COMPONENT: 사진 게시판 게시물 단건 삭제 버튼
import { CircleActivationButton as Button } from '../../../../_components/button/CircleActivationButton';
import { MdDelete } from 'react-icons/md';
import useDeleteAlbumPost from '../../_lib/deleteAlbumPost';
import { useParams } from 'react-router-dom';

export default function DeleteAlbumPostBtn() {
    const { boardId } = useParams();

    const { mutate: deleteAlbum, isPending: isDeletingAlbum } = useDeleteAlbumPost(boardId);

    const handleAlbumDelete = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            deleteAlbum(boardId);
        }
    };

    return (
        <div className='text-red-600'>
            <Button
                onClick={handleAlbumDelete}
                content={<MdDelete className='mt-[0.2rem] text-3xl' />}
                disabled={isDeletingAlbum}
            />
        </div>
    );
}
