import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import { useRecoilState } from 'recoil';

import { worstParamsState } from '@recoil/worst/atoms';

import { Flexbox, Pagination } from 'cocstorage-ui';

import StorageBoardCard from '@components/UI/molecules/StorageBoardCard';

import { fetchWorstStorageBoards } from '@api/v1/storage-boards';

import queryKeys from '@constants/queryKeys';

import Message from '../../UI/molecules/Message';

function WorstStorageBoardList() {
  const [params, setParams] = useRecoilState(worstParamsState);

  const {
    data: { boards = [], pagination: { totalPages = 1, perPage = 20, currentPage = 1 } = {} } = {},
    isLoading
  } = useQuery(
    queryKeys.storageBoards.worstStorageBoardsWithParams(params),
    () => fetchWorstStorageBoards(params),
    {
      keepPreviousData: true
    }
  );

  const handleChange = (value: number) =>
    setParams((prevParams) => ({
      ...prevParams,
      page: value
    }));

  if (!isLoading && !boards.length) {
    return (
      <Message title="선 넘는 게시글이 없네요!" hideButton customStyle={{ margin: '50px 0' }} />
    );
  }

  return (
    <>
      <Flexbox component="section" gap={18} direction="vertical" customStyle={{ marginTop: 20 }}>
        {boards.map((storageBoard) => (
          <Link href={`/storages/${storageBoard.storage.path}/${storageBoard.id}`}>
            <a>
              <StorageBoardCard
                key={`worst-storage-board-${storageBoard.id}`}
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
          margin: '25px auto'
        }}
      >
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

export default WorstStorageBoardList;
