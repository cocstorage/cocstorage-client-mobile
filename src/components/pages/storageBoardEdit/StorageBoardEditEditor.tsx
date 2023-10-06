import { useRouter } from 'next/router';

import { useTheme } from '@cocstorage/ui';
import Editor, { EditorContent } from '@cocstorage/ui-editor';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';

import { postNonMemberStorageBoardImage } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';
import queryKeys from '@constants/queryKeys';
import { storageBoardEditEditorContentsState } from '@recoil/pages/storageBoardEdit/atoms';

function StorageBoardEditEditor() {
  const router = useRouter();
  const { path, id } = router.query;

  const {
    theme: {
      palette: { box }
    }
  } = useTheme();

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
        padding: '0 20px',
        borderTop: `1px solid ${box.stroked.normal}`
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
