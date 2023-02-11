import { EditorContent } from 'cocstorage-ui-editor';
import { atom } from 'recoil';

export const storageBoardPostSubjectState = atom({
  key: 'storageBoardPost/subjectState',
  default: ''
});

export const storageBoardPostDraftIdState = atom({
  key: 'storageBoardPost/draftIdState',
  default: 0
});

export const storageBoardPostEditorContentsState = atom<EditorContent[]>({
  key: 'storageBoardPost/editorContentsState',
  default: []
});

export const storageBoardPostDialogOpenState = atom({
  key: 'storageBoardPost/dialogOpenState',
  default: false
});
