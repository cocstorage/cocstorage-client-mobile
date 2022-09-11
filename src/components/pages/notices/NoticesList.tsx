import { useQuery } from '@tanstack/react-query';

import { useRecoilState } from 'recoil';

import { noticesParamsState } from '@recoil/notices/atoms';

import { Flexbox, Pagination } from 'cocstorage-ui';

import NoticeCard from '@components/UI/molecules/NoticeCard';

import { fetchNotices } from '@api/v1/notices';

import queryKeys from '@constants/queryKeys';

function NoticesList() {
  const [params, setParams] = useRecoilState(noticesParamsState);

  const {
    data: { notices = [], pagination: { totalPages = 1, perPage = 20, currentPage = 1 } = {} } = {}
  } = useQuery(queryKeys.notices.noticesWithParams(params), () => fetchNotices(params), {
    keepPreviousData: true
  });

  const handleChange = (value: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: value
    }));
  };

  return (
    <>
      <Flexbox component="section" gap={18} direction="vertical" customStyle={{ marginTop: 20 }}>
        {notices.map((notice) => (
          <NoticeCard key={`notice-${notice.id}`} notice={notice} />
        ))}
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
