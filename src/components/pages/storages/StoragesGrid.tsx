import { Box, Grid, Typography } from 'cocstorage-ui';

import StorageCard from '@components/UI/molecules/StorageCard';

function StoragesGrid() {
  return (
    <>
      <Box component="section" customStyle={{ marginTop: 48 }}>
        <Typography variant="h4" fontWeight="bold">
          게임
        </Typography>
        <Grid container columnGap={16} rowGap={20} customStyle={{ marginTop: 10 }}>
          <Grid item xs={2} sm={3}>
            <StorageCard />
          </Grid>
          <Grid item xs={2} sm={3}>
            <StorageCard />
          </Grid>
          <Grid item xs={2} sm={3}>
            <StorageCard />
          </Grid>
          <Grid item xs={2} sm={3}>
            <StorageCard />
          </Grid>
          <Grid item xs={2} sm={3}>
            <StorageCard />
          </Grid>
          <Grid item xs={2} sm={3}>
            <StorageCard />
          </Grid>
        </Grid>
      </Box>
      <Box component="section" customStyle={{ margin: '30px 0 20px' }}>
        <Typography variant="h4" fontWeight="bold">
          일반
        </Typography>
        <Grid container columnGap={16} rowGap={20} customStyle={{ marginTop: 10 }}>
          <Grid item xs={2} sm={3}>
            <StorageCard />
          </Grid>
          <Grid item xs={2} sm={3}>
            <StorageCard />
          </Grid>
          <Grid item xs={2} sm={3}>
            <StorageCard />
          </Grid>
          <Grid item xs={2} sm={3}>
            <StorageCard />
          </Grid>
          <Grid item xs={2} sm={3}>
            <StorageCard />
          </Grid>
          <Grid item xs={2} sm={3}>
            <StorageCard />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default StoragesGrid;
