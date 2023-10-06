import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { Box, Flexbox, Grid, IconButton, TextBar, useTheme } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import styled, { CSSObject } from '@emotion/styled';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';

import {
  PostNoticeCommentData,
  fetchNoticeComments,
  postNonMemberNoticeComment
} from '@api/v1/notice-comments';
import { fetchNotice } from '@api/v1/notices';
import queryKeys from '@constants/queryKeys';
import { Notice } from '@dto/notices';
import { commonFeedbackDialogState } from '@recoil/common/atoms';
import { myNicknameState, myPasswordState } from '@recoil/pages/my/atoms';
import { noticeCommentsParamsState } from '@recoil/pages/notice/atoms';
import validators from '@utils/validators';

function NoticeFooter() {
  const router = useRouter();
  const { id } = router.query;

  const {
    theme: {
      mode,
      palette: { text, box }
    }
  } = useTheme();

  const [params, setParams] = useRecoilState(noticeCommentsParamsState);
  const [myNickname, setMyNicknameState] = useRecoilState(myNicknameState);
  const [myPassword, setMyPasswordState] = useRecoilState(myPasswordState);
  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);

  const [rows, setRows] = useState(1);
  const [nickname, setNickname] = useState(myNickname);
  const [password, setPassword] = useState(myPassword);
  const [content, setContent] = useState('');

  const targetRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();

  const { data: { commentLatestPage = 0 } = {} } = useQuery(
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

  const handleBlurNicknameTextBar = () => setMyNicknameState(nickname);
  const handleBlurPasswordTextBar = () => {
    if (myPassword) setMyPasswordState(password);
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
    }

    mutate({ nickname, password, content });
  };

  useEffect(() => {
    if (content.split('\n').length >= 2) {
      setRows(2);
    } else {
      setRows(1);
    }
  }, [content]);

  return (
    <Box component="footer" customStyle={{ minHeight: 65 }}>
      <StyledNoticeFooter ref={targetRef} css={{ minHeight: 65, justifyContent: 'center' }}>
        <Flexbox direction="vertical" gap={10} customStyle={{ width: '100%' }}>
          {content && (
            <Grid container columnGap={16}>
              <Grid item xs={2}>
                <TextBar
                  fullWidth
                  onChange={handleChangeTextBar}
                  onBlur={handleBlurNicknameTextBar}
                  value={nickname}
                  placeholder="닉네임"
                  disabled={isLoading}
                  customStyle={{ borderColor: box.stroked.normal }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextBar
                  fullWidth
                  type="password"
                  onChange={handleChangeTextBar}
                  onBlur={handleBlurPasswordTextBar}
                  value={password}
                  placeholder="비밀번호"
                  disabled={isLoading}
                  customStyle={{ borderColor: box.stroked.normal }}
                />
              </Grid>
            </Grid>
          )}
          <CommentBar>
            <CommentTextArea
              placeholder="내용을 입력해 주세요."
              rows={rows}
              onChange={handleChange}
              value={content}
              disabled={isLoading}
            />
            <IconButton onClick={handleClickSend} customStyle={{ marginRight: 10 }}>
              <Icon
                name={!isLoading && nickname && password && content ? 'SendFilled' : 'SendOutlined'}
                color={!isLoading && nickname && password && content ? 'primary' : text[mode].text3}
              />
            </IconButton>
          </CommentBar>
        </Flexbox>
      </StyledNoticeFooter>
    </Box>
  );
}

export const StyledNoticeFooter = styled.div`
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
