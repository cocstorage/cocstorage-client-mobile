import { Flexbox, Skeleton } from '@cocstorage/ui';

import { Wrapper } from './StorageBoardCard.styles';

import { StorageBoardCardProps } from '.';

function StorageBoardCardSkeleton({
  variant,
  customStyle
}: Pick<StorageBoardCardProps, 'variant' | 'customStyle'>) {
  if (variant === 'normal') {
    return (
      <Wrapper variant={variant} hasThumbnail css={customStyle}>
        <Skeleton ratio="4:3" maxWidth={82} round={8} />
        <Flexbox
          direction="vertical"
          justifyContent="space-between"
          gap={6}
          customStyle={{ height: '100%' }}
        >
          <Skeleton width="100%" maxWidth={200} height={17.5} round={6} disableAspectRatio />
          <Flexbox gap={12}>
            <Skeleton width={30} height={16} round={6} disableAspectRatio />
            <Skeleton width={30} height={16} round={6} disableAspectRatio />
            <Skeleton width={30} height={16} round={6} disableAspectRatio />
            <Skeleton width={50} height={16} round={6} disableAspectRatio />
          </Flexbox>
        </Flexbox>
      </Wrapper>
    );
  }

  return (
    <Wrapper variant={variant} hasThumbnail css={customStyle}>
      <Flexbox direction="vertical" gap={6}>
        <Skeleton width="100%" maxWidth={200} height={17.5} round={6} disableAspectRatio />
        <Flexbox gap={12}>
          <Skeleton width={30} height={14} round={6} disableAspectRatio />
          <Skeleton width={30} height={14} round={6} disableAspectRatio />
          <Skeleton width={30} height={14} round={6} disableAspectRatio />
          <Skeleton width={50} height={14} round={6} disableAspectRatio />
        </Flexbox>
      </Flexbox>
      <Skeleton ratio="16:9" round={8} />
    </Wrapper>
  );
}

export default StorageBoardCardSkeleton;
