import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { fetchStorage } from '@api/v1/storages';
import {
  StorageBoardSearchBar,
  StorageBoardSearchList,
  StorageBoardSearchTabs,
  StorageBoardsSearchHead
} from '@components/pages/storageBoardSearch';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
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

export async function getServerSideProps({ req, res, query }: GetServerSidePropsContext) {
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
