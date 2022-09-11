import { HTMLAttributes } from 'react';

import Link from 'next/link';

import { Flexbox, Image, Typography } from 'cocstorage-ui';

interface StorageCardProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  path: string;
  name: string;
}

function StorageCard({ src, path, name, ...props }: StorageCardProps) {
  return (
    <Link href={`/storages/${path}`}>
      <a>
        <Flexbox direction="vertical" gap={6} {...props} customStyle={{ cursor: 'pointer' }}>
          <Image width="auto" height="auto" src={src || ''} round={6} alt="Storage Img" />
          <Typography customStyle={{ textAlign: 'center' }}>{name}</Typography>
        </Flexbox>
      </a>
    </Link>
  );
}

export default StorageCard;
