import { EditorContent } from '@cocstorage/ui-editor';
import { atom } from 'recoil';

export const storageBoardEditSubjectState = atom({
  key: 'storageBoardEdit/subjectState',
  default: ''
});

export const storageBoardEditNicknameState = atom({
  key: 'storageBoardEdit/editNicknameState',
  default: ''
});

export const storageBoardEditPasswordState = atom({
  key: 'storageBoardEdit/editPasswordState',
  default: ''
});

export const storageBoardEditEditorContentsState = atom<EditorContent[]>({
  key: 'storageBoardEdit/editorContentsState',
  default: []
});
