import styled from '@emotion/styled';

import { Avatar, Box, Button, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

function NoticeContent() {
  const {
    theme: {
      type,
      palette: { primary, text }
    }
  } = useTheme();
  return (
    <>
      <Box component="section" customStyle={{ marginTop: 10 }}>
        <Typography variant="h3" fontWeight="bold">
          호나우두 vs 호날두 축구 기량 평가는 이것만 보면 종결 남 ㅋㅋ
        </Typography>
        <Info>
          <Flexbox alignment="center">
            <Avatar
              width={18}
              height={18}
              src="https://static.cocstorage.com/images/xt868xt2w6i50bf4x98xdsbfado3"
              alt="User Avatar Img"
            />
            <Typography variant="s1" color={text[type].text1} customStyle={{ marginLeft: 4 }}>
              사용자
            </Typography>
          </Flexbox>
          <Typography variant="s1" color={text[type].text1}>
            1분 전
          </Typography>
          <Flexbox alignment="center" customStyle={{ marginLeft: 10 }}>
            <Icon width={16} height={16} name="ViewOutlined" color={text[type].text1} />
            <Typography variant="s2" color={text[type].text1} customStyle={{ marginLeft: 2 }}>
              15
            </Typography>
          </Flexbox>
        </Info>
      </Box>
      <Typography component="article" lineHeight="main" customStyle={{ marginTop: 30 }}>
        이거 하나만 봐도 눈이 달려있지 않은 넘이 아닌 이상 한 눈에 호나우두가 축구 더 잘하는 선수인
        걸 알 수 있음 ㅋㅋ
      </Typography>
      <Flexbox component="section" customStyle={{ marginTop: 9 }}>
        <Flexbox>
          <Button
            size="small"
            startIcon={<Icon name="ThumbsUpFilled" width={15} height={15} color="primary" />}
            customStyle={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              fontWeight: 700,
              color: primary.main
            }}
          >
            100
          </Button>
          <Button
            size="small"
            startIcon={<Icon name="ThumbsDownOutlined" width={15} height={15} />}
            customStyle={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              color: text[type].text1
            }}
          >
            100
          </Button>
          <Button
            size="small"
            startIcon={<Icon name="CommentOutlined" width={15} height={15} />}
            customStyle={{
              marginLeft: 10,
              color: text[type].text1
            }}
          >
            10
          </Button>
        </Flexbox>
      </Flexbox>
    </>
  );
}

const Info = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  & > div {
    &:after {
      content: '';
      display: block;
      width: 2px;
      height: 2px;
      margin: 0 5px;
      border-radius: 50%;
      background-color: ${({
        theme: {
          type,
          palette: { text }
        }
      }) => text[type].text1};
    }
    &:last-child:after {
      display: none;
    }
  }
`;

export default NoticeContent;
