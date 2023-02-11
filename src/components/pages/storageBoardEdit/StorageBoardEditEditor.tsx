import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { Editor, EditorContent } from 'cocstorage-ui-editor';
import { useRecoilState } from 'recoil';

import { storageBoardEditEditorContentsState } from '@recoil/pages/storageBoardEdit/atoms';

import { postNonMemberStorageBoardImage } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoardEditEditor() {
  const router = useRouter();
  const { path, id } = router.query;

  const [editorContents, setEditorContentsState] = useRecoilState(
    storageBoardEditEditorContentsState
  );

  const { data: { id: storageId } = {} } = useQuery(
    queryKeys.storages.storageById(String(path)),
    () => fetchStorage(String(path))
  );

  const handleChange = (newEditorContents: EditorContent[]) =>
    setEditorContentsState(newEditorContents);

  const handleUploadImage = async (file: File | null) => {
    if (file) {
      const { imageUrl } = await postNonMemberStorageBoardImage(storageId, Number(id), file);
      return imageUrl;
    }
    return '';
  };

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

export default StorageBoardEditEditor;
