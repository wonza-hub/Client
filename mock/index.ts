import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import mockPhotoAlbum from "./api/photoAlbum";
import mockPhotoAlbumDetail from "./api/photoAlbumDetail";
import mockLife4Cut from "./api/life4Cut";
import mockHome from "./api/homeBanner";

// 목업 함수들을 모아놓은 객체
const setupMockFns = {
  mockPhotoAlbum,
  mockPhotoAlbumDetail,
  mockLife4Cut,
  mockHome,
};

const setupMock = (axios: AxiosInstance) => {
  const mock = new MockAdapter(axios);
  // 개발환경인 경우만 목업 활성화
  if (import.meta.env.DEV) {
    Object.values(setupMockFns).forEach((setupMockFn) => setupMockFn(mock));
    console.log(
      "Axios Mock Adapter가 활성화되어 axios 요청을 가로챌 준비가 되었습니다."
    );
  } else {
    mock.restore();
    console.log("Axios Mock Adapter가 비활성화 되었습니다.");
  }
};
export default setupMock;
