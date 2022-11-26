import { MouseEvent } from 'react';

import { useRouter } from 'next/router';

import { useSetRecoilState } from 'recoil';

import { commonFeedbackDialogState } from '@recoil/common/atoms';

import { Box, Flexbox, Icon, IconButton, Image, Typography } from 'cocstorage-ui';

import { StyledHeader } from './Header.styles';

export interface HeaderProps {
  disableFixed?: boolean;
}

function Header({ disableFixed }: HeaderProps) {
  const router = useRouter();

  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const dataPathName = event.currentTarget.getAttribute('data-pathname');

    if (!dataPathName) {
      setCommonFeedbackDialogState({
        open: true,
        title: '준비 중인 기능이에요!',
        message: '조금만 기다려주세요!'
      });
    } else {
      router.push(dataPathName);
    }
  };

  return (
    <Box component="header" customStyle={{ minHeight: 50 }}>
      <StyledHeader disableFixed={disableFixed}>
        <Flexbox gap={8} alignment="center">
          <Image
            width={32}
            height={24}
            src={`https://${process.env.IMAGE_DOMAIN}/assets/logo.png`}
            alt="Logo Img"
            disableAspectRatio
            customStyle={{
              backgroundColor: 'transparent'
            }}
          />
          <Typography
            component="h1"
            variant="h3"
            customStyle={{ '& > strong': { fontWeight: 700 } }}
          >
            <strong>개념글’</strong>저장소
          </Typography>
        </Flexbox>
        <Flexbox gap={10}>
          <IconButton onClick={handleClick}>
            <Icon name="WriteOutlined" />
          </IconButton>
          <IconButton data-pathname="/notices" onClick={handleClick}>
            <Icon name="LoudSpeakerOutlined" />
          </IconButton>
          <IconButton onClick={handleClick}>
            <Icon name="SearchOutlined" />
          </IconButton>
        </Flexbox>
      </StyledHeader>
    </Box>
  );
}

export default Header;
