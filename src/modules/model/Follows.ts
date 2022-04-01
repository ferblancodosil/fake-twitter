import { extendType, list, nonNull } from 'nexus';

export const FollowingQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('following', {
      type: nonNull(list(nonNull('User'))),
      args: {},
      async resolve(source, args, ctx, info) {
        const user = await ctx.prisma.user.findUnique({
          rejectOnNotFound: true,
          where: { id: ctx.user?.id },
          include: { following: { include: { followedUser: false } } },
        });

        return await ctx.prisma.user.findMany({
          where: { id: { in: user.following.map((it) => it.followedId) } },
        });
      },
    });
  },
});

export const FollowQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('followers', {
      type: nonNull(list(nonNull('User'))),
      args: {},
      async resolve(source, args, ctx, info) {
        const user = await ctx.prisma.user.findUnique({
          rejectOnNotFound: true,
          where: { id: ctx.user?.id },
          include: { followers: true },
        });

        return await ctx.prisma.user.findMany({
          where: { id: { in: user.followers.map((it) => it.followedId) } },
        });
      },
    });
  },
});
