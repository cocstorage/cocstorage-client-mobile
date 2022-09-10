import { useRouter } from 'next/router';

import { Button, Flexbox } from 'cocstorage-ui';

import GeneralTemplate from '@components/templeates/GeneralTemplate';
import Message from '@components/UI/molecules/Message';

function Error404() {
  const router = useRouter();

  const handleClick = () => router.push('/');

  return (
    <GeneralTemplate disableFlexible={false}>
      <Flexbox direction="vertical" customStyle={{ height: '100%', padding: '20px 0' }}>
        <Flexbox direction="vertical" justifyContent="center" customStyle={{ flexGrow: 1 }}>
          <Message
            title="존재하지 않는 페이지네요."
            message="찾으시는 항목이 삭제되었거나,<br /> 잘못된 주소가 입력되었을 수 있어요."
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
  );
}

export default Error404;
