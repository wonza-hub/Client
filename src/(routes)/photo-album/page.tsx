import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { Flex } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import PhotoAlbumThumbnail from './_components/PhotoAlbumThumbnail';
import LoadingSpinner from '../../_components/loadingSpinner/LoadingSpinner';
import { IPhotoAlbumMetaData } from './types';
import useInfinitePhotoAlbumData from './_hooks/useInfinitePhotoAlbumData';

// Masonary 레이아웃 열 갯수 (반응형)
const breakpointColumnsObj = {
    default: 3,
    900: 2,
    600: 1,
};

export default function Page() {
    // 무한스크롤 api 호출 지점 옵저버
    const { ref: observeBtmRef, inView } = useInView();

    // 리액트 쿼리 무한스크롤 api
    const {
        data: photoAlbumPages,
        isPending: isPhotoAlbumsPending,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfinitePhotoAlbumData();

    // ref가 inView 영역에 도달하면 다음 페이지를 불러옴
    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    return (
        <>
            {/* 게시물 목록 */}
            <div className='relative mx-auto flex h-[calc(100dvh-4.68rem)] flex-col overflow-y-auto border-x border-gray-200 scrollbar-hide xl:w-[70rem]'>
                <Flex sx={{ width: '100%' }} as={Masonry} breakpointCols={breakpointColumnsObj}>
                    {/* LOADING: 스켈레톤  */}
                    {isPhotoAlbumsPending &&
                        Array.from(new Array(9)).map((_, index) => (
                            <Box
                                key={index}
                                sx={{
                                    margin: '1rem',
                                    maxWidth: '22.65rem',
                                    height: '24rem',
                                }}
                            >
                                <Skeleton variant='rounded' height='100%' />
                            </Box>
                        ))}
                    {!isPhotoAlbumsPending &&
                        photoAlbumPages?.pages.map(photoAlbumPage =>
                            photoAlbumPage.map((photoAlbum: IPhotoAlbumMetaData, idx: number) => (
                                <div
                                    className='m-4 h-min'
                                    ref={photoAlbumPage.length === idx + 1 ? observeBtmRef : null}
                                >
                                    <Link to={`${photoAlbum.id}`}>
                                        <PhotoAlbumThumbnail key={photoAlbum.id} thumbnailData={photoAlbum} />
                                    </Link>
                                </div>
                            )),
                        )}
                </Flex>
                {/* 로딩스피너 */}
                <div className='my-4 h-fit w-full text-center'>
                    {isFetchingNextPage && <LoadingSpinner size={32} />}
                </div>
            </div>
        </>
    );
}
