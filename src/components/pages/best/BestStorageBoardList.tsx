import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import { useRecoilState } from 'recoil';

import { bestParamsState } from '@recoil/best/atoms';

import { Flexbox, Pagination } from 'cocstorage-ui';

import StorageBoardCard from '@components/UI/molecules/StorageBoardCard';

import { fetchPopularStorageBoards } from '@api/v1/storage-boards';

import queryKeys from '@constants/queryKeys';

function BestStorageBoardList() {
  const [params, setParams] = useRecoilState(bestParamsState);

  const {
    data: { boards = [], pagination: { totalPages = 1, perPage = 20, currentPage = 1 } = {} } = {}
  } = useQuery(
    queryKeys.storageBoards.popularStorageBoardsWithParams(params),
    () => fetchPopularStorageBoards(params),
    {
      keepPreviousData: true
    }
  );

  const handleChange = (value: number) =>
    setParams((prevParams) => ({
      ...prevParams,
      page: value
    }));

  return (
    <>
      <Flexbox component="section" gap={18} direction="vertical" customStyle={{ marginTop: 20 }}>
        {boards.map((storageBoard) => (
          <Link href={`/storages/${storageBoard.storage.path}/${storageBoard.id}`}>
            <a>
              <StorageBoardCard
                key={`best-storage-board-${storageBoard.id}`}
                storageBoard={storageBoard}
              />
            </a>
          </Link>
        ))}
      </Flexbox>
      <Flexbox
        component="section"
        justifyContent="center"
        customStyle={{
          margin: '50px auto'
        }}
      >
        <Pagination
          count={totalPages * perPage}
          page={currentPage}
          rowPerPage={perPage}
          onChange={handleChange}
        />
      </Flexbox>
    </>
  );
}

export default BestStorageBoardList;
