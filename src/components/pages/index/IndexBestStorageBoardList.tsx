import styled from '@emotion/styled';
import { Box, Flexbox, Icon, IconButton, Tag, Typography } from 'cocstorage-ui';

import StorageBoardCard from '@components/UI/molecules/StorageBoardCard';

function IndexBestStorageBoardList() {
  return (
    <Box component="section" customStyle={{ margin: '30px -20px 0' }}>
      <Flexbox
        alignment="center"
        justifyContent="space-between"
        gap={4}
        customStyle={{ margin: '0 20px' }}
      >
        <Flexbox alignment="center" justifyContent="space-between" gap={8}>
          <Tag
            variant="semiAccent"
            startIcon={<Icon name="ThumbsUpOutlined" width={14} height={14} />}
            customStyle={{
              padding: '0 6px',
              height: 21,
              borderRadius: 4,
              fontSize: 12
            }}
          >
            베스트
          </Tag>
          <Typography variant="h4" fontWeight="bold">
            ㅇㄱㄹㅇ
          </Typography>
        </Flexbox>
        <IconButton>
          <Icon name="CaretSemiRightOutlined" />
        </IconButton>
      </Flexbox>
      <List>
        <StorageBoardCard variant="normal" customStyle={{ maxWidth: 330 }} />
        <StorageBoardCard variant="normal" customStyle={{ maxWidth: 330 }} />
        <StorageBoardCard variant="normal" customStyle={{ maxWidth: 330 }} />
        <StorageBoardCard variant="normal" customStyle={{ maxWidth: 330 }} />
        <StorageBoardCard variant="normal" customStyle={{ maxWidth: 330 }} />
      </List>
    </Box>
  );
}

export const List = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  column-gap: 12px;
  margin-top: 14px;
  padding: 0 20px;
  overflow-x: auto;
`;

export default IndexBestStorageBoardList;
