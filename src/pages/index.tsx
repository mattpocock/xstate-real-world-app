import { useMachine } from "@xstate/react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { State } from "xstate";
import { getServerClient, useClient } from "../client";
import { onboardingMachine } from "../onboardingMachine";
import { REDIRECT_TO_SIGN_IN_CONFIG } from "../utils";

const HomePage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return (
    <div>
      {!props.user?.hasCompletedOnboarding && <Onboarding></Onboarding>}
    </div>
  );
};

const Onboarding = () => {
  const client = useClient();
  const [state, send] = useMachine(onboardingMachine, {
    services: {
      setUserAsCompletedOnboarding: async (context, event) => {
        await client.mutation("markUserAsCompletedOnboarding", {
          contactPreference: event.contactPreference,
        });
      },
    },
    actions: {
      refreshPage: () => {
        window.location.reload();
      },
    },
  });

  const contactPreferenceForm = useForm<{
    contactPreference: "email" | "phone";
  }>({
    defaultValues: {
      contactPreference: "email",
    },
  });

  if (state.matches("welcomeToXPay")) {
    return (
      <div className="">
        <h1 className="mb-8 font-semibold tracking-tight text-center text-gray-900 text-7xl">
          Welcome to XPay
        </h1>
        <p className="max-w-3xl mx-auto mb-8 text-xl text-center text-gray-700">
          The most robust payment app on the market, driven by state machines.
        </p>
        <button
          className="block px-6 py-2 mx-auto text-white bg-gray-900 rounded-lg"
          onClick={() => {
            send("NEXT");
          }}
        >
          Get Started
        </button>
      </div>
    );
  }

  if (state.matches("contactPreferences")) {
    return (
      <form
        className="space-y-8"
        onSubmit={contactPreferenceForm.handleSubmit((values) => {
          send({
            type: "SUBMIT",
            contactPreference: values.contactPreference,
          });
        })}
      >
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
          Contact preferences
        </h1>
        <p className="max-w-3xl text-xl text-gray-700">
          How would you like to be contacted?
        </p>
        <fieldset className="space-y-6">
          <label className="flex items-center space-x-4 text-xl text-gray-700">
            <input
              className="w-8 h-8"
              type="radio"
              {...contactPreferenceForm.register("contactPreference")}
              value="email"
            />
            <span>Email</span>
          </label>
          <label className="flex items-center space-x-4 text-xl text-gray-700">
            <input
              className="w-8 h-8"
              type="radio"
              {...contactPreferenceForm.register("contactPreference")}
              value="phone"
            />
            <span>Phone</span>
          </label>
        </fieldset>
        <div>
          <button className="px-6 py-2 text-white bg-gray-900 rounded-lg">
            Submit
          </button>
        </div>
      </form>
    );
  }

  if (state.matches("complete")) {
    return (
      <div className="space-y-8">
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
          Onboarding complete
        </h1>
        <p className="max-w-3xl text-xl text-gray-700">
          Time to get paying that sweet, sweet money.
        </p>
        <button
          className="px-6 py-2 text-white bg-gray-900 rounded-lg"
          onClick={() => {
            send("NEXT");
          }}
        >
          Get started
        </button>
      </div>
    );
  }

  return null;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);

  if (!session) {
    return REDIRECT_TO_SIGN_IN_CONFIG;
  }

  const client = await getServerClient(ctx);

  const result = await client.query("getLoggedInUser");

  return {
    props: {
      user: result,
    },
  };
};

export default HomePage;
