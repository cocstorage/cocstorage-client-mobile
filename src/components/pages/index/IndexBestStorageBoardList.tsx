import { useRouter } from 'next/router';

import { Box, Flexbox, IconButton, Tag, Typography } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import { fetchIndexPopularStorageBoards } from '@api/v1/storage-boards';
import StorageBoardCard from '@components/UI/molecules/StorageBoardCard';
import StorageBoardCardSkeleton from '@components/UI/molecules/StorageBoardCard/StorageBoardCardSkeleton';
import queryKeys from '@constants/queryKeys';

function IndexBestStorageBoardList() {
  const router = useRouter();
  const { data: { boards = [] } = {}, isLoading } = useQuery(
    queryKeys.storageBoards.indexPopularStorageBoards,
    fetchIndexPopularStorageBoards
  );

  const handleClickMore = () => router.push('/best');

  return (
    <Box component="section" customStyle={{ margin: '30px -20px 0' }}>
      <Flexbox
        alignment="center"
        justifyContent="space-between"
        gap={4}
        customStyle={{ margin: '0 20px' }}
      >
        <Flexbox alignment="center" justifyContent="space-between" gap={8}>
          <Tag
            variant="semiAccent"
            startIcon={<Icon name="ThumbsUpOutlined" width={14} height={14} />}
            customStyle={{
              padding: '0 6px',
              height: 21,
              borderRadius: 4,
              fontSize: 12
            }}
          >
            베스트
          </Tag>
          <Typography variant="h4" fontWeight="bold">
            ㅇㄱㄹㅇ
          </Typography>
        </Flexbox>
        <IconButton onClick={handleClickMore}>
          <Icon name="CaretSemiRightOutlined" />
        </IconButton>
      </Flexbox>
      <List>
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <StorageBoardCardSkeleton key={`index-best-storage-board-${index}`} variant="normal" />
          ))}
        {!isLoading &&
          boards.map((storageBoard) => (
            <StorageBoardCard
              key={`index-best-storage-board-${storageBoard.id}`}
              variant="normal"
              storageBoard={storageBoard}
              hideSymbolismBadge
              customStyle={{ maxWidth: 330 }}
            />
          ))}
      </List>
    </Box>
  );
}

export const List = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  column-gap: 12px;
  margin-top: 14px;
  padding: 0 20px;
  overflow-x: auto;
`;

export default IndexBestStorageBoardList;
