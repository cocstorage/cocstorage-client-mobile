import { QueryClient, dehydrate } from '@tanstack/react-query';

import { worstParamsDefault } from '@recoil/worst/atoms';

import { WorstHeader, WorstStorageBoardList } from '@components/pages/worst';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import BottomNavigation from '@components/UI/molecules/BottomNavigation';

import { fetchWorstStorageBoards } from '@api/v1/storage-boards';

import queryKeys from '@constants/queryKeys';

function Worst() {
  return (
    <GeneralTemplate header={<WorstHeader />} footer={<BottomNavigation />}>
      <WorstStorageBoardList />
    </GeneralTemplate>
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
