import { HTMLAttributes } from 'react';

import { Button, CustomStyle, Flexbox, Tag, Typography } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';

export interface MessageProps extends HTMLAttributes<HTMLDivElement> {
  code?: string;
  title: string;
  message?: string;
  buttonText?: string;
  hideButton?: boolean;
  onClose?: () => void;
  customStyle?: CustomStyle;
}

function Message({
  code,
  title,
  message,
  buttonText = '확인',
  hideButton = false,
  onClose,
  customStyle,
  ...props
}: MessageProps) {
  return (
    <Flexbox direction="vertical" alignment="center" gap={30} {...props} customStyle={customStyle}>
      <Flexbox direction="vertical" alignment="center" gap={20}>
        <Icon name="InfoOutlined" width={60} height={60} />
        <Flexbox
          direction="vertical"
          alignment="center"
          gap={6}
          customStyle={{
            textAlign: 'center'
          }}
        >
          <Typography variant="h2" fontWeight="bold">
            {title}
          </Typography>
          {code && (
            <Tag variant="accent" customStyle={{ margin: '8px 0' }}>
              CODE: {code}
            </Tag>
          )}
          {message && (
            <Typography fontWeight="medium" dangerouslySetInnerHTML={{ __html: message }} />
          )}
        </Flexbox>
      </Flexbox>
      {!hideButton && <Button onClick={onClose}>{buttonText}</Button>}
    </Flexbox>
  );
}

export default Message;
