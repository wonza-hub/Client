// COMPONENT: 댓글 작성하는 입력칸(폼)
import { FiSend } from 'react-icons/fi';
import LoadingSpinner from '../../../../_components/loadingSpinner/LoadingSpinner';
import { SubmitHandler, useForm } from 'react-hook-form';
import { INewCommentValues } from '../../types';
import useCreatePhotoAlbumComment from '../../_lib/postPhotoAlbumComment';

interface ICommentPostFormProps {
    isMetadataVisible: boolean;
}
export default function CommentPostForm({ isMetadataVisible }: ICommentPostFormProps) {
    const methods = useForm({
        mode: 'onBlur',
    });
    const { mutate: createComment, isPending: isCommentPending } = useCreatePhotoAlbumComment(methods.reset);

    // HANDLER: 댓글 작성
    const handleCommentSubmit: SubmitHandler<INewCommentValues> = async ({ comment }) => {
        createComment(comment);
    };

    return (
        <>
            {isMetadataVisible ? (
                <div className='CommentFormBlock sticky bottom-0 h-[6rem] w-full rounded-b-2xl bg-white  shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]'>
                    <form
                        className='CommentForm flex w-full flex-auto flex-row items-center p-6 pl-10 pr-6'
                        onSubmit={methods.handleSubmit(handleCommentSubmit)}
                    >
                        {/* 댓글 작성란 */}
                        {isCommentPending ? (
                            <div className='flex h-full w-full justify-center pb-1 pt-2'>
                                <LoadingSpinner size={32} />
                            </div>
                        ) : (
                            <label className='mr-6 w-full' htmlFor='comment'>
                                <input
                                    id='comment'
                                    className='CommentInput flex h-[3rem] w-full rounded-2xl border-none bg-[#efefef] px-6 py-0 outline-4 outline-secondary'
                                    type='text'
                                    placeholder='댓글 추가'
                                    {...methods.register('comment', {
                                        required: { value: true, message: '댓글을 입력해주세요.' },
                                        maxLength: { value: 100, message: '최대 100자까지 입력 가능합니다.' },
                                    })}
                                />
                            </label>
                        )}
                        {/* 등록 버튼 */}
                        <button className='CommentPostBtn h-10 w-10 text-secondary' disabled={isCommentPending}>
                            <FiSend size={32} />
                        </button>
                    </form>
                </div>
            ) : null}
        </>
    );
}
