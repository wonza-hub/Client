import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

interface IProps {
    moveSlide: () => void;
    direction: string;
}
export default function SliderArrowBtn({ moveSlide, direction }: IProps) {
    return (
        <>
            <button onClick={moveSlide}>
                {direction === 'next' ? (
                    <IoIosArrowForward aria-label='다음 내용 보기' className='text-3xl text-secondary' />
                ) : (
                    <IoIosArrowBack aria-label='이전 내용 보기' className='text-3xl text-secondary' />
                )}
            </button>
        </>
    );
}
