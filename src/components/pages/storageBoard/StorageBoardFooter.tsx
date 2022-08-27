import { MouseEvent, RefObject, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import styled, { CSSObject } from '@emotion/styled';

import { Box, Button, Icon, IconButton, useTheme } from 'cocstorage-ui';

import { AxiosError } from 'axios';

import MessageDialog from '@components/UI/organisms/MessageDialog';

import useScrollTrigger from '@hooks/useScrollTrigger';
import getErrorMessageByCode from '@utils/getErrorMessageByCode';

import { fetchStorageBoard, putNonMemberStorageBoardRecommend } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

interface StorageBoardFooterProps {
  recommendFeatureRef: RefObject<HTMLDivElement>;
}

function StorageBoardFooter({ recommendFeatureRef }: StorageBoardFooterProps) {
  const router = useRouter();
  const { path, id } = router.query;

  const [observerTriggered, setObserverTriggered] = useState<boolean>(false);
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

  const { triggered } = useScrollTrigger({ ref: recommendFeatureRef });

  const {
    theme: {
      type,
      palette: { text }
    }
  } = useTheme();

  const onIntersectRef = useRef(async ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      setObserverTriggered(true);
      observer.observe(entry.target);
    } else {
      setObserverTriggered(false);
    }
  }).current;

  const queryClient = useQueryClient();

  const { data: { id: storageId } = {} } = useQuery(
    queryKeys.storages.storageById(String(path)),
    () => fetchStorage(String(path))
  );
  const { data: { thumbUp, thumbDown, commentTotalCount } = {} } = useQuery(
    queryKeys.storageBoards.storageBoardById(Number(id)),
    () => fetchStorageBoard(Number(storageId), Number(id))
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

  const handleClick = () => {
    recommendFeatureRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClose = () => setOpen(false);

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

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersectRef, { threshold: 0.5 });
    observer.observe(recommendFeatureRef.current);
    return () => observer.disconnect();
  }, [onIntersectRef, recommendFeatureRef]);

  if (triggered || observerTriggered) {
    return (
      <Box component="footer" customStyle={{ height: 60 }}>
        <StyledStorageBoardFooter css={{ height: 60, justifyContent: 'center' }}>
          <CommentBar>
            <CommentTextArea placeholder="내용을 입력해주세요." rows={1} />
            <IconButton customStyle={{ marginRight: 10 }}>
              <Icon name="SendOutlined" color={text[type].text3} />
            </IconButton>
          </CommentBar>
        </StyledStorageBoardFooter>
      </Box>
    );
  }

  return (
    <>
      <Box component="footer" customStyle={{ height: 44 }}>
        <StyledStorageBoardFooter>
          <Button
            variant="transparent"
            startIcon={
              <Icon name="ThumbsUpOutlined" width={18} height={18} color={text[type].text1} />
            }
            size="pico"
            data-type={0}
            onClick={handleClickRecommend}
            customStyle={{ color: text[type].text1 }}
          >
            {thumbUp.toLocaleString()}
          </Button>
          <Button
            variant="transparent"
            startIcon={
              <Icon name="ThumbsDownOutlined" width={18} height={18} color={text[type].text1} />
            }
            size="pico"
            data-type={1}
            onClick={handleClickRecommend}
            customStyle={{ color: text[type].text1 }}
          >
            {thumbDown.toLocaleString()}
          </Button>
          <Button
            variant="transparent"
            startIcon={
              <Icon name="CommentOutlined" width={18} height={18} color={text[type].text1} />
            }
            size="pico"
            onClick={handleClick}
            customStyle={{ color: text[type].text1 }}
          >
            {commentTotalCount.toLocaleString()}
          </Button>
        </StyledStorageBoardFooter>
      </Box>
      <MessageDialog open={open} onClose={handleClose} {...errorMessage} />
    </>
  );
}

const StyledStorageBoardFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 44px;
  padding: 0 20px;
  border-top: 1px solid
    ${({
      theme: {
        palette: { box }
      }
    }) => box.stroked.normal};
  background-color: ${({
    theme: {
      palette: { background }
    }
  }) => background.bg};
  z-index: 1;
`;

const CommentBar = styled.div`
  flex-grow: 1;
  display: flex;
  border: 1px solid ${({ theme: { palette } }) => palette.box.stroked.normal};
  background-color: ${({ theme: { palette } }) => palette.background.bg};
  border-radius: 10px;
  overflow: hidden;
`;

const CommentTextArea = styled.textarea`
  flex-grow: 1;
  padding: 12px;
  border: none;
  resize: none;
  outline: 0;
  background-color: inherit;
  ${({
    theme: {
      typography: { p2 }
    }
  }): CSSObject => ({
    fontSize: p2.size,
    fontWeight: p2.weight.regular,
    letterSpacing: p2.letterSpacing
  })};
  color: ${({ theme: { type, palette } }) => palette.text[type].main};

  &::placeholder {
    color: ${({ theme: { type, palette } }) => palette.text[type].text1};
  }
`;

export default StorageBoardFooter;
