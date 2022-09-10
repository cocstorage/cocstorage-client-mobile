import Link from 'next/link';

import { Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import SettingHeader from '@components/pages/setting/SettingHeader';
import GeneralTemplate from '@components/templeates/GeneralTemplate';

function Setting() {
  const {
    theme: {
      type,
      palette: { text }
    }
  } = useTheme();

  return (
    <GeneralTemplate header={<SettingHeader />}>
      <Flexbox direction="vertical" gap={20} customStyle={{ padding: '20px 0' }}>
        <Link href="/setting/theme">
          <a>
            <Flexbox gap={12} alignment="center">
              <Icon name="StarOutlined" />
              <Flexbox direction="vertical" gap={2}>
                <Typography fontWeight="bold">테마</Typography>
                <Typography color={text[type].text1}>라이트 모드, 다크 모드</Typography>
              </Flexbox>
            </Flexbox>
          </a>
        </Link>
        <Link href="/setting/info">
          <a>
            <Flexbox gap={12} alignment="center">
              <Icon name="InfoOutlined" />
              <Flexbox direction="vertical" gap={2}>
                <Typography fontWeight="bold">정보</Typography>
                <Typography color={text[type].text1}>
                  버전 / 이용약관 및 개인정보처리방침
                </Typography>
              </Flexbox>
            </Flexbox>
          </a>
        </Link>
      </Flexbox>
    </GeneralTemplate>
  );
}

export default Setting;
