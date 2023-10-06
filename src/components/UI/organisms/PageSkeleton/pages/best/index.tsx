import { Alert, Flexbox } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';

import { BestHeader } from '@components/pages/best';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import BottomNavigation from '@components/UI/molecules/BottomNavigation';
import StorageBoardCardSkeleton from '@components/UI/molecules/StorageBoardCard/StorageBoardCardSkeleton';

function Best() {
  return (
    <GeneralTemplate
      header={<BestHeader />}
      footer={<BottomNavigation disableOnBoarding />}
      disableFlexible={false}
    >
      <Alert icon={<Icon name="BulbOutlined" />} customStyle={{ marginTop: 20 }}>
        좀 더 편하게 보실 수 있도록 준비하고 있어요. 불편하시겠지만 조금만 기다려주세요!
      </Alert>
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

export default Best;
