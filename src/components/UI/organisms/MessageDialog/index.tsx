import { Box, Dialog } from 'cocstorage-ui';

import Message from '@components/UI/molecules/Message';

interface MessageDialogProps {
  open: boolean;
  title: string;
  code?: string;
  message?: string;
  onClose: () => void;
}

function MessageDialog({ open, title, code, message, onClose }: MessageDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box customStyle={{ padding: 16 }}>
        <Message title={title} code={code} message={message} onClose={onClose} />
      </Box>
    </Dialog>
  );
}

export default MessageDialog;
