import dayjs from 'dayjs';

import { Avatar, Button, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import { NoticeCommentReply } from '@dto/notice-comment-replies';
import { StorageBoardCommentReply } from '@dto/storage-board-comment-replies';

interface ReplyProps {
  reply: StorageBoardCommentReply | NoticeCommentReply;
  onClickMenu: () => void;
  disablePadding?: boolean;
}

function Reply({
  reply: { user, nickname, content, createdIp, createdAt, isMember },
  onClickMenu,
  disablePadding
}: ReplyProps) {
  const {
    theme: {
      mode,
      palette: { text }
    }
  } = useTheme();

  return (
    <Flexbox gap={10} customStyle={{ padding: disablePadding ? undefined : '0 20px' }}>
      <Avatar
        width={30}
        height={30}
        src={(user || {}).avatarUrl || ''}
        alt="User Avatar Img"
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
                color: text[mode].text1
              }}
            >
              {dayjs(createdAt).fromNow()}
            </Typography>
          </Flexbox>
        </Flexbox>
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
  );
}

export default Reply;
