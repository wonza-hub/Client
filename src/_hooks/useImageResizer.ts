import { useEffect, useRef, useCallback } from 'react';
import { nanoid } from 'nanoid';

interface WorkerResponse {
    id: string;
    success: boolean;
    file?: File;
    error?: Error;
}

interface ResizeOptions {
    file: File;
    compressFormat?: 'WEBP' | 'JPEG' | 'PNG';
    quality?: number;
}

export default function useImageResizer() {
    const workerRef = useRef<Worker | null>(null);
    const pendingPromises = useRef<Map<string, { resolve: (file: File) => void; reject: (err: Error) => void }>>(
        new Map(),
    );

    useEffect(() => {
        // Web Worker 인스턴스 생성
        // Vite는 import.meta.url을 사용하여 워커 파일을 모듈로 로드하는 것을 지원합니다.
        try {
            workerRef.current = new Worker(new URL('../_workers/imageResizer.worker.ts', import.meta.url), {
                type: 'module',
            });

            // 메시지 수신 핸들러
            workerRef.current.onmessage = (event: MessageEvent<WorkerResponse>) => {
                const { id, success, file, error } = event.data;
                const resolver = pendingPromises.current.get(id);

                if (resolver) {
                    if (success && file) {
                        resolver.resolve(file);
                    } else {
                        resolver.reject(error || new Error('Image resizing failed in worker'));
                    }
                    pendingPromises.current.delete(id);
                }
            };

            workerRef.current.onerror = error => {
                console.error('Worker error:', error);
            };
        } catch (error) {
            console.error('Failed to initialize image resizer worker:', error);
        }

        return () => {
            // 컴포넌트 언마운트 시 워커 종료
            workerRef.current?.terminate();
            workerRef.current = null;
            pendingPromises.current.clear();
        };
    }, []);

    const resizeImage = useCallback(
        ({ file, compressFormat = 'WEBP', quality = 0.8 }: ResizeOptions): Promise<File> => {
            return new Promise((resolve, reject) => {
                if (!workerRef.current) {
                    // 워커 초기화 실패 시 또는 지원하지 않는 환경 처리 (선택사항: 메인스레드 폴백 로직 추가 가능)
                    reject(new Error('Image resizer worker is not ready'));
                    return;
                }

                const id = nanoid();
                pendingPromises.current.set(id, { resolve, reject });

                workerRef.current.postMessage({
                    id,
                    file,
                    compressFormat,
                    quality,
                });
            });
        },
        [],
    );

    return { resizeImage };
}
