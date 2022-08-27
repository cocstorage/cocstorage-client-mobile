import { HTMLAttributes } from 'react';

import { Flexbox, Typography } from 'cocstorage-ui';

import RatioImage from '@components/UI/atoms/RatioImage';

interface StorageCardProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  name: string;
}

function StorageCard({ src, name, ...props }: StorageCardProps) {
  return (
    <Flexbox direction="vertical" gap={6} {...props} customStyle={{ cursor: 'pointer' }}>
      <RatioImage
        src={src}
        alt="Storage Img"
        customStyle={{ borderRadius: 6, overflow: 'hidden' }}
      />
      <Typography customStyle={{ textAlign: 'center' }}>{name}</Typography>
    </Flexbox>
  );
}

export default StorageCard;
