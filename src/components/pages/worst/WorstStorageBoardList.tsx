import { Flexbox } from 'cocstorage-ui';

import StorageBoardCard from '@components/UI/molecules/StorageBoardCard';

function WorstStorageBoardList() {
  return (
    <Flexbox gap={18} direction="vertical" customStyle={{ marginTop: 20 }}>
      <StorageBoardCard />
      <StorageBoardCard />
      <StorageBoardCard />
      <StorageBoardCard />
      <StorageBoardCard />
      <StorageBoardCard />
      <StorageBoardCard />
      <StorageBoardCard />
      <StorageBoardCard />
      <StorageBoardCard />
    </Flexbox>
  );
}

export default WorstStorageBoardList;
