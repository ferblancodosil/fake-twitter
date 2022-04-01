import { AuthenticationError, UserInputError } from 'apollo-server';
import { extendType, nonNull } from 'nexus';

import { prisma } from '../env_server';

export const FollowsMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('follow', {
      type: nonNull('User'),
      args: { userId: nonNull('String') },
      async resolve(source, args, ctx, info) {
        if (!ctx.user) {
          throw new AuthenticationError('');
        }

        const followUser = !args.userId
          ? null
          : await prisma.user.findUnique({ where: { id: args.userId } });
        if (!followUser) {
          throw new UserInputError('"user" cannot found');
        }
        const isFollowing = await ctx.prisma.follow.findUnique({
          where: {
            userId_followedId: {
              userId: ctx.user.id,
              followedId: followUser.id,
            },
          },
        });
        if (!isFollowing) {
          await ctx.prisma.follow.create({
            data: {
              userId: ctx.user.id,
              followedId: followUser.id,
            },
          });
        } else {
          await ctx.prisma.follow.delete({
            where: {
              userId_followedId: {
                userId: ctx.user.id,
                followedId: followUser.id,
              },
            },
          });
        }
        return await prisma.user.findUnique({ where: { id: args.userId }, rejectOnNotFound: true });
      },
    });
  },
});
