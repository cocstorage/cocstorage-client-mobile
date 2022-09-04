import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  storageBoardCommentDeleteBottomSheetState,
  storageBoardCommentMenuBottomSheetState
} from '@recoil/storageBoard/atoms';

import { BottomSheet, Box, Flexbox, Icon, IconButton, Typography } from 'cocstorage-ui';

function CommentMenuBottomSheet() {
  const [
    { open, storageId, id, commentId, commentsLength, commentLatestPage },
    setCommentMenuBottomState
  ] = useRecoilState(storageBoardCommentMenuBottomSheetState);
  const resetCommentMenuBottomState = useResetRecoilState(storageBoardCommentMenuBottomSheetState);
  const setCommentDeleteBottomSheetState = useSetRecoilState(
    storageBoardCommentDeleteBottomSheetState
  );

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
        commentId,
        commentsLength,
        commentLatestPage
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
