import { Alert, Box, Flexbox, Grid, Skeleton, useTheme } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';

import StoragesHeader from '@components/pages/storages/StoragesHeader';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import BottomNavigation from '@components/UI/molecules/BottomNavigation';

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
      disableFlexible={false}
    >
      <Alert icon={<Icon name="BulbOutlined" />} customStyle={{ marginTop: 14 }}>
        게시판을 만들 수 있는 기능을 준비하고 있어요! 조금만 기다려주세요.
      </Alert>
      <Flexbox
        gap={10}
        customStyle={{
          marginTop: 20,
          paddingBottom: 10,
          position: 'sticky',
          top: 50,
          backgroundColor: background.bg,
          zIndex: 7
        }}
      >
        <Skeleton width={123.7} height={32} round={8} disableAspectRatio />
        <Skeleton width={44.6} height={32} round={8} disableAspectRatio />
        <Skeleton width={44.6} height={32} round={8} disableAspectRatio />
      </Flexbox>
      <Box customStyle={{ marginTop: 10 }}>
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
                <Flexbox direction="vertical" gap={6}>
                  <Skeleton round={6} />
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
                <Flexbox direction="vertical" gap={6}>
                  <Skeleton round={6} />
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
      </Box>
    </GeneralTemplate>
  );
}

export default StorageBoard;
