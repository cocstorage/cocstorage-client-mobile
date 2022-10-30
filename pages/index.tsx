import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import {
  IndexBestStorageBoardList,
  IndexHead,
  IndexIssueKeywordRank,
  IndexLatestStorageBoardList,
  IndexNoticeAlert,
  IndexWorstStorageBoardList
} from '@components/pages/index';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { BottomNavigation, Header } from '@components/UI/molecules';

import { fetchIndexNotice } from '@api/v1/notices';

import queryKeys from '@constants/queryKeys';

function Index() {
  return (
    <>
      <IndexHead />
      <GeneralTemplate header={<Header />} footer={<BottomNavigation />}>
        <IndexNoticeAlert />
        <IndexIssueKeywordRank />
        <IndexBestStorageBoardList />
        <IndexWorstStorageBoardList />
        <IndexLatestStorageBoardList />
      </GeneralTemplate>
    </>
  );
}

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const isGoBack = req.cookies.isGoBack ? JSON.parse(req.cookies.isGoBack) : false;
  if (isGoBack) {
    res.setHeader('Set-Cookie', 'isGoBack=false;path=/');

    return {
      props: {}
    };
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryKeys.notices.indexNotice, fetchIndexNotice);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default Index;
