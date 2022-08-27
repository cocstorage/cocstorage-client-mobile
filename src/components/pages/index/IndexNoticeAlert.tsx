import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import { Alert, Icon, Skeleton } from 'cocstorage-ui';

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
        disableAspectRatio
        customStyle={{ marginTop: 14, borderRadius: 12 }}
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
