import { memo, useState } from 'react';

import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import dayjs from 'dayjs';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  storageBoardCommentDeleteBottomSheetState,
  storageBoardCommentsParamsState
} from '@recoil/storageBoard/atoms';

import {
  BottomSheet,
  Box,
  Button,
  Flexbox,
  Icon,
  IconButton,
  Image,
  Typography,
  useTheme
} from 'cocstorage-ui';

import Message from '@components/UI/molecules/Message';
import Reply from '@components/UI/molecules/Reply';

import { StorageBoardComment } from '@dto/storage-board-comments';

import { fetchStorageBoardComments } from '@api/v1/storage-board-comments';
import { fetchStorageBoard } from '@api/v1/storage-boards';

import queryKeys from '@constants/queryKeys';

import { CommentBar, CommentBarWrapper, CommentTextArea } from './Comment.styles';

interface CommentProps {
  comment: StorageBoardComment;
}

function Comment({
  comment: { id: commentId, user, nickname, content = '', replies, createdAt, createdIp, isMember }
}: CommentProps) {
  const router = useRouter();
  const { id } = router.query;

  const {
    theme: {
      type: themeType,
      palette: { text, box }
    }
  } = useTheme();

  const params = useRecoilValue(storageBoardCommentsParamsState);
  const setCommentDeleteBottomSheetState = useSetRecoilState(
    storageBoardCommentDeleteBottomSheetState
  );

  const { data: { id: storageBoardId, storage: { id: storageId }, commentLatestPage } = {} } =
    useQuery(queryKeys.storageBoards.storageBoardById(Number(id)), () =>
      fetchStorageBoard(Number(storageId), Number(id))
    );
  const { data: { comments = [] } = {} } = useQuery(
    queryKeys.storageBoardComments.storageBoardCommentsByIdWithPage(Number(id), params.page),
    () => fetchStorageBoardComments(storageId, Number(id), params),
    {
      enabled: !!params.page,
      keepPreviousData: true
    }
  );

  const [open, setOpen] = useState(false);
  const [openMenuBottomSheet, setOpenMenuBottomSheet] = useState(false);

  const handleClick = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleClickMenuBottomSheet = () => setOpenMenuBottomSheet(true);

  const handleCloseMenuBottomSheet = () => setOpenMenuBottomSheet(false);

  const handleClickDeleteBottomSheet = () => {
    setOpenMenuBottomSheet(false);

    // TODO 추후 BottomSheet 컴포넌트 동시성 구현
    setTimeout(() => {
      setCommentDeleteBottomSheetState({
        open: true,
        storageId,
        id: storageBoardId,
        commentId,
        commentsLength: comments.length,
        commentLatestPage
      });
    }, 500);
  };

  return (
    <>
      <Flexbox gap={10} customStyle={{ flex: 1 }}>
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
              <Typography variant="s2" color={text[themeType].text1}>
                ({createdIp})
              </Typography>
            )}
          </Flexbox>
          <Typography lineHeight="main" customStyle={{ marginTop: 4 }}>
            {content.split('\n').map((splitContent, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <span key={`comment-content-${index}`}>
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
                  color: text[themeType].text1
                }}
              >
                {dayjs(createdAt).fromNow()}
              </Typography>
              <Typography
                variant="s1"
                onClick={handleClick}
                customStyle={{ cursor: 'pointer', color: text[themeType].text1 }}
              >
                답글달기
              </Typography>
            </Flexbox>
            {replies.length > 0 && (
              <Flexbox gap={10} alignment="center">
                <Box
                  customStyle={{ width: 24, height: 1, backgroundColor: text[themeType].text3 }}
                />
                <Typography
                  variant="s1"
                  customStyle={{
                    color: text[themeType].text1,
                    cursor: 'pointer'
                  }}
                  onClick={handleClick}
                >
                  {`답글 ${replies.length}개`}
                </Typography>
              </Flexbox>
            )}
          </Flexbox>
        </Flexbox>
        {!isMember && (
          <Button
            variant="transparent"
            size="pico"
            startIcon={<Icon name="MoreMenuOutlined" width={15} height={15} />}
            onClick={handleClickMenuBottomSheet}
            iconOnly
          />
        )}
      </Flexbox>
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
            padding: '8px 20px',
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
                <Typography variant="s2" color={text[themeType].text1}>
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
                    color: text[themeType].text1
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
            />
          )}
          {replies.map((reply) => (
            <Reply key={`reply-${reply.id}`} reply={reply} />
          ))}
        </Flexbox>
        <CommentBarWrapper>
          <CommentBar>
            <CommentTextArea placeholder="내용을 입력해주세요." rows={1} />
            <IconButton customStyle={{ marginRight: 10 }}>
              <Icon name="SendOutlined" color={text[themeType].text3} />
            </IconButton>
          </CommentBar>
        </CommentBarWrapper>
      </BottomSheet>
      <BottomSheet open={openMenuBottomSheet} onClose={handleCloseMenuBottomSheet}>
        <Box customStyle={{ padding: '10px 20px 30px 20px' }}>
          <Flexbox gap={8} alignment="center" onClick={handleClickDeleteBottomSheet}>
            <IconButton>
              <Icon name="CloseOutlined" />
            </IconButton>
            <Typography variant="p1">댓글 삭제</Typography>
          </Flexbox>
        </Box>
      </BottomSheet>
    </>
  );
}

export default memo(Comment);
