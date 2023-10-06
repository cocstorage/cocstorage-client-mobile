import Head from 'next/head';
import { useRouter } from 'next/router';

import { Button, Flexbox, useTheme } from '@cocstorage/ui';

import GeneralTemplate from '@components/templeates/GeneralTemplate';
import Message from '@components/UI/molecules/Message';

function Error500() {
  const router = useRouter();

  const {
    theme: {
      palette: { background }
    }
  } = useTheme();

  const handleClick = () => router.push('/');

  return (
    <>
      <Head>
        <meta name="theme-color" content={background.bg} />
      </Head>
      <GeneralTemplate disableFlexible={false}>
        <Flexbox direction="vertical" customStyle={{ height: '100%', padding: '20px 0' }}>
          <Flexbox direction="vertical" justifyContent="center" customStyle={{ flexGrow: 1 }}>
            <Message
              title="알 수 없는 오류가 발생했어요."
              message="요청을 처리하지 못했어요.<br />잠시 후에 다시 시도해 주세요!"
              hideButton
            />
          </Flexbox>
          <Button
            fullWidth
            size="big"
            onClick={handleClick}
            customStyle={{ justifyContent: 'center' }}
          >
            홈으로
          </Button>
        </Flexbox>
      </GeneralTemplate>
    </>
  );
}

export default Error500;
