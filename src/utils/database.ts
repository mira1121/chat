import { PrismaClient } from "@prisma/client";

var prisma: PrismaClient<{
  omit: { user: { password: true } };
}>;

export const InitDatabase = async () => {
  prisma = new PrismaClient({
    omit: {
      user: {
        password: true,
      },
    },
  });
};

export { prisma };
