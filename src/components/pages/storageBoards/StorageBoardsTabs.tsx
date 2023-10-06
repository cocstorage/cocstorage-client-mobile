import { useRouter } from 'next/router';

import { Tab, Tabs } from '@cocstorage/ui';
import { useRecoilState } from 'recoil';

import { storageBoardsParamsStateFamily } from '@recoil/pages/storageBoards/atoms';

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
    <Tabs
      onChange={handleChange}
      value={params.orderBy || 'latest'}
      fullWidth
      // TODO 동작하지 않는 문제 수정
      centered
      customStyle={{
        width: 'calc(100% + 40px)',
        margin: '0 -20px',
        '& > div': {
          justifyContent: 'center'
        }
      }}
    >
      <Tab text="최신" value="latest" />
      <Tab text="베스트" value="popular" />
      <Tab text="워스트" value="worst" />
    </Tabs>
  );
}

export default StorageBoardsTabs;
