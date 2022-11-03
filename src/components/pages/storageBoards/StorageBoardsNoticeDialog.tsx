import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { useRecoilState } from 'recoil';

import { storageBoardsDialogDisablePathsState } from '@recoil/pages/storageBoards/atoms';

import { Box, Button, Dialog, Flexbox, Icon, Typography } from 'cocstorage-ui';

import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoardsNoticeDialog() {
  const router = useRouter();
  const { path = '' } = router.query;
  const [open, setOpen] = useState(false);

  const [disableDialogPaths, setStorageBoardsDialogDisablePathsState] = useRecoilState(
    storageBoardsDialogDisablePathsState
  );

  const { data: { storageCategoryId } = {} } = useQuery(
    queryKeys.storages.storageById(String(path)),
    () => fetchStorage(String(path))
  );

  const handleClose = () => {
    setOpen(false);
    router
      .push('/notices/181')
      .then(() =>
        setStorageBoardsDialogDisablePathsState(disableDialogPaths.concat([String(path)]))
      );
  };

  const handleDisable = () => {
    setStorageBoardsDialogDisablePathsState(disableDialogPaths.concat([String(path)]));
    setOpen(false);
  };

  useEffect(() => {
    if (storageCategoryId === 1 && !disableDialogPaths.includes(String(path))) {
      setOpen(true);
    }
  }, [storageCategoryId, disableDialogPaths, path]);

  return (
    <Dialog fullWidth open={open} onClose={handleClose} customStyle={{ maxWidth: 475 }}>
      <Box customStyle={{ padding: 16 }}>
        <Flexbox
          alignment="center"
          justifyContent="center"
          gap={6}
          customStyle={{
            textAlign: 'center'
          }}
        >
          <Icon name="EmailOutlined" width={30} height={30} />
          <Typography variant="h3" fontWeight="bold">
            여러분들께 드리는 마지막 소식
          </Typography>
        </Flexbox>
        <Flexbox gap={6} customStyle={{ width: '100%', marginTop: 24, textAlign: 'center' }}>
          <Button
            fullWidth
            onClick={handleClose}
            customStyle={{ flex: 1, justifyContent: 'center' }}
          >
            확인
          </Button>
          <Button
            variant="accent"
            fullWidth
            onClick={handleDisable}
            customStyle={{ flex: 1, justifyContent: 'center' }}
          >
            안볼래요
          </Button>
        </Flexbox>
      </Box>
    </Dialog>
  );
}

export default StorageBoardsNoticeDialog;
