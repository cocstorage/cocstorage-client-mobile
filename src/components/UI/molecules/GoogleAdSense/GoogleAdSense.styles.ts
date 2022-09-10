import styled from '@emotion/styled';

export const StyledGoogleAdSense = styled.div`
  position: relative;
  min-height: 100px;
  text-align: center;
  background-color: ${({
    theme: {
      palette: { background }
    }
  }) => background.fg1};

  &:after {
    content: 'AD';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({
      theme: {
        palette: { box }
      }
    }) => box.stroked.normal};
    font-weight: 700;
  }
`;
