import { Box, Flexbox, IconButton, Skeleton, Typography } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';

import GeneralTemplate from '@components/templeates/GeneralTemplate';

function StorageBoard() {
  return (
    <GeneralTemplate
      header={
        <Flexbox
          component="header"
          alignment="center"
          justifyContent="space-between"
          gap={10}
          customStyle={{
            height: 50,
            padding: '0 20px',
            borderBottom: '1px solid transparent',
            pointerEvents: 'none'
          }}
        >
          <IconButton>
            <Icon name="CaretSemiLeftOutlined" />
          </IconButton>
          <Skeleton width={24} height={24} round={6} disableAspectRatio />
        </Flexbox>
      }
      footer={<Skeleton width="100%" height={66} disableAspectRatio />}
      disableFlexible={false}
    >
      <Box customStyle={{ marginTop: 10 }}>
        <Skeleton width="60%" height={22} round={6} disableAspectRatio />
        <Box customStyle={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
          <Skeleton width={24} height={24} round="50%" disableAspectRatio />
          <Skeleton
            width="30%"
            height={16}
            round={6}
            customStyle={{ marginLeft: 4 }}
            disableAspectRatio
          />
        </Box>
        <Typography
          lineHeight="main"
          customStyle={{
            marginTop: 20,
            overflow: 'hidden'
          }}
        >
          <Skeleton
            width="100%"
            height="24vh"
            round={6}
            customStyle={{ marginBottom: 20 }}
            disableAspectRatio
          />
          <Skeleton
            width="80%"
            height={16}
            round={6}
            customStyle={{ marginBottom: 10 }}
            disableAspectRatio
          />
          <Skeleton
            width="40%"
            height={16}
            round={6}
            customStyle={{ marginBottom: 10 }}
            disableAspectRatio
          />
          <Skeleton
            width="60%"
            height={16}
            round={6}
            customStyle={{ marginBottom: 10 }}
            disableAspectRatio
          />
        </Typography>
      </Box>
    </GeneralTemplate>
  );
}

export default StorageBoard;
