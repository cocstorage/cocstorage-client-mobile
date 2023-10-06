import { useRouter } from 'next/router';

import { Avatar, Button, Flexbox, IconButton, Tag, useTheme } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { fetchStorage } from '@api/v1/storages';
import queryKeys from '@constants/queryKeys';
import {
  storageBoardsPostDialogOpenState,
  storageBoardsPostDraftIdState,
  storageBoardsPostEditorContentsState,
  storageBoardsPostSubjectState
} from '@recoil/pages/storageBoardsPost/atoms';

function StorageBoardsPostHeader() {
  const router = useRouter();
  const { path } = router.query;

  const {
    theme: {
      palette: { box }
    }
  } = useTheme();

  const draftId = useRecoilValue(storageBoardsPostDraftIdState);
  const subject = useRecoilValue(storageBoardsPostSubjectState);
  const editorContents = useRecoilValue(storageBoardsPostEditorContentsState);
  const setOpenState = useSetRecoilState(storageBoardsPostDialogOpenState);

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
      <Flexbox gap={10}>
        <IconButton onClick={handleClickBack}>
          <Icon name="CaretSemiLeftOutlined" />
        </IconButton>
        <Tag variant="semiAccent">글쓰기 BETA</Tag>
      </Flexbox>
      <Flexbox gap={10}>
        <Avatar width={24} height={24} src={avatarUrl} alt="Storage Logo Img" round={6} />
        <Button
          variant="accent"
          size="pico"
          startIcon={<Icon name="SendFilled" width={15} height={15} />}
          onClick={handleClick}
          disabled={!draftId || !subject || !editorContents.length}
        >
          등록
        </Button>
      </Flexbox>
    </Flexbox>
  );
}

export default StorageBoardsPostHeader;
