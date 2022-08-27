import { useRecoilState } from 'recoil';

import { commonDialogOpenStateFamily } from '@recoil/common/atoms';

import { Box, Dialog } from 'cocstorage-ui';

import Message from '@components/UI/molecules/Message';

function FeaturePreparationDialog() {
  const [{ open }, setOpen] = useRecoilState(commonDialogOpenStateFamily('featurePreparation'));

  const handleClose = () =>
    setOpen(({ type }) => ({
      type,
      open: false
    }));

  return (
    <Dialog fullWidth open={open} onClose={handleClose} customStyle={{ maxWidth: 'fit-content' }}>
      <Box customStyle={{ padding: 16 }}>
        <Message
          title="준비 중인 기능이에요!"
          message="조금민 기다려주세요!"
          onClose={handleClose}
        />
      </Box>
    </Dialog>
  );
}

export default FeaturePreparationDialog;
