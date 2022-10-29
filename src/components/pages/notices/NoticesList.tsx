import { useQuery } from '@tanstack/react-query';

import { useRecoilState } from 'recoil';

import { noticesParamsState } from '@recoil/pages/notices/atoms';

import { Flexbox, Pagination } from 'cocstorage-ui';

import NoticeCard from '@components/UI/molecules/NoticeCard';
import NoticeCardSkeleton from '@components/UI/molecules/NoticeCard/NoticeCardSkeleton';

import { fetchNotices } from '@api/v1/notices';

import queryKeys from '@constants/queryKeys';

import Message from '../../UI/molecules/Message';

function NoticesList() {
  const [params, setParams] = useRecoilState(noticesParamsState);

  const {
    data: { notices = [], pagination: { totalPages = 1, perPage = 20, currentPage = 1 } = {} } = {},
    isLoading
  } = useQuery(queryKeys.notices.noticesWithParams(params), () => fetchNotices(params), {
    keepPreviousData: true
  });

  const handleChange = (value: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: value
    }));
  };

  if (!isLoading && !notices.length) {
    return (
      <Message title="새로운 소식을 준비 중이에요!" hideButton customStyle={{ margin: '50px 0' }} />
    );
  }

  return (
    <>
      <Flexbox component="section" gap={18} direction="vertical" customStyle={{ marginTop: 20 }}>
        {isLoading &&
          Array.from({ length: 20 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <NoticeCardSkeleton key={`notice-skeleton-${index}`} />
          ))}
        {!isLoading &&
          notices.map((notice) => <NoticeCard key={`notice-${notice.id}`} notice={notice} />)}
      </Flexbox>
      <Flexbox component="section" justifyContent="center" customStyle={{ margin: '25px auto' }}>
        <Pagination
          count={totalPages * perPage}
          page={currentPage}
          rowPerPage={perPage}
          itemCount={5}
          onChange={handleChange}
        />
      </Flexbox>
    </>
  );
}

export default NoticesList;
