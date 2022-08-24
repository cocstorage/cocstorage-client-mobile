import { WorstHeader, WorstStorageBoardList } from '@components/pages/worst';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import BottomNavigation from '@components/UI/molecules/BottomNavigation';

function Worst() {
  return (
    <GeneralTemplate header={<WorstHeader />} footer={<BottomNavigation />}>
      <WorstStorageBoardList />
    </GeneralTemplate>
  );
}

export default Worst;
