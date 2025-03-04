// COMPONENT: 사진 다운로드 버튼
import { FiDownload } from 'react-icons/fi';
import { CircleActivationButton as Button } from '../../../../_components/button/CircleActivationButton';
import { StringExtractor } from '../../../../_utils/StringExtractor';
import { IExistingFileDto } from '../../types';
import useGetDownloadedFile from '../../_lib/getDownloadedFile';
import downloadFromTempDownloadUrl from '../../../../_utils/downloadFromTempDownloadUrl';

export default function DownloadBtn({ selectedPhoto }: { selectedPhoto: IExistingFileDto }) {
    const { refetch } = useGetDownloadedFile(selectedPhoto?.id);

    // HANDLER: 사진 다운로드 버튼 핸들러
    const handleDownloadBtnClick = async () => {
        const { data: rawData } = await refetch();
        const fileName = StringExtractor.extractFileName(selectedPhoto.originalFileName);

        if (rawData) {
            downloadFromTempDownloadUrl(rawData, fileName);
        }
    };

    return <Button onClick={() => handleDownloadBtnClick()} content={<FiDownload className='text-3xl' />} />;
}
