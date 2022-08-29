import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import { useRecoilValue } from 'recoil';

import { storagesSelectedCategoryIdState } from '@recoil/storages/atoms';

import { Box, Grid, Typography } from 'cocstorage-ui';

import StorageCard from '@components/UI/molecules/StorageCard';

import { fetchStorageCategories } from '@api/v1/storage-categories';
import { fetchStorages } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StoragesGrid() {
  const selectedCategoryId = useRecoilValue(storagesSelectedCategoryIdState);

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
                  <Link href={`/storages/${path}`}>
                    <a>
                      <StorageCard name={storageName} src={avatarUrl} />
                    </a>
                  </Link>
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
