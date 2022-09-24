import Link from 'next/link';

import { Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import { MyHead, MyHeader } from '@components/pages/my';
import GeneralTemplate from '@components/templeates/GeneralTemplate';

function My() {
  const {
    theme: {
      mode,
      palette: { text }
    }
  } = useTheme();

  return (
    <>
      <MyHead />
      <GeneralTemplate header={<MyHeader />}>
        <Flexbox direction="vertical" gap={20} customStyle={{ padding: '20px 0' }}>
          <Link href="/notices">
            <a>
              <Flexbox gap={12} alignment="center">
                <Icon name="LoudSpeakerOutlined" />
                <Flexbox direction="vertical" gap={2}>
                  <Typography fontWeight="bold">새로운 소식</Typography>
                  <Typography color={text[mode].text1}>공지사항, 업데이트 내용</Typography>
                </Flexbox>
              </Flexbox>
            </a>
          </Link>
          <Link href="/my/theme">
            <a>
              <Flexbox gap={12} alignment="center">
                <Icon name="StarOutlined" />
                <Flexbox direction="vertical" gap={2}>
                  <Typography fontWeight="bold">테마</Typography>
                  <Typography color={text[mode].text1}>라이트 모드, 다크 모드</Typography>
                </Flexbox>
              </Flexbox>
            </a>
          </Link>
          <Link href="/my/info">
            <a>
              <Flexbox gap={12} alignment="center">
                <Icon name="InfoOutlined" />
                <Flexbox direction="vertical" gap={2}>
                  <Typography fontWeight="bold">정보</Typography>
                  <Typography color={text[mode].text1}>
                    버전 / 이용약관 및 개인정보처리방침
                  </Typography>
                </Flexbox>
              </Flexbox>
            </a>
          </Link>
        </Flexbox>
      </GeneralTemplate>
    </>
  );
}

export default My;
