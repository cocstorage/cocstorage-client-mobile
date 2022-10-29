import { memo } from 'react';

import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import dayjs from 'dayjs';
import { useSetRecoilState } from 'recoil';

import {
  commonCommentMenuBottomSheetState,
  commonReplyListBottomSheetState
} from '@recoil/common/atoms';

import { Box, Button, Flexbox, Icon, Image, Typography, useTheme } from 'cocstorage-ui';

import Reply from '@components/UI/organisms/Reply';

import { NoticeComment } from '@dto/notice-comments';
import { StorageBoardComment } from '@dto/storage-board-comments';

import { fetchNotice } from '@api/v1/notices';
import { fetchStorageBoard } from '@api/v1/storage-boards';

import queryKeys from '@constants/queryKeys';

interface CommentProps {
  type?: 'storageBoard' | 'notice';
  comment: StorageBoardComment | NoticeComment;
}

function Comment({
  type = 'storageBoard',
  comment: { id: commentId, user, nickname, content = '', replies, createdAt, createdIp, isMember }
}: CommentProps) {
  const router = useRouter();
  const { id } = router.query;

  const {
    theme: {
      mode,
      palette: { text }
    }
  } = useTheme();

  const setReplyListBottomSheetState = useSetRecoilState(commonReplyListBottomSheetState);
  const setCommentMenuBottomSheetState = useSetRecoilState(commonCommentMenuBottomSheetState);

  const { data: { id: storageBoardId, storage: { id: storageId = 0 } = {} } = {} } = useQuery(
    queryKeys.storageBoards.storageBoardById(Number(id)),
    () => fetchStorageBoard(Number(storageId), Number(id)),
    {
      enabled: type === 'storageBoard'
    }
  );

  const { data: { id: noticeId } = {} } = useQuery(
    queryKeys.notices.noticeById(Number(id)),
    () => fetchNotice(Number(id)),
    {
      enabled: type === 'notice'
    }
  );

  const handleClick = () =>
    setReplyListBottomSheetState({
      open: true,
      storageId,
      commentId
    });

  const handleClickMenuBottomSheet = () =>
    setCommentMenuBottomSheetState({
      open: true,
      storageId,
      id: type === 'storageBoard' ? storageBoardId : noticeId,
      commentId
    });

  return (
    <Flexbox direction="vertical" customStyle={{ flex: 1 }}>
      <Flexbox gap={10}>
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
              <Typography variant="s2" color={text[mode].text1}>
                ({createdIp})
              </Typography>
            )}
          </Flexbox>
          <Typography lineHeight="main" customStyle={{ marginTop: 4, wordBreak: 'break-word' }}>
            {content.split('\n').map((splitContent, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <span key={`comment-content-${index}`}>
                {splitContent}
                <br />
              </span>
            ))}
          </Typography>
        </Flexbox>
        {!isMember && (
          <Flexbox alignment="flex-start">
            <Button
              variant="transparent"
              size="pico"
              startIcon={<Icon name="MoreMenuOutlined" width={15} height={15} />}
              onClick={handleClickMenuBottomSheet}
              iconOnly
            />
          </Flexbox>
        )}
      </Flexbox>
      <Flexbox direction="vertical" gap={15} customStyle={{ margin: '8px 0 0 40px' }}>
        <Flexbox gap={12} alignment="center">
          <Typography
            variant="s1"
            customStyle={{
              color: text[mode].text1
            }}
          >
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography
            variant="s1"
            onClick={handleClick}
            customStyle={{ cursor: 'pointer', color: text[mode].text1 }}
          >
            {replies.length > 0 ? `답글 ${replies.length.toLocaleString()}개` : '답글달기'}
          </Typography>
        </Flexbox>
        {replies.length > 0 && (
          <Flexbox direction="vertical" gap={18}>
            {replies.slice(0, 3).map((reply) => (
              <Reply key={`comment-simple-reply-${reply.id}`} reply={reply} disablePadding />
            ))}
          </Flexbox>
        )}
        {replies.length > 3 && (
          <Flexbox gap={10} alignment="center">
            <Box customStyle={{ width: 24, height: 1, backgroundColor: text[mode].text3 }} />
            <Typography
              variant="s1"
              customStyle={{
                color: text[mode].text1,
                cursor: 'pointer'
              }}
              onClick={handleClick}
            >
              {`답글 ${(replies.length - 3).toLocaleString()}개 더 보기`}
            </Typography>
          </Flexbox>
        )}
      </Flexbox>
    </Flexbox>
  );
}

export default memo(Comment);
