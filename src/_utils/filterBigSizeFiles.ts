import { UPLOAD_FILE_SIZE_MAX_LIMIT } from '../_constants/constants';

export const uploadSizeLimit = UPLOAD_FILE_SIZE_MAX_LIMIT * 1024 * 1024;

export const filterBigSizeFiles = (files: FileList) => {
    return Array.from(files).filter(fileItem => {
        if (fileItem.size >= uploadSizeLimit) {
            alert(`크기가 ${UPLOAD_FILE_SIZE_MAX_LIMIT}MB 이상인 파일의 경우 업로드가 제한됩니다.`);
        }

        return fileItem.size < uploadSizeLimit;
    });
};
