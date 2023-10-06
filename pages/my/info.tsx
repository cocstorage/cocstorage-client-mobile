import { MouseEvent } from 'react';

import { useRouter } from 'next/router';

import { Button, Flexbox, Image, Typography, useTheme } from '@cocstorage/ui';

import { MyInfoHead, MyInfoHeader } from '@components/pages/myInfo';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import packageJson from 'package.json';

function MyInfo() {
  const router = useRouter();

  const {
    theme: {
      mode,
      palette: { text }
    }
  } = useTheme();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const dataPathName = event.currentTarget.getAttribute('data-pathname');

    router.push(dataPathName);
  };

  return (
    <>
      <MyInfoHead />
      <GeneralTemplate header={<MyInfoHeader />} disableFlexible={false}>
        <Flexbox
          direction="vertical"
          alignment="center"
          justifyContent="center"
          customStyle={{ height: '100%' }}
        >
          <Image
            width={40}
            height={30}
            src={`https://${process.env.IMAGE_DOMAIN}/assets/logo.png`}
            alt="Logo Img"
            disableAspectRatio
            disableBackgroundColor
          />
          <Typography variant="h3" fontWeight="bold" customStyle={{ marginTop: 8 }}>
            개념글 저장소
          </Typography>
          <Typography variant="s1" color={text[mode].text2} customStyle={{ marginTop: 4 }}>
            {packageJson.version}
          </Typography>
          <Button data-pathname="/policy" onClick={handleClick} customStyle={{ marginTop: 30 }}>
            이용약관
          </Button>
          <Button data-pathname="/privacy" onClick={handleClick} customStyle={{ marginTop: 10 }}>
            개인정보처리방침
          </Button>
        </Flexbox>
      </GeneralTemplate>
    </>
  );
}

export default MyInfo;
