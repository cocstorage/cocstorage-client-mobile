import { useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

import { useRecoilState, useSetRecoilState } from 'recoil';

import {
  storageBoardDeleteBottomSheetOpenState,
  storageBoardMenuBottomSheetOpenState
} from '@recoil/pages/storageBoard/atoms';

import { BottomSheet, Flexbox, Icon, Typography } from 'cocstorage-ui';

function StorageBoardMenuBottomSheet() {
  const router = useRouter();
  const { path, id } = router.query;

  const [open, setOpenState] = useRecoilState(storageBoardMenuBottomSheetOpenState);
  const setDeleteBottomSheetOpenState = useSetRecoilState(storageBoardDeleteBottomSheetOpenState);

  const handleClose = () => setOpenState(false);

  const openDeleteBottomSheetTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleClick = () =>
    router.push(`/storages/${path}/${id}/edit`).then(() => {
      setOpenState(false);
    });

  const handleClickDelete = () => {
    setOpenState(false);

    openDeleteBottomSheetTimerRef.current = setTimeout(() => {
      setDeleteBottomSheetOpenState(true);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (openDeleteBottomSheetTimerRef.current) {
        clearTimeout(openDeleteBottomSheetTimerRef.current);
      }
    };
  }, []);

  return (
    <BottomSheet
      open={open}
      onClose={handleClose}
      customStyle={{
        padding: '0 20px 30px'
      }}
    >
      <Flexbox
        alignment="center"
        gap={8}
        onClick={handleClick}
        customStyle={{
          marginTop: 10,
          padding: '10px 0'
        }}
      >
        <Icon name="WriteOutlined" />
        <Typography variant="p1">수정하기</Typography>
      </Flexbox>
      <Flexbox
        alignment="center"
        gap={8}
        onClick={handleClickDelete}
        customStyle={{
          marginTop: 4,
          padding: '10px 0'
        }}
      >
        <Icon name="CloseOutlined" />
        <Typography variant="p1">삭제하기</Typography>
      </Flexbox>
    </BottomSheet>
  );
}

export default StorageBoardMenuBottomSheet;
