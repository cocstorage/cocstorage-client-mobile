import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import {
  Box,
  Flexbox,
  Grid,
  IconButton,
  Spotlight,
  TextBar,
  Tooltip,
  useTheme
} from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import styled, { CSSObject } from '@emotion/styled';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';

import {
  PostStorageBoardCommentData,
  fetchStorageBoardComments,
  postNonMemberStorageBoardComment
} from '@api/v1/storage-board-comments';
import { fetchStorageBoard } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';
import queryKeys from '@constants/queryKeys';
import { StorageBoard } from '@dto/storage-boards';
import {
  commonFeedbackDialogState,
  commonOnBoardingDefault,
  commonOnBoardingState
} from '@recoil/common/atoms';
import { myNicknameState, myPasswordState } from '@recoil/pages/my/atoms';
import { storageBoardCommentsParamsState } from '@recoil/pages/storageBoard/atoms';
import validators from '@utils/validators';

function StorageBoardFooter() {
  const router = useRouter();
  const { path, id } = router.query;

  const {
    theme: {
      mode,
      palette: { text, box }
    }
  } = useTheme();

  const [params, setParams] = useRecoilState(storageBoardCommentsParamsState);
  const [{ comment: { step = 0, lastStep = 0 } = {} }, setCommonOnBoardingState] =
    useRecoilState(commonOnBoardingState);
  const [myNickname, setMyNicknameState] = useRecoilState(myNicknameState);
  const [myPassword, setMyPasswordState] = useRecoilState(myPasswordState);
  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);

  const [rows, setRows] = useState(1);
  const [nickname, setNickname] = useState(myNickname);
  const [password, setPassword] = useState(myPassword);
  const [content, setContent] = useState('');
  const [open, setOpen] = useState(false);

  const textBarRef = useRef<HTMLTextAreaElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();

  const { data: { id: storageId } = {} } = useQuery(
    queryKeys.storages.storageById(String(path)),
    () => fetchStorage(String(path))
  );
  const { data: { storage, commentLatestPage } = {} } = useQuery(
    queryKeys.storageBoards.storageBoardById(Number(id)),
    () => fetchStorageBoard(Number(storageId), Number(id))
  );
  const { data: { comments = [], pagination: { perPage = 10 } = {} } = {} } = useQuery(
    queryKeys.storageBoardComments.storageBoardCommentsByIdWithPage(Number(id), params.page),
    () => fetchStorageBoardComments(storageId, Number(id), params),
    {
      enabled: !!params.page,
      keepPreviousData: true
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
      return;
    }

    commentPostMutate({ nickname, password, content });
  };

  const handleCloseOnBoarding = () =>
    setCommonOnBoardingState((prevState) => ({
      ...prevState,
      comment: {
        ...commonOnBoardingDefault.comment,
        step: 1,
        done: commonOnBoardingDefault.comment.lastStep === 1
      }
    }));

  const handleCloseOnBoardingWithWrapCommentsArea = () => {
    textBarRef.current?.focus();
    setCommonOnBoardingState((prevState) => ({
      ...prevState,
      comment: {
        ...commonOnBoardingDefault.comment,
        step: 1,
        done: commonOnBoardingDefault.comment.lastStep === 1
      }
    }));
  };

  useEffect(() => {
    if (content.split('\n').length >= 2) {
      setRows(2);
    } else {
      setRows(1);
    }
  }, [content]);

  useEffect(() => {
    if ((!step && !lastStep) || step < lastStep) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [step, lastStep]);

  return (
    <>
      <Box component="footer" customStyle={{ minHeight: 65 }}>
        <StyledStorageBoardFooter ref={targetRef} css={{ minHeight: 65, justifyContent: 'center' }}>
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
                    disabled={isLoadingPostComment}
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
                    disabled={isLoadingPostComment}
                    customStyle={{ borderColor: box.stroked.normal }}
                  />
                </Grid>
              </Grid>
            )}
            <CommentBar>
              <CommentTextArea
                ref={textBarRef}
                placeholder="내용을 입력해 주세요."
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
      <Spotlight open={open} onClose={handleCloseOnBoarding} targetRef={targetRef}>
        <Tooltip
          open={open}
          onClose={handleCloseOnBoarding}
          content="로그인하지 않아도 댓글을 남길 수 있어요!"
          placement="top"
          disableOnClose
        >
          <Box
            onClick={handleCloseOnBoardingWithWrapCommentsArea}
            customStyle={{ width: (targetRef.current || {}).clientWidth, minHeight: 65 }}
          >
            <StyledStorageBoardFooter css={{ minHeight: 65, justifyContent: 'center' }}>
              <Flexbox direction="vertical" gap={10} customStyle={{ width: '100%' }}>
                <CommentBar>
                  <CommentTextArea
                    placeholder="내용을 입력해 주세요."
                    rows={rows}
                    onChange={handleChange}
                    value={content}
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
        </Tooltip>
      </Spotlight>
    </>
  );
}

export const StyledStorageBoardFooter = styled.div`
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
