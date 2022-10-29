import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { useRecoilValue } from 'recoil';

import styled from '@emotion/styled';

import {
  storageBoardsSearchParamsState,
  storageBoardsSearchPendingState
} from '@recoil/pages/storageBoardsSearch/atoms';

import { Flexbox, Skeleton, Tab, Tabs } from 'cocstorage-ui';

import { fetchStorageBoards } from '@api/v1/storage-boards';

import queryKeys from '@constants/queryKeys';

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

  return (
    <StyledStorageBoardsSearchTabs>
      {(isLoading || pending) && (
        <Flexbox alignment="center" gap={12}>
          <Skeleton width={37} height={18} disableAspectRatio />
          <Skeleton width={37} height={18} disableAspectRatio />
          <Skeleton width={37} height={18} disableAspectRatio />
        </Flexbox>
      )}
      {!isLoading && !pending && (
        <Tabs onChange={handleChange} value={1} centered>
          <Tab text="게시글" value={1} />
        </Tabs>
      )}
    </StyledStorageBoardsSearchTabs>
  );
}

const StyledStorageBoardsSearchTabs = styled.section`
  display: flex;
  justify-content: center;
  min-height: 40px;
  margin: 0 -20px 12px;
  padding: 0 20px;
  border-bottom: 1px solid
    ${({
      theme: {
        palette: { box }
      }
    }) => box.stroked.normal};
  background-color: ${({
    theme: {
      palette: { background }
    }
  }) => background.bg};
  z-index: 2;
`;

export default StorageBoardSearchTabs;
