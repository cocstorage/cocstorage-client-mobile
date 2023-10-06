import { MouseEvent, RefObject, useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

import { Avatar, Box, Button, Flexbox, Image, Tag, Typography, useTheme } from '@cocstorage/ui';
import { convertToReactElement } from '@cocstorage/ui-editor';
import Icon from '@cocstorage/ui-icons';
import styled, { CSSObject } from '@emotion/styled';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useSetRecoilState } from 'recoil';

import {
  fetchStorageBoard,
  putNonMemberStorageBoardRecommend,
  putStorageBoardViewCount
} from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';
import queryKeys from '@constants/queryKeys';
import useScrollTrigger from '@hooks/useScrollTrigger';
import { commonFeedbackDialogState } from '@recoil/common/atoms';
import { storageBoardHideHeaderSubjectState } from '@recoil/pages/storageBoard/atoms';
import getErrorMessageByCode from '@utils/getErrorMessageByCode';

interface StorageBoardContentProps {
  footerRef: RefObject<HTMLDivElement>;
}

function StorageBoardContent({ footerRef }: StorageBoardContentProps) {
  const router = useRouter();
  const { path, id } = router.query;
  const {
    theme: {
      mode,
      palette: { primary, text, background }
    }
  } = useTheme();

  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);
  const setHideHeaderSubject = useSetRecoilState(storageBoardHideHeaderSubjectState);

  const subjectRef = useRef<HTMLDivElement>(null);

  const { triggered } = useScrollTrigger({ ref: subjectRef });

  const queryClient = useQueryClient();

  const { data: { id: storageId } = {} } = useQuery(
    queryKeys.storages.storageById(String(path)),
    () => fetchStorage(String(path))
  );
  const {
    data: {
      subject,
      user,
      nickname,
      content,
      contentJson,
      createdIp,
      thumbUp,
      thumbDown,
      viewCount,
      scrapCode,
      sourceCode,
      createdAt
    } = {}
  } = useQuery(queryKeys.storageBoards.storageBoardById(Number(id)), () =>
    fetchStorageBoard(Number(storageId), Number(id))
  );

  const { mutate } = useMutation((data: { storageId: number; storageBoardId: number }) =>
    putStorageBoardViewCount(data.storageId, data.storageBoardId)
  );

  const { mutate: recommendMutate } = useMutation(
    (data: { storageId: number; storageBoardId: number; type: 0 | 1 }) =>
      putNonMemberStorageBoardRecommend(data.storageId, data.storageBoardId, data.type),
    {
      onSuccess: (data) => {
        if (id && data) {
          queryClient.setQueryData(queryKeys.storageBoards.storageBoardById(Number(id)), data);
        }
      },
      onError: (error: AxiosError) => {
        if (error && error.response) {
          const { data: { code = '' } = {} } = error.response as { data: { code: string } };

          setCommonFeedbackDialogState({
            open: true,
            title: getErrorMessageByCode(code),
            message: '다른 글도 한번 살펴보시는 건 어때요?'
          });
        }
      }
    }
  );

  const handleClickSource = () =>
    window.open(
      `https://gall.dcinside.com/board/view/?id=${sourceCode}&no=${scrapCode}&exception_mode=recommend&page=1`,
      '_blank'
    );

  const handleClickRecommend = (event: MouseEvent<HTMLButtonElement>) => {
    const dataType = Number(event.currentTarget.getAttribute('data-type') || 0);

    if (Number(id) && (dataType === 0 || dataType === 1)) {
      recommendMutate({
        storageId,
        storageBoardId: Number(id),
        type: dataType
      });
    }
  };

  const handleClickBanner = () => window.open('https://mrcamel.co.kr', '_blank');

  useEffect(() => {
    setHideHeaderSubject(!triggered);
  }, [setHideHeaderSubject, triggered]);

  useEffect(() => {
    mutate({ storageId, storageBoardId: Number(id) });
  }, [mutate, storageId, id]);

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
              {(user || {}).nickname || nickname}
            </Typography>
            {!user && createdIp && (
              <Typography variant="s1" color={text[mode].text1} customStyle={{ marginLeft: 4 }}>
                {`(${createdIp})`}
              </Typography>
            )}
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
      {sourceCode && sourceCode !== 'fahumor' && (
        <Flexbox
          gap={8}
          customStyle={{ marginTop: 20, flexWrap: 'wrap', justifyContent: 'flex-end' }}
        >
          <Tag
            startIcon={<Icon name="LogoutOutlined" />}
            onClick={handleClickSource}
            customStyle={{ cursor: 'pointer' }}
          >
            출처
          </Tag>
          <Tag startIcon={<Icon name="EmailOutlined" />}>cocstoragehelps@gmail.com</Tag>
        </Flexbox>
      )}
      {sourceCode === 'fahumor' && (
        <Flexbox
          gap={8}
          justifyContent="flex-end"
          customStyle={{ marginTop: 20, flexWrap: 'wrap' }}
        >
          <Tag startIcon={<Icon name="EmailOutlined" />}>cocstoragehelps@gmail.com</Tag>
        </Flexbox>
      )}
      <Flexbox
        gap={8}
        onClick={handleClickBanner}
        customStyle={{
          marginTop: 20,
          padding: 16,
          borderRadius: 8,
          backgroundColor: background.fg1,
          cursor: 'pointer'
        }}
      >
        <Flexbox
          gap={8}
          customStyle={{
            flex: 1
          }}
        >
          <Image
            width={32}
            height={32}
            round={8}
            src={`https://${process.env.IMAGE_DOMAIN}/assets/camel_logo_black.png`}
            alt="Camel Logo Img"
            disableAspectRatio
          />
          <Flexbox
            direction="vertical"
            gap={4}
            customStyle={{
              flex: 1,
              flexWrap: 'wrap'
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              카멜
            </Typography>
            <Typography noWrap lineClamp={2}>
              세상 모든 중고명품을 여기서 다 볼 수 있어요!
            </Typography>
          </Flexbox>
        </Flexbox>
        <Button variant="semiAccent">바로가기</Button>
      </Flexbox>
      {sourceCode && (
        <Content
          component="article"
          lineHeight="main"
          sourceCode={sourceCode}
          css={{
            marginTop: 40
          }}
          dangerouslySetInnerHTML={{
            __html: content
          }}
        />
      )}
      {!sourceCode && (
        <Content
          component="article"
          lineHeight="main"
          sourceCode={sourceCode}
          css={{
            marginTop: 40
          }}
        >
          {convertToReactElement(contentJson)}
        </Content>
      )}
      <Flexbox
        ref={footerRef}
        component="section"
        justifyContent="center"
        customStyle={{ marginTop: 40 }}
      >
        <Flexbox>
          <Button
            startIcon={<Icon name="ThumbsUpFilled" width={15} height={15} color="primary" />}
            data-type={0}
            onClick={handleClickRecommend}
            customStyle={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              fontWeight: 700,
              color: primary.main
            }}
          >
            {thumbUp.toLocaleString()}
          </Button>
          <Button
            startIcon={<Icon name="ThumbsDownOutlined" width={15} height={15} />}
            data-type={1}
            onClick={handleClickRecommend}
            customStyle={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              color: text[mode].text1
            }}
          >
            {thumbDown.toLocaleString()}
          </Button>
        </Flexbox>
      </Flexbox>
    </>
  );
}

export const Content = styled(Typography)<{
  sourceCode?: string;
}>`
  margin-top: 20px;
  overflow: hidden;

  ${({ sourceCode }): CSSObject =>
    sourceCode
      ? {
          '*': {
            maxWidth: '100%',
            borderRadius: 8
          }
        }
      : {}}
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

export default StorageBoardContent;
