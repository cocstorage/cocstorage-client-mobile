import { ChangeEvent, useRef, useState } from 'react';

import dayjs from 'dayjs';

import {
  Avatar,
  BottomSheet,
  Flexbox,
  Grid,
  Icon,
  IconButton,
  TextBar,
  Typography,
  useTheme
} from 'cocstorage-ui';

import { Message, Reply } from '@components/UI/molecules';

import { NoticeComment } from '@dto/notice-comments';
import { StorageBoardComment } from '@dto/storage-board-comments';

import { CommentBar, CommentBarWrapper, CommentTextArea } from './ReplyListBottomSheet.styles';

interface ReplyListBottomSheetProps {
  open: boolean;
  onClose: () => void;
  comment: Partial<StorageBoardComment | NoticeComment>;
  nickname: string;
  password: string;
  content: string;
  rows: number;
  isLoading: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeContent: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onClickReplyMenu: (commentId: number, replyId: number) => () => void;
  onBlurNicknameTextBar: () => void;
  onBlurPasswordTextBar: () => void;
  onClickPost: () => void;
}

function ReplyListBottomSheet({
  open,
  onClose,
  comment: {
    id,
    user,
    nickname: commentNickname,
    content: commentContent = '',
    replies = [],
    createdAt,
    createdIp
  },
  nickname,
  password,
  content,
  rows = 1,
  isLoading,
  onChange,
  onChangeContent,
  onClickReplyMenu,
  onBlurNicknameTextBar,
  onBlurPasswordTextBar,
  onClickPost
}: ReplyListBottomSheetProps) {
  const {
    theme: {
      mode,
      palette: { text, box }
    }
  } = useTheme();

  const [disableContentSwipeableClose, setDisableContentSwipeableClose] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (contentRef.current) {
      if (contentRef.current.scrollTop <= 0) {
        setDisableContentSwipeableClose(false);
      } else {
        setDisableContentSwipeableClose(true);
      }
    }
  };

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      disableContentSwipeableClose={disableContentSwipeableClose}
      customStyle={{
        '& > div': {
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <Flexbox
        gap={10}
        customStyle={{
          maxHeight: 150,
          padding: '8px 20px 14px',
          borderBottom: `1px solid ${box.stroked.normal}`
        }}
      >
        <Avatar
          width={30}
          height={30}
          src={(user || {}).avatarUrl || ''}
          alt="User Avatar Img"
          fallback={{
            iconName: 'UserFilled',
            width: 15,
            height: 15
          }}
        />
        <Flexbox direction="vertical" customStyle={{ flex: 1 }}>
          <Flexbox gap={4} alignment="center" customStyle={{ marginBottom: 4 }}>
            <Typography variant="s1" fontWeight="bold">
              {commentNickname || (user || {}).nickname}
            </Typography>
            {!user && createdIp && (
              <Typography variant="s2" color={text[mode].text1}>
                ({createdIp})
              </Typography>
            )}
          </Flexbox>
          <Typography lineHeight="main" noWrap lineClamp={3} customStyle={{ flex: 1 }}>
            {commentContent.split('\n').map((splitContent, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <span key={`comment-content-in-bottom-sheet-${index}`}>
                {splitContent}
                <br />
              </span>
            ))}
          </Typography>
          <Flexbox direction="vertical" gap={15} customStyle={{ marginTop: 8 }}>
            <Flexbox gap={12} alignment="center">
              <Typography
                variant="s1"
                customStyle={{
                  color: text[mode].text1
                }}
              >
                {dayjs(createdAt).fromNow()}
              </Typography>
            </Flexbox>
          </Flexbox>
        </Flexbox>
      </Flexbox>
      <Flexbox
        ref={contentRef}
        gap={20}
        direction="vertical"
        onScroll={handleScroll}
        customStyle={{ flex: 1, padding: '20px 0', overflowY: 'auto' }}
      >
        {replies.length === 0 && (
          <Message
            title="아직 답글이 없네요!"
            message="답글을 남겨보시는 건 어때요?"
            hideButton
            customStyle={{ margin: '40px 0 50px' }}
          />
        )}
        {replies.map((reply) => (
          <Reply
            key={`reply-${reply.id}`}
            reply={reply}
            onClickMenu={onClickReplyMenu(id, reply.id)}
          />
        ))}
      </Flexbox>
      <CommentBarWrapper>
        {content && (
          <Grid container columnGap={16}>
            <Grid item xs={2}>
              <TextBar
                fullWidth
                size="small"
                onChange={onChange}
                onBlur={onBlurNicknameTextBar}
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
                size="small"
                onChange={onChange}
                onBlur={onBlurPasswordTextBar}
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
            placeholder="내용을 입력해주세요."
            rows={rows}
            onChange={onChangeContent}
            value={content}
            disabled={isLoading}
          />
          <IconButton onClick={onClickPost} customStyle={{ marginRight: 10 }}>
            <Icon
              name={!isLoading && nickname && password && content ? 'SendFilled' : 'SendOutlined'}
              color={!isLoading && nickname && password && content ? 'primary' : text[mode].text3}
            />
          </IconButton>
        </CommentBar>
      </CommentBarWrapper>
    </BottomSheet>
  );
}

export default ReplyListBottomSheet;
