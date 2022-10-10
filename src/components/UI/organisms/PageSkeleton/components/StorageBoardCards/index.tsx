import { Flexbox } from 'cocstorage-ui';

import StorageBoardCardSkeleton from '@components/UI/molecules/StorageBoardCard/StorageBoardCardSkeleton';

function StorageBoardCards() {
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
        <StorageBoardCardSkeleton key={`storage-board-skeleton-${index}`} />
      ))}
    </Flexbox>
  );
}

export default StorageBoardCards;
