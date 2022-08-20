import { Alert, Icon } from 'cocstorage-ui';

import {
  IndexBestStorageBoardList,
  IndexLatestStorageBoardList,
  IndexWorstStorageBoardList
} from '@components/pages/index';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { BottomNavigation, Header } from '@components/UI/molecules';
import IssueKeywordRank from '@components/UI/organisms/IssueKeywordRank';

function Index() {
  return (
    <GeneralTemplate header={<Header />} footer={<BottomNavigation />}>
      <Alert
        severity="info"
        action={<Icon name="CaretSemiRightOutlined" />}
        customStyle={{ marginTop: 14 }}
      >
        2022년 01월 03일 업데이트 내용 안내
      </Alert>
      <IssueKeywordRank disableFillEdgeBlanks={false} customStyle={{ marginTop: 32 }} />
      <IndexBestStorageBoardList />
      <IndexWorstStorageBoardList />
      <IndexLatestStorageBoardList />
    </GeneralTemplate>
  );
}

export default Index;
