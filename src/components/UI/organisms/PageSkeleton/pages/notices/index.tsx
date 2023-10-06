import { Flexbox, IconButton, Typography, useTheme } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';

import GeneralTemplate from '@components/templeates/GeneralTemplate';
import NoticeCardSkeleton from '@components/UI/molecules/NoticeCard/NoticeCardSkeleton';

function Notices() {
  const {
    theme: {
      palette: { box }
    }
  } = useTheme();

  return (
    <GeneralTemplate
      header={
        <Flexbox
          component="header"
          alignment="center"
          gap={10}
          customStyle={{
            height: 50,
            padding: '0 20px',
            borderBottom: `1px solid ${box.stroked.normal}`
          }}
        >
          <IconButton>
            <Icon name="CaretSemiLeftOutlined" />
          </IconButton>
          <Typography component="h1" variant="h4" fontWeight="bold">
            새로운 소식
          </Typography>
        </Flexbox>
      }
      disableFlexible={false}
    >
      <Flexbox component="section" direction="vertical" gap={18} customStyle={{ marginTop: 20 }}>
        {Array.from({ length: 20 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <NoticeCardSkeleton key={`notice-skeleton-${index}`} />
        ))}
      </Flexbox>
    </GeneralTemplate>
  );
}

export default Notices;
