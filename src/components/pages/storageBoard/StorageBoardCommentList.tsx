import { useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import { fetchStorageBoardComments } from '@api/v1/storage-board-comments';
import { fetchStorageBoard } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';
import CommentList from '@components/UI/organisms/CommentList';
import queryKeys from '@constants/queryKeys';
import {
  storageBoardCommentMenuBottomSheetState,
  storageBoardCommentsParamsState,
  storageBoardReplyListBottomSheetState,
  storageBoardReplyMenuBottomSheetState
} from '@recoil/pages/storageBoard/atoms';

function StorageBoardCommentList() {
  const router = useRouter();
  const { path, id } = router.query;

  const [params, setParams] = useRecoilState(storageBoardCommentsParamsState);
  const setReplyListBottomSheetState = useSetRecoilState(storageBoardReplyListBottomSheetState);
  const setCommentMenuBottomSheetState = useSetRecoilState(storageBoardCommentMenuBottomSheetState);
  const setReplyMenuBottomSheetState = useSetRecoilState(storageBoardReplyMenuBottomSheetState);
  const resetParams = useResetRecoilState(storageBoardCommentsParamsState);

  const { data: { id: storageId = 0 } = {} } = useQuery(
    queryKeys.storages.storageById(String(path)),
    () => fetchStorage(String(path))
  );

  const { data: { id: storageBoardId, commentTotalCount = 0, commentLatestPage = 0 } = {} } =
    useQuery(queryKeys.storageBoards.storageBoardById(Number(id)), () =>
      fetchStorageBoard(Number(storageId), Number(id))
    );

  const { data: { comments = [], pagination } = {}, isLoading } = useQuery(
    queryKeys.storageBoardComments.storageBoardCommentsByIdWithPage(Number(id), params.page),
    () => fetchStorageBoardComments(storageId, Number(id), params),
    {
      enabled: !!params.page,
      keepPreviousData: true
    }
  );

  const openReplyMenuBottomSheetTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleChange = (value: number) =>
    setParams((prevParams) => ({
      ...prevParams,
      page: value
    }));

  const handleClick = (commentId: number) => () =>
    setReplyListBottomSheetState({
      open: true,
      storageId,
      commentId
    });

  const handleClickCommentMenu = (commentId: number) => () =>
    setCommentMenuBottomSheetState({
      open: true,
      storageId,
      id: storageBoardId,
      commentId
    });

  const handleClickReplyMenu = (commentId: number, replyId: number) => () => {
    setReplyListBottomSheetState((prevState) => ({
      ...prevState,
      commentId,
      open: false
    }));

    openReplyMenuBottomSheetTimerRef.current = setTimeout(() => {
      setReplyMenuBottomSheetState({
        open: true,
        storageId,
        id: storageBoardId,
        commentId,
        replyId
      });
    }, 500);
  };

  useEffect(() => {
    setParams((prevState) => ({
      ...prevState,
      page: commentLatestPage || 1
    }));
  }, [setParams, commentLatestPage]);

  useEffect(() => {
    return () => {
      resetParams();
    };
  }, [resetParams]);

  useEffect(() => {
    return () => {
      if (openReplyMenuBottomSheetTimerRef.current) {
        clearTimeout(openReplyMenuBottomSheetTimerRef.current);
      }
    };
  }, []);

  return (
    <CommentList
      comments={comments}
      pagination={pagination}
      totalCount={commentTotalCount}
      isLoading={isLoading}
      onChange={handleChange}
      onClickReplyListOpen={handleClick}
      onClickCommentMenu={handleClickCommentMenu}
      onClickReplyMenu={handleClickReplyMenu}
      customStyle={{ margin: '20px 0 20px' }}
    />
  );
}

export default StorageBoardCommentList;
