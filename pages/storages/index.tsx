import { Alert, Icon } from 'cocstorage-ui';

import {
  StoragesCategoryTagList,
  StoragesGrid,
  StoragesPopularGrid
} from '@components/pages/storages';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { BottomNavigation, Header } from '@components/UI/molecules';

function Storages() {
  return (
    <GeneralTemplate header={<Header />} footer={<BottomNavigation />}>
      <Alert icon={<Icon name="BulbOutlined" />} customStyle={{ marginTop: 14 }}>
        게시판을 만들 수 있는 기능을 준비하고 있어요! 조금만 기다려주세요.
      </Alert>
      <StoragesCategoryTagList />
      <StoragesPopularGrid />
      <StoragesGrid />
    </GeneralTemplate>
  );
}

export default Storages;
