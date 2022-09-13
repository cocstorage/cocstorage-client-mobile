import styled, { CSSObject } from '@emotion/styled';

import { StorageBoardCardProps } from './index';

export const StyledStorageBoardCard = styled.div`
  & a:visited .subject {
    color: ${({
      theme: {
        palette: { others }
      }
    }) => others.visited};
  }
`;

export const Wrapper = styled.div<
  Pick<StorageBoardCardProps, 'variant'> & {
    hasThumbnail: boolean;
  }
>`
  display: grid;
  align-items: center;
  width: 100%;
  text-align: left;
  cursor: pointer;

  ${({ variant, hasThumbnail }): CSSObject => {
    switch (variant) {
      case 'normal':
        return {
          gridTemplateColumns: '82px 1fr',
          columnGap: 14,
          minHeight: 60
        };
      default:
        return {
          gridTemplateColumns: !hasThumbnail ? '1fr auto' : '1fr 61px',
          minHeight: 40
        };
    }
  }}

  ${({ hasThumbnail }): CSSObject =>
    hasThumbnail
      ? {
          columnGap: 14
        }
      : {}}
`;

export const Storage = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Info = styled.div`
  display: flex;
  gap: 12px;
`;

export const InfoLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1px;
`;

export const Dot = styled.div`
  width: 2px;
  height: 2px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: ${({
    theme: {
      mode,
      palette: { text }
    }
  }) => text[mode].text1};
`;
