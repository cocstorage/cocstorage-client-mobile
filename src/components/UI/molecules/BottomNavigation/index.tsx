import { MouseEvent, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { Box, Spotlight, Typography, useTheme } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  commonForwardPathState,
  commonOnBoardingDefault,
  commonOnBoardingState
} from '@recoil/common/atoms';

import { NavigationItem, StyledBottomNavigation } from './BottomNavigation.styles';

export interface BottomNavigationProps {
  disableFixed?: boolean;
  disableOnBoarding?: boolean;
}

function BottomNavigation({ disableFixed, disableOnBoarding }: BottomNavigationProps) {
  const router = useRouter();
  const targetRef = useRef<HTMLLIElement>(null);

  const {
    theme: {
      mode,
      palette: { text }
    }
  } = useTheme();

  const [{ theme: { step = 0, lastStep = 0 } = {} }, setCommonOnBoardingState] =
    useRecoilState(commonOnBoardingState);
  const forwardPath = useRecoilValue(commonForwardPathState);

  const [open, setOpen] = useState(false);

  const handleClick = (event: MouseEvent<HTMLLIElement>) => {
    const dataPathname = event.currentTarget.getAttribute('data-pathname');
    router.push(dataPathname).then(() => {
      if (dataPathname === '/my') {
        setCommonOnBoardingState((prevState) => ({
          ...prevState,
          theme: {
            ...commonOnBoardingDefault.theme,
            step: 1,
            done: commonOnBoardingDefault.theme.lastStep === 1
          }
        }));
      }
    });
  };

  const handleClickMy = () => {
    router.push('/my').then(() =>
      setCommonOnBoardingState((prevState) => ({
        ...prevState,
        theme: {
          ...commonOnBoardingDefault.theme,
          step: 1,
          done: commonOnBoardingDefault.theme.lastStep === 1
        }
      }))
    );
  };

  const handleClose = () =>
    setCommonOnBoardingState((prevState) => ({
      ...prevState,
      theme: {
        ...commonOnBoardingDefault.theme,
        step: 1,
        done: commonOnBoardingDefault.theme.lastStep === 1
      }
    }));

  useEffect(() => {
    if (!disableOnBoarding && ((!step && !lastStep) || step < lastStep)) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [router.pathname, step, lastStep, disableOnBoarding]);

  return (
    <Box component="nav" customStyle={{ minHeight: 60 }}>
      <StyledBottomNavigation disableFixed={disableFixed}>
        <NavigationItem data-pathname="/" onClick={handleClick}>
          <Icon
            name={
              forwardPath === '/' || forwardPath === '/best' || forwardPath === '/worst'
                ? 'HomeFilled'
                : 'HomeOutlined'
            }
            color={
              forwardPath === '/' || forwardPath === '/best' || forwardPath === '/worst'
                ? 'primary'
                : text[mode].text2
            }
          />
          <Typography
            variant="s2"
            color={
              forwardPath === '/' || forwardPath === '/best' || forwardPath === '/worst'
                ? 'primary'
                : text[mode].text2
            }
          >
            홈
          </Typography>
        </NavigationItem>
        <NavigationItem data-pathname="/storages" onClick={handleClick}>
          <Icon
            name={forwardPath.includes('/storages') ? 'CommunityFilled' : 'CommunityOutlined'}
            color={forwardPath.includes('/storages') ? 'primary' : text[mode].text2}
          />
          <Typography
            variant="s2"
            color={forwardPath.includes('/storages') ? 'primary' : text[mode].text2}
          >
            게시판
          </Typography>
        </NavigationItem>
        <NavigationItem ref={targetRef} data-pathname="/my" onClick={handleClick}>
          <Icon name="UserOutlined" color={text[mode].text2} />
          <Typography variant="s2" color={text[mode].text2}>
            마이
          </Typography>
        </NavigationItem>
        <Spotlight
          open={open}
          onClose={handleClose}
          targetRef={targetRef}
          round={8}
          tooltip={{
            content: '여기서 다크 모드를 설정하실 수 있어요!',
            centered: false,
            placement: 'top',
            left: -80,
            triangleLeft: 135,
            onClick: handleClickMy,
            disableOnClose: true
          }}
        />
      </StyledBottomNavigation>
    </Box>
  );
}

export default BottomNavigation;
