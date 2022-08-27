import { atomFamily } from 'recoil';

export const commonDialogOpenStateFamily = atomFamily<
  {
    type: 'featurePreparation';
    open: boolean;
  },
  'featurePreparation'
>({
  key: 'common/dialogOpenStateFamily',
  default: (type) => ({
    type,
    open: false
  })
});
