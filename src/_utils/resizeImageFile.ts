// 이미지 파일을 리사이징하는 함수
import Resizer from 'react-image-file-resizer';

interface IResizeFileProps {
    file: File;
    targetWidth: number;
    targetHeight: number;
    compressFormat: 'JPEG' | 'PNG' | 'WEBP';
    quality?: number; // 압축 품질 (0~100)
}

export default function resizeImageFile({
    file,
    targetWidth,
    targetHeight,
    compressFormat,
    quality,
}: IResizeFileProps): Promise<File> {
    return new Promise(resolve => {
        Resizer.imageFileResizer(
            file,
            targetWidth,
            targetHeight,
            compressFormat,
            quality,
            0,
            uri => {
                console.log('🚀 ~ newPromise ~ uri:', uri);
                resolve(uri as File);
            },
            'file',
        );
    });
}
