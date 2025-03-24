// COMPONENT: 회원가입 요청 목록
import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import { FaHandshakeSimple, FaHandshakeSimpleSlash } from 'react-icons/fa6';
import { TABLE_COL_NAME, WINDOW_ALERT_MESSAGE } from '../../../../_constants/constants';
import useGetSignupRequests from '../../_lib/getSignupRequests';
import useApproveSignupRequest from '../../_lib/postSignupRequest';
import useRejectSignupRequest from '../../_lib/deleteSignupRequest';

export default function SignupReqList() {
    const columns = useMemo(() => TABLE_COL_NAME.signup, []);

    // GET: 회원가입요청 조회
    const {
        data: fetchedSignupReqs = [],
        isError: isLoadingSignupReqsError,
        isFetching: isFetchingSignupReqs,
        isLoading: isLoadingSignupReqs,
    } = useGetSignupRequests();
    // POST: 회원가입요청 승인
    const { mutateAsync: approveReq, isPending: isApprovingReq } = useApproveSignupRequest();
    // POST: 회원가입요청 거절
    const { mutateAsync: rejectReq, isPending: isDeletingReq } = useRejectSignupRequest();

    // HANDLER: 회원가입 요청 승인 핸들러
    const handleReqApprove = async ({ original }) => {
        if (window.confirm(WINDOW_ALERT_MESSAGE.signupApproval(original))) {
            approveReq({ signupReq: original });
        }
    };
    // HANDLER: 회원가입 요청 거절 핸들러
    const handleReqReject = ({ original }) => {
        if (window.confirm(WINDOW_ALERT_MESSAGE.signupReject(original))) {
            rejectReq({ signupReq: original });
        }
    };

    // 테이블 속성 정의
    const table = useMaterialReactTable({
        columns,
        data: fetchedSignupReqs,
        // getRowId: row => row.id,
        initialState: { density: 'compact' },
        enableEditing: true,
        enableFilters: false,
        enableHiding: false,
        positionActionsColumn: 'last', // 버튼 위치
        muiToolbarAlertBannerProps: isLoadingSignupReqsError
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
        renderRowActions: ({ row }) => (
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Tooltip title='승인'>
                    <IconButton color='success' onClick={() => handleReqApprove(row)}>
                        <FaHandshakeSimple />
                    </IconButton>
                </Tooltip>
                <Tooltip title='거절'>
                    <IconButton color='error' onClick={() => handleReqReject(row)}>
                        <FaHandshakeSimpleSlash />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        state: {
            isLoading: isLoadingSignupReqs,
            isSaving: isApprovingReq || isDeletingReq,
            showAlertBanner: isLoadingSignupReqsError,
            showProgressBars: isFetchingSignupReqs,
        },
    });

    return <MaterialReactTable table={table} />;
}
