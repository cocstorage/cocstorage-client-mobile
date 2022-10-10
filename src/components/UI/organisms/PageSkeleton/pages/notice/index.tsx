import { Box, Skeleton, useTheme } from 'cocstorage-ui';

import { NoticeHeader } from '@components/pages/notice';
import GeneralTemplate from '@components/templeates/GeneralTemplate';

import { StorageBoardContent } from '../../components';

function Notice() {
  const {
    theme: {
      palette: {
        box: {
          stroked: { normal }
        }
      }
    }
  } = useTheme();

  return (
    <GeneralTemplate
      header={
        <Box style={{ position: 'relative', zIndex: 10 }}>
          <NoticeHeader />
        </Box>
      }
      footer={
        <Box
          style={{
            position: 'fixed',
            zIndex: 10,
            padding: '10px 20px',
            borderTop: `1px solid ${normal}`,
            bottom: 0,
            left: 0,
            width: '100%'
          }}
        >
          <Skeleton width="100%" height={43} disableAspectRatio />
        </Box>
      }
    >
      <StorageBoardContent />
    </GeneralTemplate>
  );
}

export default Notice;
