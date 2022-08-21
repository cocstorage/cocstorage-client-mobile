import { Box, Typography } from 'cocstorage-ui';

import StorageBoardCard from '@components/UI/molecules/StorageBoardCard';

function IndexLatestStorageBoardList() {
  return (
    <Box component="section" customStyle={{ margin: '32px 0 20px' }}>
      <Typography variant="h4" fontWeight="bold">
        최신 게시글
      </Typography>
      <Box customStyle={{ marginTop: 20 }}>
        <StorageBoardCard inStorage={false} />
        <StorageBoardCard inStorage={false} customStyle={{ marginTop: 18 }} />
        <StorageBoardCard inStorage={false} customStyle={{ marginTop: 18 }} />
        <StorageBoardCard inStorage={false} customStyle={{ marginTop: 18 }} />
        <StorageBoardCard inStorage={false} customStyle={{ marginTop: 18 }} />
      </Box>
    </Box>
  );
}

export default IndexLatestStorageBoardList;
