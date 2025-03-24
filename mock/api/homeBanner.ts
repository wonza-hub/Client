// MOCKUP: 메인 페이지 최신 글 및 출석 순위 배너
import MockAdapter from "axios-mock-adapter";
import recentPostsData from "../json/recentPosts.json";
import attendanceData from "../json/attendanceData.json";

const mockHome = (mock: MockAdapter) => {
  // GET: 최신 글 조회
  mock.onGet("/api/post/recent-posts").reply(() => {
    // return [
    //   500,
    //   {
    //     response: {
    //       message: "네트워크 에러",
    //     },
    //   },
    // ];
    return [
      200,
      {
        response: {
          dtoList: recentPostsData["recent-posts"],
        },
      },
    ];
  });

  // GET: 출석 순위 조회
  mock.onGet("/api/attendance/statistics").reply(() => {
    // return [
    //   500,
    //   {
    //     response: {
    //       message: "네트워크 에러",
    //     },
    //   },
    // ];
    return [
      200,
      {
        response: attendanceData["attendance-statistics"],
      },
    ];
  });

  // POST: 출석 등록
  mock.onPost("/api/attendance").reply(() => {
    // return [
    //   409,
    //   {
    //     response: {
    //       message: "오늘은 이미 출석하셨습니다! 내일도 방문해주세요!",
    //     },
    //   },
    // ];

    return [
      200,
      {
        response: {
          message: "출석 완료!",
        },
      },
    ];
  });
};

export default mockHome;
