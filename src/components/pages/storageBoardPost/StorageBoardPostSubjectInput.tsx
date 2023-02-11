import { ChangeEvent } from 'react';

import { useRecoilState } from 'recoil';

import styled, { CSSObject } from '@emotion/styled';

import { storageBoardPostSubjectState } from '@recoil/pages/storageBoardPost/atoms';

import { Box, useTheme } from 'cocstorage-ui';

function StorageBoardPostSubjectInput() {
  const {
    theme: {
      palette: { box }
    }
  } = useTheme();

  const [subject, setSubjectState] = useRecoilState(storageBoardPostSubjectState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSubjectState(e.currentTarget.value);

  return (
    <Box
      customStyle={{
        borderBottom: `1px solid ${box.stroked.normal}`
      }}
    >
      <Input
        onChange={handleChange}
        value={subject}
        maxLength={150}
        placeholder="제목을 입력해 주세요."
      />
    </Box>
  );
}

const Input = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: none;
  outline: 0;
  ${({
    theme: {
      typography: { h4 }
    }
  }): CSSObject => ({
    fontSize: h4.size,
    fontWeight: h4.weight.bold,
    letterSpacing: h4.letterSpacing
  })};
  color: ${({
    theme: {
      mode,
      palette: { text }
    }
  }) => text[mode].main};

  &::placeholder {
    color: ${({
      theme: {
        mode,
        palette: { text }
      }
    }) => text[mode].text2};
  }
`;

export default StorageBoardPostSubjectInput;
