import { Box, Flexbox, IconButton, Skeleton } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';

import { StyledNoticeFooter } from '@components/pages/notice/NoticeFooter';
import { StyledNoticeHeader } from '@components/pages/notice/NoticeHeader';
import GeneralTemplate from '@components/templeates/GeneralTemplate';

import { StorageBoardContent } from '../../components';

function Notice() {
  return (
    <GeneralTemplate
      header={
        <Box style={{ position: 'relative', zIndex: 10 }}>
          <NoticeHeader />
        </Box>
      }
      footer={
        <Box style={{ position: 'relative', zIndex: 10 }}>
          <NoticeFooter />
        </Box>
      }
      disableFlexible={false}
    >
      <StorageBoardContent />
    </GeneralTemplate>
  );
}

function NoticeHeader() {
  return (
    <Box component="header" customStyle={{ height: 50, pointerEvents: 'none' }}>
      <StyledNoticeHeader triggered={false}>
        <IconButton>
          <Icon name="CaretSemiLeftOutlined" />
        </IconButton>
      </StyledNoticeHeader>
    </Box>
  );
}

function NoticeFooter() {
  return (
    <Box component="footer" customStyle={{ height: 44 }}>
      <StyledNoticeFooter>
        <Flexbox gap={10}>
          <Skeleton width={40} height={22} round={6} disableAspectRatio />
          <Skeleton width={40} height={22} round={6} disableAspectRatio />
          <Skeleton width={40} height={22} round={6} disableAspectRatio />
        </Flexbox>
      </StyledNoticeFooter>
    </Box>
  );
}

export default Notice;
