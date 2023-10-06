import { useRouter } from 'next/router';

import { Flexbox, Skeleton, Tab, Tabs } from '@cocstorage/ui';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import { fetchStorageBoards } from '@api/v1/storage-boards';
import queryKeys from '@constants/queryKeys';
import {
  storageBoardsSearchParamsState,
  storageBoardsSearchPendingState
} from '@recoil/pages/storageBoardsSearch/atoms';

function StorageBoardSearchTabs() {
  const router = useRouter();
  const { path } = router.query;

  const params = useRecoilValue(storageBoardsSearchParamsState);
  const pending = useRecoilValue(storageBoardsSearchPendingState);

  const { data: { boards = [] } = {}, isLoading } = useQuery(
    queryKeys.storageBoards.storageBoardsSearchByIdWithParams(String(path), params),
    () => fetchStorageBoards(String(path), params),
    {
      enabled: !!params.subject,
      keepPreviousData: true
    }
  );

  const handleChange = () => {
    //
  };

  if ((!isLoading && !pending && !boards.length) || !params.subject) return null;

  if (isLoading || pending) {
    return (
      <Flexbox
        alignment="center"
        justifyContent="center"
        gap={12}
        customStyle={{
          minHeight: 42,
          marginBottom: 12
        }}
      >
        <Skeleton width={37} height={18} round={6} disableAspectRatio />
        <Skeleton width={37} height={18} round={6} disableAspectRatio />
        <Skeleton width={37} height={18} round={6} disableAspectRatio />
      </Flexbox>
    );
  }

  return (
    <Tabs
      onChange={handleChange}
      value={1}
      centered
      fullWidth
      customStyle={{
        width: 'calc(100% + 40px)',
        margin: '0 -20px 12px',
        zIndex: 2,
        '& > div': {
          justifyContent: 'center'
        }
      }}
    >
      <Tab text="게시글" value={1} />
    </Tabs>
  );
}

export default StorageBoardSearchTabs;
