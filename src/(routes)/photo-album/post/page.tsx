// PAGE: 앨범 게시물 등록 페이지
import PhotoAlbumForm from '../_components/PhotoAlbumForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUploadedFileDto } from '../types';
import { IPhotoAlbumDescriptionValues } from '../types';
import { SubmitHandler } from 'react-hook-form';
import useCreatePhotoAlbumPost from '../_lib/postPhotoAlbumPost';

export default function Page() {
    const [files, setFiles] = useState<IUploadedFileDto[]>([]);

    const navigate = useNavigate();
    const { mutate: createPhotoAlbumPost, isPending: isPhotoAlbumCreationPending } = useCreatePhotoAlbumPost(navigate);

    // HANDLER: 폼 제출 핸들러
    const handlePostFormSubmit: SubmitHandler<IPhotoAlbumDescriptionValues> = async data => {
        if (files.length === 0) {
            alert('사진 첨부는 필수입니다!');

            return;
        }

        const photoAlbumFormData = new FormData();

        // Blob로 변환 후 폼데이터에 삽입
        const descriptionBlob = new Blob([JSON.stringify(data)], {
            type: 'application/json',
        });
        photoAlbumFormData.append('data', descriptionBlob);
        files.forEach(file => photoAlbumFormData.append('file', file.file));

        // REST: 게시물 등록
        createPhotoAlbumPost(photoAlbumFormData);
    };

    return (
        <main className='overflow-auto'>
            <div className='absolute left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 py-6 pt-[43rem]'>
                <PhotoAlbumForm
                    files={files}
                    setFiles={setFiles}
                    onSubmit={handlePostFormSubmit}
                    isPending={isPhotoAlbumCreationPending}
                />
            </div>
        </main>
    );
}
