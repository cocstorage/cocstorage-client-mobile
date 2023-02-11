import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { Avatar, Button, Flexbox, Icon, IconButton, useTheme } from 'cocstorage-ui';

import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoardPostHeader() {
  const router = useRouter();
  const { path } = router.query;

  const {
    theme: {
      palette: { box }
    }
  } = useTheme();

  const { data: { avatarUrl } = {} } = useQuery(queryKeys.storages.storageById(String(path)), () =>
    fetchStorage(String(path))
  );

  return (
    <Flexbox
      component="header"
      alignment="center"
      justifyContent="space-between"
      customStyle={{
        width: '100%',
        height: 50,
        padding: '0 20px',
        borderBottom: `1px solid ${box.stroked.normal}`
      }}
    >
      <IconButton>
        <Icon name="CaretSemiLeftOutlined" />
      </IconButton>
      <Flexbox gap={10}>
        <Avatar width={24} height={24} src={avatarUrl} alt="Storage Logo Img" round={6} />
        <Button
          size="pico"
          color="primary"
          startIcon={<Icon name="SendOutlined" width={15} height={15} />}
          disabled
        >
          등록
        </Button>
      </Flexbox>
    </Flexbox>
  );
}

export default StorageBoardPostHeader;
