import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { noticesParamsDefault } from '@recoil/pages/notices/atoms';

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
  const isGoBack = req.cookies.isGoBack ? JSON.parse(req.cookies.isGoBack) : false;
  if (isGoBack) {
    res.setHeader('Set-Cookie', 'isGoBack=false;path=/');

    return {
      props: {}
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
