import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { fetchStorageBoards } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';
import {
  StorageBoardsHead,
  StorageBoardsHeader,
  StorageBoardsInfoBottomSheet,
  StorageBoardsList,
  StorageBoardsNoticeAlert,
  StorageBoardsPostFloatingButton,
  StorageBoardsTabs
} from '@components/pages/storageBoards';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import BottomNavigation from '@components/UI/molecules/BottomNavigation';
import queryKeys from '@constants/queryKeys';
import { storageBoardsParamsDefault } from '@recoil/pages/storageBoards/atoms';

function StorageBoards() {
  return (
    <>
      <StorageBoardsHead />
      <GeneralTemplate header={<StorageBoardsHeader />} footer={<BottomNavigation />}>
        <StorageBoardsTabs />
        <StorageBoardsNoticeAlert />
        <StorageBoardsList />
      </GeneralTemplate>
      <StorageBoardsPostFloatingButton />
      <StorageBoardsInfoBottomSheet />
    </>
  );
}

export async function getServerSideProps({ query, req, res }: GetServerSidePropsContext) {
  const isGoBack = req.cookies.isGoBack ? JSON.parse(req.cookies.isGoBack) : false;
  if (isGoBack) {
    res.setHeader('Set-Cookie', 'isGoBack=false;path=/');

    return {
      props: {}
    };
  }

  try {
    const queryClient = new QueryClient();
    const path = String(query.path);

    await queryClient.fetchQuery(queryKeys.storages.storageById(path), () => fetchStorage(path));
    await queryClient.fetchQuery(
      queryKeys.storageBoards.storageBoardsByIdWithParams(path, storageBoardsParamsDefault),
      () => fetchStorageBoards(path, storageBoardsParamsDefault)
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient)
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
}

export default StorageBoards;
