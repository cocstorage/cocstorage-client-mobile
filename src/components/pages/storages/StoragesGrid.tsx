import { MouseEvent } from 'react';

import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { useRecoilValue } from 'recoil';

import { Box, Grid, Typography } from 'cocstorage-ui';

import StorageCard from '@components/UI/molecules/StorageCard';

import { selectedCategoryIdState } from '@recoil/storages/atoms';

import { fetchStorageCategories } from '@api/v1/storage-categories';
import { fetchStorages } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StoragesGrid() {
  const router = useRouter();
  const selectedCategoryId = useRecoilValue<number>(selectedCategoryIdState);

  const { data: { categories = [] } = {} } = useQuery(
    queryKeys.storageCategories.storageCategories,
    fetchStorageCategories
  );
  const { data: { storages = [] } = {} } = useQuery(queryKeys.storages.storages, fetchStorages, {
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
  });

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const dataPath = event.currentTarget.getAttribute('data-path');
    router.push(`/storages/${dataPath}`);
  };

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
                <Grid key={`category-${id}-storage-${storageId}`} item xs={2} sm={3}>
                  <StorageCard
                    name={storageName}
                    src={avatarUrl}
                    data-path={path}
                    onClick={handleClick}
                  />
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
