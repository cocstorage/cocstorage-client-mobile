import { useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

import { Avatar, Box, Flexbox, Typography, useTheme } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import styled from '@emotion/styled';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useSetRecoilState } from 'recoil';

import { fetchNotice, putNoticeViewCount } from '@api/v1/notices';
import queryKeys from '@constants/queryKeys';
import useScrollTrigger from '@hooks/useScrollTrigger';
import { noticeHideHeaderSubjectState } from '@recoil/pages/notice/atoms';

function NoticeContent() {
  const router = useRouter();
  const { id } = router.query;

  const {
    theme: {
      mode,
      palette: { text }
    }
  } = useTheme();

  const setHideHeaderSubject = useSetRecoilState(noticeHideHeaderSubjectState);

  const { data: { subject, user, content, viewCount, createdAt } = {} } = useQuery(
    queryKeys.notices.noticeById(Number(id)),
    () => fetchNotice(Number(id))
  );

  const { mutate } = useMutation((data: { id: number }) => putNoticeViewCount(data.id));

  const subjectRef = useRef<HTMLDivElement>(null);

  const { triggered } = useScrollTrigger({ ref: subjectRef });

  useEffect(() => {
    mutate({ id: Number(id) });
  }, [mutate, id]);

  useEffect(() => {
    setHideHeaderSubject(!triggered);
  }, [setHideHeaderSubject, triggered]);

  return (
    <>
      <Box component="section" customStyle={{ marginTop: 10 }}>
        <Typography ref={subjectRef} component="h1" variant="h3" fontWeight="bold">
          {subject}
        </Typography>
        <Info>
          <Flexbox alignment="center">
            <Avatar
              width={24}
              height={24}
              src={(user || {}).avatarUrl || ''}
              alt="User Avatar Img"
              fallback={{
                width: 12,
                height: 12
              }}
            />
            <Typography variant="s1" color={text[mode].text1} customStyle={{ marginLeft: 4 }}>
              {user.nickname}
            </Typography>
          </Flexbox>
          <Typography variant="s1" color={text[mode].text1}>
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Flexbox alignment="center" customStyle={{ marginLeft: 10 }}>
            <Icon width={16} height={16} name="ViewOutlined" color={text[mode].text1} />
            <Typography variant="s2" color={text[mode].text1} customStyle={{ marginLeft: 2 }}>
              {viewCount.toLocaleString()}
            </Typography>
          </Flexbox>
        </Info>
      </Box>
      <Content
        component="article"
        lineHeight="main"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <Flexbox component="section" customStyle={{ marginTop: 40 }} />
    </>
  );
}

const Content = styled(Typography)`
  margin-top: 40px;

  * {
    max-width: 100%;
    border-radius: 8px;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  & > div {
    &:after {
      content: '';
      display: block;
      width: 2px;
      height: 2px;
      margin: 0 5px;
      border-radius: 50%;
      background-color: ${({
        theme: {
          mode,
          palette: { text }
        }
      }) => text[mode].text1};
    }
    &:last-child:after {
      display: none;
    }
  }
`;

export default NoticeContent;
