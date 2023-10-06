import { useMemo, useState } from 'react';

import { Button, CustomStyle, Flexbox, Typography, useTheme } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';

import { IssueKeywordCard, Message } from '@components/UI/molecules';
import IssueKeywordCardSkeleton from '@components/UI/molecules/IssueKeywordCard/IssueKeywordCardSkeleton';
import { IssueKeywordRank as IIssueKeywordRank } from '@dto/issue-keywords';

import { List, StyledIssueKeywordRank } from './IssueKeywordRank.styles';

export interface IssueKeywordRankProps {
  issueKeywordRank: IIssueKeywordRank;
  isLoading: boolean;
  onClickIssueKeyword: () => void;
  disableFillEdgeBlanks?: boolean;
  customStyle?: CustomStyle;
}

function IssueKeywordRank({
  issueKeywordRank: { ranks = [] } = { ranks: [], id: 0, date: '' },
  isLoading,
  onClickIssueKeyword,
  disableFillEdgeBlanks = true,
  customStyle
}: IssueKeywordRankProps) {
  const {
    theme: {
      mode,
      palette: { text }
    }
  } = useTheme();

  const [toggle, setToggle] = useState(false);

  const newRanks = useMemo(() => {
    if (toggle) {
      return ranks
        .map((rank) => {
          return [rank, ranks.find(({ number: pairNumber }) => rank.number + 5 === pairNumber)];
        })
        .filter((rank) => rank[1])
        .flat();
    }
    return ranks;
  }, [ranks, toggle]);

  const handleClick = () => setToggle((prevState) => !prevState);

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
              color={text[mode].text1}
            />
          }
          onClick={handleClick}
          disabled={!isLoading && !ranks.length}
          customStyle={{
            color: text[mode].text1
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
          newRanks.map((issueKeyword) => (
            <IssueKeywordCard
              key={`issue-keyword-${issueKeyword.keywordId}`}
              issueKeyword={issueKeyword}
              onClick={onClickIssueKeyword}
            />
          ))}
        {!isLoading && !ranks.length && (
          <Message title="이슈 수집 중..." message="잠시만 기다려 주세요!" hideButton />
        )}
      </List>
    </StyledIssueKeywordRank>
  );
}

export default IssueKeywordRank;
