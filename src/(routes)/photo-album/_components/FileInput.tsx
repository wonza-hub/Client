// COMPONENT: 파일(사진 게시물) input
import { useRef, memo, useState } from 'react';
import { MdUpload } from 'react-icons/md';
import { FaTrash, FaCompress } from 'react-icons/fa';
import { AiFillFileImage } from 'react-icons/ai';
import { StringCombinator } from '../../../_utils/StringCombinator';
import { ORIGINAL_FILE_FLAG } from '../../../_constants/constants';
import { nanoid } from 'nanoid';
import { IExistingFileDto, IUploadedFileDto } from '../types';
import { useFormContext, useWatch } from 'react-hook-form';
import { filterBigSizeFiles } from '../../../_utils/filterBigSizeFiles';
import useImageResizer from '../../../_hooks/useImageResizer';

// TYPE GUARD: 게시물 수정 시 기존 파일 여부 체크
const isExistingFileDto = (fileItem: IExistingFileDto | IUploadedFileDto): fileItem is IExistingFileDto => {
    return ORIGINAL_FILE_FLAG in fileItem;
};
// TYPE GUARD: Promise 이행 상태 타입 체크
const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult =>
    input.status === 'rejected';
const isFulfilled = <T,>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> =>
    input.status === 'fulfilled';

interface IFileInputProps {
    existingFiles?: IExistingFileDto[];
    existingFileIds?: number[];
    setExistingFileIds?: React.Dispatch<React.SetStateAction<number[]>>;
}

export default memo(function FileInput({ existingFiles, existingFileIds, setExistingFileIds }: IFileInputProps) {
    const { register, setValue } = useFormContext();
    const watchedFiles: (IExistingFileDto | IUploadedFileDto)[] = useWatch({
        name: 'files',
        defaultValue: existingFiles ?? [], // 초기 값으로 기존 파일들을 설정
    });

    const [compressing, setCompressing] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    // 스크롤 이벤트 위한 가짜 ref
    const lastFileRef = useRef<HTMLDivElement>(null);

    const { resizeImage } = useImageResizer();

    // HANDLER: 파일 업로드
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setCompressing(true);
        const uploadedFiles = event.currentTarget.files;
        if (!uploadedFiles) return;

        const sizeFilteredUploadedFiles = filterBigSizeFiles(uploadedFiles);

        // 파일 리사이징 (Web Worker + OffscreenCanvas)
        try {
            const filePromises = sizeFilteredUploadedFiles.map(async uploadedFile => {
                try {
                    // 워커에서 리사이징 수행
                    const resizedFile = await resizeImage({
                        file: uploadedFile,
                        compressFormat: 'WEBP',
                        quality: 0.8,
                    });

                    return {
                        id: nanoid(),
                        file: resizedFile,
                    };
                } catch (err) {
                    console.error('🚀 ~ file resize error ~ err:', err);
                    throw err; // allSettled의 rejected 처리로 넘겨줌
                }
            });
            const results = await Promise.allSettled(filePromises);
            const successfulFiles = results.filter(isFulfilled).map(result => result.value);
            const failedFiles = results.filter(isRejected);

            setCompressing(false);
            setValue('files', [...watchedFiles, ...successfulFiles]);

            if (failedFiles.length !== 0) {
                // 실패한 파일에 대한 추가 처리
                alert('일부 파일의 업로드에 실패했습니다.');
                console.log(
                    'Failed files:',
                    failedFiles.map(file => file.reason),
                );
            }
        } catch (err) {
            console.error('특정 파일의 변환 과정이 실패했습니다.', err);
            setCompressing(false);
        }

        // 파일 업로드 직후 제일 마지막 파일로 스크롤 이벤트
        setTimeout(() => {
            lastFileRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'end',
            });
        }, 100);
    };

    // HANDLER: 파일 삭제
    const handleFileDelete = (targetFileId: number | string) => {
        // 파일 삭제 시 기존 파일 아이디를 저장한 리스트에서 해당 파일 아이디를 삭제
        if (existingFileIds) {
            setExistingFileIds(existingFileIds.filter(id => id !== targetFileId));
        }

        setValue(
            'files',
            watchedFiles.filter(watchedFileItem => watchedFileItem.id !== targetFileId),
        );
    };

    return (
        <div className='flex h-full w-full flex-col items-center'>
            <input
                {...register('files')}
                id='uploadfiles'
                type='file'
                ref={fileInputRef}
                // ref={register}
                className={'hidden'}
                onChange={handleFileChange}
                accept='.jpg, .jpeg, .png .webp .avif'
                multiple={true}
            />
            <div className='relative h-[85%] w-full overflow-hidden '>
                {/* 압축 중 표시 */}
                {compressing ? (
                    <div className='absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center gap-2 rounded-l-2xl bg-black/80 text-center text-white'>
                        <FaCompress size={32} className='animate-ping_reverse' />
                        <span>파일 압축 중</span>
                    </div>
                ) : null}
                <div className={'FilesContainer h-full w-full overflow-y-auto whitespace-nowrap'}>
                    {watchedFiles?.length === 0 && (
                        <div
                            className={
                                'flex h-full w-full min-w-max flex-col items-center justify-center rounded-2xl border-2 border-dotted border-stone-600 bg-slate-200'
                            }
                        >
                            <AiFillFileImage className={'mb-4 h-10 w-10'} />
                            <span className='text-center'>
                                아래 업로드 버튼을 클릭하여
                                <hr /> 사진을 추가하세요.
                            </span>
                        </div>
                    )}

                    {watchedFiles?.length !== 0 && (
                        <>
                            {watchedFiles?.map((fileItem: IExistingFileDto | IUploadedFileDto) => (
                                <div
                                    key={fileItem.id}
                                    className={
                                        'relative my-2 flex aspect-auto w-full flex-col overflow-hidden rounded-xl bg-gray-100 shadow-md brightness-95'
                                    }
                                >
                                    {/* 기존 사진 파일인 경우와 새로 업로드하는 파일 src 구분 */}
                                    {isExistingFileDto(fileItem) ? (
                                        <img
                                            className='object-scale-down object-center'
                                            src={StringCombinator.getImageURL(
                                                fileItem.saveFilePath,
                                                fileItem.saveFileName,
                                            )}
                                            alt='기존사진'
                                        />
                                    ) : (
                                        <img src={URL.createObjectURL(fileItem.file)} alt='업로드된 사진' />
                                    )}
                                    {/* 업로드 취소 버튼 */}
                                    <button
                                        type={'button'}
                                        onClick={() => {
                                            fileInputRef.current.value = null;
                                            handleFileDelete(fileItem.id);
                                        }}
                                        className={
                                            'absolute bottom-3 right-3 h-8 w-8 rounded-full bg-white duration-300'
                                        }
                                    >
                                        <FaTrash className={'mx-auto h-4 w-4'} />
                                    </button>
                                </div>
                            ))}
                        </>
                    )}

                    <div className='h-[1px] w-full opacity-0' ref={lastFileRef}></div>
                </div>
            </div>

            <>
                {/* 파일 업로드 버튼 */}
                <button
                    disabled={compressing}
                    type={'button'}
                    onClick={() => fileInputRef.current.click()}
                    className={
                        'FileAddBtn mt-6 h-[3rem] min-h-[3rem] w-[3rem] min-w-[3rem] overflow-hidden rounded-full bg-gray-400 text-white shadow-md transition-all hover:bg-gray-500'
                    }
                >
                    <MdUpload className={'h-full w-full p-2'} />
                </button>
            </>
        </div>
    );
});
