import { ChangeEvent } from 'react';

import { BottomSheet, Box, Button, TextBar, Tooltip, Typography, useTheme } from '@cocstorage/ui';
import { useRecoilState } from 'recoil';

import { commonOnBoardingDefault, commonOnBoardingState } from '@recoil/common/atoms';

interface ReplyDeleteBottomSheetProps {
  open: boolean;
  onClose: () => void;
  password: string;
  errorMessage: {
    error: boolean;
    message: string;
  };
  isLoading: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickDelete: () => void;
}

function ReplyDeleteBottomSheet({
  open,
  onClose,
  password,
  errorMessage,
  isLoading,
  onChange,
  onClickDelete
}: ReplyDeleteBottomSheetProps) {
  const {
    theme: {
      palette: { secondary }
    }
  } = useTheme();

  const [{ loadPassword: { done = false } = {} }, setCommonOnBoardingState] =
    useRecoilState(commonOnBoardingState);

  const handleClose = () =>
    setCommonOnBoardingState((prevState) => ({
      ...prevState,
      loadPassword: {
        ...commonOnBoardingDefault.loadPassword,
        step: 1,
        done: commonOnBoardingDefault.loadPassword.lastStep === 1
      }
    }));

  return (
    <BottomSheet open={open} onClose={onClose}>
      <Box customStyle={{ padding: '30px 20px' }}>
        <Typography variant="h3" fontWeight="bold" customStyle={{ textAlign: 'center' }}>
          답글을 삭제하려면
          <br /> 비밀번호를 입력해 주세요.
        </Typography>
        <Tooltip
          open={!done}
          onClose={handleClose}
          content="저장된 비밀번호를 불러왔어요!"
          placement="top"
          wrapperCustomStyle={{
            marginTop: 30
          }}
        >
          <TextBar
            type="password"
            label="비밀번호"
            fullWidth
            size="xBig"
            value={password}
            onChange={onChange}
            autoFocus
          />
        </Tooltip>
        {errorMessage.error && (
          <Typography customStyle={{ marginTop: 10, color: secondary.red.main }}>
            {errorMessage.message}
          </Typography>
        )}
        <Button
          variant="accent"
          size="big"
          fullWidth
          onClick={onClickDelete}
          disabled={!password || isLoading}
          customStyle={{
            marginTop: 20,
            justifyContent: 'center',
            backgroundColor: secondary.red.main
          }}
        >
          확인
        </Button>
      </Box>
    </BottomSheet>
  );
}

export default ReplyDeleteBottomSheet;
