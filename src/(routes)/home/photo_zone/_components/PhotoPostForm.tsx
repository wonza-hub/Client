// COMPONENT: 파일 입력 컴포넌트
import { useState, useRef } from 'react';
import { usePostLife4CutPhoto } from '../../_lib/postLife4CutPhoto';
import { TbCameraSelfie } from 'react-icons/tb';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';
import LoadingSpinner from '../../../../_components/loadingSpinner/LoadingSpinner';
import resizeFile from '../../../../_utils/resizeImageFile';

const FileInput = ({ file, setFile, setFileName, isPending, fileInputRef }) => {
    const handleFileChange = async ({ target: { files } }) => {
        if (files[0]) {
            try {
                const resizedFile = await resizeFile({
                    file: files[0],
                    targetWidth: 300,
                    targetHeight: 450,
                    compressFormat: 'WEBP',
                    quality: 70,
                });
                setFileName(resizedFile.name);
                setFile(resizedFile);
            } catch (err) {
                console.error('Error resizing file:', err);
                alert('인생네컷 업로드에 실패했습니다.');
            }
        }
    };

    return (
        <div
            onClick={() => {
                fileInputRef.current.value = null;
                fileInputRef.current.click();
            }}
            className={`${
                file ? 'bg-primary' : 'bg-white'
            } flex w-fit flex-row items-center justify-evenly rounded-lg border-2 border-primary p-[0.7rem] font-semibold text-primary shadow-md hover:cursor-pointer`}
        >
            {file ? (
                <span className='mx-1 w-fit max-w-[20rem] truncate text-white'>{file.name}</span>
            ) : (
                <TbCameraSelfie size={24} />
            )}
            <input
                disabled={isPending}
                ref={fileInputRef}
                className='hidden h-full w-full'
                type='file'
                accept='.jpg, .jpeg, .png'
                onChange={handleFileChange}
            />
        </div>
    );
};

// COMPONENT: 업로드 버튼 컴포넌트
const UploadButtons = ({ file, isPending, onCancel, onSubmit }) => (
    <>
        {file ? (
            <>
                {/* 업로드 확정 */}
                <button
                    // onClick={e => e.stopPropagation()}
                    className='w-fit rounded-lg border-2 border-primary bg-white px-2 text-primary'
                    onClick={onSubmit}
                >
                    {isPending ? <LoadingSpinner size={20} /> : <FaCloudUploadAlt size={20} />}
                </button>
                {/* 업로드 취소 */}
                <button disabled={isPending} className='w-fit rounded-lg bg-primary px-2 text-white' onClick={onCancel}>
                    <MdOutlineCancel size={18} />
                </button>
            </>
        ) : null}
    </>
);

// COMPONENT: 사진 업로드 폼
export default function PhotoPostForm() {
    const [file, setFile] = useState<File>(null);
    const [, setFileName] = useState<string>('No selected file');
    const fileInputRef = useRef<HTMLInputElement>();

    const { mutate: createPhoto, isPending: isPhotoPending } = usePostLife4CutPhoto();

    // HANDLER: 사진 등록
    const handlePhotoCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        createPhoto(formData);
        setFile(null);
        alert('인생네컷 업로드에 성공했습니다.');
    };

    // HANDLER: 업로드 취소
    const handleCancel = (event: React.MouseEvent) => {
        event.stopPropagation();
        setFileName(null);
        setFile(null);
    };

    return (
        <form encType='multipart/form-data' onSubmit={handlePhotoCreate} className='h-fit'>
            <div className='flex h-fit flex-row gap-1'>
                <FileInput
                    file={file}
                    setFile={setFile}
                    setFileName={setFileName}
                    isPending={isPhotoPending}
                    fileInputRef={fileInputRef}
                />
                <UploadButtons
                    file={file}
                    isPending={isPhotoPending}
                    onCancel={handleCancel}
                    onSubmit={handlePhotoCreate}
                />
            </div>
        </form>
    );
}
