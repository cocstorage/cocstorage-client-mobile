import { Badge, CustomStyle, Tag, Typography } from 'cocstorage-ui';

import { StyledIssueKeywordCard } from './IssueKeywordCard.styles';

interface IssueKeywordCardProps {
  customStyle?: CustomStyle;
}

function IssueKeywordCard({ customStyle }: IssueKeywordCardProps) {
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
        1
      </Tag>
      {/* TODO noWrap 오동작 수정 */}
      <Typography
        fontWeight="bold"
        customStyle={{
          flex: 1,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        }}
      >
        이슈 키워드 이슈 키워드
      </Typography>
      <Badge severity="warning">NEW</Badge>
    </StyledIssueKeywordCard>
  );
}

export default IssueKeywordCard;
