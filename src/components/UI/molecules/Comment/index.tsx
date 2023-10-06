import { Avatar, Box, Button, Flexbox, Typography, useTheme } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import dayjs from 'dayjs';

import Reply from '@components/UI/molecules/Reply';
import { NoticeComment } from '@dto/notice-comments';
import { StorageBoardComment } from '@dto/storage-board-comments';

interface CommentProps {
  comment: StorageBoardComment | NoticeComment;
  onClickReplyListOpen: () => void;
  onClickMenu: () => void;
  onClickReplyMenu: (commentId: number, replyId: number) => () => void;
}

function Comment({
  comment: { id, user, nickname, content = '', replies, createdAt, createdIp, isMember },
  onClickReplyListOpen,
  onClickMenu,
  onClickReplyMenu
}: CommentProps) {
  const {
    theme: {
      mode,
      palette: { text }
    }
  } = useTheme();

  return (
    <Flexbox direction="vertical" customStyle={{ flex: 1 }}>
      <Flexbox gap={10}>
        <Avatar
          width={30}
          height={30}
          src={(user || {}).avatarUrl || ''}
          alt="User Avatar Img"
          fallback={{
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
              onClick={onClickMenu}
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
            onClick={onClickReplyListOpen}
            customStyle={{ cursor: 'pointer', color: text[mode].text1 }}
          >
            {replies.length > 0 ? `답글 ${replies.length.toLocaleString()}개` : '답글달기'}
          </Typography>
        </Flexbox>
        {replies.length > 0 && (
          <Flexbox direction="vertical" gap={18}>
            {replies.slice(0, 3).map((reply) => (
              <Reply
                key={`comment-simple-reply-${reply.id}`}
                reply={reply}
                onClickMenu={onClickReplyMenu(id, reply.id)}
                disablePadding
              />
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
              onClick={onClickReplyListOpen}
            >
              {`답글 ${(replies.length - 3).toLocaleString()}개 더 보기`}
            </Typography>
          </Flexbox>
        )}
      </Flexbox>
    </Flexbox>
  );
}

export default Comment;
