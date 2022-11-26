import { HTMLAttributes } from 'react';

import Link from 'next/link';

import { Image, Typography } from 'cocstorage-ui';

import { StyledStorageCard } from './StorageCard.styles';

interface StorageCardProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  path: string;
  name: string;
}

function StorageCard({ src, path, name, ...props }: StorageCardProps) {
  return (
    <Link href={`/storages/${path}`}>
      <StyledStorageCard {...props}>
        <Image src={src || ''} round={6} alt="Storage Img" />
        <Typography customStyle={{ textAlign: 'center' }}>{name}</Typography>
      </StyledStorageCard>
    </Link>
  );
}

export default StorageCard;
