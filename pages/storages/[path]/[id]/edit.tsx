import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import {
  StorageBoardEditAuthBottomSheet,
  StorageBoardEditEditor,
  StorageBoardEditHeader,
  StorageBoardEditSubjectInput
} from '@components/pages/storageBoardEdit';
import WideFlexibleTemplate from '@components/templeates/WideFlexibleTemplate';

import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoardEdit() {
  return (
    <>
      <WideFlexibleTemplate header={<StorageBoardEditHeader />} enableMainOverflowHidden>
        <StorageBoardEditSubjectInput />
        <StorageBoardEditEditor />
      </WideFlexibleTemplate>
      <StorageBoardEditAuthBottomSheet />
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

export default StorageBoardEdit;
