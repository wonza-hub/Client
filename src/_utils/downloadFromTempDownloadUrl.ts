// UTIL: 임시 url을 생성하고 클릭하게 하여 다운로드
export default function downloadFromTempDownloadUrl(data: string, fileName: string) {
    const fileBlob = new Blob([data], {
        type: 'application/octet-stream',
    });
    const tempFileURL = URL.createObjectURL(fileBlob);
    const $aElement = document.createElement('a');

    $aElement.download = fileName;
    $aElement.href = tempFileURL;
    $aElement.hidden = true;

    $aElement.click();
    $aElement.remove();

    URL.revokeObjectURL(tempFileURL);
}
