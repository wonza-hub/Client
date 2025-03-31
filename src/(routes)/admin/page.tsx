// PAGE: 관리자 페이지
import NavigationBar from './_components/NavigationBar';
import { Outlet } from 'react-router-dom';

export default function Page() {
    return (
        <div className='flex min-h-screen'>
            <NavigationBar />
            <div className='w-full pl-[14rem] pt-20'>
                <div className='MainView flex h-full w-full flex-col px-9 py-6'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
