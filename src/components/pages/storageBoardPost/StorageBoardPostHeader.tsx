import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  storageBoardPostDialogOpenState,
  storageBoardPostDraftIdState,
  storageBoardPostEditorContentsState,
  storageBoardPostSubjectState
} from '@recoil/pages/storageBoardPost/atoms';

import { Avatar, Button, Flexbox, Icon, IconButton, useTheme } from 'cocstorage-ui';

import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoardPostHeader() {
  const router = useRouter();
  const { path } = router.query;

  const {
    theme: {
      palette: { box }
    }
  } = useTheme();

  const draftId = useRecoilValue(storageBoardPostDraftIdState);
  const subject = useRecoilValue(storageBoardPostSubjectState);
  const editorContents = useRecoilValue(storageBoardPostEditorContentsState);
  const setOpenState = useSetRecoilState(storageBoardPostDialogOpenState);

  const { data: { avatarUrl } = {} } = useQuery(queryKeys.storages.storageById(String(path)), () =>
    fetchStorage(String(path))
  );

  const handleClick = () => setOpenState(true);

  const handleClickBack = () => router.back();

  return (
    <Flexbox
      component="header"
      alignment="center"
      justifyContent="space-between"
      customStyle={{
        width: '100%',
        height: 50,
        padding: '0 20px',
        borderBottom: `1px solid ${box.stroked.normal}`
      }}
    >
      <IconButton onClick={handleClickBack}>
        <Icon name="CaretSemiLeftOutlined" />
      </IconButton>
      <Flexbox gap={10}>
        <Avatar width={24} height={24} src={avatarUrl} alt="Storage Logo Img" round={6} />
        <Button
          size="pico"
          startIcon={<Icon name="SendOutlined" width={15} height={15} />}
          onClick={handleClick}
          disabled={!draftId || !subject || !editorContents.length}
        >
          등록
        </Button>
      </Flexbox>
    </Flexbox>
  );
}

export default StorageBoardPostHeader;
