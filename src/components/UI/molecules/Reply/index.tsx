import { memo } from 'react';

import dayjs from 'dayjs';

import { Flexbox, Image, Typography, useTheme } from 'cocstorage-ui';

import { StorageBoardCommentReply } from '@dto/storage-board-comment-replies';

interface ReplyProps {
  reply: StorageBoardCommentReply;
}

function Reply({ reply: { user, nickname, content, createdIp, createdAt } }: ReplyProps) {
  const {
    theme: {
      type,
      palette: { text }
    }
  } = useTheme();
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
        <Typography lineHeight="main" noWrap lineClamp={3} customStyle={{ marginTop: 4 }}>
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
    </Flexbox>
  );
}

export default memo(Reply);
