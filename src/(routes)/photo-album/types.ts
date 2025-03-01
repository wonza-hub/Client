export interface IBasePhotoAlbumInfo {
    id: number;
    title: string;
    viewCount: number;
    likeCount: number;
}

export interface IPhotoAlbumMetaData extends IBasePhotoAlbumInfo {
    saveFileName: string;
    saveFilePath: string;
}

export interface IPhotoPostDto extends IBasePhotoAlbumInfo {
    bodyContent: string;
    username: string;
    createdTime: number[];
    modifiedTime: number[];
    memberWritten: boolean;
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
    title: string;
    bodyContent: string;
}
