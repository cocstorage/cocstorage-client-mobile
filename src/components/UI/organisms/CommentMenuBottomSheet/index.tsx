import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  commonCommentDeleteBottomSheetState,
  commonCommentMenuBottomSheetState
} from '@recoil/common/atoms';

import { BottomSheet, Box, Flexbox, Icon, IconButton, Typography } from 'cocstorage-ui';

function CommentMenuBottomSheet() {
  const [{ open, storageId, id, commentId }, setCommentMenuBottomState] = useRecoilState(
    commonCommentMenuBottomSheetState
  );
  const resetCommentMenuBottomState = useResetRecoilState(commonCommentMenuBottomSheetState);
  const setCommentDeleteBottomSheetState = useSetRecoilState(commonCommentDeleteBottomSheetState);

  const handleClose = () => resetCommentMenuBottomState();

  const handleClickCommentDeleteBottomSheet = () => {
    setCommentMenuBottomState((prevState) => ({
      ...prevState,
      open: false
    }));

    setTimeout(() => {
      setCommentDeleteBottomSheetState({
        open: true,
        storageId,
        id,
        commentId
      });
    }, 500);
  };

  return (
    <BottomSheet open={open} onClose={handleClose}>
      <Box customStyle={{ padding: '10px 20px 30px 20px' }}>
        <Flexbox gap={8} alignment="center" onClick={handleClickCommentDeleteBottomSheet}>
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
