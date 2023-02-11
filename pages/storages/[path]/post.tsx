import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import {
  StorageBoardsPostBottomSheet,
  StorageBoardsPostEditor,
  StorageBoardsPostHead,
  StorageBoardsPostHeader,
  StorageBoardsPostSubjectInput
} from '@components/pages/storageBoardsPost';
import WideFlexibleTemplate from '@components/templeates/WideFlexibleTemplate';

import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoardsPost() {
  return (
    <>
      <StorageBoardsPostHead />
      <WideFlexibleTemplate header={<StorageBoardsPostHeader />} enableMainOverflowHidden>
        <StorageBoardsPostSubjectInput />
        <StorageBoardsPostEditor />
      </WideFlexibleTemplate>
      <StorageBoardsPostBottomSheet />
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

export default StorageBoardsPost;
