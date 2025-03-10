// COMPONENT: 회원 목록
import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable, type MRT_Row } from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import { RiPencilFill } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';
import { TABLE_COL_NAME, WINDOW_ALERT_MESSAGE } from '../../../../_constants/constants';
import { IEditProps, IMember } from '../../type';
import useGetMembers from '../../_lib/getMembers';
import useUpdateMember from '../../_lib/putMember';
import useDeleteMember from '../../_lib/deleteMember';

export default function MemberList() {
    const columns = useMemo(() => TABLE_COL_NAME.member, []);

    // GET: 회원 계정 목록 조회
    const {
        data: fetchedUsers = [],
        isError: isLoadingUsersError,
        isFetching: isFetchingUsers,
        isLoading: isLoadingUsers,
    } = useGetMembers();
    // POST: 회원 정보 수정
    const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateMember();
    // DELETE: 회원 계정 삭제
    const { mutateAsync: deleteUser, isPending: isDeletingUser } = useDeleteMember();

    // HANDLER: 권한 수정 핸들러
    const handleMemberEditSave = async ({ row, values }: IEditProps) => {
        if (confirm(WINDOW_ALERT_MESSAGE.authorityChange(row, values))) {
            const updatedMemberId = row.original.id;
            await updateUser({ updatedMemberId, updatedValues: values });
            table.setEditingRow(null);
        }
    };

    // 로그인 정보 로컬 스토리지 삭제
    const removeIsLoggedIn = () => {
        localStorage.removeItem('isLoggedIn');
    };
    // 회원 탈퇴 재확인
    const showReconfirm = (inputValue: string, deleteRow: MRT_Row<IMember>) => {
        if (inputValue === deleteRow.original.name) {
            removeIsLoggedIn();
            deleteUser(deleteRow.original);
        } else {
            window.alert('회원 탈퇴에 실패했습니다.');
        }
    };
    // HANDLER: 회원 탈퇴
    const handleMemberDelete = (row: MRT_Row<IMember>) => {
        if (window.confirm(WINDOW_ALERT_MESSAGE.memberDeletion(row))) {
            const inputValue = window.prompt(
                `탈퇴를 확정하기 위해, 아래 입력칸에 '${row.original.name}'을(를) 입력하세요.`,
                '',
            );
            showReconfirm(inputValue, row);
        }
    };

    // 회원목록 테이블 정의
    const table = useMaterialReactTable({
        columns,
        data: fetchedUsers,
        editDisplayMode: 'row',
        enableEditing: true,
        // getRowId: row => row.id,
        // onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleMemberEditSave,
        initialState: { density: 'compact' },
        // enableHiding: false,
        positionActionsColumn: 'last',
        muiToolbarAlertBannerProps: isLoadingUsersError
            ? {
                  color: 'error',
                  children: 'Error loading data',
              }
            : undefined,
        muiTableContainerProps: {
            sx: {
                minHeight: '400px',
            },
        },
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Tooltip title='수정'>
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <RiPencilFill />
                    </IconButton>
                </Tooltip>
                <Tooltip title='탈퇴'>
                    <IconButton color='error' onClick={() => handleMemberDelete(row)}>
                        <MdDelete />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        state: {
            isLoading: isLoadingUsers,
            isSaving: isUpdatingUser || isDeletingUser,
            showAlertBanner: isLoadingUsersError,
            showProgressBars: isFetchingUsers,
        },
    });

    return <MaterialReactTable table={table} />;
}
