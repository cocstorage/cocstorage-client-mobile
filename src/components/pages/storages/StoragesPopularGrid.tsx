import Link from 'next/link';

import { useRecoilValue } from 'recoil';

import { selectedCategoryIdState } from '@recoil/storages/atoms';

import { Box, Grid, Typography } from 'cocstorage-ui';

import StorageCard from '@components/UI/molecules/StorageCard';

function StoragesPopularGrid() {
  const selectedCategoryId = useRecoilValue(selectedCategoryIdState);

  if (selectedCategoryId) return null;

  return (
    <Box component="section" customStyle={{ marginTop: 20 }}>
      <Typography variant="h4" fontWeight="bold">
        인기 게시판
      </Typography>
      <Grid container columnGap={16} rowGap={20} customStyle={{ marginTop: 10 }}>
        <Grid item xs={2} sm={3}>
          <Link href="/storages/ibroadcast">
            <a>
              <StorageCard
                src={`https://${process.env.IMAGE_DOMAIN}/images/xt868xt2w6i50bf4x98xdsbfado3`}
                name="인터넷 방송"
              />
            </a>
          </Link>
        </Grid>
        <Grid item xs={2} sm={3}>
          <Link href="/storages/streamer">
            <a>
              <StorageCard
                src={`https://${process.env.IMAGE_DOMAIN}/images/zksw76puo6l255o5sabljom0gw8l`}
                name="스트리머"
              />
            </a>
          </Link>
        </Grid>
        <Grid item xs={2} sm={3}>
          <Link href="/storages/baseball">
            <a>
              <StorageCard
                src={`https://${process.env.IMAGE_DOMAIN}/images/uvx4jiy4ur5hm0t0vpbqb3lw1qq9`}
                name="야구"
              />
            </a>
          </Link>
        </Grid>
        <Grid item xs={2} sm={3}>
          <Link href="/storages/hotissue">
            <a>
              <StorageCard
                src={`https://${process.env.IMAGE_DOMAIN}/images/on6nrgp7utess2qf3lyj8ry921tm`}
                name="핫이슈"
              />
            </a>
          </Link>
        </Grid>
        <Grid item xs={2} sm={3}>
          <Link href="/storages/bitcoins">
            <a>
              <StorageCard
                src={`https://${process.env.IMAGE_DOMAIN}/images/58l159jwcs71iwkdx0kh4reg5ra6`}
                name="비트코인"
              />
            </a>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StoragesPopularGrid;
