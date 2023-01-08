import { Box, Flexbox, Icon, IconButton, Skeleton, Tab, Tabs } from 'cocstorage-ui';

import { StyledStorageBoardsHeader } from '@components/pages/storageBoards/StorageBoardsHeader';
import { StyledStorageBoardsTabs } from '@components/pages/storageBoards/StorageBoardsTabs';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import BottomNavigation from '@components/UI/molecules/BottomNavigation';

import { StorageBoardCards } from '../../components';

function StorageBoard() {
  return (
    <GeneralTemplate
      header={
        <Box style={{ position: 'relative', zIndex: 10 }}>
          <StorageBoardsHeader />
        </Box>
      }
      footer={
        <Box style={{ position: 'relative', zIndex: 10 }}>
          <BottomNavigation disableOnBoarding />
        </Box>
      }
      disableFlexible={false}
    >
      <StorageBoardTabs />
      <Skeleton
        width="100%"
        height={56}
        round={12}
        disableAspectRatio
        customStyle={{
          marginTop: 12
        }}
      />
      <StorageBoardCards />
    </GeneralTemplate>
  );
}

function StorageBoardsHeader() {
  return (
    <Box component="header" customStyle={{ height: 50 }}>
      <StyledStorageBoardsHeader triggered={false}>
        <Flexbox alignment="center" customStyle={{ flex: 1, minWidth: 0 }}>
          <IconButton>
            <Icon name="CaretSemiLeftOutlined" />
          </IconButton>
          <Flexbox alignment="center" gap={10} customStyle={{ flex: 1 }}>
            <Skeleton
              disableAspectRatio
              width={24}
              height={24}
              round={6}
              customStyle={{ marginLeft: 10 }}
            />
            <Skeleton disableAspectRatio width={60} height={20} round={6} />
          </Flexbox>
          <Flexbox gap={10} alignment="center">
            <IconButton>
              <Icon name="SearchOutlined" />
            </IconButton>
            <IconButton>
              <Icon name="StarOutlined" />
            </IconButton>
          </Flexbox>
        </Flexbox>
      </StyledStorageBoardsHeader>
    </Box>
  );
}

function StorageBoardTabs() {
  return (
    <StyledStorageBoardsTabs>
      {/* eslint-disable-next-line */}
      <Tabs onChange={() => {}} value="latest">
        <Tab text="최신" value="latest" />
        <Tab text="베스트" value="popular" />
        <Tab text="워스트" value="worst" />
      </Tabs>
    </StyledStorageBoardsTabs>
  );
}

export default StorageBoard;
