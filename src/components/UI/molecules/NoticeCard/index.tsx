import { HTMLAttributes, memo } from 'react';

import { Badge, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import RatioImage from '@components/UI/atoms/RatioImage';

import { Dot, Info, InfoLabel, StyledNoticeCard, UserInfo } from './NoticeCard.styles';

export type NoticeCardProps = HTMLAttributes<HTMLDivElement>;

const thumbnailUrl = '';

function NoticeCard({ ...props }: NoticeCardProps) {
  const {
    theme: {
      type,
      palette: { text }
    }
  } = useTheme();
  return (
    <StyledNoticeCard {...props}>
      <RatioImage ratio="4:3" src={thumbnailUrl || ''} alt="Thumbnail Img" width={82} round={6} />
      <Flexbox
        direction="vertical"
        justifyContent="space-between"
        gap={8}
        customStyle={{ height: '100%' }}
      >
        <Typography noWrap lineClamp={2} customStyle={{ flex: 1 }}>
          <Badge severity="success" customStyle={{ marginRight: 4, verticalAlign: 'middle' }}>
            NEW
          </Badge>
          제목입니다.
        </Typography>
        <Info>
          <InfoLabel>
            <Icon name="ViewOutlined" width={16} height={16} />
            <Typography variant="s2">100</Typography>
          </InfoLabel>
          <InfoLabel>
            <Icon name="CommentOutlined" width={16} height={16} />
            <Typography variant="s2">100</Typography>
          </InfoLabel>
          <UserInfo>
            <Flexbox gap={4} alignment="center">
              <RatioImage
                width={14}
                height={14}
                src=""
                alt="User Avatar Img"
                round="50%"
                disableAspectRatio
              />
              <Typography variant="s2" color={text[type].text1}>
                Hyeok
              </Typography>
            </Flexbox>
            <Dot />
            <Typography variant="s2" color={text[type].text1}>
              1분 전
            </Typography>
          </UserInfo>
        </Info>
      </Flexbox>
    </StyledNoticeCard>
  );
}

export default memo(NoticeCard);
