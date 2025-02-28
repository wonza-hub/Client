// COMPONENT: 인생네컷 배너
import SlidingPhotos from './_components/SlidingPhotos.jsx';
import PhotoPostForm from './_components/PhotoPostForm.tsx';
import { useGetLife4CutPhotos } from '../_lib/getLife4CutPhotos.ts';

interface IPageProps {
    inView: boolean; // 뷰포트 내 들어온지 여부
}
const PageContent = ({ inView }) => {
    // 옵저버 감지 시 조회 api 호출
    const { data: life4CutPhotos = [], isError, isLoading } = useGetLife4CutPhotos(inView);

    if (isLoading)
        return (
            <div className='flex h-[30rem] w-full flex-row overflow-hidden'>
                {Array.from(new Array(6)).map((_, idx) => (
                    <div
                        key={idx}
                        className='mx-2 h-[28rem] w-[20rem] min-w-[20rem] animate-pulse rounded-sm bg-skeleton'
                    />
                ))}
            </div>
        );

    if (isError) return <div className='w-full text-center'>사진 정보를 불러오지 못했습니다.</div>;

    return (
        <div className='relative space-y-2.5 overflow-hidden'>
            <SlidingPhotos photos={life4CutPhotos} />
        </div>
    );
};

export default function Page({ inView }: IPageProps) {
    return (
        <>
            {/* 사진 업로드 */}
            <div className='header mb-14 flex flex-row justify-start pl-16'>
                <PhotoPostForm />
            </div>

            {/* 사진 리스트 */}
            <PageContent inView={inView} />
        </>
    );
}
