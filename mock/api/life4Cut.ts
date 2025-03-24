// MOCKUP: 인생네컷
import MockAdapter from "axios-mock-adapter";
import life4CutData from "../json/life4Cut.json";

// // FormData를 일반 객체로 변환하는 유틸리티 함수
// function formDataToObject(formData) {
//   const obj = {};
//   formData.forEach((value, key) => {
//     obj[key] = value;
//   });
//   return obj;
// }
const mockLife4Cut = (mock: MockAdapter) => {
  // GET: 인생네컷 다건 조회
  mock.onGet("/api/life4cut").reply((config) => {
    const { size } = config.params;
    const life4CutImages = life4CutData["life-4-cut"].slice(0, size);
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
          dtoList: life4CutImages,
        },
      },
    ];
  });

  // // POST: 인생네컷 단건 등록
  // mock.onPost("/api/life4cut/save").reply((config) => {
  //   let formDataObject = {};

  //   formDataObject = formDataToObject(config.data);

  //   console.log("🚀 ~ mock.onPost ~ formDataObject:", formDataObject);

  //   // 요청 데이터에 simulateError 필드가 있다면 에러 응답을 시뮬레이션
  //   // simulateError 값에 따라 반환할 에러 상태와 메시지가 달라집니다.
  //   const errorType = formDataObject.simulateError;

  //   if (errorType) {
  //     let status;
  //     let message;

  //     if (errorType === "server") {
  //       // 서버 에러를 시뮬레이션 (에러 응답 객체에 message 필드가 최상위에 위치)
  //       status = 400; // 예시로 400 상태 코드를 사용
  //       message = "서버 에러 발생";
  //     } else if (errorType === "403") {
  //       status = 403;
  //       message = "권한이 없는 사용자입니다.";
  //     } else if (errorType === "401") {
  //       status = 401;
  //       message = "사진은 로그인 후 올릴 수 있습니다!";
  //     } else if (errorType === "404") {
  //       status = 404;
  //       message = "사진 등록에 실패하였습니다.";
  //     } else if (errorType === "500") {
  //       status = 500;
  //       message = "사진 등록에 실패하였습니다. 관리자에게 문의해주세요.";
  //     } else {
  //       // 그 외의 에러는 기본적으로 400 상태 코드로 처리
  //       status = 400;
  //       message = "알 수 없는 에러가 발생했습니다.";
  //     }

  //     // 클라이언트의 onError 핸들러에서 e.response.data.message를 사용하므로,
  //     // 에러 객체는 { message } 형태로 반환합니다.
  //     return [status, { message }];
  //   }

  //   // 에러 시뮬레이션이 없으면 성공 응답
  //   return [
  //     200,
  //     {
  //       status: "OK",
  //       message: "사진 등록 성공",
  //       data: formDataObject,
  //     },
  //   ];
  // });
};
export default mockLife4Cut;
