// PAGE: 사진게시판 게시물 상세
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SelectedPhoto from './_components/SelectedPhoto';
import UnselectedPhotos from './_components/UnselectedPhotos';
import PhotoAlbumMetadata from './_components/PhotoAlbumMetadata';
import CommentPostForm from './_components/CommentPostForm';
import DownloadBtn from './_components/DownloadBtn';
import ModifyBtn from './_components/ModifyBtn';
import DeleteAlbumPostBtn from './_components/DeleteAlbumPostBtn';
import LikeBtn from './_components/LikeBtn';
import MetadataBtn from './_components/MetadataBtn';
import { IPhotoAlbumFileDto } from '../types';
import useGetPhotoAlbumDetail from '../_lib/getPhotoAlbumDetail';

export default function Page() {
    // 선택된 사진의 url
    const [selectedPhoto, setSelectedPhoto] = useState<IPhotoAlbumFileDto>(null);
    const [photos, setPhotos] = useState<IPhotoAlbumFileDto[]>([]);
    // 메타데이터(댓글 정보 포함) 표시 여부
    const [isMetadataVisible, setIsMetadataVisible] = useState(false);

    const { boardId } = useParams<{ boardId: string }>();
    const { data: albumData, isLoading: isAlbumLoading, status } = useGetPhotoAlbumDetail(boardId);

    // 요청 성공시 사진 배열 첫번째 요소를 선택된 사진(현재 보고 있는 사진)으로 지정
    useEffect(() => {
        if (status === 'success') {
            setPhotos(albumData.fileDtoList);
            setSelectedPhoto(albumData.fileDtoList[0]);
        }
    }, [status, albumData]);

    return (
        <div className='AlbumWrapper max-w-screen h-[calc(100vh-4.68rem)]'>
            <article className='MainView flex h-full flex-row justify-between'>
                <aside className='LeftMainView w-1/4 min-w-[12rem]'>{/* 사이드바 */}</aside>
                {/* 선택된 사진 및 댓글창 */}
                <section className='CenterMainView w-2/4 min-w-[50rem] overflow-y-auto pl-10'>
                    <div className='flex flex-row'>
                        <div className='relative m-auto flex w-[38rem] flex-col items-center'>
                            <div
                                className={`SelectedPhotoContainer mt-4 ${selectedPhoto ? 'h-max w-fit' : 'h-[28rem] w-full'} ${
                                    isMetadataVisible ? 'rounded-t-2xl' : 'rounded-2xl'
                                } overflow-hidden shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]`}
                            >
                                <SelectedPhoto selectedPhoto={selectedPhoto} />
                            </div>
                            {isAlbumLoading ? null : (
                                <>
                                    <div className='flex h-fit w-full flex-col bg-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]'>
                                        <PhotoAlbumMetadata
                                            isMetadataVisible={isMetadataVisible}
                                            postMetaData={albumData.photoPostDto}
                                            comments={albumData.commentDtoList}
                                        />
                                    </div>
                                    <CommentPostForm isMetadataVisible={isMetadataVisible} />
                                </>
                            )}
                        </div>
                        <div className='ActionBtnBanner w-[5rem]'>
                            {isAlbumLoading ? null : (
                                <div className='flex-start mt-8 flex h-full flex-col items-center gap-3 pr-3'>
                                    <DownloadBtn selectedPhoto={selectedPhoto} />
                                    <MetadataBtn setIsMetadataVisible={setIsMetadataVisible} />
                                    <LikeBtn
                                        isMemberLiked={albumData.memberLiked}
                                        likeCount={albumData.photoPostDto.likeCount}
                                    />
                                    {/* 권한자에게만 보이는 버튼 */}
                                    {albumData.photoPostDto.memberWritten ? (
                                        <>
                                            <ModifyBtn />
                                            <DeleteAlbumPostBtn />
                                        </>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                {/* 선택되지 않은 사진 목록 */}
                <section className='RightMainView relative w-1/4'>
                    <div className='ml-auto h-full w-[20rem] min-w-[20rem] max-w-[20rem] overflow-y-scroll px-12 pr-14 pt-5'>
                        <UnselectedPhotos photos={photos} setSelectedPhoto={setSelectedPhoto} />
                    </div>
                </section>
            </article>
        </div>
    );
}
