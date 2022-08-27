import { Flexbox, Skeleton } from 'cocstorage-ui';

import { StyledStorageBoardCard } from './StorageBoardCard.styles';

import { StorageBoardCardProps } from '.';

function StorageBoardCardSkeleton({
  variant,
  customStyle
}: Pick<StorageBoardCardProps, 'variant' | 'customStyle'>) {
  if (variant === 'normal') {
    return (
      <StyledStorageBoardCard variant={variant} hasThumbnail css={customStyle}>
        <Skeleton ratio="4:3" maxWidth={82} customStyle={{ borderRadius: 8 }} />
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
      </StyledStorageBoardCard>
    );
  }

  return (
    <StyledStorageBoardCard variant={variant} hasThumbnail css={customStyle}>
      <Flexbox direction="vertical" gap={6}>
        <Skeleton width="100%" maxWidth={200} height={17.5} disableAspectRatio />
        <Flexbox gap={12}>
          <Skeleton width={30} height={14} disableAspectRatio />
          <Skeleton width={30} height={14} disableAspectRatio />
          <Skeleton width={30} height={14} disableAspectRatio />
          <Skeleton width={50} height={14} disableAspectRatio />
        </Flexbox>
      </Flexbox>
      <Skeleton ratio="16:9" customStyle={{ borderRadius: 8 }} />
    </StyledStorageBoardCard>
  );
}

export default StorageBoardCardSkeleton;
