import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { useRecoilState } from 'recoil';

import { storageBoardsDialogDisablePathsState } from '@recoil/pages/storageBoards/atoms';

import { Box, Button, Dialog, Flexbox, Icon, Tag, Typography } from 'cocstorage-ui';

import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoardsNoticeDialog() {
  const {
    query: { path = '' }
  } = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const [disableDialogPaths, setStorageBoardsDialogDisablePathsState] = useRecoilState(
    storageBoardsDialogDisablePathsState
  );

  const { data: { storageCategoryId, name } = {} } = useQuery(
    queryKeys.storages.storageById(String(path)),
    () => fetchStorage(String(path))
  );

  const handleClose = () => setOpen(false);

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
          gap={6}
          customStyle={{
            textAlign: 'center'
          }}
        >
          <Icon name="LoudSpeakerOutlined" width={60} height={60} />
          <Typography variant="h1" fontWeight="bold">
            안내드려요!
          </Typography>
        </Flexbox>
        <Typography
          lineHeight="main"
          customStyle={{ marginTop: 16, '& > strong': { fontWeight: 700 } }}
        >
          보고 계신 <strong>{name}</strong> 게시판은 특정 인기 커뮤니티의 인기 게시글들이 미러링
          되고 있는 게시판이에요. 여기에 등록되는 게시글들은 개념글 저장소의 유저가 작성한 게시글이
          아니에요!
        </Typography>
        <Typography lineHeight="main" customStyle={{ marginTop: 16 }}>
          혹여나 유머러스한 게시글이 아닌 개인정보침해가 우려되는 게시글을 발견하시는 경우, 아래의
          이메일로 신고해 주시면, 신속하게 도와드릴게요.
        </Typography>
        <Box customStyle={{ marginTop: 16, textAlign: 'center' }}>
          <Tag startIcon={<Icon name="EmailOutlined" />}>cocstoragehelps@gmail.com</Tag>
        </Box>
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
            다신 안볼래요
          </Button>
        </Flexbox>
      </Box>
    </Dialog>
  );
}

export default StorageBoardsNoticeDialog;
