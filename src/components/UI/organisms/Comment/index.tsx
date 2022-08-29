import { useState } from 'react';

import dayjs from 'dayjs';

import { Box, Button, Flexbox, Icon, Image, Typography, useTheme } from 'cocstorage-ui';

import { StorageBoardComment } from '@dto/storage-board-comments';

interface CommentProps {
  comment: StorageBoardComment;
}

function Comment({
  comment: { user, nickname, content = '', replies, createdAt, createdIp, isMember }
}: CommentProps) {
  const {
    theme: {
      type: themeType,
      palette: { text }
    }
  } = useTheme();

  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);

  return (
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
              customStyle={{ cursor: 'pointer', color: text[themeType].text1 }}
              onClick={handleClick}
            >
              답글달기
            </Typography>
          </Flexbox>
          {replies.length > 0 && (
            <Flexbox gap={10} alignment="center">
              <Box customStyle={{ width: 24, height: 1, backgroundColor: text[themeType].text3 }} />
              <Typography
                variant="s1"
                customStyle={{
                  color: text[themeType].text1,
                  cursor: 'pointer'
                }}
                onClick={handleClick}
              >
                {open ? '답글 숨기기' : `답글 ${replies.length}개`}
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
          iconOnly
        />
      )}
    </Flexbox>
  );
}

export default Comment;
