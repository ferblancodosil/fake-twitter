import path from 'path';

import { makeSchema } from 'nexus';

import * as scalars from './scalars';
import * as user from './User';
import * as me from './MeQuery';
import * as signIn from './SignInMutation';
import * as post from './Post';
import * as timeline from './TimelineQuery';
import * as publish from './PublishPostMutation';
import * as postQuery from './PostQuery';
import * as following from './Follows';
import * as follows from './FollowsMutation';

export const schema = makeSchema({
  types: { ...scalars, ...user, ...me, ...signIn, ...post, ...timeline, ...publish, ...postQuery, ...following, ...follows },
  contextType: {
    module: path.join(__dirname, 'context.ts'),
    export: 'MyContextType',
  },
  outputs: {
    typegen: path.join(__dirname, '..', '..', 'generated', 'nexus-typegen.d.ts'),
    schema: path.join(__dirname, '..', '..', 'generated', 'schema.graphql'),
  },
  prettierConfig: path.join(__dirname, '..', '..', '..', '.prettierrc.json'),
});
