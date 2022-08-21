import { HTMLAttributes, useRef, useState } from 'react';

import { Box, CSSValue, CustomStyle, Icon } from 'cocstorage-ui';

import { Image, ImageWrapper, RatioImageInner, RatioImageWrapper } from './RatioImage.styles';

export interface RatioImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  width?: CSSValue;
  height?: CSSValue;
  ratio?: '1:1' | '4:3' | '16:9';
  round?: CSSValue;
  disableAspectRatio?: boolean;
  defaultIcon?: 'image' | 'user';
  defaultIconWidth?: number;
  defaultIconHeight?: number;
  customStyle?: CustomStyle;
}

function RatioImage({
  src,
  alt,
  width = '100%',
  height,
  ratio = '1:1',
  round = 6,
  disableAspectRatio = false,
  defaultIcon = 'image',
  defaultIconWidth = 24,
  defaultIconHeight = 24,
  customStyle,
  ...props
}: RatioImageProps) {
  const customStyleRef = useRef<CustomStyle>({
    position: 'absolute',
    top: 0,
    left: 0,
    maxWidth: '100%',
    height: 'auto',
    transform: 'translate(-50%, -50%)'
  });

  const [loadFailed, setLoadFailed] = useState<boolean>(false);

  const handleError = () => setLoadFailed(true);

  if (disableAspectRatio) {
    return (
      <ImageWrapper round={round} {...props} customStyle={{ width, height }}>
        {!loadFailed && src && (
          <Image width={width} height={height} src={src} alt={alt} onError={handleError} />
        )}
        {(!src || loadFailed) && (
          <Icon
            name={defaultIcon === 'image' ? 'ImageOutlined' : 'UserFilled'}
            width={defaultIconWidth}
            height={defaultIconHeight}
          />
        )}
      </ImageWrapper>
    );
  }

  return (
    <Box customStyle={{ width, height }}>
      <RatioImageWrapper ratio={ratio} round={round} {...props} css={customStyle}>
        <RatioImageInner>
          {!loadFailed && src && (
            <Image
              width={width}
              height={height}
              src={src}
              alt={alt}
              onError={handleError}
              css={customStyleRef.current}
            />
          )}
          {(!src || loadFailed) && (
            <Icon
              name={defaultIcon === 'image' ? 'ImageOutlined' : 'UserFilled'}
              width={defaultIconWidth}
              height={defaultIconHeight}
              customStyle={customStyleRef.current}
            />
          )}
        </RatioImageInner>
      </RatioImageWrapper>
    </Box>
  );
}

export default RatioImage;
