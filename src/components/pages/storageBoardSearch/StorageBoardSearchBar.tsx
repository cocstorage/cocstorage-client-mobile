import { ChangeEvent, useEffect, useRef, useState, useTransition } from 'react';

import { useRouter } from 'next/router';

import { Box, TextBar } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import styled, { CSSObject } from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { fetchStorageBoards } from '@api/v1/storage-boards';
import queryKeys from '@constants/queryKeys';
import useScrollTrigger from '@hooks/useScrollTrigger';
import {
  storageBoardsSearchParamsState,
  storageBoardsSearchPendingState
} from '@recoil/pages/storageBoardsSearch/atoms';

function StorageBoardSearchBar() {
  const router = useRouter();
  const { path } = router.query;

  const [params, setParams] = useRecoilState(storageBoardsSearchParamsState);
  const setPending = useSetRecoilState(storageBoardsSearchPendingState);

  const [startTransitionPending, startTransition] = useTransition();
  const [value, setValue] = useState(params.subject);

  const headerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const { triggered } = useScrollTrigger({ ref: headerRef });

  useQuery(
    queryKeys.storageBoards.storageBoardsSearchByIdWithParams(String(path), params),
    () => fetchStorageBoards(String(path), params),
    {
      enabled: !!params.subject,
      keepPreviousData: true
    }
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);

    startTransition(() => {
      setParams((prevState) => ({
        ...prevState,
        page: 1
      }));
      setPending(true);
    });
  };

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setPending(false);

      if (!startTransitionPending) {
        setParams((prevState) => ({
          ...prevState,
          subject: value
        }));
      }
    }, 500);
  }, [setParams, setPending, startTransitionPending, value]);

  return (
    <Box
      ref={headerRef}
      component="header"
      customStyle={{
        minHeight: 73
      }}
    >
      <StyledStorageBoardSearchBar triggered={triggered}>
        <TextBar
          fullWidth
          size="xBig"
          startIcon={<Icon name="SearchOutlined" width={20} height={20} />}
          onChange={handleChange}
          value={value || ''}
          autoFocus={!value}
          placeholder="검색어를 입력해 주세요."
        />
      </StyledStorageBoardSearchBar>
    </Box>
  );
}

const StyledStorageBoardSearchBar = styled.div<{ triggered: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  border-bottom: 1px solid transparent;
  z-index: 2;

  background-color: ${({
    theme: {
      palette: { background }
    }
  }) => background.bg};
  ${({
    theme: {
      palette: { box }
    },
    triggered
  }): CSSObject =>
    triggered
      ? {
          borderBottomColor: box.stroked.normal
        }
      : {}};
`;

export default StorageBoardSearchBar;
