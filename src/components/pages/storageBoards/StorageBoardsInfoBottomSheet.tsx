import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';

import { openStorageBoardsInfoBottomSheetState } from '@recoil/storageBoards/atoms';

import { Avatar, BottomSheet, Box, Flexbox, Typography, useTheme } from 'cocstorage-ui';

import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoardsInfoBottomSheet() {
  const router = useRouter();
  const { path } = router.query;

  const {
    theme: {
      mode,
      palette: { text }
    }
  } = useTheme();

  const [open, setOpen] = useRecoilState(openStorageBoardsInfoBottomSheetState);

  const { data: { user: { nickname }, name, description, avatarUrl, createdAt } = {} } = useQuery(
    queryKeys.storages.storageById(String(path)),
    () => fetchStorage(String(path))
  );

  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, [setOpen]);

  return (
    <BottomSheet open={open} onClose={() => setOpen(false)}>
      <Box customStyle={{ padding: 20 }}>
        <Flexbox alignment="center" customStyle={{ width: '100%' }}>
          <Avatar width={60} height={60} src={avatarUrl} round alt="Storage Logo Img" />
          <Box customStyle={{ flex: 1, marginLeft: 14 }}>
            <Typography variant="h4" fontWeight="bold">
              {name}
            </Typography>
            <Typography customStyle={{ width: '100%', marginTop: 4 }}>{description}</Typography>
          </Box>
        </Flexbox>
        <Box customStyle={{ width: '100%', marginTop: 24 }}>
          <Flexbox>
            <Typography fontWeight="medium" customStyle={{ minWidth: 50 }}>
              관리자
            </Typography>
            <Typography
              customStyle={{
                maxWidth: 'calc(100% - 74px)',
                marginLeft: 24,
                color: text[mode].text1
              }}
            >
              {nickname}
            </Typography>
          </Flexbox>
          <Flexbox customStyle={{ marginTop: 10 }}>
            <Typography fontWeight="medium" customStyle={{ minWidth: 50 }}>
              개설일
            </Typography>
            <Typography
              customStyle={{
                maxWidth: 'calc(100% - 74px)',
                marginLeft: 24,
                color: text[mode].text1
              }}
            >
              {dayjs(createdAt).format('YYYY. MM. DD')}
            </Typography>
          </Flexbox>
          <Flexbox customStyle={{ marginTop: 10 }}>
            <Typography fontWeight="medium" customStyle={{ minWidth: 50 }}>
              URL
            </Typography>
            <Typography
              customStyle={{
                maxWidth: 'calc(100% - 74px)',
                marginLeft: 24,
                color: text[mode].text1
              }}
            >
              {`https://m.cocstorage.com/storages/${path}`}
            </Typography>
          </Flexbox>
        </Box>
      </Box>
    </BottomSheet>
  );
}

export default StorageBoardsInfoBottomSheet;
