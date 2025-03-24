import { Outlet, useLocation } from 'react-router-dom';
import GlobalNavbar from '../_components/globalNavBar/GlobarNavbar.tsx';
import useScrollToTop from '../_hooks/useScrollToTop.ts';
import { Suspense } from 'react';
import LoadingSpinner from '../_components/loadingSpinner/LoadingSpinner.tsx';

export default function PublicLayout() {
    useScrollToTop();

    const pathname = useLocation().pathname;

    return (
        <>
            {pathname !== '/signin' &&
                pathname !== '/signup' &&
                pathname !== '/search_id' &&
                pathname !== '/search_pw' && <GlobalNavbar />}
            <Suspense
                fallback={
                    <div className='flex min-h-screen items-center justify-center'>
                        <LoadingSpinner size={72} />
                    </div>
                }
            >
                <Outlet />
            </Suspense>
        </>
    );
}
