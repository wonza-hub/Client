import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGetDownloadedFile = (fileId: number) => {
    const downloadedFilePathURL = '/api/file';

    return useQuery<string>({
        queryKey: ['downloadedFile'],
        queryFn: async () =>
            await axios
                .get(downloadedFilePathURL, {
                    params: { fileId },
                    responseType: 'blob',
                })
                .then(res => res.data)
                .catch(() => window.alert('사진 저장에 실패하였습니다.')),
        enabled: false,
    });
};

export default useGetDownloadedFile;
