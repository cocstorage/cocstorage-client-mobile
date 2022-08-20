import { HTMLAttributes, memo, useMemo } from 'react';

import { Badge, CustomStyle, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import RatioImage from '@components/UI/atoms/RatioImage';

import {
  Dot,
  Info,
  InfoLabel,
  Storage,
  StyledStorageBoardCard,
  UserInfo
} from './StorageBoardCard.styles';

export interface StorageBoardCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'emphasize' | 'normal' | 'compact';
  hideSymbolismBadge?: boolean;
  inStorage?: boolean;
  customStyle?: CustomStyle;
}

const thumbnailUrl = '';
const isPopular = false;
const isWorst = false;

function StorageBoardCard({
  variant = 'compact',
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
    if (variant === 'emphasize') {
      return 12;
    }
    if (variant === 'normal') {
      return 6;
    }

    return 8;
  }, [variant]);

  if (variant === 'emphasize') {
    return (
      <StyledStorageBoardCard
        variant={variant}
        hasThumbnail={!!thumbnailUrl}
        {...props}
        css={customStyle}
      >
        <RatioImage
          ratio="16:9"
          src={thumbnailUrl || ''}
          alt="Thumbnail Img"
          width={183}
          round={round}
        />
        <Flexbox
          direction="vertical"
          justifyContent="space-between"
          customStyle={{ height: '100%' }}
        >
          <Flexbox direction="vertical" gap={8}>
            <Storage>
              <RatioImage
                width={14}
                height={14}
                src=""
                alt="Storage Logo Img"
                round={6}
                disableAspectRatio
              />
              <Typography variant="s2" color={text[type].text1}>
                테스트
              </Typography>
            </Storage>
            <Typography noWrap lineClamp={2} customStyle={{ flex: 1 }}>
              <Badge severity="success" customStyle={{ marginRight: 4, verticalAlign: 'bottom' }}>
                NEW
              </Badge>
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
              제목입니다.
            </Typography>
          </Flexbox>
          <Info>
            <InfoLabel>
              <Icon name="ViewOutlined" width={18} height={18} />
              <Typography variant="s2">{'100'.toLocaleString()}</Typography>
            </InfoLabel>
            <InfoLabel>
              <Icon name="CommentOutlined" width={18} height={18} />
              <Typography variant="s2">{'100'.toLocaleString()}</Typography>
            </InfoLabel>
            {isWorst && (
              <InfoLabel>
                <Icon name="ThumbsDownOutlined" width={18} height={18} />
                <Typography variant="s2">{'100'.toLocaleString()}</Typography>
              </InfoLabel>
            )}
            {!isWorst && (
              <InfoLabel>
                <Icon name="ThumbsUpOutlined" width={18} height={18} />
                <Typography variant="s2">{'100'.toLocaleString()}</Typography>
              </InfoLabel>
            )}
          </Info>
        </Flexbox>
      </StyledStorageBoardCard>
    );
  }

  if (variant === 'normal') {
    return (
      <StyledStorageBoardCard
        variant={variant}
        hasThumbnail={!!thumbnailUrl}
        {...props}
        css={customStyle}
      >
        <RatioImage
          ratio="4:3"
          src={thumbnailUrl || ''}
          alt="Thumbnail Img"
          width={82}
          round={round}
        />
        <Flexbox
          direction="vertical"
          justifyContent="space-between"
          gap={8}
          customStyle={{ height: '100%' }}
        >
          <Typography noWrap lineClamp={2} customStyle={{ flex: 1 }}>
            <Badge severity="success" customStyle={{ marginRight: 4, verticalAlign: 'bottom' }}>
              NEW
            </Badge>
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
            제목입니다.
          </Typography>
          <Info>
            <InfoLabel>
              <Icon name="ViewOutlined" width={16} height={16} />
              <Typography variant="s2">{'100'.toLocaleString()}</Typography>
            </InfoLabel>
            <InfoLabel>
              <Icon name="CommentOutlined" width={16} height={16} />
              <Typography variant="s2">{'100'.toLocaleString()}</Typography>
            </InfoLabel>
            {isWorst && (
              <InfoLabel>
                <Icon name="ThumbsDownOutlined" width={16} height={16} />
                <Typography variant="s2">{'100'.toLocaleString()}</Typography>
              </InfoLabel>
            )}
            {!isWorst && (
              <InfoLabel>
                <Icon name="ThumbsUpOutlined" width={16} height={16} />
                <Typography variant="s2">{'100'.toLocaleString()}</Typography>
              </InfoLabel>
            )}
            <Storage>
              <RatioImage
                width={14}
                height={14}
                src=""
                alt="Storage Logo Img"
                round={6}
                disableAspectRatio
              />
              <Typography variant="s2" color={text[type].text1}>
                테스트
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
          <Badge severity="success">NEW</Badge>
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
            제목입니다.
          </Typography>
        </Flexbox>
        <Info>
          <InfoLabel>
            <Icon name="ViewOutlined" width={14} height={14} />
            <Typography variant="s2">{'100'.toLocaleString()}</Typography>
          </InfoLabel>
          <InfoLabel>
            <Icon name="CommentOutlined" width={14} height={14} />
            <Typography variant="s2">{'100'.toLocaleString()}</Typography>
          </InfoLabel>
          {isWorst && (
            <InfoLabel>
              <Icon name="ThumbsDownOutlined" width={14} height={14} />
              <Typography variant="s2">{'100'.toLocaleString()}</Typography>
            </InfoLabel>
          )}
          {!isWorst && (
            <InfoLabel>
              <Icon name="ThumbsUpOutlined" width={14} height={14} />
              <Typography variant="s2">{'100'.toLocaleString()}</Typography>
            </InfoLabel>
          )}
          {!inStorage && (
            <Storage>
              <RatioImage
                width={14}
                height={14}
                src=""
                alt="Storage Logo Img"
                round={6}
                disableAspectRatio
              />
              <Typography variant="s2" color={text[type].text1}>
                테스트
              </Typography>
            </Storage>
          )}
          {inStorage && (
            <UserInfo>
              <Flexbox gap={4} alignment="center">
                <RatioImage
                  src=""
                  alt="User Avatar Img"
                  width={14}
                  height={14}
                  round="50%"
                  disableAspectRatio
                />
                <Typography variant="s2" color={text[type].text1}>
                  닉네임
                </Typography>
              </Flexbox>
              <Dot />
              <Typography variant="s2" color={text[type].text1}>
                1분 전
              </Typography>
            </UserInfo>
          )}
        </Info>
      </Flexbox>
      {thumbnailUrl && (
        <RatioImage
          ratio="16:9"
          src={thumbnailUrl || ''}
          alt="Thumbnail Img"
          width={61}
          round={round}
        />
      )}
    </StyledStorageBoardCard>
  );
}

export default memo(StorageBoardCard);
