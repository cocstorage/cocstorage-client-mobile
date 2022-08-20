import styled, { CSSObject } from '@emotion/styled';

import { IssueKeywordRankProps } from '.';

export const StyledIssueKeywordRank = styled.section<
  Pick<IssueKeywordRankProps, 'disableFillEdgeBlanks'>
>`
  ${({ disableFillEdgeBlanks }): CSSObject =>
    !disableFillEdgeBlanks
      ? {
          marginLeft: -20,
          marginRight: -20
        }
      : {}}
`;

export const List = styled.div<
  Pick<IssueKeywordRankProps, 'disableFillEdgeBlanks'> & {
    toggle?: boolean;
  }
>`
  display: grid;
  overflow-x: auto;
  margin-top: 12px;

  ${({ disableFillEdgeBlanks }): CSSObject =>
    !disableFillEdgeBlanks
      ? {
          padding: '0 20px'
        }
      : {}}

  ${({ toggle }): CSSObject =>
    toggle
      ? {
          gridTemplateColumns: 'minmax(calc(50% - 10px), auto) minmax(calc(50% - 10px), auto)',
          columnGap: 17,
          rowGap: 12
        }
      : {
          gridAutoFlow: 'column',
          columnGap: 28
        }}
`;
