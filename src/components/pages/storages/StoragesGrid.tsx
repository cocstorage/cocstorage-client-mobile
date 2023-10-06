import { Box, Grid, Typography } from '@cocstorage/ui';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import { fetchStorageCategories } from '@api/v1/storage-categories';
import { fetchStorages } from '@api/v1/storages';
import StorageCard from '@components/UI/molecules/StorageCard';
import queryKeys from '@constants/queryKeys';
import { storagesSelectedCategoryIdState } from '@recoil/pages/storages/atoms';

import Message from '../../UI/molecules/Message';

function StoragesGrid() {
  const selectedCategoryId = useRecoilValue(storagesSelectedCategoryIdState);

  const { data: { categories = [] } = {}, isLoading } = useQuery(
    queryKeys.storageCategories.storageCategories,
    fetchStorageCategories
  );
  const { data: { storages = [] } = {}, isLoading: isLoadingStorages } = useQuery(
    queryKeys.storages.storages,
    fetchStorages,
    {
      select: (data) => {
        if (selectedCategoryId) {
          return {
            ...data,
            storages: data.storages.filter(
              (storage) => storage.storageCategoryId === selectedCategoryId
            )
          };
        }

        return data;
      }
    }
  );

  if (!isLoading && !isLoadingStorages && !storages.length) {
    return (
      <Message title="아직 생성된 게시판이 없어요!" hideButton customStyle={{ margin: '50px 0' }} />
    );
  }

  return (
    <>
      {categories.map(({ id, name }) => {
        const categoryStorages = storages.filter(
          ({ storageCategoryId }) => storageCategoryId === id
        );

        if (!categoryStorages.length) return null;

        return (
          <Box key={`category-${id}`} component="section" customStyle={{ margin: '30px 0 20px' }}>
            <Typography variant="h4" fontWeight="bold">
              {name}
            </Typography>
            <Grid container columnGap={16} rowGap={20} customStyle={{ marginTop: 10 }}>
              {categoryStorages.map(({ id: storageId, path, name: storageName, avatarUrl }) => (
                <Grid key={`category-${id}-storage-${storageId}`} item xs={3}>
                  <StorageCard name={storageName} src={avatarUrl} path={path} />
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      })}
    </>
  );
}

export default StoragesGrid;
