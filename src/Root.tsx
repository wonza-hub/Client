import { Routes } from './router.tsx';
import useCheckUser from './_hooks/useCheckUser.ts';

export default function Root() {
    useCheckUser();

    return <Routes />;
}
