import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
import { PAGE_ROUTE } from '../src/_constants/constants.ts';

import PublicLayout from './(routes)/publicLayout.tsx';
import PrivateLayout from './(routes)/privateLayout.tsx';
import GlobalNavbar from './_components/globalNavBar/GlobarNavbar.tsx';
import MainHome from './(routes)/home/page.tsx';
import NotFoundErrorPage from './(routes)/_errors/_components/NotFoundErrorPage.tsx';

const AccountLayout = lazy(() => import('./(routes)/(account)/layout.tsx'));
const SignInPage = lazy(() => import('./(routes)/(account)/signin/page.tsx'));
const SignUpPage = lazy(() => import('./(routes)/(account)/signup/page.tsx'));

const HistoryPage = lazy(() => import('./(routes)/(introduction)/history/page.tsx'));
const ProfessorPage = lazy(() => import('./(routes)/(introduction)/professor/page.tsx'));
const RegulationsPage = lazy(() => import('./(routes)/(introduction)/regulations/page.tsx'));
const ExecutivesPage = lazy(() => import('./(routes)/(introduction)/executives/page.tsx'));
const FormerExecutives = lazy(() => import('./(routes)/(introduction)/former_executives/page.tsx'));

const SearchAccountLayout = lazy(() => import('./(routes)/(searchAccount)/layout.tsx'));
const SearchIdPage = lazy(() => import('./(routes)/(searchAccount)/search_id/page.tsx'));
const SearchPasswordPage = lazy(() => import('./(routes)/(searchAccount)/search_pw/page.tsx'));

const PhotoAlbumListPage = lazy(() => import('./(routes)/photo-album/page.tsx'));
const PhotoAlbumPage = lazy(() => import('./(routes)/photo-album/[boardId]/page.tsx'));
const PhotoAlbumPostPage = lazy(() => import('./(routes)/photo-album/post/page.tsx'));
const PhotoAlbumModifyPage = lazy(() => import('./(routes)/photo-album/modify/page.tsx'));

const UnifiedBoardListPage = lazy(() => import('./(routes)/community/page.tsx'));
const UnifiedBoardPage = lazy(() => import('./(routes)/community/[boardId]/page.tsx'));
const UnifiedBoardPostPage = lazy(() => import('./(routes)/community/post/page.tsx'));
const UnifiedBoardModifyPage = lazy(() => import('./(routes)/community/modify/page.tsx'));

const ExamBoardListPage = lazy(() => import('./(routes)/exam/page.tsx'));
const ExamBoardPage = lazy(() => import('./(routes)/exam/[boardId]/page.tsx'));
const ExamBoardPostPage = lazy(() => import('./(routes)/exam/post/page.tsx'));
const ExamBoardModifyPage = lazy(() => import('./(routes)/exam/modify/page.tsx'));

const NoticeBoardListPage = lazy(() => import('./(routes)/notice/page.tsx'));
const NoticeBoardPage = lazy(() => import('./(routes)/notice/[boardId]/page.tsx'));
const NoticeBoardPostPage = lazy(() => import('./(routes)/notice/post/page.tsx'));
const NoticeBoardModifyPage = lazy(() => import('./(routes)/notice/modify/page.tsx'));

const AboutMeBoardListPage = lazy(() => import('./(routes)/about_me/page.tsx'));
const AboutMeBoardPage = lazy(() => import('./(routes)/about_me/[boardId]/page.tsx'));
const AboutMeBoardPostPage = lazy(() => import('./(routes)/about_me/post/page.tsx'));
const AboutMeBoardModifyPage = lazy(() => import('./(routes)/about_me/modify/page.tsx'));

const UserLayout = lazy(() => import('./(routes)/user/layout.tsx'));
const UserActivityPage = lazy(() => import('./(routes)/user/activity/page.tsx'));

const AdminPage = lazy(() => import('./(routes)/admin/page.tsx'));
const MemberManagementPage = lazy(() => import('./(routes)/admin/member_management/page.tsx'));
const ExecutivesManagementPage = lazy(() => import('./(routes)/admin/executives/page.tsx'));
const FormerExecutivesManagementPage = lazy(() => import('./(routes)/admin/former_executives/page.tsx'));

const router = createBrowserRouter([
    {
        errorElement: (
            <>
                <GlobalNavbar />
                <NotFoundErrorPage />
            </>
        ),
        children: [
            {
                element: <PublicLayout />,
                children: [
                    {
                        path: '/',
                        element: <MainHome />,
                    },
                    {
                        element: <AccountLayout />,
                        children: [
                            { path: '/signin', element: <SignInPage /> },
                            { path: '/signup', element: <SignUpPage /> },
                        ],
                    },
                    {
                        element: <SearchAccountLayout />,
                        children: [
                            { path: '/search_id', element: <SearchIdPage /> },
                            { path: '/search_pw', element: <SearchPasswordPage /> },
                        ],
                    },
                    {
                        path: `/${PAGE_ROUTE.HISTORY}`,
                        element: <HistoryPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.PROFESSOR}`,
                        element: <ProfessorPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.REGULATIONS}`,
                        element: <RegulationsPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.EXECUTIVES}`,
                        element: <ExecutivesPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.FORMER_EXECUTIVES}`,
                        element: <FormerExecutives />,
                    },
                ],
            },
            {
                element: <PrivateLayout />,
                children: [
                    {
                        path: `/${PAGE_ROUTE.PHOTOALBUMS}`,
                        element: <PhotoAlbumListPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.PHOTOALBUMS}/:boardId`,
                        element: <PhotoAlbumPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.PHOTOALBUMS}/modify/:boardId`,
                        element: <PhotoAlbumModifyPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.COMMUINTY}`,
                        element: <UnifiedBoardListPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.COMMUINTY}/:boardId`,
                        element: <UnifiedBoardPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.COMMUINTY}/post`,
                        element: <UnifiedBoardPostPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.COMMUINTY}/modify/:boardId`,
                        element: <UnifiedBoardModifyPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.EXAM}`,
                        element: <ExamBoardListPage />,
                    },
                    {
                        path: `${PAGE_ROUTE.EXAM}/:boardId`,
                        element: <ExamBoardPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.EXAM}/post`,
                        element: <ExamBoardPostPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.EXAM}/modify/:boardId`,
                        element: <ExamBoardModifyPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.NOTICE}`,
                        element: <NoticeBoardListPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.NOTICE}/:boardId`,
                        element: <NoticeBoardPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.NOTICE}/post`,
                        element: <NoticeBoardPostPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.NOTICE}/modify/:boardId`,
                        element: <NoticeBoardModifyPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.ABOUT_ME}`,
                        element: <AboutMeBoardListPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.ABOUT_ME}/:boardId`,
                        element: <AboutMeBoardPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.ABOUT_ME}/post`,
                        element: <AboutMeBoardPostPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.ABOUT_ME}/modify/:boardId`,
                        element: <AboutMeBoardModifyPage />,
                    },
                    {
                        element: <UserLayout />,
                        children: [
                            { path: '/user/:userId?', element: <UserActivityPage /> },
                            { path: '/user/:userId?/activity', element: <UserActivityPage /> },
                        ],
                    },
                    {
                        path: '/admin',
                        element: <AdminPage />,
                        children: [
                            { index: true, element: <MemberManagementPage /> },
                            { path: 'users', element: <MemberManagementPage /> },
                            { path: 'executives', element: <ExecutivesManagementPage /> },
                            { path: 'former_executives', element: <FormerExecutivesManagementPage /> },
                            { path: 'photo_album', element: <PhotoAlbumPostPage /> },
                        ],
                    },
                ],
            },
        ],
    },
]);

export const Routes: React.FC = () => {
    return <RouterProvider router={router} />;
};
