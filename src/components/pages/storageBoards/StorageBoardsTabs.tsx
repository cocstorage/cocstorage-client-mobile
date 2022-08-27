import styled from '@emotion/styled';

import { Tab, Tabs } from 'cocstorage-ui';

function StorageBoardsTabs() {
  const handleChange = () => {
    //
  };
  return (
    <StyledStorageBoardsTabs>
      <Tabs value={1} onChange={handleChange}>
        <Tab value={1} text="최신" />
        <Tab value={2} text="베스트" />
        <Tab value={3} text="워스트" />
      </Tabs>
    </StyledStorageBoardsTabs>
  );
}

const StyledStorageBoardsTabs = styled.section`
  display: flex;
  justify-content: center;
  margin: 0 -20px;
  padding: 0 20px;
  border-bottom: 1px solid
    ${({
      theme: {
        palette: { box }
      }
    }) => box.stroked.normal};
`;

export default StorageBoardsTabs;
