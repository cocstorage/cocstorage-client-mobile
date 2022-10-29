import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { useRecoilState, useRecoilValue } from 'recoil';

import {
  storageBoardsSearchParamsState,
  storageBoardsSearchPendingState
} from '@recoil/pages/storageBoardsSearch/atoms';

import { Box, Flexbox, Icon, Pagination, Typography, useTheme } from 'cocstorage-ui';

import StorageBoardCard from '@components/UI/molecules/StorageBoardCard';
import StorageBoardCardSkeleton from '@components/UI/molecules/StorageBoardCard/StorageBoardCardSkeleton';

import { fetchStorageBoards } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoardsSearchList() {
  const router = useRouter();
  const { path } = router.query;

  const [params, setParams] = useRecoilState(storageBoardsSearchParamsState);
  const pending = useRecoilValue(storageBoardsSearchPendingState);

  const {
    theme: {
      mode,
      palette: { text }
    }
  } = useTheme();

  const { data: { name } = {} } = useQuery(queryKeys.storages.storageById(String(path)), () =>
    fetchStorage(String(path))
  );

  const {
    data: { boards = [], pagination: { totalPages = 1, perPage = 20, currentPage = 1 } = {} } = {},
    isLoading
  } = useQuery(
    queryKeys.storageBoards.storageBoardsSearchByIdWithParams(String(path), params),
    () => fetchStorageBoards(String(path), params),
    {
      enabled: !!params.subject,
      keepPreviousData: true
    }
  );

  const handleChange = (value: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: value
    }));
  };

  if ((!isLoading && !pending && !boards.length) || !params.subject) {
    return (
      <Box component="section" customStyle={{ marginTop: 180 }}>
        <Flexbox direction="vertical" alignment="center" gap={16}>
          <Icon
            name={params.subject ? 'InfoOutlined' : 'SearchOutlined'}
            width={48}
            height={48}
            color={text[mode].text2}
          />
          {params.subject ? (
            <Typography variant="p2" color={text[mode].text2}>
              {params.subject} 에 대한 검색 결과가 없어요!
            </Typography>
          ) : (
            <Typography variant="p2" color={text[mode].text2}>
              {name} 게시판의 모든 게시글을 검색해요.
            </Typography>
          )}
        </Flexbox>
      </Box>
    );
  }

  return (
    <>
      <Flexbox component="section" direction="vertical" gap={20}>
        {(pending || isLoading) &&
          Array.from({ length: 20 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <StorageBoardCardSkeleton key={`search-storage-board-skeleton-${index}`} />
          ))}
        {!pending &&
          !isLoading &&
          boards.map((storageBoard) => (
            <StorageBoardCard
              key={`search-storage-board-${storageBoard.id}`}
              storageBoard={storageBoard}
              highLiteSubject={params.subject}
            />
          ))}
      </Flexbox>
      <Flexbox component="section" justifyContent="center" customStyle={{ margin: '25px auto' }}>
        <Pagination
          count={totalPages * perPage}
          page={currentPage}
          rowPerPage={perPage}
          itemCount={5}
          onChange={handleChange}
        />
      </Flexbox>
    </>
  );
}

export default StorageBoardsSearchList;
