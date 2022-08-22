import { Alert, Icon } from 'cocstorage-ui';

import {
  StorageBoardsHeader,
  StorageBoardsList,
  StorageBoardsTabs
} from '@components/pages/storageBoards';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import BottomNavigation from '@components/UI/molecules/BottomNavigation';

function StorageBoards() {
  return (
    <GeneralTemplate header={<StorageBoardsHeader />} footer={<BottomNavigation />}>
      <StorageBoardsTabs />
      <Alert icon={<Icon name="PinOutlined" />} customStyle={{ marginTop: 12 }}>
        게시글을 작성할 수 있는 기능을 준비하고 있어요! 조금만 기다려주세요.
      </Alert>
      <StorageBoardsList />
    </GeneralTemplate>
  );
}

export default StorageBoards;
