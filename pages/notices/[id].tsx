import { useRef } from 'react';

import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { NoticeContent, NoticeFooter, NoticeHeader } from '@components/pages/notice';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import {
  CommentDeleteBottomSheet,
  CommentList,
  CommentMenuBottomSheet,
  ReplyDeleteBottomSheet,
  ReplyListBottomSheet,
  ReplyMenuBottomSheet
} from '@components/UI/organisms';

import { fetchNotice } from '@api/v1/notices';

import queryKeys from '@constants/queryKeys';

function Notice() {
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <GeneralTemplate header={<NoticeHeader />} footer={<NoticeFooter footerRef={footerRef} />}>
        <NoticeContent footerRef={footerRef} />
        <CommentList type="notice" customStyle={{ margin: '40px 0 20px' }} />
      </GeneralTemplate>
      <CommentMenuBottomSheet />
      <CommentDeleteBottomSheet type="notice" />
      <ReplyListBottomSheet type="notice" />
      <ReplyMenuBottomSheet />
      <ReplyDeleteBottomSheet type="notice" />
    </>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  try {
    const id = Number(query.id);
    const queryClient = new QueryClient();

    await queryClient.fetchQuery(queryKeys.notices.noticeById(id), () => fetchNotice(id));

    return {
      props: {
        dehydratedState: dehydrate(queryClient)
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}

export default Notice;
