import { Box, Grid, Typography } from 'cocstorage-ui';

import StorageCard from '@components/UI/molecules/StorageCard';

function StoragesPopularGrid() {
  return (
    <Box component="section" customStyle={{ marginTop: 30 }}>
      <Typography variant="h4" fontWeight="bold">
        인기 게시판
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
  );
}

export default StoragesPopularGrid;
