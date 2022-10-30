import { BottomSheet, Box, Flexbox, Icon, IconButton, Typography } from 'cocstorage-ui';

interface ReplyMenuBottomSheetProps {
  open: boolean;
  onClose: () => void;
  onClickDeleteMenu: () => void;
}

function ReplyMenuBottomSheet({ open, onClose, onClickDeleteMenu }: ReplyMenuBottomSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose}>
      <Box customStyle={{ padding: '10px 20px 30px 20px' }}>
        <Flexbox gap={8} alignment="center" onClick={onClickDeleteMenu}>
          <IconButton>
            <Icon name="CloseOutlined" />
          </IconButton>
          <Typography variant="p1">답글 삭제</Typography>
        </Flexbox>
      </Box>
    </BottomSheet>
  );
}

export default ReplyMenuBottomSheet;
