import { Flexbox } from 'cocstorage-ui';

import StorageBoardCard from '@components/UI/molecules/StorageBoardCard';

function StorageBoardsList() {
  return (
    <Flexbox
      component="section"
      direction="vertical"
      gap={18}
      customStyle={{
        margin: '20px 0'
      }}
    >
      {Array.from({ length: 20 }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <StorageBoardCard key={`storage-board-card-${index}`} inStorage />
      ))}
    </Flexbox>
  );
}

export default StorageBoardsList;
