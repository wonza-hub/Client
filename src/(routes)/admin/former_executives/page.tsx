import ExecutivesTable from '../_components/ExecutivesTable.tsx';

export default function Page() {
    return (
        <>
            <h1 className={'text-lg font-bold'}>전 임원 관리</h1>
            <ExecutivesTable />
        </>
    );
}
