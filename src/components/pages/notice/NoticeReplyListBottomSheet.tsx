import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { commonFeedbackDialogState } from '@recoil/common/atoms';
import { myHasSavedPasswordState, myNicknameState, myPasswordState } from '@recoil/pages/my/atoms';
import {
  noticeCommentsParamsState,
  noticeReplyListBottomSheetState,
  noticeReplyMenuBottomSheetState
} from '@recoil/pages/notice/atoms';

import { Box, Button, Dialog, Flexbox, Typography } from 'cocstorage-ui';

import ReplyListBottomSheet from '@components/UI/organisms/ReplyListBottomSheet';

import { NoticeComment } from '@dto/notice-comments';
import validators from '@utils/validators';

import {
  PostNoticeCommentReplyData,
  postNonMemberNoticeCommentReply
} from '@api/v1/notice-comment-replies';
import { fetchNoticeComments } from '@api/v1/notice-comments';

import queryKeys from '@constants/queryKeys';

function NoticeReplyListBottomSheet() {
  const router = useRouter();
  const { id } = router.query;

  const [myNickname, setMyNicknameState] = useRecoilState(myNicknameState);
  const [myPassword, setMyPasswordState] = useRecoilState(myPasswordState);
  const [myHasSavedPassword, setMyHasSavedPasswordState] = useRecoilState(myHasSavedPasswordState);
  const params = useRecoilValue(noticeCommentsParamsState);
  const [{ open, commentId }, setReplyListBottomSheetState] = useRecoilState(
    noticeReplyListBottomSheetState
  );
  const setReplyMenuBottomSheetState = useSetRecoilState(noticeReplyMenuBottomSheetState);
  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);
  const restReplyListBottomSheetState = useResetRecoilState(noticeReplyListBottomSheetState);

  const [rows, setRows] = useState(1);
  const [nickname, setNickname] = useState(myNickname);
  const [password, setPassword] = useState(myPassword);
  const [content, setContent] = useState('');
  const [comment, setComment] = useState<Partial<NoticeComment>>({});
  const [openPasswordSaveDialog, setOpenPasswordSaveDialog] = useState(false);

  const openReplyListBottomSheetTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const queryClient = useQueryClient();

  const { data: { comments = [] } = {} } = useQuery(
    queryKeys.noticeComments.noticeCommentsByIdWithPage(Number(id), params.page),
    () => fetchNoticeComments(Number(id), params),
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
    (data: PostNoticeCommentReplyData) =>
      postNonMemberNoticeCommentReply(Number(id), commentId, data),
    {
      onSettled: () => {
        if (!myHasSavedPassword && !myPassword) {
          setOpenPasswordSaveDialog(true);
        }
      },
      onSuccess: () => {
        setContent('');

        return queryClient.invalidateQueries(
          queryKeys.noticeComments.noticeCommentsByIdWithPage(Number(id), params.page || 1)
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

  const handleClosePasswordSaveDialog = () => {
    setMyHasSavedPasswordState(true);
    setOpenPasswordSaveDialog(false);
  };

  const handleClickPasswordSaveConfirm = () => {
    setMyHasSavedPasswordState(true);
    setMyPasswordState(password);
    setOpenPasswordSaveDialog(false);
  };

  const handleClickReplyMenu = (currentCommentId: number, replyId: number) => () => {
    setReplyListBottomSheetState((prevState) => ({
      ...prevState,
      commentId: currentCommentId,
      open: false
    }));

    openReplyListBottomSheetTimerRef.current = setTimeout(() => {
      setReplyMenuBottomSheetState({
        open: true,
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
      if (openReplyListBottomSheetTimerRef.current) {
        clearTimeout(openReplyListBottomSheetTimerRef.current);
      }
    };
  }, []);

  return (
    <>
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
      <Dialog
        fullWidth
        open={openPasswordSaveDialog}
        onClose={handleClosePasswordSaveDialog}
        customStyle={{ maxWidth: 475 }}
      >
        <Box customStyle={{ padding: 16 }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            customStyle={{ padding: '30px 0', textAlign: 'center' }}
          >
            비밀번호를 저장하시겠어요?
          </Typography>
          <Flexbox gap={8} customStyle={{ marginTop: 20 }}>
            <Button
              fullWidth
              onClick={handleClosePasswordSaveDialog}
              customStyle={{ flex: 1, justifyContent: 'center' }}
            >
              안할래요
            </Button>
            <Button
              fullWidth
              variant="accent"
              onClick={handleClickPasswordSaveConfirm}
              customStyle={{ flex: 1, justifyContent: 'center' }}
            >
              저장할게요
            </Button>
          </Flexbox>
        </Box>
      </Dialog>
    </>
  );
}

export default NoticeReplyListBottomSheet;
