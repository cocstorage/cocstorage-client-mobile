import { HTMLAttributes, memo, useMemo } from 'react';

import dayjs from 'dayjs';

import { Badge, CustomStyle, Flexbox, Icon, Image, Typography, useTheme } from 'cocstorage-ui';

import { StorageBoard } from '@dto/storage-boards';

import {
  Dot,
  Info,
  InfoLabel,
  Storage,
  StyledStorageBoardCard,
  UserInfo
} from './StorageBoardCard.styles';

export interface StorageBoardCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'normal' | 'compact';
  storageBoard?: StorageBoard;
  hideSymbolismBadge?: boolean;
  inStorage?: boolean;
  customStyle?: CustomStyle;
}

function StorageBoardCard({
  variant = 'compact',
  storageBoard: {
    user,
    storage: { name, avatarUrl },
    nickname,
    subject,
    viewCount = 0,
    commentTotalCount = 0,
    thumbUp = 0,
    thumbDown = 0,
    thumbnailUrl,
    isPopular,
    isWorst,
    createdAt
  },
  hideSymbolismBadge = false,
  inStorage = true,
  customStyle,
  ...props
}: StorageBoardCardProps) {
  const {
    theme: {
      type,
      palette: { text }
    }
  } = useTheme();

  const round = useMemo<number>(() => {
    if (variant === 'normal') {
      return 6;
    }

    return 8;
  }, [variant]);

  if (variant === 'normal') {
    return (
      <StyledStorageBoardCard
        variant={variant}
        hasThumbnail={!!thumbnailUrl}
        {...props}
        css={customStyle}
      >
        <Image
          ratio="4:3"
          src={thumbnailUrl || ''}
          alt="Thumbnail Img"
          width={82}
          height="auto"
          round={round}
          // TODO UI 라이브러리 수정
          customStyle={{ borderRadius: round }}
        />
        <Flexbox
          direction="vertical"
          justifyContent="space-between"
          gap={8}
          customStyle={{ height: '100%' }}
        >
          <Typography noWrap lineClamp={2} customStyle={{ flex: 1 }}>
            {dayjs().diff(createdAt, 'day') <= 1 && (
              <Badge severity="success" customStyle={{ marginRight: 4, verticalAlign: 'bottom' }}>
                NEW
              </Badge>
            )}
            {!hideSymbolismBadge && isPopular && (
              <Badge
                severity="info"
                startIcon={<Icon name="ThumbsUpFilled" width={12} height={12} />}
                iconOnly
                customStyle={{
                  marginRight: 4,
                  verticalAlign: 'middle'
                }}
              />
            )}
            {!hideSymbolismBadge && isWorst && (
              <Badge
                severity="error"
                startIcon={<Icon name="ThumbsDownFilled" width={12} height={12} />}
                iconOnly
                customStyle={{
                  marginRight: 4,
                  verticalAlign: 'middle'
                }}
              />
            )}
            {subject}
          </Typography>
          <Info>
            <InfoLabel>
              <Icon name="ViewOutlined" width={16} height={16} />
              <Typography variant="s2">{viewCount.toLocaleString()}</Typography>
            </InfoLabel>
            <InfoLabel>
              <Icon name="CommentOutlined" width={16} height={16} />
              <Typography variant="s2">{commentTotalCount.toLocaleString()}</Typography>
            </InfoLabel>
            {isWorst && (
              <InfoLabel>
                <Icon name="ThumbsDownOutlined" width={16} height={16} />
                <Typography variant="s2">{thumbDown.toLocaleString()}</Typography>
              </InfoLabel>
            )}
            {!isWorst && (
              <InfoLabel>
                <Icon name="ThumbsUpOutlined" width={16} height={16} />
                <Typography variant="s2">{thumbUp.toLocaleString()}</Typography>
              </InfoLabel>
            )}
            <Storage>
              {avatarUrl && (
                <Image
                  width={14}
                  height={14}
                  src={avatarUrl || ''}
                  alt="Storage Logo Img"
                  round={6}
                  disableAspectRatio
                />
              )}
              <Typography variant="s2" color={text[type].text1}>
                {name}
              </Typography>
            </Storage>
          </Info>
        </Flexbox>
      </StyledStorageBoardCard>
    );
  }

  return (
    <StyledStorageBoardCard
      variant={variant}
      hasThumbnail={!!thumbnailUrl}
      {...props}
      css={customStyle}
    >
      <Flexbox
        direction="vertical"
        justifyContent="space-between"
        gap={6}
        customStyle={{ height: '100%' }}
      >
        <Flexbox gap={4} alignment="center">
          {dayjs().diff(createdAt, 'day') <= 1 && <Badge severity="success">NEW</Badge>}
          {!hideSymbolismBadge && isPopular && (
            <Badge
              severity="info"
              startIcon={<Icon name="ThumbsUpFilled" width={12} height={12} />}
              iconOnly
            />
          )}
          {!hideSymbolismBadge && isWorst && (
            <Badge
              severity="error"
              startIcon={<Icon name="ThumbsDownFilled" width={12} height={12} />}
              iconOnly
            />
          )}
          <Typography
            noWrap
            lineClamp={1}
            customStyle={{
              flex: 1,
              textAlign: 'left'
            }}
          >
            {subject}
          </Typography>
        </Flexbox>
        <Info>
          <InfoLabel>
            <Icon name="ViewOutlined" width={14} height={14} />
            <Typography variant="s2">{viewCount.toLocaleString()}</Typography>
          </InfoLabel>
          <InfoLabel>
            <Icon name="CommentOutlined" width={14} height={14} />
            <Typography variant="s2">{commentTotalCount.toLocaleString()}</Typography>
          </InfoLabel>
          {isWorst && (
            <InfoLabel>
              <Icon name="ThumbsDownOutlined" width={14} height={14} />
              <Typography variant="s2">{thumbDown.toLocaleString()}</Typography>
            </InfoLabel>
          )}
          {!isWorst && (
            <InfoLabel>
              <Icon name="ThumbsUpOutlined" width={14} height={14} />
              <Typography variant="s2">{thumbUp.toLocaleString()}</Typography>
            </InfoLabel>
          )}
          {!inStorage && (
            <Storage>
              {avatarUrl && (
                <Image
                  width={14}
                  height={14}
                  src={avatarUrl || ''}
                  alt="Storage Logo Img"
                  round={6}
                  disableAspectRatio
                />
              )}
              <Typography variant="s2" color={text[type].text1}>
                {name}
              </Typography>
            </Storage>
          )}
          {inStorage && (
            <UserInfo>
              <Flexbox gap={4} alignment="center">
                {user?.avatarUrl && (
                  <Image
                    src={user?.avatarUrl || ''}
                    alt="User Avatar Img"
                    width={14}
                    height={14}
                    round="50%"
                    disableAspectRatio
                  />
                )}
                <Typography variant="s2" color={text[type].text1}>
                  {user?.nickname || nickname}
                </Typography>
              </Flexbox>
              <Dot />
              <Typography variant="s2" color={text[type].text1}>
                {dayjs(createdAt).fromNow()}
              </Typography>
            </UserInfo>
          )}
        </Info>
      </Flexbox>
      {thumbnailUrl && (
        <Image
          ratio="16:9"
          src={thumbnailUrl || ''}
          alt="Thumbnail Img"
          width={61}
          height="auto"
          round={round}
          customStyle={{ borderRadius: round }}
        />
      )}
    </StyledStorageBoardCard>
  );
}

export default memo(StorageBoardCard);
