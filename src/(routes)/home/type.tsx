export interface INewPost {
    id: number;
    postCategory: string;
    title: string;
    createdTime: number[];
}

export interface IWeeklyAttendanceRank {
    memberName: string;
    point: number;
}
export interface IMonthlyAttendanceRank {
    memberName: string;
    point: number;
}
export interface IAttendanceRanks {
    weeklyStatisticsDtoList: IWeeklyAttendanceRank[];
    monthlyStatisticsDtoList: IMonthlyAttendanceRank[];
}

export interface IMainPhotoBannerItem {
    sizes: string;
    srcset: string;
    src: string;
    link: string;
}
export interface ILinkBannerItem {
    title: string;
    src: string;
    link: string;
}

export interface ISlidingPhoto {
    saveFilePath: string;
    saveFileName: string;
}
