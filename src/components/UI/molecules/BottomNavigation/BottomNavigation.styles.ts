import styled, { CSSObject } from '@emotion/styled';

import { BottomNavigationProps } from '.';

export const StyledBottomNavigation = styled.nav<Pick<BottomNavigationProps, 'disableFixed'>>`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 60px;
  background-color: ${({
    theme: {
      palette: { background }
    }
  }) => background.bg};
  border-top: 1px solid
    ${({
      theme: {
        palette: { box }
      }
    }) => box.filled.normal};

  ${({ disableFixed }): CSSObject =>
    !disableFixed
      ? {
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%'
        }
      : {}}
`;
