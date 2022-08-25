import { Flexbox } from 'cocstorage-ui';

import NoticeCard from '@components/UI/molecules/NoticeCard';

function NoticesList() {
  return (
    <Flexbox gap={18} direction="vertical" customStyle={{ marginTop: 20 }}>
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
    </Flexbox>
  );
}

export default NoticesList;
