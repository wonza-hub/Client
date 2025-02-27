// COMPONENT: 최신 글 배너
import { Link } from 'react-router-dom';
import { StringCombinator } from '../../../../_utils/StringCombinator';
import { StringTranslator } from '../../../../_utils/StringTranslator';
import { useGetNewPosts } from '../../_lib/getNewPosts';
import { ErrorBoundary } from 'react-error-boundary';
import LoadingSpinner from '../../../../_components/loadingSpinner/LoadingSpinner';
import { Suspense } from 'react';

const RecentPostsBannerContent = () => {
    const { data: recentPosts } = useGetNewPosts();

    if (recentPosts?.length === 0) {
        return (
            <h1 className='font-slate-600 text-[0.8rem]'>
                최신 게시글이 없습니다.
                <br />
                새로운 글을 작성해보세요!
            </h1>
        );
    }

    return (
        <ul className='h-full w-full px-[0.8rem] text-slate-600'>
            {recentPosts.map(post => (
                <li key={post.id} className='mb-[0.2rem] flex w-full flex-row hover:text-primary'>
                    <span className='mr-3 mt-[0.2rem] h-[1.2rem] w-fit text-nowrap rounded-md bg-primary px-2 py-[0.2rem] text-[0.6rem] font-semibold text-white'>
                        {StringTranslator.getPostCategoryKOR(post.postCategory)}
                    </span>
                    <div className='flex w-full flex-col truncate'>
                        <Link
                            to={StringCombinator.getRecentPostPath(
                                StringTranslator.getPostCategoryURL(post.postCategory),
                                post.id,
                            )}
                        >
                            <div className='truncate text-[0.75rem]'>{post.title}</div>
                        </Link>
                        <div className='truncate text-[0.6rem]'>{StringCombinator.getFormatDate(post.createdTime)}</div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

// COMPONENT: 최신 글 배너
export default function RecentPostsBanner() {
    return (
        <article className='flex h-[14rem] w-[14rem] flex-col rounded-[0.5rem] border-2 border-secondary bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
            <h1 className='m-[0.8rem] mb-[0.3rem] text-sm font-bold text-primary'>최신 글</h1>
            <ErrorBoundary
                fallback={
                    <div className='relative top-[35%] text-center text-xs'>최신 글을 불러오는데 실패했습니다.</div>
                }
            >
                <Suspense fallback={<LoadingSpinner size={20} />}>
                    <RecentPostsBannerContent />
                </Suspense>
            </ErrorBoundary>
        </article>
    );
}
