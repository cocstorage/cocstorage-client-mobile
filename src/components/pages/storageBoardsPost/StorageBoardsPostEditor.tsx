import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useMutation, useQuery } from '@tanstack/react-query';

import { Editor, EditorContent } from 'cocstorage-ui-editor';
import { useRecoilState } from 'recoil';

import {
  storageBoardsPostDraftIdState,
  storageBoardsPostEditorContentsState
} from '@recoil/pages/storageBoardsPost/atoms';

import {
  postNonMemberStorageBoardDraft,
  postNonMemberStorageBoardImage
} from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoardsPostEditor() {
  const router = useRouter();
  const { path } = router.query;

  const [draftId, setDraftIdState] = useRecoilState(storageBoardsPostDraftIdState);
  const [editorContents, setEditorContentsState] = useRecoilState(
    storageBoardsPostEditorContentsState
  );

  const { data: { id } = {}, isLoading } = useQuery(
    queryKeys.storages.storageById(String(path)),
    () => fetchStorage(String(path))
  );

  const { mutate } = useMutation((storageId: number) => postNonMemberStorageBoardDraft(storageId), {
    onSuccess: ({ id: newDraftId }) => setDraftIdState(newDraftId)
  });

  const handleChange = (newEditorContents: EditorContent[]) =>
    setEditorContentsState(newEditorContents);

  const handleUploadImage = async (file: File | null) => {
    if (file) {
      const { imageUrl } = await postNonMemberStorageBoardImage(id, draftId, file);
      return imageUrl;
    }
    return '';
  };

  useEffect(() => {
    if (!isLoading && !draftId) {
      mutate(id);
    }
  }, [isLoading, id, mutate, draftId]);

  return (
    <Editor
      fullScreen
      hideLine
      initEditorContents={editorContents}
      onChange={handleChange}
      onUploadImage={handleUploadImage}
      customStyle={{
        flex: 1,
        flexDirection: 'column-reverse',
        overflow: 'hidden'
      }}
      toolbarCustomStyle={{
        padding: '0 20px'
      }}
      contentCustomStyle={{
        padding: '8px 20px',
        lineHeight: 1.75,
        overflowY: 'auto'
      }}
    />
  );
}

export default StorageBoardsPostEditor;
