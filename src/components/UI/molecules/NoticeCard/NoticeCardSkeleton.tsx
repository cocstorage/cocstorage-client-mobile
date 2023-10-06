import { Flexbox, Skeleton } from '@cocstorage/ui';

import { StyledNoticeCard, Wrapper } from './NoticeCard.styles';

function NoticeCardSkeleton() {
  return (
    <StyledNoticeCard>
      <Wrapper>
        <Skeleton ratio="4:3" maxWidth={82} round={8} />
        <Flexbox
          direction="vertical"
          justifyContent="space-between"
          gap={6}
          customStyle={{ height: '100%' }}
        >
          <Skeleton width="100%" maxWidth={200} height={17.5} disableAspectRatio />
          <Flexbox gap={12}>
            <Skeleton width={30} height={16} disableAspectRatio />
            <Skeleton width={30} height={16} disableAspectRatio />
            <Skeleton width={30} height={16} disableAspectRatio />
            <Skeleton width={50} height={16} disableAspectRatio />
          </Flexbox>
        </Flexbox>
      </Wrapper>
    </StyledNoticeCard>
  );
}

export default NoticeCardSkeleton;
