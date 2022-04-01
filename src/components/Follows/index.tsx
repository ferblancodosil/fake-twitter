import { MouseEvent } from 'react';
import { FormattedMessage } from 'react-intl';

import { User } from '../../generated/graphql';
import { Messages } from '../../modules/intl';

import { item, tag } from './styles';

type Props = {
  users?: User[];
  btnmsg: Messages;
  onClickUser?: (value: User) => void;
  onClickBtn?: (value: User) => void;
};

export const Follows = ({
  users,
  btnmsg,
  onClickUser,
  onClickBtn: onClickBtnParam,
  ...props
}: Props) => {
  const onClick = (e: MouseEvent, user: User) => {
    if (onClickBtnParam) {
      e.stopPropagation();
      onClickBtnParam(user);
    }
  };
  return (
    <>
      {!!users && (
        <>
          {users.map((user) => (
            <div key={user.id} css={item} onClick={() => onClickUser && onClickUser(user)}>
              {user.nickname}
              <span css={tag} onClick={(e) => onClick(e, user)}>
                <FormattedMessage id={btnmsg} />
              </span>
            </div>
          ))}
        </>
      )}
      {(!users || users.length === 0) && (
        <>
          <div>
            <FormattedMessage id={'timeline.nodata'} />
          </div>
        </>
      )}
    </>
  );
};
