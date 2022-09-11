import { RefObject, useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import dayjs from 'dayjs';
import { useSetRecoilState } from 'recoil';

import styled from '@emotion/styled';

import { noticeHideHeaderSubjectState } from '@recoil/notice/atoms';

import { Avatar, Box, Button, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import useScrollTrigger from '@hooks/useScrollTrigger';

import { fetchNotice } from '@api/v1/notices';

import queryKeys from '@constants/queryKeys';

interface NoticeContentProps {
  footerRef: RefObject<HTMLDivElement>;
}

function NoticeContent({ footerRef }: NoticeContentProps) {
  const router = useRouter();
  const { id } = router.query;

  const {
    theme: {
      mode,
      palette: { text }
    }
  } = useTheme();

  const setHideHeaderSubject = useSetRecoilState(noticeHideHeaderSubjectState);

  const { data: { subject, user, content, viewCount, commentTotalCount, createdAt } = {} } =
    useQuery(queryKeys.notices.noticeById(Number(id)), () => fetchNotice(Number(id)));

  const subjectRef = useRef<HTMLDivElement>(null);

  const { triggered } = useScrollTrigger({ ref: subjectRef });

  useEffect(() => {
    setHideHeaderSubject(!triggered);
  }, [setHideHeaderSubject, triggered]);

  return (
    <>
      <Box component="section" customStyle={{ marginTop: 10 }}>
        <Typography ref={subjectRef} variant="h3" fontWeight="bold">
          {subject}
        </Typography>
        <Info>
          <Flexbox alignment="center">
            <Avatar
              width={18}
              height={18}
              src="https://static.cocstorage.com/images/xt868xt2w6i50bf4x98xdsbfado3"
              alt="User Avatar Img"
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
      <Flexbox ref={footerRef} component="section" customStyle={{ marginTop: 9 }}>
        <Button
          size="small"
          startIcon={<Icon name="CommentOutlined" width={15} height={15} />}
          customStyle={{
            color: text[mode].text1
          }}
        >
          {commentTotalCount.toLocaleString()}
        </Button>
      </Flexbox>
    </>
  );
}

const Content = styled(Typography)`
  margin-top: 30px;

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
