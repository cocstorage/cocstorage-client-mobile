import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { storageBoardsParamsDefault } from '@recoil/storageBoards/atoms';

import { Alert, Icon } from 'cocstorage-ui';

import {
  StorageBoardsHead,
  StorageBoardsHeader,
  StorageBoardsInfoBottomSheet,
  StorageBoardsList,
  StorageBoardsNoticeDialog,
  StorageBoardsTabs
} from '@components/pages/storageBoards';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import BottomNavigation from '@components/UI/molecules/BottomNavigation';

import { fetchStorageBoards } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoards() {
  return (
    <>
      <StorageBoardsHead />
      <GeneralTemplate header={<StorageBoardsHeader />} footer={<BottomNavigation />}>
        <StorageBoardsTabs />
        <Alert icon={<Icon name="PinOutlined" />} customStyle={{ marginTop: 12 }}>
          게시글을 작성할 수 있는 기능을 준비하고 있어요! 조금만 기다려주세요.
        </Alert>
        <StorageBoardsList />
      </GeneralTemplate>
      <StorageBoardsInfoBottomSheet />
      <StorageBoardsNoticeDialog />
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
