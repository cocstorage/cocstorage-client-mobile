import { MouseEvent } from 'react';

import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { Box, Typography } from 'cocstorage-ui';

import StorageBoardCard from '@components/UI/molecules/StorageBoardCard';
import StorageBoardCardSkeleton from '@components/UI/molecules/StorageBoardCard/StorageBoardCardSkeleton';

import { fetchLatestStorageBoards } from '@api/v1/storage-boards';

import queryKeys from '@constants/queryKeys';

function IndexLatestStorageBoardList() {
  const router = useRouter();
  const { data: { boards = [] } = {}, isLoading } = useQuery(
    queryKeys.storageBoards.latestStorageBoards,
    fetchLatestStorageBoards
  );

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const dataPath = event.currentTarget.getAttribute('data-path');
    const dataId = event.currentTarget.getAttribute('data-id');

    router.push(`/storages/${dataPath}/${dataId}`);
  };

  return (
    <Box component="section" customStyle={{ margin: '32px 0 20px' }}>
      <Typography variant="h4" fontWeight="bold">
        최신 게시글
      </Typography>
      <Box customStyle={{ marginTop: 20 }}>
        {isLoading &&
          Array.from({ length: 20 }).map((_, index) => (
            <StorageBoardCardSkeleton
              // eslint-disable-next-line react/no-array-index-key
              key={`index-latest-storage-board-${index}`}
              customStyle={{ marginTop: index === 0 ? undefined : 18 }}
            />
          ))}
        {!isLoading &&
          boards.map((storageBoard, index) => (
            <StorageBoardCard
              key={`index-latest-storage-board-${storageBoard.id}`}
              storageBoard={storageBoard}
              inStorage={false}
              data-path={storageBoard.storage.path}
              data-id={storageBoard.id}
              onClick={handleClick}
              customStyle={{ marginTop: index === 0 ? undefined : 18 }}
            />
          ))}
      </Box>
    </Box>
  );
}

export default IndexLatestStorageBoardList;
