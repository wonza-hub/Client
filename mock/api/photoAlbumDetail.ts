import MockAdapter from "axios-mock-adapter";
import photoAlbumData from "../json/photoAlbum.json";

// MOCKUP: 사진게시판 상세
const mockPhotoAlbumDetail = (mock: MockAdapter) => {
  // POST: 좋아요
  mock.onPost("/api/post/like").reply(() => {
    // 상태 업데이트 로직 (가정)
    const updatedPost = {
      ...photoAlbumData["photo-album-item"],
      memberLiked: true,
    };
    console.log("요청");
    return [
      200,
      {
        message: "Like added successfully",
        post: updatedPost,
      },
    ];
  });

  // POST: 좋아요 취소
  mock.onPost("/api/post/cancel-like").reply(() => {
    console.log("좋취");
    // 상태 업데이트 로직 (가정)
    // const updatedPost = {
    //   ...photoAlbumData["photo-album-item"],
    //   memberLiked: false,
    // };

    // return [
    //   200,
    //   {
    //     message: "Like cancelled successfully",
    //     post: updatedPost,
    //   },
    // ];
    return [
      401,
      {
        message: "Like cancelled failed",
      },
    ];
  });

  // POST: 댓글
  mock.onPost(new RegExp("/api/comment/\\d+")).reply((config) => {
    console.log("댓글 작성 요청");

    // 요청 본문에서 댓글 내용 추출
    const { content } = JSON.parse(config.data);

    // 댓글 유효성 검사 예시 (예: 빈 댓글 방지)
    if (!content || content.trim() === "") {
      return [
        400,
        {
          message: "댓글 내용이 비어 있습니다.",
        },
      ];
    }

    // 댓글 작성
    const boardId = config.url.match(/\/api\/comment\/(\d+)/)?.[1];
    if (!boardId) {
      return [
        404,
        {
          message: "게시판 ID가 유효하지 않습니다.",
        },
      ];
    }

    // 성공 응답 객체
    const newComment = {
      commentId: Math.floor(Math.random() * 1000),
      username: "익명 사용자",
      content,
      createdTime: new Date()
        .toISOString()
        .split(/[-:T.]/)
        .slice(0, 6),
      modifiedTime: null,
      memberWritten: true,
      memberAuthority: "MEMBER",
    };

    return [
      200,
      {
        message: "댓글이 성공적으로 작성되었습니다.",
        comment: newComment,
      },
    ];
  });

  // POST: 댓글 수정
  mock.onPost(new RegExp("/api/comment/modify/\\d+")).reply((config) => {
    console.log("댓글 수정");
    const commentId = config.url?.split("/").pop(); // URL에서 commentId 추출
    const { content } = JSON.parse(config.data); // 수정된 댓글 내용 추출

    if (!commentId || !content) {
      return [
        400, // 잘못된 요청
        {
          message: "Invalid request: commentId or content is missing",
        },
      ];
    }

    const existingComment = photoAlbumData[
      "photo-album-item"
    ].commentDtoList.find(
      (comment) => comment.commentId === parseInt(commentId, 10)
    );

    if (!existingComment) {
      return [
        404, // 해당 댓글 없음
        {
          message: "Comment not found",
        },
      ];
    }

    // 수정된 댓글 객체 생성
    const updatedComment = {
      ...existingComment,
      content: content,
      modifiedTime: new Date().toISOString().split(/[-T:.]/), // 수정된 시간 업데이트
    };

    // 댓글 업데이트
    photoAlbumData["photo-album-item"].commentDtoList = photoAlbumData[
      "photo-album-item"
    ].commentDtoList.map((comment) =>
      comment.commentId === parseInt(commentId, 10) ? updatedComment : comment
    );

    return [
      200,
      {
        message: "Comment updated successfully",
        comment: updatedComment,
      },
    ];
  });

  // GET: 사진 경로
  mock.onGet("/api/file").reply((config) => {
    // return [
    //   500,
    //   {
    //     response: {
    //       message: "네트워크 에러",
    //     },
    //   },
    // ];
    const { fileId } = config.params;

    // fileId가 없는 경우 400 에러 반환
    if (!fileId) {
      return [400, { error: "Missing fileId" }];
    }

    // fileId에 따른 더미 파일 내용 (예: 간단한 텍스트 데이터)
    const dummyFileContent = `Dummy file content for fileId: ${fileId}`;
    // Blob 객체 생성 (실제 이미지 파일이면 해당 binary 데이터를 사용)
    const dummyBlob = new Blob([dummyFileContent], {
      type: "application/octet-stream",
    });

    return [200, dummyBlob];
  });
};
export default mockPhotoAlbumDetail;
