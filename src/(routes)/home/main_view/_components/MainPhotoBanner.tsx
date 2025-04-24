// COMPONENT: 메인 사진 슬라이딩 배너
import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import Dot from '../../_components/Dot';
import { IMainPhotoBannerItem } from '../../type';
import useInterval from '../../../../_hooks/useInterval';

// 배너 사진 요소
const sliderItems: IMainPhotoBannerItem[] = [
    {
        src: '_assets/images/main-promotion-1_900.webp',
        sizes: '(max-width: 2250px) 40vw, 900px',
        srcset: `_assets/images/main-promotion-1_397.webp 397w, 
                _assets/images/main-promotion-1_667.webp 667w, 
                _assets/images/main-promotion-1_900.webp 900w`,
        link: null,
    },
];

export default memo(function MainPhotoBanner() {
    const [slideIdx, setSlideIdx] = useState(1);

    // 닷 클릭시 해당 슬라이드 이동
    const handleDotClick = (idx: number) => {
        setSlideIdx(idx + 1);
    };

    useInterval(() => {
        setSlideIdx(prevIdx => (prevIdx % sliderItems?.length) + 1);
    }, 4000);

    return (
        <>
            {/* 배너 이미지 표시 */}
            {sliderItems.map((item, idx) => {
                return (
                    <div
                        key={idx}
                        className={`
                            SlideImg absolute left-0 top-0 h-full max-h-[36rem]
                            w-full overflow-hidden rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] brightness-95 ${
                                slideIdx === idx + 1 ? 'animate-fadein opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            sizes={item.sizes}
                            srcSet={item.srcset}
                            className='MainImage h-full w-full select-none object-cover'
                            src={item.src}
                            alt='mainViewImg'
                        />
                    </div>
                );
            })}
            {/* 배너에 걸린 링크 */}
            {sliderItems.map((item, idx) => {
                return slideIdx === idx + 1 ? (
                    <Link key={idx} to={item.link} className={`absolute h-full w-full`} />
                ) : null;
            })}
            {/* 인덱스 Dot */}
            <div className='absolute bottom-2 left-1/2 mb-1 flex -translate-x-1/2 flex-row'>
                {Array.from({ length: sliderItems.length })?.map((_, idx) => (
                    <Dot
                        key={idx}
                        isActive={slideIdx === idx + 1 ? true : false}
                        shape={'pill'}
                        idx={idx}
                        setSlideIdx={handleDotClick}
                    />
                ))}
            </div>
        </>
    );
});
