import { useRef } from 'react';

import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import {
  NoticeCommentDeleteBottomSheet,
  NoticeCommentList,
  NoticeCommentMenuBottomSheet,
  NoticeContent,
  NoticeFooter,
  NoticeHead,
  NoticeHeader,
  NoticeReplyDeleteBottomSheet,
  NoticeReplyListBottomSheet,
  NoticeReplyMenuBottomSheet
} from '@components/pages/notice';
import GeneralTemplate from '@components/templeates/GeneralTemplate';

import { fetchNotice } from '@api/v1/notices';

import queryKeys from '@constants/queryKeys';

function Notice() {
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <NoticeHead />
      <GeneralTemplate header={<NoticeHeader />} footer={<NoticeFooter footerRef={footerRef} />}>
        <NoticeContent footerRef={footerRef} />
        <NoticeCommentList />
      </GeneralTemplate>
      <NoticeReplyListBottomSheet />
      <NoticeCommentMenuBottomSheet />
      <NoticeCommentDeleteBottomSheet />
      <NoticeReplyMenuBottomSheet />
      <NoticeReplyDeleteBottomSheet />
    </>
  );
}

export async function getServerSideProps({ query, req, res }: GetServerSidePropsContext) {
  const isGoBack = req.cookies.isGoBack ? JSON.parse(req.cookies.isGoBack) : false;
  if (isGoBack) {
    res.setHeader('Set-Cookie', 'isGoBack=false;path=/');

    return {
      props: {}
    };
  }

  try {
    const id = Number(query.id);
    const queryClient = new QueryClient();

    await queryClient.fetchQuery(queryKeys.notices.noticeById(id), () => fetchNotice(id));

    return {
      props: {
        dehydratedState: dehydrate(queryClient)
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
}

export default Notice;
