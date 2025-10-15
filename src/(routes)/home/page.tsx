import MainView from './main_view/page';
import PhotoZone from './photo_zone/page';
import Services from './services/page';
import Footer from './footer/page';

export default function Page() {
    return (
        <>
            {/* 메인뷰 */}
            <section>
                <MainView />
            </section>
            {/* 포토존 */}
            <section className='mb-32'>
                <PhotoZone />
            </section>
            {/* 서비스 */}
            <section className='px-14 md:px-20 xl:px-24'>
                <Services />
            </section>
            {/* 푸터 */}
            <section>
                <Footer />
            </section>
        </>
    );
}
