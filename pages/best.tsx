import { QueryClient, dehydrate } from '@tanstack/react-query';

import { bestParamsDefault } from '@recoil/best/atoms';

import { BestHeader, BestStorageBoardList } from '@components/pages/best';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import BottomNavigation from '@components/UI/molecules/BottomNavigation';

import { fetchPopularStorageBoards } from '@api/v1/storage-boards';

import queryKeys from '@constants/queryKeys';

function Best() {
  return (
    <GeneralTemplate header={<BestHeader />} footer={<BottomNavigation />}>
      <BestStorageBoardList />
    </GeneralTemplate>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    queryKeys.storageBoards.popularStorageBoardsWithParams(bestParamsDefault),
    () => fetchPopularStorageBoards(bestParamsDefault)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default Best;
