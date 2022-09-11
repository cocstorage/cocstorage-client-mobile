import { ChangeEvent, MouseEvent, RefObject, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useRecoilState, useSetRecoilState } from 'recoil';

import styled, { CSSObject } from '@emotion/styled';

import { commonFeedbackDialogState } from '@recoil/common/atoms';
import { storageBoardCommentsParamsState } from '@recoil/storageBoard/atoms';

import { Box, Button, Flexbox, Grid, Icon, IconButton, TextBar, useTheme } from 'cocstorage-ui';

import type { AxiosError } from 'axios';

import { StorageBoard } from '@dto/storage-boards';
import useScrollTrigger from '@hooks/useScrollTrigger';
import getErrorMessageByCode from '@utils/getErrorMessageByCode';
import validators from '@utils/validators';

import {
  PostStorageBoardCommentData,
  fetchStorageBoardComments,
  postNonMemberStorageBoardComment
} from '@api/v1/storage-board-comments';
import { fetchStorageBoard, putNonMemberStorageBoardRecommend } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

interface StorageBoardFooterProps {
  footerRef: RefObject<HTMLDivElement>;
}

function StorageBoardFooter({ footerRef }: StorageBoardFooterProps) {
  const router = useRouter();
  const { path, id } = router.query;

  const {
    theme: {
      mode,
      palette: { text, box }
    }
  } = useTheme();

  const [params, setParams] = useRecoilState(storageBoardCommentsParamsState);
  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);

  const [rows, setRows] = useState(1);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');
  const [observerTriggered, setObserverTriggered] = useState(false);

  const { triggered } = useScrollTrigger({ ref: footerRef });

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
  const { data: { storage, thumbUp, thumbDown, commentTotalCount, commentLatestPage } = {} } =
    useQuery(queryKeys.storageBoards.storageBoardById(Number(id)), () =>
      fetchStorageBoard(Number(storageId), Number(id))
    );
  const { data: { comments = [], pagination: { perPage = 10 } = {} } = {} } = useQuery(
    queryKeys.storageBoardComments.storageBoardCommentsByIdWithPage(Number(id), params.page),
    () => fetchStorageBoardComments(storageId, Number(id), params),
    {
      enabled: !!params.page,
      keepPreviousData: true
    }
  );

  const { mutate, isLoading } = useMutation(
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

  const { mutate: commentPostMutate, isLoading: isLoadingPostComment } = useMutation(
    (data: PostStorageBoardCommentData) =>
      postNonMemberStorageBoardComment(storage.id, Number(id), data),
    {
      onSuccess: () => {
        setContent('');

        if (params.page === (commentLatestPage || 1) && comments.length + 1 <= perPage) {
          queryClient
            .invalidateQueries(
              queryKeys.storageBoardComments.storageBoardCommentsByIdWithPage(
                Number(id),
                params.page
              )
            )
            .then();
        } else {
          let newCommentLatestPage =
            params.page === commentLatestPage && comments.length + 1 > perPage
              ? commentLatestPage + 1
              : commentLatestPage;

          if (!params.page && !commentLatestPage) newCommentLatestPage = 1;

          queryClient.setQueryData(
            queryKeys.storageBoards.storageBoardById(Number(id)),
            (prevStorageBoard: StorageBoard) => ({
              ...prevStorageBoard,
              commentLatestPage: newCommentLatestPage
            })
          );
          setParams((prevParams) => ({
            ...prevParams,
            page: newCommentLatestPage
          }));
        }
      }
    }
  );

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.currentTarget.value);

  const handleChangeTextBar = (event: ChangeEvent<HTMLInputElement>) => {
    const dataInputType = event.currentTarget.type;

    if (dataInputType === 'password') {
      setPassword(event.currentTarget.value);
    } else {
      setNickname(event.currentTarget.value);
    }
  };

  const handleClick = () => footerRef.current.scrollIntoView({ behavior: 'smooth' });

  const handleClickRecommend = (event: MouseEvent<HTMLButtonElement>) => {
    const dataType = Number(event.currentTarget.getAttribute('data-type') || 0);

    if (Number(id) && (dataType === 0 || dataType === 1)) {
      mutate({
        storageId,
        storageBoardId: Number(id),
        type: dataType
      });
    }
  };

  const handleClickSend = () => {
    if (!validators.nickname(nickname)) {
      setCommonFeedbackDialogState({
        open: true,
        title: '닉네임이 올바르지 않아요',
        message:
          '한글 또는 영문 대소문자 2자 이상 10자 이하로 입력해 주세요.<br />특수문자는 포함할 수 없어요!'
      });
      return;
    }
    if (!validators.password(password)) {
      setCommonFeedbackDialogState({
        open: true,
        title: '비밀번호가 올바르지 않아요.',
        message: '7자 이상으로 입력해 주세요!'
      });
      return;
    }

    commentPostMutate({ nickname, password, content });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersectRef, { threshold: 0.5 });
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, [onIntersectRef, footerRef]);

  useEffect(() => {
    if (content.split('\n').length >= 2) {
      setRows(2);
    } else {
      setRows(1);
    }
  }, [content]);

  if (triggered || observerTriggered) {
    return (
      <Box component="footer" customStyle={{ minHeight: 65 }}>
        <StyledStorageBoardFooter css={{ minHeight: 65, justifyContent: 'center' }}>
          <Flexbox direction="vertical" gap={10} customStyle={{ width: '100%' }}>
            {content && (
              <Grid container columnGap={16}>
                <Grid item xs={2}>
                  <TextBar
                    fullWidth
                    size="small"
                    onChange={handleChangeTextBar}
                    value={nickname}
                    placeholder="닉네임"
                    disabled={isLoadingPostComment}
                    customStyle={{ borderColor: box.stroked.normal }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextBar
                    fullWidth
                    type="password"
                    size="small"
                    onChange={handleChangeTextBar}
                    value={password}
                    placeholder="바밀번호"
                    disabled={isLoadingPostComment}
                    customStyle={{ borderColor: box.stroked.normal }}
                  />
                </Grid>
              </Grid>
            )}
            <CommentBar>
              <CommentTextArea
                placeholder="내용을 입력해주세요."
                rows={rows}
                onChange={handleChange}
                value={content}
                disabled={isLoadingPostComment}
              />
              <IconButton
                onClick={handleClickSend}
                disabled={isLoadingPostComment}
                customStyle={{ marginRight: 10 }}
              >
                <Icon
                  name={
                    !isLoadingPostComment && nickname && password && content
                      ? 'SendFilled'
                      : 'SendOutlined'
                  }
                  color={
                    !isLoadingPostComment && nickname && password && content
                      ? 'primary'
                      : text[mode].text3
                  }
                />
              </IconButton>
            </CommentBar>
          </Flexbox>
        </StyledStorageBoardFooter>
      </Box>
    );
  }

  return (
    <Box component="footer" customStyle={{ height: 44 }}>
      <StyledStorageBoardFooter>
        <Button
          variant="transparent"
          startIcon={
            <Icon name="ThumbsUpOutlined" width={18} height={18} color={text[mode].text1} />
          }
          size="pico"
          data-type={0}
          onClick={handleClickRecommend}
          disabled={isLoading}
          customStyle={{ color: text[mode].text1 }}
        >
          {thumbUp.toLocaleString()}
        </Button>
        <Button
          variant="transparent"
          startIcon={
            <Icon name="ThumbsDownOutlined" width={18} height={18} color={text[mode].text1} />
          }
          size="pico"
          data-type={1}
          onClick={handleClickRecommend}
          disabled={isLoading}
          customStyle={{ color: text[mode].text1 }}
        >
          {thumbDown.toLocaleString()}
        </Button>
        <Button
          variant="transparent"
          startIcon={
            <Icon name="CommentOutlined" width={18} height={18} color={text[mode].text1} />
          }
          size="pico"
          onClick={handleClick}
          customStyle={{ color: text[mode].text1 }}
        >
          {commentTotalCount.toLocaleString()}
        </Button>
      </StyledStorageBoardFooter>
    </Box>
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
  padding: 10px 20px;
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
  z-index: 2;
`;

const CommentBar = styled.div`
  flex-grow: 1;
  display: flex;
  border: 1px solid
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
  color: ${({
    theme: {
      mode,
      palette: { text }
    }
  }) => text[mode].main};

  &::placeholder {
    color: ${({
      theme: {
        mode,
        palette: { text }
      }
    }) => text[mode].text1};
  }
`;

export default StorageBoardFooter;
