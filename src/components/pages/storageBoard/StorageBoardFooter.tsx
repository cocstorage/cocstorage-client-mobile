import styled from '@emotion/styled';
import { Box, Button, Icon, TextBar, useTheme } from 'cocstorage-ui';

interface StorageBoardFooterProps {
  variant?: 'default' | 'form';
}

function StorageBoardFooter({ variant }: StorageBoardFooterProps) {
  const {
    theme: {
      type,
      palette: { text, box }
    }
  } = useTheme();

  const handleChange = () => {
    //
  };

  if (variant === 'form') {
    return (
      <Box component="footer" customStyle={{ height: 60 }}>
        <StyledStorageBoardFooter css={{ height: 60, justifyContent: 'center' }}>
          {/* TODO UI 라이브러리 endIcon props 추가 */}
          <TextBar
            fullWidth
            onChange={handleChange}
            value=""
            placeholder="내용을 입력해주세요."
            customStyle={{ borderColor: box.stroked.normal }}
          />
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
            <Icon name="ThumbsUpOutlined" width={18} height={18} color={text[type].text1} />
          }
          size="pico"
          customStyle={{ color: text[type].text1 }}
        >
          100
        </Button>
        <Button
          variant="transparent"
          startIcon={
            <Icon name="ThumbsDownOutlined" width={18} height={18} color={text[type].text1} />
          }
          size="pico"
          customStyle={{ color: text[type].text1 }}
        >
          100
        </Button>
        <Button
          variant="transparent"
          startIcon={
            <Icon name="CommentOutlined" width={18} height={18} color={text[type].text1} />
          }
          size="pico"
          customStyle={{ color: text[type].text1 }}
        >
          10
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
  height: 44px;
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

export default StorageBoardFooter;
