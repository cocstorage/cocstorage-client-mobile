import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { useRecoilState } from 'recoil';

import { storageBoardsParamsStateFamily } from '@recoil/storageBoards/atoms';

import { Flexbox, Pagination } from 'cocstorage-ui';

import { GoogleAdSense, StorageBoardCard } from '@components/UI/molecules';
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
          boards.map((storageBoard, index) => {
            if (index + 1 === 5) {
              return (
                <div key={`storage-board-${storageBoard.id}`}>
                  <StorageBoardCard storageBoard={storageBoard} inStorage />
                  <GoogleAdSense
                    html={
                      '<ins class="adsbygoogle"\n' +
                      '     style="display:inline-block;width:320px;height:100px"\n' +
                      '     data-ad-client="ca-pub-5809905264951057"\n' +
                      '     data-ad-slot="2449792225"></ins>\n' +
                      '<script>\n' +
                      '     (adsbygoogle = window.adsbygoogle || []).push({});\n' +
                      '</script>'
                    }
                    customStyle={{ margin: '20px -20px 0' }}
                  />
                </div>
              );
            }
            return (
              <StorageBoardCard
                key={`storage-board-${storageBoard.id}`}
                storageBoard={storageBoard}
                inStorage
              />
            );
          })}
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

export default StorageBoardsList;
