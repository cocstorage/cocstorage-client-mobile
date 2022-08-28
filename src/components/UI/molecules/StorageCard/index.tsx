import { HTMLAttributes } from 'react';

import { Flexbox, Image, Typography } from 'cocstorage-ui';

interface StorageCardProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  name: string;
}

function StorageCard({ src, name, ...props }: StorageCardProps) {
  return (
    <Flexbox direction="vertical" gap={6} {...props} customStyle={{ cursor: 'pointer' }}>
      <Image width="auto" height="auto" src={src} round={6} alt="Storage Img" />
      <Typography customStyle={{ textAlign: 'center' }}>{name}</Typography>
    </Flexbox>
  );
}

export default StorageCard;
