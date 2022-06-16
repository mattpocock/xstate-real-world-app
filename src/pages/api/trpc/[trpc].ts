import * as trpcNext from "@trpc/server/adapters/next";
import { getSession } from "next-auth/react";
import { appRouter } from "../../../server";

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: async (arg) => {
    const username = arg.req.headers["x-trpc-username"] as string;
    return {
      username,
    };
  },
});
