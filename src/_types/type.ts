// 서버 공통 에러 응답 객체
export interface IServerErrorResponse {
    error: {
        message: string;
        status: string;
    };
}
