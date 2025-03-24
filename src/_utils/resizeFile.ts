// 파일을 리사이징하는 함수
import Resizer from 'react-image-file-resizer';

export const resizeFile = (file: File): Promise<File> =>
    new Promise(resolve => {
        Resizer.imageFileResizer(
            file,
            300,
            600,
            'WEBP',
            100,
            0,
            uri => {
                console.log('🚀 ~ newPromise ~ uri:', uri);
                resolve(uri as File);
            },
            'file',
        );
    });
