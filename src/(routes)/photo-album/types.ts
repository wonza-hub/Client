// 사진 게시판 공통 데이터
export interface IBasePhotoAlbumInfo {
    id: number;
    title: string;
    viewCount: number;
    likeCount: number;
}
// 썸네일 메타데이터
export interface IPhotoAlbumMetaData extends IBasePhotoAlbumInfo {
    saveFileName: string;
    saveFilePath: string;
}
// 상세 메타데이터
export interface IPhotoPostDto extends IBasePhotoAlbumInfo {
    bodyContent: string;
    username: string;
    createdTime: number[];
    modifiedTime: number[];
    memberWritten: boolean;
}

export interface IPhotoAlbumData {
    photoPostDto: IPhotoPostDto;
    fileDtoList: IPhotoAlbumFileDto[];
    commentDtoList: ICommentDto[];
    memberLiked: boolean;
}

export interface IPhotoAlbumFileDto {
    id: number;
    originalFileName: string;
    saveFileName: string;
    saveFilePath: string;
}
export interface IExistingFileDto extends IPhotoAlbumFileDto {}

export interface IUploadedFileDto {
    id: string;
    file: File;
}

export interface ICommentDto {
    commentId: number;
    username: string;
    content: string;
    createdTime: number[];
    modifiedTime: number[];
    memberWritten: boolean;
    memberAuthority: string;
}

export interface INewCommentValues {
    comment: string;
}

export interface INewPhotoAlbumFormData {
    files: IUploadedFileDto[];
    title: string;
    bodyContent: string;
}

export interface IModifiedPhotoAlbumFormData {
    files: (IExistingFileDto | IUploadedFileDto)[];
    existingFileIds: number[];
    id: number;
    title: string;
    bodyContent: string;
}
