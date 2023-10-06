import { EditorContent } from '@cocstorage/ui-editor';
import { atom } from 'recoil';

export const storageBoardsPostSubjectState = atom({
  key: 'storageBoardsPost/subjectState',
  default: ''
});

export const storageBoardsPostDraftIdState = atom({
  key: 'storageBoardsPost/draftIdState',
  default: 0
});

export const storageBoardsPostEditorContentsState = atom<EditorContent[]>({
  key: 'storageBoardsPost/editorContentsState',
  default: []
});

export const storageBoardsPostDialogOpenState = atom({
  key: 'storageBoardsPost/dialogOpenState',
  default: false
});
