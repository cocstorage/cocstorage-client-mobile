import Link from 'next/link';

import { Alert, Skeleton } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import { useQuery } from '@tanstack/react-query';

import { fetchIndexNotice } from '@api/v1/notices';
import queryKeys from '@constants/queryKeys';

function IndexNoticeAlert() {
  const { data: { notices = [] } = {}, isLoading } = useQuery(
    queryKeys.notices.indexNotice,
    fetchIndexNotice
  );

  if (!isLoading && !notices.length) return null;

  if (isLoading) {
    return (
      <Skeleton
        width="100%"
        height={56}
        round={12}
        disableAspectRatio
        customStyle={{ marginTop: 14 }}
      />
    );
  }

  return (
    <Link href={`/notices/${notices[0].id}`}>
      <Alert
        severity="info"
        icon={<Icon name="LoudSpeakerOutlined" />}
        action={<Icon name="CaretSemiRightOutlined" />}
        customStyle={{ marginTop: 14 }}
      >
        {notices[0].subject}
      </Alert>
    </Link>
  );
}

export default IndexNoticeAlert;
