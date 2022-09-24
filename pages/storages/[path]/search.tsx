import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import {
  StorageBoardSearchBar,
  StorageBoardSearchList,
  StorageBoardSearchTabs,
  StorageBoardsSearchHead
} from '@components/pages/storageBoardSearch';
import GeneralTemplate from '@components/templeates/GeneralTemplate';

import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoardsSearch() {
  return (
    <>
      <StorageBoardsSearchHead />
      <GeneralTemplate header={<StorageBoardSearchBar />}>
        <StorageBoardSearchTabs />
        <StorageBoardSearchList />
      </GeneralTemplate>
    </>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  try {
    const queryClient = new QueryClient();
    const path = String(query.path);

    const storage = await fetchStorage(path);

    await queryClient.setQueryData(queryKeys.storages.storageById(path), storage);

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

export default StorageBoardsSearch;
