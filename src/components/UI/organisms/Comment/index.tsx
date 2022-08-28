import { useState } from 'react';

import { Flexbox, Image, Typography, useTheme } from 'cocstorage-ui';

function Comment() {
  const {
    theme: {
      type: themeType,
      palette: { text }
    }
  } = useTheme();

  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);

  return (
    <Flexbox gap={10} customStyle={{ flex: 1 }}>
      <Image
        width={30}
        height={30}
        src=""
        alt="User Avatar Img"
        round="50%"
        disableAspectRatio
        fallback={{
          iconName: 'UserFilled',
          width: 15,
          height: 15
        }}
      />
      <Flexbox direction="vertical" customStyle={{ flex: 1 }}>
        <Flexbox gap={4} alignment="center">
          <Typography variant="s1" fontWeight="bold">
            사용자
          </Typography>
        </Flexbox>
        <Typography lineHeight="main" customStyle={{ marginTop: 4 }}>
          내용입니다.
        </Typography>
        <Flexbox direction="vertical" gap={15} customStyle={{ marginTop: 8 }}>
          <Flexbox gap={12} alignment="center">
            <Typography
              variant="s1"
              customStyle={{
                color: text[themeType].text1
              }}
            >
              1분 전
            </Typography>
            <Typography
              variant="s1"
              customStyle={{ cursor: 'pointer', color: text[themeType].text1 }}
              onClick={handleClick}
            >
              답글달기
            </Typography>
          </Flexbox>
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
}

export default Comment;
