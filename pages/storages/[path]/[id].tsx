import {
  StorageBoardContent,
  StorageBoardFooter,
  StorageBoardHeader
} from '@components/pages/storageBoard';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import CommentList from '@components/UI/organisms/CommentList';

function StorageBoard() {
  return (
    <GeneralTemplate
      header={<StorageBoardHeader />}
      footer={<StorageBoardFooter variant="default" />}
    >
      <StorageBoardContent />
      <CommentList customStyle={{ margin: '40px 0 20px' }} />
    </GeneralTemplate>
  );
}

export default StorageBoard;
