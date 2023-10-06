import { HTMLAttributes } from 'react';

import { Badge, CustomStyle, Tag, Typography } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';

import { IssueKeyword } from '@dto/issue-keywords';

import { StyledIssueKeywordCard } from './IssueKeywordCard.styles';

interface IssueKeywordCardProps extends HTMLAttributes<HTMLDivElement> {
  issueKeyword: IssueKeyword;
  customStyle?: CustomStyle;
}

function IssueKeywordCard({
  issueKeyword: { number, keyword, isUp, isDown, isNew },
  customStyle,
  ...props
}: IssueKeywordCardProps) {
  return (
    <StyledIssueKeywordCard {...props} css={customStyle}>
      <Tag
        variant={number <= 3 ? 'accent' : 'semiAccent'}
        customStyle={{
          display: 'flex',
          justifyContent: 'center',
          width: 24,
          height: 24,
          lineHeight: '24px',
          borderRadius: 4
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
      {isUp && <Badge severity="success" icon={<Icon name="ArrowDropUpSpecify_12_12" />} />}
      {isDown && <Badge severity="error" icon={<Icon name="ArrowDropDownSpecify_12_12" />} />}
    </StyledIssueKeywordCard>
  );
}

export default IssueKeywordCard;
