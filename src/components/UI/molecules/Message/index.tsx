import { HTMLAttributes } from 'react';

import { Button, Flexbox, Icon, Tag, Typography } from 'cocstorage-ui';

export interface MessageProps extends HTMLAttributes<HTMLDivElement> {
  code?: string;
  title: string;
  message?: string;
  buttonText?: string;
  hideButton?: boolean;
  onClose?: () => void;
}

function Message({
  code,
  title,
  message,
  buttonText = '확인',
  hideButton = false,
  onClose,
  ...props
}: MessageProps) {
  return (
    <Flexbox direction="vertical" alignment="center" gap={30} {...props}>
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
