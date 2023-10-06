import { ChangeEvent } from 'react';

import styled, { CSSObject } from '@emotion/styled';
import { useRecoilState } from 'recoil';

import { storageBoardEditSubjectState } from '@recoil/pages/storageBoardEdit/atoms';

function StorageBoardEditSubjectInput() {
  const [subject, setSubjectState] = useRecoilState(storageBoardEditSubjectState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSubjectState(e.currentTarget.value);

  return (
    <Input
      onChange={handleChange}
      value={subject}
      maxLength={150}
      placeholder="제목을 입력해 주세요."
    />
  );
}

const Input = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: none;
  outline: 0;
  border-radius: 0;
  border-bottom: 1px solid
    ${({
      theme: {
        palette: { box }
      }
    }) => box.stroked.normal};
  ${({
    theme: {
      typography: { h4 }
    }
  }): CSSObject => ({
    fontSize: h4.size,
    fontWeight: h4.weight.bold,
    letterSpacing: h4.letterSpacing
  })};
  background-color: ${({
    theme: {
      palette: { background }
    }
  }) => background.bg};
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

export default StorageBoardEditSubjectInput;
