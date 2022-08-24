import { BestHeader, BestStorageBoardList } from '@components/pages/best';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import BottomNavigation from '@components/UI/molecules/BottomNavigation';

function Best() {
  return (
    <GeneralTemplate header={<BestHeader />} footer={<BottomNavigation />}>
      <BestStorageBoardList />
    </GeneralTemplate>
  );
}

export default Best;
