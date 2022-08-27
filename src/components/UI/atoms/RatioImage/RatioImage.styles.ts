import styled, { CSSObject } from '@emotion/styled';

import { Box } from 'cocstorage-ui';

import { RatioImageProps } from '.';

export const RatioImageWrapper = styled.div<Pick<RatioImageProps, 'ratio' | 'round'>>`
  position: relative;
  overflow: hidden;

  background-color: ${({ theme: { palette } }) => palette.background.fg1};

  ${({ ratio }): CSSObject => {
    switch (ratio) {
      case '4:3':
        return {
          paddingTop: '75%'
        };
      case '16:9':
        return {
          paddingTop: '56.25%'
        };
      default:
        return {
          paddingTop: '100%'
        };
    }
  }}

  ${({ round }): CSSObject =>
    round
      ? {
          borderRadius: round
        }
      : {}};
`;

export const RatioImageInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translate(50%, 50%);
`;

export const Image = styled.img``;

export const ImageWrapper = styled(Box)<Pick<RatioImageProps, 'round'>>`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  background-color: ${({ theme: { palette } }) => palette.background.fg1};

  ${({ round }): CSSObject =>
    round
      ? {
          borderRadius: round
        }
      : {}};
`;
