import { Box, Flexbox, Icon, IconButton, Skeleton } from 'cocstorage-ui';

import { StyledStorageBoardFooter } from '@components/pages/storageBoard/StorageBoardFooter';
import { StyledStorageBoardHeader } from '@components/pages/storageBoard/StorageBoardHeader';
import GeneralTemplate from '@components/templeates/GeneralTemplate';

import { StorageBoardContent } from '../../components';

function StorageBoard() {
  return (
    <GeneralTemplate
      header={
        <Box style={{ position: 'relative', zIndex: 10 }}>
          <StorageBoardHeader />
        </Box>
      }
      footer={
        <Box style={{ position: 'relative', zIndex: 10 }}>
          <StorageBoardFooter />
        </Box>
      }
      disableFlexible={false}
    >
      <StorageBoardContent />
    </GeneralTemplate>
  );
}

function StorageBoardHeader() {
  return (
    <Box component="header" customStyle={{ height: 50, pointerEvents: 'none' }}>
      <StyledStorageBoardHeader triggered={false}>
        <IconButton>
          <Icon name="CaretSemiLeftOutlined" />
        </IconButton>
        <Flexbox gap={10} alignment="center">
          <Skeleton width={24} height={24} round={6} disableAspectRatio />
        </Flexbox>
      </StyledStorageBoardHeader>
    </Box>
  );
}

function StorageBoardFooter() {
  return (
    <Box component="footer" customStyle={{ height: 49 }}>
      <StyledStorageBoardFooter>
        <Flexbox gap={10}>
          <Skeleton width={40.69} height={28} round={6} disableAspectRatio />
          <Skeleton width={40.69} height={28} round={6} disableAspectRatio />
          <Skeleton width={40.69} height={28} round={6} disableAspectRatio />
        </Flexbox>
      </StyledStorageBoardFooter>
    </Box>
  );
}

export default StorageBoard;
