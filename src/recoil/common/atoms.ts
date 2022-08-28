import { atom } from 'recoil';

export const commonFeedbackDialogState = atom<{
  open: boolean;
  title: string;
  code?: string;
  message?: string;
}>({
  key: 'common/feedbackDialogState',
  default: {
    open: false,
    title: '',
    code: '',
    message: ''
  }
});
