import { memo } from 'react';

import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import dayjs from 'dayjs';
import { useRecoilState, useSetRecoilState } from 'recoil';

import {
  storageBoardReplyListBottomSheetState,
  storageBoardReplyMenuBottomSheetState
} from '@recoil/storageBoard/atoms';

import { Button, Flexbox, Icon, Image, Typography, useTheme } from 'cocstorage-ui';

import { StorageBoardCommentReply } from '@dto/storage-board-comment-replies';

import { fetchStorageBoard } from '@api/v1/storage-boards';

import queryKeys from '@constants/queryKeys';

interface ReplyProps {
  reply: StorageBoardCommentReply;
}

function Reply({
  reply: { id: replyId, user, nickname, content, createdIp, createdAt, isMember }
}: ReplyProps) {
  const router = useRouter();
  const { id } = router.query;
  const {
    theme: {
      type,
      palette: { text }
    }
  } = useTheme();

  const [{ commentId }, setReplyListBottomSheetState] = useRecoilState(
    storageBoardReplyListBottomSheetState
  );
  const setReplyMenuBottomState = useSetRecoilState(storageBoardReplyMenuBottomSheetState);

  const { data: { id: storageBoardId, storage: { id: storageId } } = {} } = useQuery(
    queryKeys.storageBoards.storageBoardById(Number(id)),
    () => fetchStorageBoard(Number(storageId), Number(id))
  );

  const handleClick = () => {
    setReplyListBottomSheetState((prevState) => ({
      ...prevState,
      open: false
    }));

    setTimeout(() => {
      setReplyMenuBottomState({
        open: true,
        storageId,
        id: storageBoardId,
        commentId,
        replyId
      });
    }, 500);
  };

  return (
    <Flexbox gap={10} customStyle={{ padding: '0 20px' }}>
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
        <Typography
          lineHeight="main"
          noWrap
          lineClamp={3}
          customStyle={{ marginTop: 4, wordBreak: 'break-word' }}
        >
          {content.split('\n').map((splitContent, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <span key={`reply-content-${index}`}>
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
      {!isMember && (
        <Button
          variant="transparent"
          size="pico"
          startIcon={<Icon name="MoreMenuOutlined" width={15} height={15} />}
          onClick={handleClick}
          iconOnly
        />
      )}
    </Flexbox>
  );
}

export default memo(Reply);
