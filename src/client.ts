import { createTRPCClient } from "@trpc/client";
import { getSession, GetSessionParams } from "next-auth/react";
import { AppRouter } from "./server";

export const getServerClient = async (ctx: GetSessionParams) => {
  const session = await getSession(ctx);

  return createTRPCClient<AppRouter>({
    url: "http://localhost:3000/api/trpc",
    headers: {
      "x-trpc-username": String(session?.username ?? ""),
    },
  });
};
