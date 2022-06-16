import { AppProps } from "next/app";
import "../globals.css";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { ReactNode } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;

const Layout = (props: { children?: ReactNode }) => {
  const session = useSession();
  return (
    <div className="border-t-4 border-t-indigo-500">
      <div className="container px-6 mx-auto">
        <nav className="flex justify-between w-full py-4">
          <h1>App</h1>
          {session.status === "unauthenticated" && (
            <button
              onClick={() => {
                signIn();
              }}
            >
              Sign in
            </button>
          )}
          {session.status === "authenticated" && (
            <button
              onClick={() => {
                signOut();
              }}
            >
              Sign out
            </button>
          )}
        </nav>
        {props.children}
      </div>
    </div>
  );
};
