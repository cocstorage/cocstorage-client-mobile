import { useRouter } from 'next/router';

import { useResetRecoilState } from 'recoil';

import {
  storageBoardPostDraftIdState,
  storageBoardPostEditorContentsState,
  storageBoardPostSubjectState
} from '@recoil/pages/storageBoardPost/atoms';

import { Box, Button, Icon } from 'cocstorage-ui';

import useReverseScrollTrigger from '@hooks/useReverseScrollTrigger';

function StorageBoardsPostFloatingButton() {
  const router = useRouter();
  const { path } = router.query;

  const resetDraftIdState = useResetRecoilState(storageBoardPostDraftIdState);
  const resetSubjectState = useResetRecoilState(storageBoardPostSubjectState);
  const resetEditorContentsState = useResetRecoilState(storageBoardPostEditorContentsState);

  const { triggered, prevScrollY } = useReverseScrollTrigger();

  const handleClick = () => {
    resetDraftIdState();
    resetSubjectState();
    resetEditorContentsState();

    router.push(`/storages/${path}/post`);
  };

  return (
    <Box
      customStyle={{
        position: 'fixed',
        left: '50%',
        bottom: 80,
        transform: `translate(-50%, ${!triggered && prevScrollY ? '200%' : 0})`,
        transition: 'transform .2s'
      }}
    >
      <Button
        variant="accent"
        startIcon={<Icon name="WriteOutlined" width={18} height={18} />}
        onClick={handleClick}
        customStyle={{
          boxShadow: '0px 10px 20px rgba(52, 133, 255, 0.2);'
        }}
      >
        게시글 등록
      </Button>
    </Box>
  );
}

export default StorageBoardsPostFloatingButton;
