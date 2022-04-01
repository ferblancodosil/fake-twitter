import { extendType, list, nonNull, objectType } from 'nexus';

import { prisma } from '../env_server';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('nickname');
  },
});

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('user', {
      type: nonNull('User'),
      args: {
        id: nonNull('ID'),
      },
      async resolve(source, args, ctx, info) {
        return await prisma.user.findUnique({
          where: { id: args.id },
          rejectOnNotFound: true,
        });
      },
    });
  },
});

export const SearchUser = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('users', {
      type: list(nonNull('User')),
      args: {
        nickname: nonNull('String'),
      },
      async resolve(source, args, ctx, info) {
        if (!args.nickname) {
          return [];
        }
        return await prisma.user.findMany({
          where: {
            nickname: {
              startsWith: args.nickname.toLowerCase(),
            },
          },
        });
      },
    });
  },
});
