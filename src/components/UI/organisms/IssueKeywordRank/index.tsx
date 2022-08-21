import { useState } from 'react';

import { Button, CustomStyle, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import IssueKeywordCard from '@components/UI/molecules/IssueKeywordCard';

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

  const [toggle, setToggle] = useState<boolean>(false);

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
        <IssueKeywordCard />
        <IssueKeywordCard />
        <IssueKeywordCard />
        <IssueKeywordCard />
        <IssueKeywordCard />
        <IssueKeywordCard />
        <IssueKeywordCard />
        <IssueKeywordCard />
      </List>
    </StyledIssueKeywordRank>
  );
}

export default IssueKeywordRank;
