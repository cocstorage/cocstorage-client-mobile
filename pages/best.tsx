import { QueryClient, dehydrate } from '@tanstack/react-query';

import { bestParamsDefault } from '@recoil/best/atoms';

import { Alert, Icon } from 'cocstorage-ui';

import { BestHead, BestHeader, BestStorageBoardList } from '@components/pages/best';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import BottomNavigation from '@components/UI/molecules/BottomNavigation';

import { fetchPopularStorageBoards } from '@api/v1/storage-boards';

import queryKeys from '@constants/queryKeys';

function Best() {
  return (
    <>
      <BestHead />
      <GeneralTemplate header={<BestHeader />} footer={<BottomNavigation />}>
        <Alert icon={<Icon name="BulbOutlined" />} customStyle={{ marginTop: 20 }}>
          좀 더 편하게 보실 수 있도록 준비하고 있어요. 불편하시겠지만 조금만 기다려주세요!
        </Alert>
        <BestStorageBoardList />
      </GeneralTemplate>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const isGoBack = req.cookies.isGoBack ? JSON.parse(req.cookies.isGoBack) : false;
  if (isGoBack) {
    res.setHeader('Set-Cookie', 'isGoBack=false;path=/');

    return {
      props: {}
    };
  }

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
