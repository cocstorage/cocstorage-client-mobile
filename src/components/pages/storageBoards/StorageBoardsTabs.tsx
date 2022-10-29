import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';

import styled from '@emotion/styled';

import { storageBoardsParamsStateFamily } from '@recoil/pages/storageBoards/atoms';

import { Tab, Tabs } from 'cocstorage-ui';

function StorageBoardsTabs() {
  const router = useRouter();
  const { path } = router.query;
  const [{ params }, setParams] = useRecoilState(storageBoardsParamsStateFamily(String(path)));

  const handleChange = (value: number | string) => {
    setParams((prevParams) => ({
      path: prevParams.path,
      params: {
        ...prevParams.params,
        page: 1,
        orderBy: String(value)
      }
    }));
  };

  return (
    <StyledStorageBoardsTabs>
      <Tabs onChange={handleChange} value={params.orderBy || 'latest'}>
        <Tab text="최신" value="latest" />
        <Tab text="베스트" value="popular" />
        <Tab text="워스트" value="worst" />
      </Tabs>
    </StyledStorageBoardsTabs>
  );
}

export const StyledStorageBoardsTabs = styled.section`
  display: flex;
  justify-content: center;
  margin: 0 -20px;
  padding: 0 20px;
  border-bottom: 1px solid
    ${({
      theme: {
        palette: { box }
      }
    }) => box.stroked.normal};
`;

export default StorageBoardsTabs;
