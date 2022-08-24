import styled, { CSSObject } from '@emotion/styled';
import { Box, Button, Icon, IconButton, useTheme } from 'cocstorage-ui';

interface StorageBoardFooterProps {
  variant?: 'default' | 'form';
}

function StorageBoardFooter({ variant }: StorageBoardFooterProps) {
  const {
    theme: {
      type,
      palette: { text }
    }
  } = useTheme();

  if (variant === 'form') {
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
