import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { useMutation, useQuery } from '@tanstack/react-query';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { commonOnBoardingDefault, commonOnBoardingState } from '@recoil/common/atoms';
import { myPasswordState } from '@recoil/pages/my/atoms';
import {
  storageBoardDeleteBottomSheetOpenState,
  storageBoardMenuBottomSheetOpenState
} from '@recoil/pages/storageBoard/atoms';

import {
  BottomSheet,
  Button,
  Flexbox,
  TextBar,
  Tooltip,
  Typography,
  useTheme
} from 'cocstorage-ui';

import { deleteNonMemberStorageBoard, fetchStorageBoard } from '@api/v1/storage-boards';

import queryKeys from '@constants/queryKeys';

function StorageBoardDeleteBottomSheet() {
  const router = useRouter();
  const { path, id } = router.query;
  const {
    theme: {
      palette: { secondary }
    }
  } = useTheme();

  const [open, setOpenState] = useRecoilState(storageBoardDeleteBottomSheetOpenState);
  const [{ loadPassword: { done = false } = {} }, setCommonOnBoardingState] =
    useRecoilState(commonOnBoardingState);
  const setMenuBottomSheetOpenState = useSetRecoilState(storageBoardMenuBottomSheetOpenState);
  const myPassword = useRecoilValue(myPasswordState);

  const [password, setPassword] = useState(myPassword);
  const [errorMessage, setErrorMessage] = useState<{
    error: boolean;
    message: string;
  }>({
    error: false,
    message: ''
  });

  const openMenuBottomSheetOpenTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const { data: { id: storageBoardId, storage: { id: storageId = 0 } } = {} } = useQuery(
    queryKeys.storageBoards.storageBoardById(Number(id)),
    () => fetchStorageBoard(Number(storageId), Number(id))
  );

  const { mutate, isLoading } = useMutation(
    ({
      storageId: newStorageId,
      id: newId,
      password: newPassword
    }: {
      storageId: number;
      id: number;
      password: string | number;
    }) => deleteNonMemberStorageBoard(newStorageId, newId, newPassword),
    {
      onSuccess: () => {
        setOpenState(false);
        router.push(`/storages/${path}`);
      },
      onError: () =>
        setErrorMessage({
          error: true,
          message: '비밀번호가 일치하지 않아요.'
        })
    }
  );

  const handleClose = () => {
    setOpenState(false);

    openMenuBottomSheetOpenTimerRef.current = setTimeout(() => {
      setMenuBottomSheetOpenState(true);
    }, 500);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (errorMessage.error) {
      setErrorMessage({
        error: false,
        message: ''
      });
    }
    setPassword(event.currentTarget.value);
  };

  const handleClosePasswordTooltip = () =>
    setCommonOnBoardingState((prevState) => ({
      ...prevState,
      loadPassword: {
        ...commonOnBoardingDefault.loadPassword,
        step: 1,
        done: commonOnBoardingDefault.loadPassword.lastStep === 1
      }
    }));

  const handleClick = () => {
    setCommonOnBoardingState((prevState) => ({
      ...prevState,
      loadPassword: {
        ...commonOnBoardingDefault.loadPassword,
        step: 1,
        done: commonOnBoardingDefault.loadPassword.lastStep === 1
      }
    }));

    mutate({
      storageId,
      id: storageBoardId,
      password
    });
  };

  useEffect(() => {
    if (!open) {
      setErrorMessage({
        error: false,
        message: ''
      });
      if (myPassword) setPassword(myPassword);
    }
  }, [open, myPassword]);

  useEffect(() => {
    return () => {
      if (openMenuBottomSheetOpenTimerRef.current) {
        clearTimeout(openMenuBottomSheetOpenTimerRef.current);
      }
    };
  }, []);

  return (
    <BottomSheet
      open={open}
      onClose={handleClose}
      customStyle={{
        padding: '0 20px 20px'
      }}
    >
      <Flexbox
        direction="vertical"
        alignment="center"
        gap={4}
        customStyle={{
          marginTop: 30
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          게시글 삭제를 계속하려면
          <br /> 비밀번호를 입력해 주세요.
        </Typography>
        <Typography variant="s1">삭제된 게시글은 복원이 되지 않아요.</Typography>
      </Flexbox>
      <Tooltip
        open={!done}
        onClose={handleClosePasswordTooltip}
        content="저장된 비밀번호를 불러왔어요!"
        placement="top"
        fillWrapper
        wrapperCustomStyle={{
          marginTop: 30
        }}
      >
        <TextBar
          type="password"
          fullWidth
          size="big"
          label="비밀번호"
          value={password}
          onChange={handleChange}
          autoFocus
        />
      </Tooltip>
      {errorMessage.error && (
        <Typography customStyle={{ marginTop: 10, color: secondary.red.main }}>
          {errorMessage.message}
        </Typography>
      )}
      <Button
        fullWidth
        variant="accent"
        onClick={handleClick}
        disabled={!password || isLoading}
        customStyle={{
          marginTop: 20,
          backgroundColor: secondary.red.main
        }}
      >
        확인
      </Button>
    </BottomSheet>
  );
}

export default StorageBoardDeleteBottomSheet;
