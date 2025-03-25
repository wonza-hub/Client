import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Modal from 'react-modal';
import Root from './Root.tsx';
import axios from 'axios';
import './index.css';

// MOCKUP: 개발 중에만 목업 함수 초기화
// 기존
// import setupMock from '../mock/index';
// if (import.meta.env.DEV) {
//     setupMock(axios);
// }

// 수정 후
if (import.meta.env.DEV) {
    import('../mock/index').then(setupMock => {
        setupMock.default(axios);
    });
}

Modal.setAppElement('#root');

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export default function App() {
    axios.defaults.withCredentials = true;
    return (
        <QueryClientProvider client={queryClient}>
            <Root />
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}
