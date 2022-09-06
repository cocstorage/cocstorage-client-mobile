import { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react';

import { useSetRecoilState } from 'recoil';

import styled, { CSSObject } from '@emotion/styled';

import { commonFeedbackDialogState } from '@recoil/common/atoms';

import { Box, Button, Flexbox, Grid, Icon, IconButton, TextBar, useTheme } from 'cocstorage-ui';

import useScrollTrigger from '@hooks/useScrollTrigger';
import validators from '@utils/validators';

interface NoticeFooterProps {
  footerRef: RefObject<HTMLDivElement>;
}

function NoticeFooter({ footerRef }: NoticeFooterProps) {
  const {
    theme: {
      type,
      palette: { text, box }
    }
  } = useTheme();

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

    // commentPostMutate({ nickname, password, content });
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
                  name={!nickname && password && content ? 'SendFilled' : 'SendOutlined'}
                  color={!nickname && password && content ? 'primary' : text[type].text3}
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
            <Icon name="CommentOutlined" width={18} height={18} color={text[type].text1} />
          }
          size="pico"
          onClick={handleClick}
          customStyle={{ color: text[type].text1 }}
        >
          {100}
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

export default NoticeFooter;
