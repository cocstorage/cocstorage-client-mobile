import { BottomSheet, Box, Flexbox, Icon, IconButton, Typography } from 'cocstorage-ui';

interface CommentMenuBottomSheetProps {
  open: boolean;
  onClose: () => void;
  onClickDeleteMenu: () => void;
}

function CommentMenuBottomSheet({ open, onClose, onClickDeleteMenu }: CommentMenuBottomSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose}>
      <Box customStyle={{ padding: '10px 20px 30px 20px' }}>
        <Flexbox gap={8} alignment="center" onClick={onClickDeleteMenu}>
          <IconButton>
            <Icon name="CloseOutlined" />
          </IconButton>
          <Typography variant="p1">댓글 삭제</Typography>
        </Flexbox>
      </Box>
    </BottomSheet>
  );
}

export default CommentMenuBottomSheet;
