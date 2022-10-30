import { Flexbox, Skeleton } from 'cocstorage-ui';

function CommentSkeleton() {
  return (
    <Flexbox gap={10} customStyle={{ flex: 1 }}>
      <Skeleton width={30} height={30} disableAspectRatio customStyle={{ borderRadius: '50%' }} />
      <Flexbox direction="vertical" gap={4} customStyle={{ flex: 1 }}>
        <Skeleton width="100%" maxWidth={50} height={15} disableAspectRatio />
        <Flexbox direction="vertical" gap={8}>
          <Skeleton width="100%" maxWidth={200} height={18} disableAspectRatio />
          <Skeleton width="100%" maxWidth={120} height={18} disableAspectRatio />
          <Skeleton width="100%" maxWidth={150} height={18} disableAspectRatio />
        </Flexbox>
        <Flexbox direction="vertical" gap={15} customStyle={{ marginTop: 8 }}>
          <Flexbox gap={12} alignment="center">
            <Skeleton width={30} height={15} disableAspectRatio />
            <Skeleton width={40} height={15} disableAspectRatio />
          </Flexbox>
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
}

export default CommentSkeleton;
