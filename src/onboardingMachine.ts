import { createMachine } from "xstate";

/**
 * What is your email address?
 *
 * How would you prefer to be contacted?
 */
export const onboardingMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgHcwAbTAe1TABUaANABXQE8BiAOQFFmDRKAAONWLgAuuGvmEgAHogC0AZgAMADhIB2VQEYAnKtUA2TQBYArPv0AmADQgOK-Zu2adp9bZ2HNZqoBAL7BTmhYeISktPiSWJKsAE5gAGZgKfiYcFwAygCqAEIAsgCSQkggYhLSsvJKCDok-uqqFu46tp6mqk4uCMpuHl4++n4BPSFhIBE4BMQksGCS0vhQ+UtJAIKwAMJ0IpTLkADy+ABGNOhJEARQXBCyYCQEAG40ANbPs1ELSyt3DYZHb7VCHY4QM6Xa63NYIN40TDoWr4ADa6gAuvJqlIZHJKg12hYSLZ9OotDoLIYqaZTH1XO4SN1RuNAlNwhg5tFFstVutNiCDkdJKcLlcbncuBkkjQkiRDsjUrLUCQfvNSP8+UDtnshRCoeLYVB4fh3kiUeisZUcSj6io7PpiRZ1OZaforIYdOSAvSBu0SBo-J7VIZjIYbC7QhzIuqSABXfAffA0Mj4PhJGVJE6YTBxjOQLiFLa7ADS2PEuLqBJUJmJpk9lkM+gM1isvuUFjsJE7bS8FjGdisdipoWmyYgcHkau5FGodEYLHY-VEFdt1YGVnUhhIpjsQSstKp6gs1h07aMxM8VisXjsobstNMFijM05vxisnimESKXSmWy8DWqueJ2gMDpWLolLeuoNg6HeVgWOe1JMjo17Ut6fZwS+05-LygICrqYLCqK0ISms5Y1CB65dCSVgBBYT4Hpodh2F47YseoAZ0dYFKejY+imNhb6xgmSYpmmGaytmub5hAFGVvioANModiaBBN71nBAken4J6+p6JAwdSgZtMx9iCdMOEfkRxzyWuSmIJoAkBl6ZI0h6JiaEhl6oR6zoUk+WGWcJ0R2VRDkbiYO57mph6GMeDHscYAasR6fn+E2zajsEQA */
  createMachine({
    tsTypes: {} as import("./onboardingMachine.typegen").Typegen0,
    schema: {
      events: {} as
        | {
            type: "NEXT";
          }
        | {
            type: "BACK";
          }
        | {
            type: "SUBMIT";
            contactPreference: "email" | "phone";
          },
      services: {} as {
        setUserAsCompletedOnboarding: {
          data: void;
        };
      },
    },
    id: "(machine)",
    initial: "welcomeToXPay",
    states: {
      welcomeToXPay: {
        on: {
          NEXT: {
            target: "contactPreferences",
          },
        },
      },
      contactPreferences: {
        on: {
          SUBMIT: {
            target: "settingUserAsCompletedOnboarding",
          },
        },
      },
      settingUserAsCompletedOnboarding: {
        invoke: {
          src: "setUserAsCompletedOnboarding",
          onDone: [
            {
              target: "complete",
            },
          ],
          onError: [
            {
              target: "unknownErrorOccurred",
            },
          ],
        },
        tags: "pending",
      },
      unknownErrorOccurred: {
        on: {
          BACK: {
            target: "contactPreferences",
          },
        },
      },
      complete: {
        on: {
          NEXT: {
            actions: "refreshPage",
          },
        },
      },
    },
  });
