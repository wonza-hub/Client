import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import getNextPhotoAlbums from '../_lib/getNextPhotoAlbums';

interface ScrollRestorationData {
    scrollY: number;
    pageCount: number;
    pathname: string;
    timestamp: number;
}

export default function useInfinitePhotoAlbumData() {
    const queryClient = useQueryClient();
    const location = useLocation();
    const navigationType = useNavigationType();
    const isRestoringRef = useRef(false);
    const hasMountedRef = useRef(false);
    const infiniteQueryDataRef = useRef<typeof infiniteQuery.data>();

    // 스크롤 복원 데이터를 저장할 캐시 키 (useMemo로 메모이제이션)
    const SCROLL_CACHE_KEY = useMemo(() => ['album', 'scroll-restoration'], []);

    const infiniteQuery = useInfiniteQuery({
        queryKey: ['album'],
        queryFn: getNextPhotoAlbums,
        // page 파라미터 초기값
        initialPageParam: 1,
        // lastPage: 마지막에 불러온 한 페이지 내 배열, allPages: 현재까지 불러온 총페이지 배열
        getNextPageParam: (lastPage, allPages) => (lastPage.length ? allPages.length + 1 : undefined),
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
        throwOnError: true,
    });

    /**
     * 캐시에서 저장된 스크롤 데이터 가져오기
     */
    const getSavedScrollData = useCallback((): ScrollRestorationData | undefined => {
        return queryClient.getQueryData<ScrollRestorationData>(SCROLL_CACHE_KEY);
    }, [queryClient, SCROLL_CACHE_KEY]);

    /**
     * 캐시에 스크롤 데이터 저장하기
     */
    const saveScrollData = useCallback(
        (scrollY: number, pageCount: number) => {
            queryClient.setQueryData<ScrollRestorationData>(SCROLL_CACHE_KEY, {
                scrollY,
                pageCount,
                pathname: location.pathname,
                timestamp: Date.now(),
            });
        },
        [queryClient, SCROLL_CACHE_KEY, location.pathname],
    );

    /**
     * 무한 스크롤 데이터와 함께 스크롤 위치 복원
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const restoreWithInfiniteData = useCallback(async () => {
        const savedScrollData = getSavedScrollData();

        // 저장된 데이터가 있고, 같은 경로이며, 데이터가 존재할 때만 복원
        if (
            savedScrollData &&
            savedScrollData.pathname === location.pathname &&
            infiniteQuery.data &&
            !isRestoringRef.current
        ) {
            isRestoringRef.current = true;

            try {
                const currentPageCount = infiniteQuery.data.pages.length;
                const targetPageCount = savedScrollData.pageCount;

                console.log('🔄 스크롤 복원 시작:', {
                    현재페이지: currentPageCount,
                    목표페이지: targetPageCount,
                    스크롤위치: savedScrollData.scrollY,
                });

                // 저장된 페이지 수만큼 데이터 복구
                if (currentPageCount < targetPageCount) {
                    const pagesToFetch = targetPageCount - currentPageCount;

                    for (let i = 0; i < pagesToFetch; i++) {
                        if (infiniteQuery.hasNextPage) {
                            await infiniteQuery.fetchNextPage();
                        } else {
                            break;
                        }
                    }
                }

                // 모든 데이터 로딩 완료 후 스크롤 복원
                // requestAnimationFrame을 사용해 DOM 렌더링 완료 후 실행
                requestAnimationFrame(() => {
                    window.scrollTo(0, savedScrollData.scrollY);
                    console.log('✅ 스크롤 복원 완료');
                });
            } catch (error) {
                console.error('❌ 스크롤 복원 중 오류:', error);
            } finally {
                isRestoringRef.current = false;
            }
        }
    }, [
        getSavedScrollData,
        location.pathname,
        infiniteQuery.data,
        infiniteQuery.hasNextPage,
        infiniteQuery.fetchNextPage,
    ]);

    // infiniteQuery.data를 ref에 저장 (언마운트 시점에 최신 값 참조용)
    useEffect(() => {
        infiniteQueryDataRef.current = infiniteQuery.data;
    }, [infiniteQuery.data]);

    // 컴포넌트 마운트 시 뒤로가기인 경우 스크롤 복원
    useEffect(() => {
        if (!hasMountedRef.current) {
            hasMountedRef.current = true;

            // POP 네비게이션 (뒤로가기/앞으로가기)인 경우에만 복원
            if (navigationType === 'POP' && infiniteQuery.data) {
                restoreWithInfiniteData();
            }
        }
    }, [navigationType, infiniteQuery.data, restoreWithInfiniteData]);

    // 컴포넌트 언마운트 시 현재 스크롤 위치와 페이지 수 저장
    useEffect(() => {
        return () => {
            const data = infiniteQueryDataRef.current;
            if (data) {
                const currentScrollY = window.scrollY;
                const currentPageCount = data.pages.length;

                saveScrollData(currentScrollY, currentPageCount);
                console.log('💾 스크롤 데이터 캐시에 저장:', {
                    스크롤위치: currentScrollY,
                    페이지수: currentPageCount,
                });
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        ...infiniteQuery,
        restoreWithInfiniteData,
        getSavedScrollData,
    };
}
