import { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useRecoilState, useSetRecoilState } from 'recoil';

import styled, { CSSObject } from '@emotion/styled';

import { commonFeedbackDialogState } from '@recoil/common/atoms';
import { noticeCommentsParamsState } from '@recoil/notice/atoms';

import { Box, Button, Flexbox, Grid, Icon, IconButton, TextBar, useTheme } from 'cocstorage-ui';

import { Notice } from '@dto/notices';
import useScrollTrigger from '@hooks/useScrollTrigger';
import validators from '@utils/validators';

import {
  PostNoticeCommentData,
  fetchNoticeComments,
  postNonMemberNoticeComment
} from '@api/v1/notice-comments';
import { fetchNotice } from '@api/v1/notices';

import queryKeys from '@constants/queryKeys';

interface NoticeFooterProps {
  footerRef: RefObject<HTMLDivElement>;
}

function NoticeFooter({ footerRef }: NoticeFooterProps) {
  const router = useRouter();
  const { id } = router.query;

  const {
    theme: {
      mode,
      palette: { text, box }
    }
  } = useTheme();

  const [params, setParams] = useRecoilState(noticeCommentsParamsState);
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

  const { data: { commentLatestPage = 0, commentTotalCount } = {} } = useQuery(
    queryKeys.notices.noticeById(Number(id)),
    () => fetchNotice(Number(id))
  );

  const { data: { comments = [], pagination: { perPage = 10 } = {} } = {} } = useQuery(
    queryKeys.noticeComments.noticeCommentsByIdWithPage(Number(id), params.page),
    () => fetchNoticeComments(Number(id), params),
    {
      enabled: !!params.page,
      keepPreviousData: true
    }
  );

  const { mutate, isLoading } = useMutation(
    (data: PostNoticeCommentData) => postNonMemberNoticeComment(Number(id), data),
    {
      onSuccess: () => {
        setContent('');

        if (params.page === (commentLatestPage || 1) && comments.length + 1 <= perPage) {
          queryClient
            .invalidateQueries(
              queryKeys.noticeComments.noticeCommentsByIdWithPage(Number(id), params.page)
            )
            .then();
        } else {
          let newCommentLatestPage =
            params.page === commentLatestPage && comments.length + 1 > perPage
              ? commentLatestPage + 1
              : commentLatestPage;

          if (!params.page && !commentLatestPage) newCommentLatestPage = 1;

          queryClient.setQueryData(
            queryKeys.notices.noticeById(Number(id)),
            (prevNotice: Notice) => ({
              ...prevNotice,
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
    }

    mutate({ nickname, password, content });
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

  if (observerTriggered || triggered) {
    return (
      <Box component="footer" customStyle={{ minHeight: 65 }}>
        <StyledNoticeFooter css={{ minHeight: 65, justifyContent: 'center' }}>
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
              />
              <IconButton onClick={handleClickSend} customStyle={{ marginRight: 10 }}>
                <Icon
                  name={
                    !isLoading && nickname && password && content ? 'SendFilled' : 'SendOutlined'
                  }
                  color={
                    !isLoading && nickname && password && content ? 'primary' : text[mode].text3
                  }
                />
              </IconButton>
            </CommentBar>
          </Flexbox>
        </StyledNoticeFooter>
      </Box>
    );
  }

  return (
    <Box component="footer" customStyle={{ height: 44 }}>
      <StyledNoticeFooter>
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
      </StyledNoticeFooter>
    </Box>
  );
}

const StyledNoticeFooter = styled.div`
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

export default NoticeFooter;
