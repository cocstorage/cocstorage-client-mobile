import { MouseEvent } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useRecoilState } from 'recoil';

import styled from '@emotion/styled';

import { selectedCategoryIdState } from '@recoil/storages/atoms';

import { Tag } from 'cocstorage-ui';

import { fetchStorageCategories } from '@api/v1/storage-categories';

import queryKeys from '@constants/queryKeys';

function StoragesCategoryTagList() {
  const [selectedCategoryId, setSelectedCategoryId] = useRecoilState(selectedCategoryIdState);

  const { data: { categories = [] } = {} } = useQuery(
    queryKeys.storageCategories.storageCategories,
    fetchStorageCategories
  );

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const categoryId = Number(event.currentTarget.getAttribute('data-category-id'));

    setSelectedCategoryId(categoryId === selectedCategoryId ? 0 : categoryId);

    window.scrollTo(0, 0);
  };

  return (
    <StyledStoragesCategoryTagList>
      {categories.map(({ id, name }) => (
        <Tag
          key={`category-${id}`}
          variant={id === selectedCategoryId ? 'accent' : 'text'}
          data-category-id={id}
          onClick={handleClick}
        >
          {name}
        </Tag>
      ))}
    </StyledStoragesCategoryTagList>
  );
}

export const StyledStoragesCategoryTagList = styled.section`
  position: sticky;
  top: 50px;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  column-gap: 10px;
  margin: 20px -20px 0;
  padding: 0 20px 10px;
  overflow-x: auto;
  background-color: ${({
    theme: {
      palette: { background }
    }
  }) => background.bg};
  z-index: 1;
`;

export default StoragesCategoryTagList;
