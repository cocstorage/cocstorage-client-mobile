import { PropsWithChildren, ReactElement, useEffect } from 'react';

import styled, { CSSObject } from '@emotion/styled';

interface GeneralTemplateProps {
  header?: ReactElement;
  footer?: ReactElement;
  disableFlexible?: boolean;
  disablePadding?: boolean;
}

function GeneralTemplate({
  children,
  header,
  footer,
  disableFlexible = true,
  disablePadding
}: PropsWithChildren<GeneralTemplateProps>) {
  useEffect(() => {
    if (disableFlexible) document.body.className = 'disable-flexible';

    return () => {
      if (disableFlexible) document.body.removeAttribute('class');
    };
  }, [disableFlexible]);

  return (
    <StyledGeneralTemplate disableFlexible={disableFlexible}>
      {header}
      <Content disableFlexible={disableFlexible} disablePadding={disablePadding}>
        {children}
      </Content>
      {footer}
    </StyledGeneralTemplate>
  );
}

const StyledGeneralTemplate = styled.div<Pick<GeneralTemplateProps, 'disableFlexible'>>`
  display: flex;
  flex-direction: column;
  ${({ disableFlexible }): CSSObject =>
    !disableFlexible
      ? {
          height: '100%'
        }
      : {}};
`;

const Content = styled.main<Pick<GeneralTemplateProps, 'disableFlexible' | 'disablePadding'>>`
  ${({ disableFlexible }): CSSObject =>
    !disableFlexible
      ? {
          flex: 1,
          overflowY: 'auto'
        }
      : {}}
  ${({ disablePadding }): CSSObject =>
    !disablePadding
      ? {
          padding: '0 20px'
        }
      : {}}
`;

export default GeneralTemplate;
