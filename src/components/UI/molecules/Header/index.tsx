import { Box, Flexbox, Icon, IconButton, Typography } from 'cocstorage-ui';

import { Logo, StyledHeader } from './Header.styles';

export interface HeaderProps {
  disableFixed?: boolean;
}

function Header({ disableFixed }: HeaderProps) {
  return (
    <Box component="header" customStyle={{ minHeight: 50 }}>
      <StyledHeader disableFixed={disableFixed}>
        <Flexbox gap={8}>
          <Logo
            width={32}
            height={24}
            src={`https://${process.env.IMAGE_DOMAIN}/assets/logo.png`}
            alt="Logo Img"
          />
          <Flexbox>
            <Typography variant="h3" fontWeight="bold">
              개념글’
            </Typography>
            <Typography variant="h3">저장소</Typography>
          </Flexbox>
        </Flexbox>
        <Flexbox gap={10}>
          <IconButton>
            <Icon name="WriteOutlined" />
          </IconButton>
          <IconButton>
            <Icon name="LoudSpeakerOutlined" />
          </IconButton>
          <IconButton>
            <Icon name="SearchOutlined" />
          </IconButton>
        </Flexbox>
      </StyledHeader>
    </Box>
  );
}

export default Header;
