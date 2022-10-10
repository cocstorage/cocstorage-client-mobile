import { Box, Flexbox, Icon, IconButton, Skeleton } from 'cocstorage-ui';

import { StyledNoticeFooter } from '@components/pages/notice/NoticeFooter';
import { StyledNoticeHeader } from '@components/pages/notice/NoticeHeader';
import GeneralTemplate from '@components/templeates/GeneralTemplate';

import { SkeletonGroup } from '../..';
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
        <Flexbox gap={10} alignment="center">
          <IconButton>
            <Icon name="MoreMenuOutlined" />
          </IconButton>
        </Flexbox>
      </StyledNoticeHeader>
    </Box>
  );
}

function NoticeFooter() {
  return (
    <Box component="footer" customStyle={{ height: 44 }}>
      <StyledNoticeFooter>
        <SkeletonGroup css={{ display: 'flex', gap: 10 }}>
          <Skeleton width={40} height={22} round={6} disableAspectRatio />
          <Skeleton width={40} height={22} round={6} disableAspectRatio />
          <Skeleton width={40} height={22} round={6} disableAspectRatio />
        </SkeletonGroup>
      </StyledNoticeFooter>
    </Box>
  );
}

export default Notice;
