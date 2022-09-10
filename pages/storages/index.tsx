import { QueryClient, dehydrate } from '@tanstack/react-query';

import { Alert, Icon } from 'cocstorage-ui';

import {
  StorageHeader,
  StoragesCategoryTagList,
  StoragesGrid,
  StoragesHead,
  StoragesPopularGrid
} from '@components/pages/storages';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { BottomNavigation } from '@components/UI/molecules';

import { fetchStorageCategories } from '@api/v1/storage-categories';
import { fetchStorages } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function Storages() {
  return (
    <>
      <StoragesHead />
      <GeneralTemplate header={<StorageHeader />} footer={<BottomNavigation />}>
        <Alert icon={<Icon name="BulbOutlined" />} customStyle={{ marginTop: 14 }}>
          게시판을 만들 수 있는 기능을 준비하고 있어요! 조금만 기다려주세요.
        </Alert>
        <StoragesCategoryTagList />
        <StoragesPopularGrid />
        <StoragesGrid />
      </GeneralTemplate>
    </>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    queryKeys.storageCategories.storageCategories,
    fetchStorageCategories
  );
  await queryClient.prefetchQuery(queryKeys.storages.storages, fetchStorages);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default Storages;
