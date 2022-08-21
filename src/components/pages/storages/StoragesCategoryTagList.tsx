import styled from '@emotion/styled';
import { Tag } from 'cocstorage-ui';

function StoragesCategoryTagList() {
  return (
    <StyledStoragesCategoryTagList>
      <Tag variant="accent">미러링 인기 게시글 모음</Tag>
      <Tag>게임</Tag>
      <Tag>연예</Tag>
      <Tag>문화</Tag>
      <Tag>스포츠</Tag>
      <Tag>생활</Tag>
    </StyledStoragesCategoryTagList>
  );
}

export const StyledStoragesCategoryTagList = styled.section`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  column-gap: 10px;
  margin: 20px -20px 0;
  padding: 0 20px;
  overflow-x: auto;
`;

export default StoragesCategoryTagList;
