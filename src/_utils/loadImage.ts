// 파일을 HTMLImageElement로 로드해서 가로세로  함수
export default function loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve(img);
        };
        img.onerror = err => {
            URL.revokeObjectURL(url);
            reject(new Error(`${err}: 이미지 로드 실패`));
        };
        img.src = url;
    });
}
