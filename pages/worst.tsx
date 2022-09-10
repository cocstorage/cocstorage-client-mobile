import { QueryClient, dehydrate } from '@tanstack/react-query';

import { worstParamsDefault } from '@recoil/worst/atoms';

import { Alert, Icon } from 'cocstorage-ui';

import { WorstHead, WorstHeader, WorstStorageBoardList } from '@components/pages/worst';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import BottomNavigation from '@components/UI/molecules/BottomNavigation';

import { fetchWorstStorageBoards } from '@api/v1/storage-boards';

import queryKeys from '@constants/queryKeys';

function Worst() {
  return (
    <>
      <WorstHead />
      <GeneralTemplate header={<WorstHeader />} footer={<BottomNavigation />}>
        <Alert icon={<Icon name="BulbOutlined" />} customStyle={{ marginTop: 20 }}>
          좀 더 편하게 보실 수 있도록 준비하고 있어요. 불편하시겠지만 조금만 기다려주세요!
        </Alert>
        <WorstStorageBoardList />
      </GeneralTemplate>
    </>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    queryKeys.storageBoards.worstStorageBoardsWithParams(worstParamsDefault),
    () => fetchWorstStorageBoards(worstParamsDefault)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default Worst;
