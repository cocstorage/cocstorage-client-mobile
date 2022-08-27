import { MouseEvent, RefObject, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import dayjs from 'dayjs';
import { useSetRecoilState } from 'recoil';

import styled from '@emotion/styled';

import { hideHeaderSubjectState } from '@recoil/storageBoard/atoms';

import { Box, Button, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import { AxiosError } from 'axios';

import RatioImage from '@components/UI/atoms/RatioImage';
import MessageDialog from '@components/UI/organisms/MessageDialog';

import useScrollTrigger from '@hooks/useScrollTrigger';
import getErrorMessageByCode from '@utils/getErrorMessageByCode';

import {
  fetchStorageBoard,
  putNonMemberStorageBoardRecommend,
  putStorageBoardViewCount
} from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

interface StorageBoardContentProps {
  recommendFeatureRef: RefObject<HTMLDivElement>;
}

function StorageBoardContent({ recommendFeatureRef }: StorageBoardContentProps) {
  const router = useRouter();
  const { path, id } = router.query;
  const {
    theme: {
      type: themeType,
      palette: { primary, text }
    }
  } = useTheme();

  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{
    title: string;
    code: string;
    message: string;
  }>({
    title: '알 수 없는 오류가 발생했어요.',
    code: '',
    message: '문제가 지속된다면 관리자에게 문의해 주세요!'
  });

  const setHideHeaderSubject = useSetRecoilState(hideHeaderSubjectState);

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
      thumbUp,
      thumbDown,
      viewCount,
      commentTotalCount,
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

          setErrorMessage({
            title: getErrorMessageByCode(code),
            code: '',
            message: '다른 글도 한번 살펴보시는 건 어때요?'
          });

          setOpen(true);
        } else {
          setOpen(true);
        }
      }
    }
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

  const handleClose = () => setOpen(false);

  useEffect(() => {
    setHideHeaderSubject(!triggered);
  }, [setHideHeaderSubject, triggered]);

  useEffect(() => {
    mutate({ storageId, storageBoardId: Number(id) });
  }, [mutate, storageId, id]);

  return (
    <>
      <Box component="section" customStyle={{ marginTop: 10 }}>
        <Typography ref={subjectRef} variant="h3" fontWeight="bold">
          {subject}
        </Typography>
        <Info>
          <Flexbox alignment="center">
            <RatioImage
              width={24}
              height={24}
              src={(user || {}).avatarUrl || ''}
              alt="User Avatar Img"
              round="50%"
              disableAspectRatio
              defaultIcon="user"
              defaultIconWidth={12}
              defaultIconHeight={12}
            />
            <Typography variant="s1" color={text[themeType].text1} customStyle={{ marginLeft: 4 }}>
              {(user || {}).nickname || nickname}
            </Typography>
          </Flexbox>
          <Typography variant="s1" color={text[themeType].text1}>
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Flexbox alignment="center" customStyle={{ marginLeft: 10 }}>
            <Icon width={16} height={16} name="ViewOutlined" color={text[themeType].text1} />
            <Typography variant="s2" color={text[themeType].text1} customStyle={{ marginLeft: 2 }}>
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
      <Flexbox ref={recommendFeatureRef} component="section" customStyle={{ marginTop: 9 }}>
        <Flexbox>
          <Button
            size="small"
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
            size="small"
            startIcon={<Icon name="ThumbsDownOutlined" width={15} height={15} />}
            data-type={1}
            onClick={handleClickRecommend}
            customStyle={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              color: text[themeType].text1
            }}
          >
            {thumbDown.toLocaleString()}
          </Button>
          <Button
            size="small"
            startIcon={<Icon name="CommentOutlined" width={15} height={15} />}
            customStyle={{
              marginLeft: 10,
              color: text[themeType].text1
            }}
          >
            {commentTotalCount.toLocaleString()}
          </Button>
        </Flexbox>
      </Flexbox>
      <MessageDialog open={open} onClose={handleClose} {...errorMessage} />
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
          type,
          palette: { text }
        }
      }) => text[type].text1};
    }
    &:last-child:after {
      display: none;
    }
  }
`;

export default StorageBoardContent;
