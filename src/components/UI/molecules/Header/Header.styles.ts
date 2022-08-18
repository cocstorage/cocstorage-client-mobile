import styled, { CSSObject } from '@emotion/styled';

import { HeaderProps } from '.';

export const StyledHeader = styled.div<Pick<HeaderProps, 'disableFixed'>>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 20px;

  ${({ disableFixed }): CSSObject =>
    !disableFixed
      ? {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%'
        }
      : {}}
`;

export const Logo = styled.img``;
