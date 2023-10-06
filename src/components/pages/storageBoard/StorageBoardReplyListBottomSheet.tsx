import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  PostStorageBoardCommentReplyData,
  postNonMemberStorageBoardCommentReply
} from '@api/v1/storage-board-comment-replies';
import { fetchStorageBoardComments } from '@api/v1/storage-board-comments';
import ReplyListBottomSheet from '@components/UI/organisms/ReplyListBottomSheet';
import queryKeys from '@constants/queryKeys';
import { StorageBoardComment } from '@dto/storage-board-comments';
import { commonFeedbackDialogState } from '@recoil/common/atoms';
import { myNicknameState, myPasswordState } from '@recoil/pages/my/atoms';
import {
  storageBoardCommentsParamsState,
  storageBoardReplyListBottomSheetState,
  storageBoardReplyMenuBottomSheetState
} from '@recoil/pages/storageBoard/atoms';
import validators from '@utils/validators';

function StorageBoardReplyListBottomSheet() {
  const router = useRouter();
  const { id } = router.query;

  const [myNickname, setMyNicknameState] = useRecoilState(myNicknameState);
  const [myPassword, setMyPasswordState] = useRecoilState(myPasswordState);
  const params = useRecoilValue(storageBoardCommentsParamsState);
  const [{ open, storageId, commentId }, setReplyListBottomSheetState] = useRecoilState(
    storageBoardReplyListBottomSheetState
  );
  const setReplyMenuBottomSheetState = useSetRecoilState(storageBoardReplyMenuBottomSheetState);
  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);
  const restReplyListBottomSheetState = useResetRecoilState(storageBoardReplyListBottomSheetState);

  const [rows, setRows] = useState(1);
  const [nickname, setNickname] = useState(myNickname);
  const [password, setPassword] = useState(myPassword);
  const [content, setContent] = useState('');
  const [comment, setComment] = useState<Partial<StorageBoardComment>>({});

  const openReplyMenuBottomSheetTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const queryClient = useQueryClient();

  const { data: { comments = [] } = {} } = useQuery(
    queryKeys.storageBoardComments.storageBoardCommentsByIdWithPage(Number(id), params.page),
    () => fetchStorageBoardComments(storageId, Number(id), params),
    {
      select: ({ comments: selectComments = [], pagination }) => ({
        comments: selectComments.filter(({ id: selectCommentId }) => selectCommentId === commentId),
        pagination
      }),
      enabled: !!params.page,
      keepPreviousData: true
    }
  );

  const { mutate, isLoading } = useMutation(
    (data: PostStorageBoardCommentReplyData) =>
      postNonMemberStorageBoardCommentReply(storageId, Number(id), commentId, data),
    {
      onSuccess: () => {
        setContent('');

        return queryClient.invalidateQueries(
          queryKeys.storageBoardComments.storageBoardCommentsByIdWithPage(
            Number(id),
            params.page || 1
          )
        );
      }
    }
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const dataInputType = event.currentTarget.type;

    if (dataInputType === 'password') {
      setPassword(event.currentTarget.value);
    } else {
      setNickname(event.currentTarget.value);
    }
  };

  const handleChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.currentTarget.value);

  const handleClose = () => restReplyListBottomSheetState();

  const handleBlurNicknameTextBar = () => setMyNicknameState(nickname);
  const handleBlurPasswordTextBar = () => {
    if (myPassword) setMyPasswordState(password);
  };

  const handleClick = () => {
    if (!validators.nickname(nickname)) {
      setCommonFeedbackDialogState({
        open: true,
        title: '닉네임이 올바르지 않아요',
        message:
          '한글 또는 영문 대소문자 2자 이상 10자 이하로 입력해 주세요.<br />특수문자는 포함할 수 없어요!'
      });
      return;
    }
    if (!validators.password(password)) {
      setCommonFeedbackDialogState({
        open: true,
        title: '비밀번호가 올바르지 않아요.',
        message: '7자 이상으로 입력해 주세요!'
      });
      return;
    }

    mutate({ nickname, password, content });
  };

  const handleClickReplyMenu = (currentCommentId: number, replyId: number) => () => {
    setReplyListBottomSheetState((prevState) => ({
      ...prevState,
      commentId: currentCommentId,
      open: false
    }));

    openReplyMenuBottomSheetTimerRef.current = setTimeout(() => {
      setReplyMenuBottomSheetState({
        open: true,
        storageId,
        id: Number(id),
        commentId,
        replyId
      });
    }, 500);
  };

  useEffect(() => {
    if (content.split('\n').length >= 2) {
      setRows(2);
    } else {
      setRows(1);
    }
  }, [content]);

  useEffect(() => {
    if (comments[0]) {
      setComment(comments[0] || {});
    }
  }, [comments]);

  useEffect(() => {
    return () => {
      restReplyListBottomSheetState();
    };
  }, [restReplyListBottomSheetState]);

  useEffect(() => {
    return () => {
      if (openReplyMenuBottomSheetTimerRef.current) {
        clearTimeout(openReplyMenuBottomSheetTimerRef.current);
      }
    };
  }, []);

  return (
    <ReplyListBottomSheet
      open={open}
      onClose={handleClose}
      comment={comment}
      nickname={nickname}
      password={password}
      content={content}
      rows={rows}
      isLoading={isLoading}
      onChange={handleChange}
      onChangeContent={handleChangeContent}
      onClickReplyMenu={handleClickReplyMenu}
      onBlurNicknameTextBar={handleBlurNicknameTextBar}
      onBlurPasswordTextBar={handleBlurPasswordTextBar}
      onClickPost={handleClick}
    />
  );
}

export default StorageBoardReplyListBottomSheet;
