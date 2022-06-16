import { AppProps } from "next/app";
import "../globals.css";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { ReactNode } from "react";
import Link from "next/link";

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
    <div className="">
      <nav className="bg-gray-100 border-b border-gray-200">
        <div className="container flex justify-between px-6 py-4 mx-auto">
          <Link href={"/"} passHref>
            <a className="text-xl font-light tracking-widest text-gray-600 uppercase">
              XPay
            </a>
          </Link>
          {session.status === "unauthenticated" && (
            <button
              className="px-3 py-1 text-white bg-gray-900 rounded-lg"
              onClick={() => {
                signIn();
              }}
            >
              Sign in
            </button>
          )}
          {session.status === "authenticated" && (
            <button
              className="px-3 py-1 text-white bg-gray-900 rounded-lg"
              onClick={() => {
                signOut();
              }}
            >
              Sign out
            </button>
          )}
        </div>
      </nav>
      <div className="container px-6 py-10 mx-auto">{props.children}</div>
    </div>
  );
};
