import { Flexbox, IconButton, Skeleton, Tab, Tabs } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';

import GeneralTemplate from '@components/templeates/GeneralTemplate';
import BottomNavigation from '@components/UI/molecules/BottomNavigation';
import StorageBoardCardSkeleton from '@components/UI/molecules/StorageBoardCard/StorageBoardCardSkeleton';

function StorageBoard() {
  return (
    <GeneralTemplate
      header={
        <Flexbox
          component="header"
          alignment="center"
          justifyContent="space-between"
          customStyle={{ height: 50, padding: '0 20px', borderBottom: '1px solid transparent' }}
        >
          <IconButton>
            <Icon name="CaretSemiLeftOutlined" />
          </IconButton>
          <Flexbox alignment="center" gap={10} customStyle={{ flexGrow: 1 }}>
            <Skeleton
              disableAspectRatio
              width={24}
              height={24}
              round={6}
              customStyle={{ marginLeft: 10 }}
            />
            <Skeleton width={60} height={20} round={6} disableAspectRatio />
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
      }
      footer={<BottomNavigation disableOnBoarding />}
      disableFlexible={false}
    >
      <Tabs
        onChange={() => {
          //
        }}
        value="latest"
        fullWidth
        customStyle={{
          width: 'calc(100% + 40px)',
          margin: '0 -20px',
          '& > div': {
            justifyContent: 'center'
          }
        }}
      >
        <Tab text="최신" value="latest" />
        <Tab text="베스트" value="popular" />
        <Tab text="워스트" value="worst" />
      </Tabs>
      <Skeleton
        width="100%"
        height={56}
        round={12}
        disableAspectRatio
        customStyle={{
          marginTop: 12
        }}
      />
      <Flexbox
        component="section"
        direction="vertical"
        gap={18}
        customStyle={{
          margin: '20px 0'
        }}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <StorageBoardCardSkeleton key={`storage-board-skeleton-${index}`} />
        ))}
      </Flexbox>
    </GeneralTemplate>
  );
}

export default StorageBoard;
