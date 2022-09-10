import { useEffect } from 'react';

import { CustomStyle } from 'cocstorage-ui';

import { StyledGoogleAdSense } from './GoogleAdSense.styles';

interface GoogleAdSenseProps {
  html: string;
  customStyle?: CustomStyle;
}

function GoogleAdSense({ html, customStyle }: GoogleAdSenseProps) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);
  // eslint-disable-next-line react/no-danger
  return <StyledGoogleAdSense dangerouslySetInnerHTML={{ __html: html }} css={customStyle} />;
}

export default GoogleAdSense;
