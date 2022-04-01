import { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { usePublishMutation } from '../../generated/graphql';

import { wrapper, input, button } from './styles';

type Props = {};

export const NewPost = ({ ...props }: Props) => {
  const [publishMutation] = usePublishMutation();
  const [message, setMessage] = useState('');
  const clickPublish = useCallback(() => {
    publishMutation({ variables: { message } });
    setMessage('');
  }, [message, publishMutation]);

  return (
    <>
      <div css={wrapper}>
        <TextInput value={message} onChange={setMessage} css={input} />
        <Button variant="primary" onClick={clickPublish} css={button}>
          <FormattedMessage id="newpost.publish" />
        </Button>
      </div>
    </>
  );
};
