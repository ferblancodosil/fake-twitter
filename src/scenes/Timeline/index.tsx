import { FormattedMessage, useIntl } from 'react-intl';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { useAuth } from '../../modules/auth';
import { PostList } from '../../components/PostList';
import { NewPost } from '../../components/NewPost';
import { Follows } from '../../components/Follows';
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';
import {
  User,
  useFollowersMutation,
  useFollowsQuery,
  useUsersQuery,
} from '../../generated/graphql';

import {
  title,
  postlist,
  newpost,
  header,
  timeline,
  userszone,
  wrapper,
  hello,
  searcher,
} from './styles';

export const Timeline = () => {
  const { formatMessage } = useIntl();
  const { user, signOutUrl } = useAuth();
  const [user2search, setUser2Search] = useState('');
  const [user2filter, setUser2Filter] = useState<User | undefined>(undefined);
  const [followersMutation] = useFollowersMutation();
  const { data: follows, fetchMore: fetchMoreFollows } = useFollowsQuery({});
  const { data: usersFound, fetchMore: fetchMoreUsers } = useUsersQuery({
    variables: { nickname: user2search },
  });

  const filterUser = useCallback((user: User) => {
    setUser2Filter(user);
  }, []);

  const followNow = async (user: User) => {
    await followersMutation({ variables: { userId: user.id } });
    fetchMoreFollows({
      variables: { nickname: user2search },
    });
    setUser2Filter(undefined);
    setUser2Search('');
  };

  useEffect(() => {
    fetchMoreUsers({});
  }, [user2search, fetchMoreUsers]);

  return (
    <>
      <div css={header}>
        <div>
          <Image src="/logo.svg" width={15} height={15} alt="Logo" />
          <span css={[hello, title]}>
            <FormattedMessage id="timeline.hello" /> {user?.nickname}
          </span>
        </div>
        <a href={signOutUrl}>
          <FormattedMessage id="timeline.signout" />
        </a>
      </div>
      <div css={wrapper}>
        <div css={userszone}>
          <div css={title}>
            <FormattedMessage id="timeline.following.title" />
          </div>
          <Follows
            users={follows?.following}
            btnmsg="timeline.following.btn"
            onClickUser={(user) => filterUser(user)}
            onClickBtn={(user) => followNow(user)}
          />
          <div css={title}>
            <FormattedMessage id="timeline.follow.title" />
          </div>
          <Follows
            users={follows?.followers}
            btnmsg="timeline.follow.btn"
            onClickUser={(user) => filterUser(user)}
            onClickBtn={(user) => followNow(user)}
          />
          <div css={title}>
            <FormattedMessage id="timeline.usersfound.title" />
          </div>
          <TextInput
            value={user2search}
            onChange={setUser2Search}
            placeholder={formatMessage({ id: 'timeline.searchuser.title' })}
            css={searcher}
          />

          {usersFound?.users.length !== 0 && (
            <>
              <Follows
                users={usersFound?.users}
                btnmsg="timeline.usersfound.btn"
                onClickUser={(user) => filterUser(user)}
              />
            </>
          )}
        </div>
        <div css={timeline}>
          <div>
            <div css={title}>
              <FormattedMessage id="timeline.newpost.title" />
            </div>
            <div css={newpost}>
              <NewPost />
            </div>
            <div css={title}>
              <FormattedMessage id="timeline.postlist.title" />
            </div>
            <div css={postlist}>
              {user2filter && user2filter.nickname && (
                <div onClick={() => setUser2Filter(undefined)}>
                  <Image src="/filter.svg" width={15} height={15} alt="Filter" />
                  {user2filter.nickname}
                  <Button variant="primary" size={'base'} onClick={() => followNow(user2filter)}>
                    {follows?.following.find((user) => user.nickname === user2filter.nickname) ? (
                      <FormattedMessage id="timeline.following.btn" />
                    ) : (
                      <FormattedMessage id="timeline.follow.btn" />
                    )}
                  </Button>
                </div>
              )}
              <PostList filter={user2filter} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
