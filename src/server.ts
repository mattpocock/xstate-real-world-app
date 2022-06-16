import * as trpc from "@trpc/server";
import { z } from "zod";

export const appRouter = trpc.router<AppContext>().query("getLoggedInUser", {
  async resolve(req) {
    return { username: req.ctx.username };
  },
});

export type AppRouter = typeof appRouter;

export interface AppContext {
  username: string;
}
