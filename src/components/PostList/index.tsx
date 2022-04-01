import { FormattedMessage } from 'react-intl';
import { useEffect } from 'react';

import { User, useTimelineQuery } from '../../generated/graphql';
import { Button } from '../../components/Button';
import { Clock } from '../../components/Clock';

import { post, header, loadMore } from './styles';

type Props = {
  filter?: User;
};

export const PostList = ({ filter, ...props }: Props) => {
  const { data, fetchMore } = useTimelineQuery({
    variables: {
      userId: filter?.id,
    },
    pollInterval: 5000,
  });

  useEffect(() => {
    fetchMore({
      variables: {
        userId: filter?.id,
      },
    });
  }, [filter, fetchMore]);

  return (
    <>
      {!!data && (
        <>
          {data.timeline.edges.map(({ node: it }) => (
            <div key={it.id} css={post}>
              <div css={header}>
                <div>{it.by.nickname}</div>
                <Clock date={it.createdAt} />
              </div>
              <div>{it.message}</div>
            </div>
          ))}
        </>
      )}
      {!!data && data.timeline.pageInfo.hasNextPage && (
        <Button
          variant="secondary"
          css={loadMore}
          onClick={() => fetchMore({ variables: { after: data.timeline.pageInfo.endCursor } })}
        >
          <FormattedMessage id="postlist.fetchMore" />
        </Button>
      )}
    </>
  );
};
