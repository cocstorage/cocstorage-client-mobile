import {
  IndexBestStorageBoardList,
  IndexHead,
  IndexLatestStorageBoardList,
  IndexNoticeAlert,
  IndexWorstStorageBoardList
} from '@components/pages/index';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { BottomNavigation, Header } from '@components/UI/molecules';
import IssueKeywordRank from '@components/UI/organisms/IssueKeywordRank';

function Index() {
  return (
    <>
      <IndexHead />
      <GeneralTemplate header={<Header />} footer={<BottomNavigation />}>
        <IndexNoticeAlert />
        <IssueKeywordRank disableFillEdgeBlanks={false} customStyle={{ marginTop: 32 }} />
        <IndexBestStorageBoardList />
        <IndexWorstStorageBoardList />
        <IndexLatestStorageBoardList />
      </GeneralTemplate>
    </>
  );
}

export default Index;
