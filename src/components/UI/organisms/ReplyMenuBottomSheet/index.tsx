import { useRecoilState, useSetRecoilState } from 'recoil';

import {
  commonReplyDeleteBottomSheetState,
  commonReplyListBottomSheetState,
  commonReplyMenuBottomSheetState
} from '@recoil/common/atoms';

import { BottomSheet, Box, Flexbox, Icon, IconButton, Typography } from 'cocstorage-ui';

function ReplyMenuBottomSheet() {
  const [{ open, storageId, id, commentId, replyId }, setReplyMenuBottomState] = useRecoilState(
    commonReplyMenuBottomSheetState
  );
  const setReplyListBottomState = useSetRecoilState(commonReplyListBottomSheetState);
  const setReplyDeleteBottomState = useSetRecoilState(commonReplyDeleteBottomSheetState);

  const handleClose = () => {
    setReplyMenuBottomState((prevState) => ({
      ...prevState,
      open: false
    }));

    setTimeout(() => {
      setReplyListBottomState((prevState) => ({
        ...prevState,
        open: true
      }));
    }, 500);
  };

  const handleClickReplyDeleteBottomSheet = () => {
    setReplyMenuBottomState((prevState) => ({
      ...prevState,
      open: false
    }));

    setTimeout(() => {
      setReplyDeleteBottomState({
        open: true,
        storageId,
        id,
        commentId,
        replyId
      });
    }, 500);
  };

  return (
    <BottomSheet open={open} onClose={handleClose}>
      <Box customStyle={{ padding: '10px 20px 30px 20px' }}>
        <Flexbox gap={8} alignment="center" onClick={handleClickReplyDeleteBottomSheet}>
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
