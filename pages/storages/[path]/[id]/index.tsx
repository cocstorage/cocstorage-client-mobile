import { useEffect, useRef } from 'react';

import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { fetchStorageBoard } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';
import {
  StorageBoardCommentDeleteBottomSheet,
  StorageBoardCommentList,
  StorageBoardCommentMenuBottomSheet,
  StorageBoardContent,
  StorageBoardDeleteBottomSheet,
  StorageBoardFooter,
  StorageBoardHead,
  StorageBoardHeader,
  StorageBoardMenuBottomSheet,
  StorageBoardReplyDeleteBottomSheet,
  StorageBoardReplyListBottomSheet,
  StorageBoardReplyMenuBottomSheet
} from '@components/pages/storageBoard';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import GoogleAdSense from '@components/UI/molecules/GoogleAdSense';
import queryKeys from '@constants/queryKeys';

function StorageBoard() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      document.getElementById('__next').removeAttribute('style');
    };
  }, []);

  return (
    <>
      <StorageBoardHead />
      <GeneralTemplate
        header={<StorageBoardHeader />}
        footer={<StorageBoardFooter footerRef={footerRef} />}
      >
        <StorageBoardContent footerRef={footerRef} />
        <GoogleAdSense
          html={
            '<ins class="adsbygoogle"\n' +
            '     style="display:block"\n' +
            '     data-ad-client="ca-pub-5809905264951057"\n' +
            '     data-ad-slot="8033291397"\n' +
            '     data-ad-format="auto"\n' +
            '     data-full-width-responsive="true"></ins>\n' +
            '<script>\n' +
            '     (adsbygoogle = window.adsbygoogle || []).push({});\n' +
            '</script>'
          }
          customStyle={{ margin: '40px -20px 0' }}
        />
        <StorageBoardCommentList />
      </GeneralTemplate>
      <StorageBoardReplyListBottomSheet />
      <StorageBoardCommentMenuBottomSheet />
      <StorageBoardCommentDeleteBottomSheet />
      <StorageBoardReplyMenuBottomSheet />
      <StorageBoardReplyDeleteBottomSheet />
      <StorageBoardMenuBottomSheet />
      <StorageBoardDeleteBottomSheet />
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
    const queryClient = new QueryClient();
    const path = String(query.path);
    const id = Number(query.id);

    const storage = await fetchStorage(path);
    const storageBoard = await fetchStorageBoard(storage.id, id);

    await queryClient.setQueryData(queryKeys.storages.storageById(path), storage);
    await queryClient.setQueryData(queryKeys.storageBoards.storageBoardById(id), storageBoard);

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

export default StorageBoard;
