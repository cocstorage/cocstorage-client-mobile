import { useQuery } from '@tanstack/react-query';

import { useSetRecoilState } from 'recoil';

import { commonFeedbackDialogState } from '@recoil/common/atoms';

import IssueKeywordRank from '@components/UI/organisms/IssueKeywordRank';

import { fetchIssueKeywordRank } from '@api/v1/issue-keywords';

import queryKeys from '@constants/queryKeys';

function IndexIssueKeywordRank() {
  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);

  const { data, isLoading } = useQuery(
    queryKeys.issueKeywords.issueKeywordRank,
    fetchIssueKeywordRank
  );

  const handleClick = () =>
    setCommonFeedbackDialogState({
      open: true,
      title: '준비 중인 기능이에요!',
      message: '조금만 기다려주세요!'
    });

  return (
    <IssueKeywordRank
      issueKeywordRank={data}
      isLoading={isLoading}
      onClickIssueKeyword={handleClick}
      disableFillEdgeBlanks={false}
      customStyle={{ marginTop: 32 }}
    />
  );
}

export default IndexIssueKeywordRank;
