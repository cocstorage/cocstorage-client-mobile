import { Badge, CustomStyle, Icon, Tag, Typography } from 'cocstorage-ui';

import { IssueKeyword } from '@dto/issue-keywords';

import { StyledIssueKeywordCard } from './IssueKeywordCard.styles';

interface IssueKeywordCardProps {
  issueKeyword: IssueKeyword;
  customStyle?: CustomStyle;
}

function IssueKeywordCard({
  issueKeyword: { number, keyword, isUp, isDown, isNew },
  customStyle
}: IssueKeywordCardProps) {
  return (
    <StyledIssueKeywordCard css={customStyle}>
      <Tag
        variant="accent"
        customStyle={{
          display: 'flex',
          justifyContent: 'center',
          width: 24,
          height: 24,
          lineHeight: '24px'
        }}
      >
        {number}
      </Tag>
      <Typography
        fontWeight="bold"
        noWrap
        customStyle={{
          flex: 1
        }}
      >
        {keyword}
      </Typography>
      {isNew && <Badge severity="warning">NEW</Badge>}
      {isUp && <Badge severity="success" startIcon={<Icon name="ArrowDropUpSpecify_12_12" />} />}
      {isDown && <Badge severity="error" startIcon={<Icon name="ArrowDropDownSpecify_12_12" />} />}
    </StyledIssueKeywordCard>
  );
}

export default IssueKeywordCard;
