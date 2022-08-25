import { NoticesHeader, NoticesList } from '@components/pages/notices';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import BottomNavigation from '@components/UI/molecules/BottomNavigation';

function Notices() {
  return (
    <GeneralTemplate header={<NoticesHeader />} footer={<BottomNavigation />}>
      <NoticesList />
    </GeneralTemplate>
  );
}

export default Notices;
