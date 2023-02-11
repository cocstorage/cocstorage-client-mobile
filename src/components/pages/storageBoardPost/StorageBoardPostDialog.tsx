import { ChangeEvent, useState } from 'react';

import { useRouter } from 'next/router';

import { useMutation, useQuery } from '@tanstack/react-query';

import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { commonOnBoardingDefault, commonOnBoardingState } from '@recoil/common/atoms';
import { myNicknameState, myPasswordState } from '@recoil/pages/my/atoms';
import {
  storageBoardPostDialogOpenState,
  storageBoardPostDraftIdState,
  storageBoardPostEditorContentsState,
  storageBoardPostSubjectState
} from '@recoil/pages/storageBoardPost/atoms';

import {
  Button,
  Dialog,
  Flexbox,
  Icon,
  TextBar,
  Tooltip,
  Typography,
  useTheme
} from 'cocstorage-ui';

import validators from '@utils/validators';

import { PutStorageBoardData, putNonMemberStorageBoard } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoardPostDialog() {
  const router = useRouter();
  const { path } = router.query;

  const {
    theme: {
      palette: { secondary }
    }
  } = useTheme();

  const [open, setOpenState] = useRecoilState(storageBoardPostDialogOpenState);
  const [myNickname, setMyNicknameState] = useRecoilState(myNicknameState);
  const [myPassword, setMyPasswordState] = useRecoilState(myPasswordState);
  const [{ password: { done = false } = {} }, setCommonOnBoardingState] =
    useRecoilState(commonOnBoardingState);
  const subject = useRecoilValue(storageBoardPostSubjectState);
  const draftId = useRecoilValue(storageBoardPostDraftIdState);
  const editorContents = useRecoilValue(storageBoardPostEditorContentsState);
  const resetDraftIdState = useResetRecoilState(storageBoardPostDraftIdState);
  const resetSubjectState = useResetRecoilState(storageBoardPostSubjectState);
  const resetEditorContentsState = useResetRecoilState(storageBoardPostEditorContentsState);

  const [errorMessage, setErrorMessage] = useState({
    nickname: {
      error: false,
      message: ''
    },
    password: {
      error: false,
      message: ''
    }
  });

  const { data: { id } = {} } = useQuery(queryKeys.storages.storageById(String(path)), () =>
    fetchStorage(String(path))
  );

  const { mutate, isLoading } = useMutation(
    ({
      storageId,
      id: newDraftId,
      data
    }: {
      storageId: number;
      id: number;
      data: PutStorageBoardData;
    }) => putNonMemberStorageBoard(storageId, newDraftId, data),
    {
      onSettled: () => {
        setOpenState(false);
      },
      onSuccess: ({ id: storageBoardId }) => {
        setOpenState(false);
        router.push(`/storages/${path}/${storageBoardId}`).then(() => {
          resetDraftIdState();
          resetSubjectState();
          resetEditorContentsState();
        });
      }
    }
  );

  const handleClose = () => setOpenState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.type === 'password') {
      setErrorMessage((prevState) => ({
        ...prevState,
        password: {
          error: false,
          message: ''
        }
      }));
      setMyPasswordState(event.currentTarget.value);
    } else {
      setErrorMessage((prevState) => ({
        ...prevState,
        nickname: {
          error: false,
          message: ''
        }
      }));
      setMyNicknameState(event.currentTarget.value);
    }
  };

  const handleClick = () => {
    handleClosePasswordTooltip();

    if (!validators.nickname(myNickname)) {
      setErrorMessage((prevState) => ({
        ...prevState,
        nickname: {
          error: true,
          message:
            '한글 또는 영문 대소문자 2자 이상 10자 이하로 입력해 주세요.<br />특수문자는 포함할 수 없어요!'
        }
      }));
      return;
    }
    if (!validators.password(myPassword)) {
      setErrorMessage((prevState) => ({
        ...prevState,
        password: {
          error: true,
          message: '7자 이상으로 입력해 주세요!'
        }
      }));
      return;
    }

    mutate({
      storageId: id,
      id: draftId,
      data: {
        nickname: myNickname,
        password: myPassword,
        subject,
        content_json: JSON.stringify(editorContents),
        description: editorContents
          .map(({ children }) =>
            children.filter(({ tag }) => tag === '#text').map(({ content }) => content)
          )
          .filter((contents) => contents.length)
          .join(' ')
      }
    });
  };

  const handleClosePasswordTooltip = () =>
    setCommonOnBoardingState((prevState) => ({
      ...prevState,
      password: {
        ...commonOnBoardingDefault.password,
        step: 1,
        done: commonOnBoardingDefault.password.lastStep === 1
      }
    }));

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      customStyle={{
        maxWidth: 475,
        padding: '40px 30px'
      }}
    >
      <Flexbox direction="vertical" gap={8}>
        <Typography variant="h3" fontWeight="bold">
          닉네임
        </Typography>
        <TextBar onChange={handleChange} value={myNickname} fullWidth placeholder="닉네임" />
        {errorMessage.nickname.error && (
          <Typography
            dangerouslySetInnerHTML={{
              __html: errorMessage.nickname.message
            }}
            color={secondary.red.main}
            customStyle={{ marginTio: 10 }}
          />
        )}
      </Flexbox>
      <Flexbox
        direction="vertical"
        gap={8}
        customStyle={{
          marginTop: 16
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          비밀번호
        </Typography>
        <Tooltip
          open={!done}
          onClose={handleClosePasswordTooltip}
          placement="top"
          content="비밀번호를 랜덤하게 생성했어요!"
          fillWrapper
        >
          <TextBar
            type="password"
            onChange={handleChange}
            value={myPassword}
            fullWidth
            placeholder="비밀번호"
          />
        </Tooltip>
        {errorMessage.password.error && (
          <Typography
            dangerouslySetInnerHTML={{
              __html: errorMessage.password.message
            }}
            color={secondary.red.main}
            customStyle={{ marginTio: 10 }}
          />
        )}
      </Flexbox>
      <Flexbox
        gap={8}
        justifyContent="flex-end"
        customStyle={{
          marginTop: 20
        }}
      >
        <Button onClick={handleClose} disabled={isLoading}>
          취소
        </Button>
        <Button
          variant="accent"
          startIcon={<Icon name="SendFilled" width={18} height={18} />}
          onClick={handleClick}
          disabled={isLoading}
        >
          완료
        </Button>
      </Flexbox>
    </Dialog>
  );
}

export default StorageBoardPostDialog;
