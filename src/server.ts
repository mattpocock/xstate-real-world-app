import * as trpc from "@trpc/server";
import { z } from "zod";
import { prismaClient } from "./prisma";

export const appRouter = trpc
  .router<AppContext>()
  .query("getLoggedInUser", {
    async resolve(req) {
      const user = await prismaClient.user.findUnique({
        where: {
          username: req.ctx.username,
        },
      });

      return user;
    },
  })
  .mutation("markUserAsCompletedOnboarding", {
    input: z.object({
      contactPreference: z.union([z.literal("email"), z.literal("phone")]),
    }),
    async resolve(req) {
      const user = await prismaClient.user.update({
        where: {
          username: req.ctx.username,
        },
        data: {
          hasCompletedOnboarding: true,
          contactPreference: req.input.contactPreference,
        },
      });

      return user;
    },
  });

export type AppRouter = typeof appRouter;

export interface AppContext {
  username: string;
}
