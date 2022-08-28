import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useSetRecoilState } from 'recoil';

import { commonFeedbackDialogState } from '@recoil/common/atoms';

import { Button, CustomStyle, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import IssueKeywordCard from '@components/UI/molecules/IssueKeywordCard';
import IssueKeywordCardSkeleton from '@components/UI/molecules/IssueKeywordCard/IssueKeywordCardSkeleton';

import { fetchIssueKeywordRank } from '@api/v1/issue-keywords';

import queryKeys from '@constants/queryKeys';

import { List, StyledIssueKeywordRank } from './IssueKeywordRank.styles';

export interface IssueKeywordRankProps {
  disableFillEdgeBlanks?: boolean;
  customStyle?: CustomStyle;
}

function IssueKeywordRank({ disableFillEdgeBlanks = true, customStyle }: IssueKeywordRankProps) {
  const {
    theme: {
      type,
      palette: { text }
    }
  } = useTheme();

  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);

  const [toggle, setToggle] = useState(false);

  const { data: { ranks = [] } = {}, isLoading } = useQuery(
    queryKeys.issueKeywords.issueKeywordRank,
    fetchIssueKeywordRank
  );

  const handleClick = () => setToggle((prevState) => !prevState);

  const handleClickCard = () =>
    setCommonFeedbackDialogState({
      open: true,
      title: '준비 중인 기능이에요!',
      message: '조금만 기다려주세요!'
    });

  return (
    <StyledIssueKeywordRank disableFillEdgeBlanks={disableFillEdgeBlanks} css={customStyle}>
      <Flexbox
        justifyContent="space-between"
        customStyle={{ margin: !disableFillEdgeBlanks ? '0 20px' : undefined }}
      >
        <Typography variant="h4" fontWeight="bold">
          지금 막 뜨고 있어요!
        </Typography>
        <Button
          variant="transparent"
          size="small"
          startIcon={
            <Icon
              name={toggle ? 'CaretSemiUpOutlined' : 'CaretSemiDownOutlined'}
              width={16}
              height={16}
              color={text[type].text1}
            />
          }
          onClick={handleClick}
          customStyle={{
            color: text[type].text1
          }}
        >
          {toggle ? '접기' : '펼치기'}
        </Button>
      </Flexbox>
      <List disableFillEdgeBlanks={disableFillEdgeBlanks} toggle={toggle}>
        {isLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <IssueKeywordCardSkeleton key={`issue-keyword-skeleton-${index}`} />
          ))}
        {!isLoading &&
          ranks.map((issueKeyword) => (
            <IssueKeywordCard
              key={`issue-keyword-${issueKeyword.keywordId}`}
              issueKeyword={issueKeyword}
              onClick={handleClickCard}
            />
          ))}
      </List>
    </StyledIssueKeywordRank>
  );
}

export default IssueKeywordRank;
