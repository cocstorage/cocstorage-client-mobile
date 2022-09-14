import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import styled from '@emotion/styled';

import { Box, Flexbox, Icon, IconButton, Tag, Typography, useTheme } from 'cocstorage-ui';

import StorageBoardCard from '@components/UI/molecules/StorageBoardCard';
import StorageBoardCardSkeleton from '@components/UI/molecules/StorageBoardCard/StorageBoardCardSkeleton';

import { fetchIndexWorstStorageBoards } from '@api/v1/storage-boards';

import queryKeys from '@constants/queryKeys';

function IndexWorstStorageBoardList() {
  const router = useRouter();
  const {
    theme: {
      palette: {
        secondary: { red }
      }
    }
  } = useTheme();

  const { data: { boards = [] } = {}, isLoading } = useQuery(
    queryKeys.storageBoards.indexWorstStorageBoards,
    fetchIndexWorstStorageBoards
  );

  const handleClickMore = () => router.push('/worst');

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
            startIcon={<Icon name="ThumbsDownOutlined" width={14} height={14} color={red.main} />}
            customStyle={{
              padding: '0 6px',
              height: 21,
              borderRadius: 4,
              fontSize: 12,
              backgroundColor: red.bg,
              color: red.main
            }}
          >
            워스트
          </Tag>
          <Typography variant="h4" fontWeight="bold">
            와 선 넘네
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
            <StorageBoardCardSkeleton key={`index-worst-storage-board-${index}`} variant="normal" />
          ))}
        {!isLoading &&
          boards.map((storageBoard) => (
            <StorageBoardCard
              key={`index-worst-storage-board-${storageBoard.id}`}
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

export default IndexWorstStorageBoardList;
