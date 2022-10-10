import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { noticesParamsDefault } from '@recoil/notices/atoms';

import { NoticeHead, NoticesHeader, NoticesList } from '@components/pages/notices';
import GeneralTemplate from '@components/templeates/GeneralTemplate';

import { fetchNotices } from '@api/v1/notices';

import queryKeys from '@constants/queryKeys';

function Notices() {
  return (
    <>
      <NoticeHead />
      <GeneralTemplate header={<NoticesHeader />}>
        <NoticesList />
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

  await queryClient.prefetchQuery(queryKeys.notices.noticesWithParams(noticesParamsDefault), () =>
    fetchNotices(noticesParamsDefault)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default Notices;
