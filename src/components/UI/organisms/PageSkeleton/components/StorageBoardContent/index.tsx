import { Box, Skeleton } from 'cocstorage-ui';

import { Content } from '@components/pages/storageBoard/StorageBoardContent';

export default function StorageBoardContent() {
  return (
    <Box customStyle={{ marginTop: 10 }}>
      <Skeleton width="60%" height={22} round={6} disableAspectRatio />
      <Box customStyle={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
        <Skeleton width={24} height={24} round="50%" disableAspectRatio />
        <Skeleton
          width="30%"
          height={16}
          round={6}
          customStyle={{ marginLeft: 4 }}
          disableAspectRatio
        />
      </Box>
      <Content component="div" lineHeight="main">
        <Skeleton
          width="100%"
          height="24vh"
          round={6}
          customStyle={{ marginBottom: 20 }}
          disableAspectRatio
        />
        <Skeleton
          width="80%"
          height={16}
          round={6}
          customStyle={{ marginBottom: 10 }}
          disableAspectRatio
        />
        <Skeleton
          width="40%"
          height={16}
          round={6}
          customStyle={{ marginBottom: 10 }}
          disableAspectRatio
        />
        <Skeleton
          width="60%"
          height={16}
          round={6}
          customStyle={{ marginBottom: 10 }}
          disableAspectRatio
        />
      </Content>
    </Box>
  );
}
