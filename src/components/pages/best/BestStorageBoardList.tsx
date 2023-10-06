import { Flexbox, Pagination } from '@cocstorage/ui';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';

import { fetchPopularStorageBoards } from '@api/v1/storage-boards';
import StorageBoardCard from '@components/UI/molecules/StorageBoardCard';
import queryKeys from '@constants/queryKeys';
import { bestParamsState } from '@recoil/pages/best/atoms';

import Message from '../../UI/molecules/Message';

function BestStorageBoardList() {
  const [params, setParams] = useRecoilState(bestParamsState);

  const {
    data: { boards = [], pagination: { totalPages = 1, perPage = 20, currentPage = 1 } = {} } = {},
    isLoading
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

  if (!isLoading && !boards.length) {
    return (
      <Message
        title="이슈가 되고 있는 게시글이 없네요!"
        hideButton
        customStyle={{ margin: '50px 0' }}
      />
    );
  }

  return (
    <>
      <Flexbox component="section" gap={18} direction="vertical" customStyle={{ marginTop: 20 }}>
        {boards.map((storageBoard) => (
          <StorageBoardCard
            key={`best-storage-board-${storageBoard.id}`}
            storageBoard={storageBoard}
          />
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

export default BestStorageBoardList;
