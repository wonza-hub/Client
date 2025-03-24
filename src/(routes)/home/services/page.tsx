// 메인페이지에서 바로가기를 제공하는 서비스를 보여주는 부분
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PAGE_ROUTE } from '../../../_constants/constants';

export default function Page() {
    class Service {
        constructor(
            public readonly imgSrc: string,
            public readonly mainTitle: string,
            public readonly link: string,
        ) {}
    }

    const services = [
        new Service('_assets/images/community_board.jpg', '통합 게시판', PAGE_ROUTE.COMMUINTY),
        new Service('_assets/images/photo-albums_board.jpg', '사진 게시판', PAGE_ROUTE.PHOTOALBUMS),
        new Service('_assets/images/exam_board.jpg', '자료 게시판', PAGE_ROUTE.EXAM),
    ];

    const { ref: observeCardRef, inView } = useInView();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (inView) {
            setIsVisible(true);
        }
    }, [inView]);

    return (
        <>
            <div className='text-center text-[2.5rem] font-semibold text-gray-700'>서비스</div>
            <div className='ServiceContent mx-auto grid h-fit max-w-7xl select-none grid-cols-1 grid-rows-1 gap-x-10 gap-y-10 py-20 md:grid-cols-2 xl:grid-cols-3'>
                {services.map((service, idx) => (
                    <Link to={`${service.link}`} key={idx} aria-label={`${service.mainTitle} 바로가기`}>
                        <div
                            className={`${isVisible ? 'xl:animate-swapdown' : 'xl:opacity-0'} 
                            relative flex h-full w-full flex-col overflow-hidden rounded-lg bg-white shadow-lg  
                            duration-300 hover:shadow-xl hover:ease-in-out`}
                            ref={observeCardRef}
                        >
                            <div className='h-full w-full overflow-hidden duration-300 ease-in-out hover:scale-110 hover:duration-300'>
                                <img
                                    className='h-full w-full object-cover brightness-90'
                                    src={service.imgSrc}
                                    alt={`${service.mainTitle} 바로가기 이미지`}
                                />
                            </div>
                            <div className='absolute bottom-0 right-0 w-fit rounded-tl-lg bg-black bg-opacity-70 px-4 pb-1 pt-2 text-gray-100'>
                                <div className='mainTitle mb-2'>
                                    <span className='text-xl'>{service.mainTitle}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
