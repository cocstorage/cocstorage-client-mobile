import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import {
  IndexBestStorageBoardList,
  IndexHead,
  IndexLatestStorageBoardList,
  IndexNoticeAlert,
  IndexWorstStorageBoardList
} from '@components/pages/index';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { BottomNavigation, Header } from '@components/UI/molecules';
import IssueKeywordRank from '@components/UI/organisms/IssueKeywordRank';

import { fetchIndexNotice } from '@api/v1/notices';

import queryKeys from '@constants/queryKeys';

function Index() {
  return (
    <>
      <IndexHead />
      <GeneralTemplate header={<Header />} footer={<BottomNavigation />}>
        <IndexNoticeAlert />
        <IssueKeywordRank disableFillEdgeBlanks={false} customStyle={{ marginTop: 32 }} />
        <IndexBestStorageBoardList />
        <IndexWorstStorageBoardList />
        <IndexLatestStorageBoardList />
      </GeneralTemplate>
    </>
  );
}

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const isReturning = req.cookies.isReturning ? JSON.parse(req.cookies.isReturning) : false;
  if (isReturning) {
    res.setHeader('Set-Cookie', 'isReturning=false;path=/');

    return {
      props: {
        dehydratedState: null
      }
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
