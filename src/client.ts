import { createTRPCClient } from "@trpc/client";
import { getSession, GetSessionParams, useSession } from "next-auth/react";
import { useMemo } from "react";
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

export const useClient = () => {
  const session = useSession();

  return useMemo(
    () =>
      createTRPCClient<AppRouter>({
        url: "http://localhost:3000/api/trpc",
        headers: {
          "x-trpc-username": String(session?.data?.username ?? ""),
        },
      }),
    [session.data?.username],
  );
};
