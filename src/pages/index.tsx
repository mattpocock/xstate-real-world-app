import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerClient } from "../client";

const HomePage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return (
    <div>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const client = await getServerClient(ctx);

  const result = await client.query("getLoggedInUser");

  return {
    props: {
      user: result,
    },
  };
};

export default HomePage;
