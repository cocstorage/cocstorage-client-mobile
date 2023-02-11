import {
  StorageBoardPostEditor,
  StorageBoardPostHeader,
  StorageBoardPostSubjectInput
} from '@components/pages/storageBoardPost';
import WideFlexibleTemplate from '@components/templeates/WideFlexibleTemplate';

function StorageBoardPost() {
  return (
    <WideFlexibleTemplate header={<StorageBoardPostHeader />} enableMainOverflowHidden>
      <StorageBoardPostSubjectInput />
      <StorageBoardPostEditor />
    </WideFlexibleTemplate>
  );
}

export default StorageBoardPost;
