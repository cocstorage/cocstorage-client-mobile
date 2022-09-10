import { MouseEvent } from 'react';

import { useRouter } from 'next/router';

import { Button, Flexbox, Typography, useTheme } from 'cocstorage-ui';

import SettingInfoHeader from '@components/pages/settingInfo/SettingInfoHeader';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { Logo } from '@components/UI/molecules/Header/Header.styles';

import packageJson from 'package.json';

function SettingInfo() {
  const router = useRouter();

  const {
    theme: {
      type,
      palette: { text }
    }
  } = useTheme();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const dataPathName = event.currentTarget.getAttribute('data-pathname');

    router.push(dataPathName);
  };

  return (
    <GeneralTemplate header={<SettingInfoHeader />} disableFlexible={false}>
      <Flexbox
        direction="vertical"
        alignment="center"
        justifyContent="center"
        customStyle={{ height: '100%' }}
      >
        <Logo
          width={40}
          src={`https://${process.env.IMAGE_DOMAIN}/assets/logo.png`}
          alt="Logo Img"
        />
        <Typography variant="h3" fontWeight="bold" customStyle={{ marginTop: 8 }}>
          개념글 저장소
        </Typography>
        <Typography variant="s1" color={text[type].text2} customStyle={{ marginTop: 4 }}>
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
  );
}

export default SettingInfo;
