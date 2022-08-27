import Link from 'next/link';
import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { useRecoilState } from 'recoil';

import { storageBoardsParamsStateFamily } from '@recoil/storageBoards/atoms';

import { Flexbox, Pagination } from 'cocstorage-ui';

import StorageBoardCard from '@components/UI/molecules/StorageBoardCard';
import StorageBoardCardSkeleton from '@components/UI/molecules/StorageBoardCard/StorageBoardCardSkeleton';

import { fetchStorageBoards } from '@api/v1/storage-boards';

import queryKeys from '@constants/queryKeys';

function StorageBoardsList() {
  const router = useRouter();
  const { path } = router.query;

  const [{ params }, setParams] = useRecoilState(storageBoardsParamsStateFamily(String(path)));

  const {
    data: { boards = [], pagination: { totalPages = 1, perPage = 20, currentPage = 1 } = {} } = {},
    isLoading
  } = useQuery(
    queryKeys.storageBoards.storageBoardsByIdWithParams(String(path), params),
    () => fetchStorageBoards(String(path), params),
    {
      keepPreviousData: true
    }
  );

  const handleChange = (value: number) => {
    setParams((prevParams) => ({
      path: prevParams.path,
      params: {
        ...prevParams.params,
        page: value
      }
    }));
  };

  return (
    <>
      <Flexbox
        component="section"
        direction="vertical"
        gap={18}
        customStyle={{
          margin: '20px 0'
        }}
      >
        {isLoading &&
          Array.from({ length: 20 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <StorageBoardCardSkeleton key={`storage-board-skeleton-${index}`} />
          ))}
        {!isLoading &&
          boards.map((storageBoard) => (
            <Link
              key={`storage-board-${storageBoard.id}`}
              href={`/storages/${storageBoard.storage.path}/${storageBoard.id}`}
            >
              <a>
                <StorageBoardCard storageBoard={storageBoard} inStorage />
              </a>
            </Link>
          ))}
      </Flexbox>
      <Flexbox justifyContent="center" customStyle={{ margin: '25px auto' }}>
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

export default StorageBoardsList;
