import { useRouter } from 'next/router';

import { Flexbox, Typography } from 'cocstorage-ui';

import RatioImage from '@components/UI/atoms/RatioImage';

function StorageCard() {
  const router = useRouter();
  return (
    <Flexbox
      direction="vertical"
      gap={6}
      onClick={() => router.push('/storages/ibroadcast')}
      customStyle={{ cursor: 'pointer' }}
    >
      <RatioImage
        src="https://static.cocstorage.com/images/xt868xt2w6i50bf4x98xdsbfado3"
        alt="Storage Img"
        customStyle={{ borderRadius: 6, overflow: 'hidden' }}
      />
      <Typography customStyle={{ textAlign: 'center' }}>인터넷 방송</Typography>
    </Flexbox>
  );
}

export default StorageCard;
