import { useRouter } from 'next/router';

import { useMutation, useQuery } from '@tanstack/react-query';

import { useRecoilValue, useResetRecoilState } from 'recoil';

import {
  storageBoardEditEditorContentsState,
  storageBoardEditNicknameState,
  storageBoardEditPasswordState,
  storageBoardEditSubjectState
} from '@recoil/pages/storageBoardEdit/atoms';

import { Avatar, Button, Flexbox, Icon, IconButton, useTheme } from 'cocstorage-ui';

import { PutStorageBoardData, putNonMemberStorageBoard } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoardEditHeader() {
  const router = useRouter();
  const { path, id } = router.query;

  const {
    theme: {
      palette: { box }
    }
  } = useTheme();

  const nickname = useRecoilValue(storageBoardEditNicknameState);
  const password = useRecoilValue(storageBoardEditPasswordState);
  const subject = useRecoilValue(storageBoardEditSubjectState);
  const editorContents = useRecoilValue(storageBoardEditEditorContentsState);
  const resetNickname = useResetRecoilState(storageBoardEditNicknameState);
  const resetPassword = useResetRecoilState(storageBoardEditPasswordState);
  const resetSubject = useResetRecoilState(storageBoardEditSubjectState);
  const resetEditorContents = useResetRecoilState(storageBoardEditEditorContentsState);

  const { data: { id: storageId, avatarUrl } = {} } = useQuery(
    queryKeys.storages.storageById(String(path)),
    () => fetchStorage(String(path))
  );

  const { mutate, isLoading } = useMutation(
    ({
      storageId: newStorageId,
      id: newId,
      data
    }: {
      storageId: number;
      id: number;
      data: PutStorageBoardData;
    }) => putNonMemberStorageBoard(newStorageId, newId, data),
    {
      onSuccess: ({ id: storageBoardId }) => {
        router.push(`/storages/${path}/${storageBoardId}`).then(() => {
          resetNickname();
          resetPassword();
          resetSubject();
          resetEditorContents();
        });
      }
    }
  );

  const handleClickBack = () => router.back();

  const handleClick = () => {
    mutate({
      storageId,
      id: Number(id),
      data: {
        nickname,
        password,
        subject,
        content_json: JSON.stringify(editorContents),
        description: editorContents
          .map(({ children }) =>
            children.filter(({ tag }) => tag === '#text').map(({ content }) => content)
          )
          .filter((contents) => contents.length)
          .join(' ')
      }
    });
  };

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
          variant="accent"
          size="pico"
          startIcon={<Icon name="SendOutlined" width={15} height={15} />}
          onClick={handleClick}
          disabled={!nickname || !password || !subject || !editorContents.length || isLoading}
        >
          완료
        </Button>
      </Flexbox>
    </Flexbox>
  );
}

export default StorageBoardEditHeader;
