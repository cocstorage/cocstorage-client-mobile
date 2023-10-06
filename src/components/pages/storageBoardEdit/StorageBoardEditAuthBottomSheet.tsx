import { ChangeEvent, useState } from 'react';

import { useRouter } from 'next/router';

import { BottomSheet, Button, TextBar, Tooltip, Typography, useTheme } from '@cocstorage/ui';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { patchNonMemberStorageBoard } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';
import queryKeys from '@constants/queryKeys';
import { commonOnBoardingDefault, commonOnBoardingState } from '@recoil/common/atoms';
import { myPasswordState } from '@recoil/pages/my/atoms';
import {
  storageBoardEditEditorContentsState,
  storageBoardEditNicknameState,
  storageBoardEditPasswordState,
  storageBoardEditSubjectState
} from '@recoil/pages/storageBoardEdit/atoms';

function StorageBoardEditAuthDialog() {
  const router = useRouter();
  const { path, id } = router.query;

  const {
    theme: {
      palette: { secondary }
    }
  } = useTheme();

  const myPassword = useRecoilValue(myPasswordState);
  const [{ loadPassword: { done = false } = {} }, setCommonOnBoardingState] =
    useRecoilState(commonOnBoardingState);
  const setEditPasswordPasswordState = useSetRecoilState(storageBoardEditPasswordState);
  const setSubjectState = useSetRecoilState(storageBoardEditSubjectState);
  const setNicknameState = useSetRecoilState(storageBoardEditNicknameState);
  const setEditorContentsState = useSetRecoilState(storageBoardEditEditorContentsState);

  const [open, setOpen] = useState(true);
  const [password, setPassword] = useState(myPassword);
  const [errorMessage, setErrorMessage] = useState<{
    error: boolean;
    message: string;
  }>({
    error: false,
    message: ''
  });

  const { data: { id: storageId } = {} } = useQuery(
    queryKeys.storages.storageById(String(path)),
    () => fetchStorage(String(path))
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
    }) => patchNonMemberStorageBoard(newStorageId, Number(newId), newPassword),
    {
      onSuccess: (data) => {
        setOpen(false);
        setNicknameState(data.nickname);
        setSubjectState(data.subject);
        setEditorContentsState(data.contentJson);
        setEditPasswordPasswordState(password);
      },
      onError: () =>
        setErrorMessage({
          error: true,
          message: '비밀번호가 일치하지 않아요.'
        })
    }
  );

  const handleCloseLoadPasswordTooltip = () =>
    setCommonOnBoardingState((prevState) => ({
      ...prevState,
      loadPassword: {
        ...commonOnBoardingDefault.loadPassword,
        step: 1,
        done: commonOnBoardingDefault.loadPassword.lastStep === 1
      }
    }));

  const handleClose = () => router.back();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (errorMessage.error) {
      setErrorMessage({
        error: false,
        message: ''
      });
    }
    setPassword(event.currentTarget.value);
  };

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
      id: Number(id),
      password
    });
  };

  return (
    <BottomSheet
      open={open}
      onClose={handleClose}
      customStyle={{
        padding: '0 20px 20px'
      }}
      wrapperCustomStyle={{
        backdropFilter: 'blur(5px)'
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        customStyle={{
          marginTop: 30,
          textAlign: 'center'
        }}
      >
        게시글 수정을 계속하려면
        <br />
        비밀번호를 입력해 주세요.
      </Typography>
      <Tooltip
        open={!done}
        onClose={handleCloseLoadPasswordTooltip}
        content="저장된 비밀번호를 불러왔어요!"
        placement="top"
        fillWrapper
        wrapperCustomStyle={{
          marginTop: 34
        }}
      >
        <TextBar
          type="password"
          label="비밀번호"
          fullWidth
          size="xBig"
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
        size="big"
        onClick={handleClick}
        disabled={!password || isLoading}
        customStyle={{
          marginTop: 20
        }}
      >
        계속하기
      </Button>
    </BottomSheet>
  );
}

export default StorageBoardEditAuthDialog;
