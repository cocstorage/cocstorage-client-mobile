import { ChangeEvent } from 'react';

import { BottomSheet, Box, Button, TextBar, Typography, useTheme } from 'cocstorage-ui';

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

  return (
    <BottomSheet open={open} onClose={onClose}>
      <Box customStyle={{ padding: '30px 20px' }}>
        <Typography variant="h3" fontWeight="bold" customStyle={{ textAlign: 'center' }}>
          답글을 삭제하려면
          <br /> 비밀번호를 입력해주세요.
        </Typography>
        <TextBar
          type="password"
          onChange={onChange}
          value={password}
          fullWidth
          size="big"
          label="비밀번호"
          autoComplete="current-password"
          customStyle={{ marginTop: 30 }}
        />
        {errorMessage.error && (
          <Typography customStyle={{ marginTop: 10, color: secondary.red.main }}>
            {errorMessage.message}
          </Typography>
        )}
        <Button
          variant="accent"
          fullWidth
          onClick={onClickDelete}
          disabled={!password || isLoading}
          customStyle={{ marginTop: 20, justifyContent: 'center' }}
        >
          확인
        </Button>
      </Box>
    </BottomSheet>
  );
}

export default ReplyDeleteBottomSheet;
