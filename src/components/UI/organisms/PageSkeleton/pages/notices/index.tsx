import { Box, Flexbox } from 'cocstorage-ui';

import { NoticesHeader } from '@components/pages/notices';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import BottomNavigation from '@components/UI/molecules/BottomNavigation';
import NoticeCardSkeleton from '@components/UI/molecules/NoticeCard/NoticeCardSkeleton';

import { SkeletonGroup } from '../..';

function Notices() {
  return (
    <GeneralTemplate
      header={
        <Box style={{ position: 'relative', zIndex: 10 }}>
          <NoticesHeader />
        </Box>
      }
      footer={
        <Box style={{ position: 'relative', zIndex: '10' }}>
          <BottomNavigation disableOnBoarding />
        </Box>
      }
      disableFlexible={false}
    >
      <SkeletonGroup>
        <Flexbox component="section" direction="vertical" gap={18} customStyle={{ marginTop: 20 }}>
          {Array.from({ length: 20 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <NoticeCardSkeleton key={`notice-skeleton-${index}`} />
          ))}
        </Flexbox>
      </SkeletonGroup>
    </GeneralTemplate>
  );
}

export default Notices;
