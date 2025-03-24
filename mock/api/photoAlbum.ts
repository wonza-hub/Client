import MockAdapter from "axios-mock-adapter";
import photoAlbumData from "../json/photoAlbum.json";

// MOCKUP: 사진게시판
const mockPhotoAlbum = (mock: MockAdapter) => {
  // GET: 전체 목록 조회
  mock.onGet("/api/photo-post").networkError(); // 네트워크 에러
  mock.onGet("/api/photo-post").reply((config) => {
    const { page } = config.params;
    const PAGE_SIZE = 10;

    const startIdx = (page - 1) * PAGE_SIZE;
    const endIdx = page * PAGE_SIZE;
    const paginatedItems = photoAlbumData["photo-album"].slice(
      startIdx,
      endIdx
    );

    // return [
    //   500,
    //   {
    //     response: {
    //       message: "서버에러",
    //     },
    //   },
    // ];

    return [
      200,
      {
        response: {
          dtoList: paginatedItems,
        },
      },
    ];
  });

  // GET: 상세 조회
  mock.onGet(/\/api\/photo-post\/\d+/).reply(() => {
    const photoAlbumItem = photoAlbumData["photo-album-item"];

    return [
      200,
      {
        response: photoAlbumItem,
      },
    ];
  });

  // POST: 게시물 등록
  mock.onPost("/api/photo-post/post").reply((config) => {
    // FormData인지 확인 후 출력
    if (config.data instanceof FormData) {
      console.log("🚀 FormData 내용:");
      config.data.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
    } else {
      console.log("🚀 config.data:", config.data);
    }

    // return [
    //   500,
    //   {
    //     response: {
    //       message: "서버에러",
    //     },
    //   },
    // ];

    const response = {
      status: "success",
      message: "사진 앨범이 성공적으로 등록되었습니다.",
      albumId: 12345,
    };
    return [200, { response }];
  });

  // DELETE: 게시물 삭제
  mock.onDelete("/api/post/delete").reply((config) => {
    const { postId } = config.params;

    // 400: postId가 없는 경우
    if (!postId) {
      return [400, { error: "Missing postId" }];
    }

    // return [
    //   500,
    //   {
    //     response: {
    //       message: "서버에러",
    //     },
    //   },
    // ];

    // postId가 있을 경우 삭제 성공 응답 (상황에 따라 추가 로직 가능)
    return [200, { success: true, deletedPostId: postId }];
  });

  // POST: 게시물 수정
  mock.onPost("/api/photo-post/modify").reply(() => {
    const response = {
      status: "success",
      message: "사진 앨범이 성공적으로 등록되었습니다.",
      albumId: 12345,
    };

    return [200, { response }];
  });
};
export default mockPhotoAlbum;
