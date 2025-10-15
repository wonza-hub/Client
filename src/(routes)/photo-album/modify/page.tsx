// PAGE: 앨범 수정 페이지
import PhotoAlbumForm from '../_components/PhotoAlbumForm';
import { useState, useEffect, Suspense, Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { IExistingFileDto, IModifiedPhotoAlbumFormData, IUploadedFileDto } from '../types';
import { SubmitHandler } from 'react-hook-form';
import useGetPhotoAlbumDetail from '../_lib/getPhotoAlbumDetail';
import useUpdatePhotoAlbumPost from '../_lib/putPhotoAlbumPost';
import LoadingSpinner from '../../../_components/loadingSpinner/LoadingSpinner';

interface IPhotoAlbumFormContentBeingModifiedProps {
    boardId: string;
    existingFileIds: number[];
    setExistingFileIds: Dispatch<SetStateAction<number[]>>;
    onSubmit: SubmitHandler<IModifiedPhotoAlbumFormData>;
    isPending: boolean;
}

const PhotoAlbumFormContentBeingModified = ({
    boardId,
    existingFileIds,
    setExistingFileIds,
    onSubmit,
    isPending,
}: IPhotoAlbumFormContentBeingModifiedProps) => {
    const {
        data: { photoPostDto, fileDtoList },
    } = useGetPhotoAlbumDetail(boardId);

    // 기존 파일 아이디 배열 주입하여 (삭제 시 조작)
    useEffect(() => {
        setExistingFileIds(fileDtoList.map(file => file.id));
    }, [fileDtoList, setExistingFileIds]);

    return (
        <PhotoAlbumForm
            existingFiles={fileDtoList}
            existingPostData={photoPostDto}
            existingFileIds={existingFileIds}
            setExistingFileIds={setExistingFileIds}
            onSubmit={onSubmit}
            isPending={isPending}
        />
    );
};

export default function Page() {
    const { boardId } = useParams<string>();
    const [existingFileIds, setExistingFileIds] = useState<number[]>();

    const { mutate: updatePhotoAlbumPost, isPending: isPhotoAlbumPostModifyPending } = useUpdatePhotoAlbumPost();

    // 수정 제출 핸들러
    const handleModifiedFormSubmit = (data: IModifiedPhotoAlbumFormData) => {
        const { files, title, bodyContent } = data;

        if (files.length === 0) {
            alert('사진 첨부는 필수입니다!');
            return;
        }

        const photoAlbumPostFormDataModified = new FormData();

        // 게시물 정보 Blob 생성 후 폼데이터에 추가
        const descriptionBlob = new Blob([JSON.stringify({ id: boardId, title, bodyContent })], {
            type: 'application/json',
        });
        photoAlbumPostFormDataModified.append('data', descriptionBlob);

        // 기존 파일 아이디 Blob 생성 후 폼데이터에 추가
        const existingFileIdsBlob = new Blob([JSON.stringify(existingFileIds)], { type: 'application/json' });
        photoAlbumPostFormDataModified.append('file-id', existingFileIdsBlob);

        // 신규 파일들만 폼데이터에 추가
        files.forEach((file: IExistingFileDto | IUploadedFileDto) => {
            if ('file' in file) {
                photoAlbumPostFormDataModified.append('file', file.file);
            }
        });

        updatePhotoAlbumPost(photoAlbumPostFormDataModified);
    };

    return (
        <main className='w-full'>
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pt-10'>
                <Suspense fallback={<LoadingSpinner size={32} />}>
                    <PhotoAlbumFormContentBeingModified
                        boardId={boardId}
                        existingFileIds={existingFileIds}
                        setExistingFileIds={setExistingFileIds}
                        onSubmit={handleModifiedFormSubmit}
                        isPending={isPhotoAlbumPostModifyPending}
                    />
                </Suspense>
            </div>
        </main>
    );
}
