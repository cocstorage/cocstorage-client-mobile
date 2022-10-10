import { Alert, Box, Flexbox, Grid, Icon, Skeleton, useTheme } from 'cocstorage-ui';

import StoragesHeader from '@components/pages/storages/StoragesHeader';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import BottomNavigation from '@components/UI/molecules/BottomNavigation';

import { SkeletonGroup } from '../..';

function StorageBoard() {
  const {
    theme: {
      palette: { background }
    }
  } = useTheme();
  return (
    <GeneralTemplate
      header={
        <Box style={{ position: 'relative', zIndex: 10 }}>
          <StoragesHeader />
        </Box>
      }
      footer={
        <Box style={{ position: 'relative', zIndex: 10 }}>
          <BottomNavigation disableOnBoarding />
        </Box>
      }
    >
      <Alert icon={<Icon name="BulbOutlined" />} customStyle={{ marginTop: 14 }}>
        게시판을 만들 수 있는 기능을 준비하고 있어요! 조금만 기다려주세요.
      </Alert>
      <SkeletonGroup
        css={{
          display: 'flex',
          marginTop: 20,
          paddingBottom: 10,
          columnGap: 10,
          position: 'sticky',
          top: 50,
          backgroundColor: background.bg,
          zIndex: 7
        }}
      >
        <Skeleton width={70} height={33} round={8} disableAspectRatio />
        <Skeleton width={70} height={33} round={8} disableAspectRatio />
        <Skeleton width={70} height={33} round={8} disableAspectRatio />
      </SkeletonGroup>
      <SkeletonGroup css={{ marginTop: 10 }}>
        <Box component="section" customStyle={{ marginTop: 20 }}>
          <Skeleton width={110} height={23} round={6} disableAspectRatio />
          <Grid container columnGap={16} rowGap={20} customStyle={{ marginTop: 10 }}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Grid
                item
                // eslint-disable-next-line react/no-array-index-key
                key={`storage-skeleton-grid-1-${index}`}
                xs={3}
                style={{ position: 'relative' }}
              >
                <Flexbox direction="vertical" gap={6} customStyle={{ cursor: 'pointer' }}>
                  <Skeleton ratio="1:1" round={6} />
                  <Skeleton
                    width={58}
                    height={19}
                    round={6}
                    customStyle={{ margin: '0 auto' }}
                    disableAspectRatio
                  />
                </Flexbox>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box component="section" customStyle={{ marginTop: 30 }}>
          <Skeleton width={110} height={23} round={6} disableAspectRatio />
          <Grid container columnGap={16} rowGap={20} customStyle={{ marginTop: 10 }}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Grid
                item
                // eslint-disable-next-line react/no-array-index-key
                key={`storage-skeleton-grid-2-${index}`}
                xs={3}
                style={{ position: 'relative' }}
              >
                <Flexbox direction="vertical" gap={6} customStyle={{ cursor: 'pointer' }}>
                  <Skeleton ratio="1:1" round={6} />
                  <Skeleton
                    width={58}
                    height={19}
                    round={6}
                    customStyle={{ margin: '0 auto' }}
                    disableAspectRatio
                  />
                </Flexbox>
              </Grid>
            ))}
          </Grid>
        </Box>
      </SkeletonGroup>
    </GeneralTemplate>
  );
}

export default StorageBoard;
