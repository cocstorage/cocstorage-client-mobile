import { useRef } from 'react';

import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import {
  StorageBoardContent,
  StorageBoardFooter,
  StorageBoardHeader
} from '@components/pages/storageBoard';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import CommentList from '@components/UI/organisms/CommentList';

import { fetchStorageBoard } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoard() {
  const recommendFeatureRef = useRef<HTMLDivElement>();

  return (
    <GeneralTemplate
      header={<StorageBoardHeader />}
      footer={<StorageBoardFooter recommendFeatureRef={recommendFeatureRef} />}
    >
      <StorageBoardContent recommendFeatureRef={recommendFeatureRef} />
      <CommentList customStyle={{ margin: '40px 0 20px' }} />
    </GeneralTemplate>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  try {
    const queryClient = new QueryClient();
    const path = String(query.path);
    const id = Number(query.id);

    const storage = await fetchStorage(path);
    const storageBoard = await fetchStorageBoard(storage.id, id);

    await queryClient.setQueryData(queryKeys.storages.storageById(path), storage);
    await queryClient.setQueryData(queryKeys.storageBoards.storageBoardById(id), storageBoard);

    return {
      props: {
        dehydratedState: dehydrate(queryClient)
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}

export default StorageBoard;
