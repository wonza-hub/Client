import { FIXED_RESIZED_IMAGE_WIDTH } from '../_constants/constants';

interface WorkerMessage {
    id: string;
    file: File;
    compressFormat?: 'WEBP' | 'JPEG' | 'PNG';
    quality?: number;
}

self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
    const { id, file, compressFormat = 'WEBP', quality = 0.8 } = e.data;

    try {
        // 1. 이미지를 비트맵으로 로드
        const bitmap = await createImageBitmap(file);
        const { width, height } = bitmap;

        // 2. 리사이징 목표 크기 계산
        const targetWidth = FIXED_RESIZED_IMAGE_WIDTH;
        const targetHeight = Math.round((height / width) * FIXED_RESIZED_IMAGE_WIDTH);

        // 3. OffscreenCanvas 생성
        const canvas = new OffscreenCanvas(targetWidth, targetHeight);
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('OffscreenCanvas context creation failed');
        }

        // 4. 리사이징된 이미지 그리기
        ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);

        // 5. Blob으로 변환 (압축)
        const blob = await canvas.convertToBlob({
            type: compressFormat === 'WEBP' ? 'image/webp' : 'image/jpeg',
            quality,
        });

        // 6. File 객체 재생성
        // File 생성자는 최신 브라우저 및 Web Worker 환경에서 지원됨
        const resizedFile = new File([blob], file.name, {
            type: compressFormat === 'WEBP' ? 'image/webp' : 'image/jpeg',
            lastModified: Date.now(),
        });

        bitmap.close();

        self.postMessage({ id, success: true, file: resizedFile });
    } catch (error) {
        console.error('Worker image resize error:', error);
        self.postMessage({ id, success: false, error });
    }
};
