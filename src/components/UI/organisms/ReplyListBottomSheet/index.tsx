import { ChangeEvent, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import dayjs from 'dayjs';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { commonFeedbackDialogState } from '@recoil/common/atoms';
import {
  storageBoardCommentsParamsState,
  storageBoardReplyListBottomSheetState
} from '@recoil/storageBoard/atoms';

import {
  BottomSheet,
  Flexbox,
  Grid,
  Icon,
  IconButton,
  Image,
  TextBar,
  Typography,
  useTheme
} from 'cocstorage-ui';

import Message from '@components/UI/molecules/Message';
import Reply from '@components/UI/organisms/Reply';

import { StorageBoardComment } from '@dto/storage-board-comments';
import validators from '@utils/validators';

import {
  PostStorageBoardCommentReplyData,
  postNonMemberStorageBoardCommentReply
} from '@api/v1/storage-board-comment-replies';
import { fetchStorageBoardComments } from '@api/v1/storage-board-comments';

import queryKeys from '@constants/queryKeys';

import { CommentBar, CommentBarWrapper, CommentTextArea } from './ReplyListBottomSheet.styles';

function ReplyListBottomSheet() {
  const router = useRouter();
  const { id } = router.query;

  const {
    theme: {
      type,
      palette: { text, box }
    }
  } = useTheme();

  const params = useRecoilValue(storageBoardCommentsParamsState);
  const { open, storageId, commentId } = useRecoilValue(storageBoardReplyListBottomSheetState);
  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);
  const restReplyListBottomSheetState = useResetRecoilState(storageBoardReplyListBottomSheetState);

  const [rows, setRows] = useState(1);
  const [replyNickname, setNickname] = useState('');
  const [replyPassword, setPassword] = useState('');
  const [replyContent, setContent] = useState('');
  const [{ user, nickname, content = '', replies = [], createdAt, createdIp }, setComment] =
    useState<Partial<StorageBoardComment>>({});

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

  const handleClick = () => {
    if (!validators.nickname(replyNickname)) {
      setCommonFeedbackDialogState({
        open: true,
        title: '닉네임이 올바르지 않아요',
        message:
          '한글 또는 영문 대소문자 2자 이상 10자 이하로 입력해 주세요.<br />특수문자는 포함할 수 없어요!'
      });
      return;
    }
    if (!validators.password(replyPassword)) {
      setCommonFeedbackDialogState({
        open: true,
        title: '비밀번호가 올바르지 않아요.',
        message: '7자 이상으로 입력해 주세요!'
      });
      return;
    }

    mutate({ nickname: replyNickname, password: replyPassword, content: replyContent });
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.currentTarget.value);

  const handleChangeTextBar = (event: ChangeEvent<HTMLInputElement>) => {
    const dataInputType = event.currentTarget.type;

    if (dataInputType === 'password') {
      setPassword(event.currentTarget.value);
    } else {
      setNickname(event.currentTarget.value);
    }
  };

  const handleClose = () => restReplyListBottomSheetState();

  useEffect(() => {
    if (replyContent.split('\n').length >= 2) {
      setRows(2);
    } else {
      setRows(1);
    }
  }, [replyContent]);

  useEffect(() => {
    if (comments[0]) {
      setComment(comments[0] || {});
    }
  }, [comments]);

  return (
    <BottomSheet
      open={open}
      onClose={handleClose}
      customStyle={{
        '& > div': {
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <Flexbox
        gap={10}
        customStyle={{
          padding: '8px 20px 14px',
          borderBottom: `1px solid ${box.stroked.normal}`
        }}
      >
        <Image
          width={30}
          height={30}
          src={(user || {}).avatarUrl || ''}
          alt="User Avatar Img"
          round="50%"
          disableAspectRatio
          fallback={{
            iconName: 'UserFilled',
            width: 15,
            height: 15
          }}
        />
        <Flexbox direction="vertical" customStyle={{ flex: 1 }}>
          <Flexbox gap={4} alignment="center">
            <Typography variant="s1" fontWeight="bold">
              {nickname || (user || {}).nickname}
            </Typography>
            {!user && createdIp && (
              <Typography variant="s2" color={text[type].text1}>
                ({createdIp})
              </Typography>
            )}
          </Flexbox>
          <Typography lineHeight="main" noWrap lineClamp={3} customStyle={{ marginTop: 4 }}>
            {content.split('\n').map((splitContent, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <span key={`comment-content-in-bottom-sheet-${index}`}>
                {splitContent}
                <br />
              </span>
            ))}
          </Typography>
          <Flexbox direction="vertical" gap={15} customStyle={{ marginTop: 8 }}>
            <Flexbox gap={12} alignment="center">
              <Typography
                variant="s1"
                customStyle={{
                  color: text[type].text1
                }}
              >
                {dayjs(createdAt).fromNow()}
              </Typography>
            </Flexbox>
          </Flexbox>
        </Flexbox>
      </Flexbox>
      <Flexbox
        gap={20}
        direction="vertical"
        customStyle={{ flex: 1, padding: '20px 0', overflowY: 'auto' }}
      >
        {replies.length === 0 && (
          <Message
            title="아직 답글이 없네요!"
            message="답글을 남겨보시는 건 어때요?"
            hideButton
            customStyle={{ margin: '40px 0 50px' }}
          />
        )}
        {replies.map((reply) => (
          <Reply key={`reply-${reply.id}`} reply={reply} />
        ))}
      </Flexbox>
      <CommentBarWrapper>
        {replyContent && (
          <Grid container columnGap={16}>
            <Grid item xs={2}>
              <TextBar
                fullWidth
                size="small"
                onChange={handleChangeTextBar}
                value={replyNickname}
                placeholder="닉네임"
                disabled={isLoading}
                customStyle={{ borderColor: box.stroked.normal }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextBar
                fullWidth
                type="password"
                size="small"
                onChange={handleChangeTextBar}
                value={replyPassword}
                placeholder="바밀번호"
                disabled={isLoading}
                customStyle={{ borderColor: box.stroked.normal }}
              />
            </Grid>
          </Grid>
        )}
        <CommentBar>
          <CommentTextArea
            placeholder="내용을 입력해주세요."
            rows={rows}
            onChange={handleChange}
            value={replyContent}
            disabled={isLoading}
          />
          <IconButton onClick={handleClick} customStyle={{ marginRight: 10 }}>
            <Icon
              name={
                !isLoading && replyNickname && replyPassword && replyContent
                  ? 'SendFilled'
                  : 'SendOutlined'
              }
              color={
                !isLoading && replyNickname && replyPassword && replyContent
                  ? 'primary'
                  : text[type].text3
              }
            />
          </IconButton>
        </CommentBar>
      </CommentBarWrapper>
    </BottomSheet>
  );
}

export default ReplyListBottomSheet;
