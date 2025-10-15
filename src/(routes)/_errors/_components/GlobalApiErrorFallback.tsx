import { AxiosError } from 'axios';
import UnauthorizedErrorPage from './UnauthorizedErrorPage';
import ForbiddenErrorPage from './ForbiddenErrorPage';
import NotFoundErrorPage from './NotFoundErrorPage';
import ServerErrorPage from './ServerErrorPage';
import NetworkErrorPage from './NetworkErrorPage';

// @ts-ignore
export default function GlobalApiErrorFallback({ error, resetErrorBoundary }) {
    const err = error as AxiosError;
    const errorStatusCode = err?.response?.status;
    if (error.message === 'Network Error') {
        return <NetworkErrorPage retry={resetErrorBoundary} />;
    }

    switch (errorStatusCode) {
        case 401:
            return <UnauthorizedErrorPage />;

        case 403:
            return <ForbiddenErrorPage />;

        case 404:
            return <NotFoundErrorPage />;

        case 500:
        case 504:
            return <ServerErrorPage retry={resetErrorBoundary} />;

        default:
            return null;
    }
}
