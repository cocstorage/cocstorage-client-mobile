import styled from '@emotion/styled';

export const StyledPageSkeleton = styled.div<{
  isLoading?: boolean;
}>`
  position: fixed;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 100;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: opacity 0.2s;
  pointer-events: ${({ isLoading }) => (isLoading ? 'none' : 'visible')};
  touch-action: ${({ isLoading }) => (isLoading ? 'none' : 'auto')};
  opacity: ${({ isLoading }) => (isLoading ? 1 : 0)};
  background-color: ${({
    theme: {
      palette: { background }
    }
  }) => background.bg};

  &:after {
    content: '';
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 101;
  }
`;
