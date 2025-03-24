import { useSuspenseQuery } from '@tanstack/react-query';
import { IAttendanceRanks } from '../type';
import axios from 'axios';

// GET: 출석 순위 조회
export const useGetAttendanceRanks = () => {
    const attendanceURL = `/api/attendance/statistics`;

    return useSuspenseQuery<IAttendanceRanks>({
        queryKey: ['attendance-statistics'],
        queryFn: async () => await axios.get(attendanceURL).then(res => res.data.response),

        retry: 0,
    });
};
