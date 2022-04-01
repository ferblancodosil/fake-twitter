import { PrismaClient } from '@prisma/client';

export const graphqlEndpoint = '/api/graphql';

export const prisma = new PrismaClient();
