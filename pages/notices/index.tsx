import { QueryClient, dehydrate } from '@tanstack/react-query';

import { noticesParamsDefault } from '@recoil/notices/atoms';

import { NoticeHead, NoticesHeader, NoticesList } from '@components/pages/notices';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import BottomNavigation from '@components/UI/molecules/BottomNavigation';

import { fetchNotices } from '@api/v1/notices';

import queryKeys from '@constants/queryKeys';

function Notices() {
  return (
    <>
      <NoticeHead />
      <GeneralTemplate header={<NoticesHeader />} footer={<BottomNavigation />}>
        <NoticesList />
      </GeneralTemplate>
    </>
  );
}

export async function getServerSideProps() {
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
