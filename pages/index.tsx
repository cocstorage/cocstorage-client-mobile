import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { BottomNavigation, Header } from '@components/UI/molecules';

function Index() {
  return (
    <GeneralTemplate header={<Header />} footer={<BottomNavigation />}>
      <div>Index</div>
    </GeneralTemplate>
  );
}

export default Index;
