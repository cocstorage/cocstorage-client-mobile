import { Alert, Box, Icon } from 'cocstorage-ui';

import { WorstHeader } from '@components/pages/worst';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import BottomNavigation from '@components/UI/molecules/BottomNavigation';

import { SkeletonGroup } from '../..';
import { StorageBoardCards } from '../../components';

function Worst() {
  return (
    <GeneralTemplate
      header={
        <Box style={{ position: 'relative', zIndex: 10 }}>
          <WorstHeader />
        </Box>
      }
      footer={
        <Box style={{ position: 'relative', zIndex: 10 }}>
          <BottomNavigation disableOnBoarding />
        </Box>
      }
    >
      <Alert icon={<Icon name="BulbOutlined" />} customStyle={{ marginTop: 20 }}>
        좀 더 편하게 보실 수 있도록 준비하고 있어요. 불편하시겠지만 조금만 기다려주세요!
      </Alert>
      <SkeletonGroup css={{ marginTop: 10 }}>
        <StorageBoardCards />
      </SkeletonGroup>
    </GeneralTemplate>
  );
}

export default Worst;
