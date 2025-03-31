// PAGE: 앨범 게시물 등록 페이지
import PhotoAlbumForm from '../_components/PhotoAlbumForm';
import { useNavigate } from 'react-router-dom';
import { INewPhotoAlbumFormData } from '../types';
import { SubmitHandler } from 'react-hook-form';
import useCreatePhotoAlbumPost from '../_lib/postPhotoAlbumPost';

export default function Page() {
    const navigate = useNavigate();
    const { mutate: createPhotoAlbumPost, isPending: isPhotoAlbumCreationPending } = useCreatePhotoAlbumPost(navigate);

    // HANDLER: 폼 제출 핸들러
    const handlePostFormSubmit: SubmitHandler<INewPhotoAlbumFormData> = async data => {
        const { files, ...description } = data;

        if (files.length === 0) {
            alert('사진 첨부는 필수입니다!');
            return;
        }

        const photoAlbumFormData = new FormData();

        // Blob로 변환 후 폼데이터에 삽입
        const descriptionDataBlob = new Blob([JSON.stringify(description)], {
            type: 'application/json',
        });
        photoAlbumFormData.append('data', descriptionDataBlob);

        files.forEach(file => photoAlbumFormData.append('file', file.file));

        // REST: 게시물 등록
        createPhotoAlbumPost(photoAlbumFormData);
    };

    return (
        <main className='overflow-auto'>
            <PhotoAlbumForm onSubmit={handlePostFormSubmit} isPending={isPhotoAlbumCreationPending} />
        </main>
    );
}
