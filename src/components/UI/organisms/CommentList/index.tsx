import { CustomStyle, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import Comment from '@components/UI/organisms/Comment';

interface CommentListProps {
  customStyle?: CustomStyle;
}

function CommentList({ customStyle }: CommentListProps) {
  const {
    theme: {
      palette: { primary }
    }
  } = useTheme();

  return (
    <Flexbox direction="vertical" gap={24} customStyle={customStyle}>
      <Flexbox gap={4} alignment="center">
        <Icon name="CommentOutlined" width={20} height={20} />
        <Flexbox gap={6}>
          <Typography variant="h4" fontWeight="bold">
            댓글
          </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            customStyle={{
              color: primary.main
            }}
          >
            100
          </Typography>
        </Flexbox>
      </Flexbox>
      <Flexbox gap={18} direction="vertical">
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </Flexbox>
    </Flexbox>
  );
}

export default CommentList;
