import styled from '@emotion/styled';

export const StyledNoticeCard = styled.div`
  display: grid;
  align-items: center;
  width: 100%;
  text-align: left;
  cursor: pointer;
  grid-template-columns: 82px 1fr;
  column-gap: 14px;
  min-height: 60px;
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
  background-color: ${({ theme: { type, palette } }) => palette.text[type].text1};
`;
