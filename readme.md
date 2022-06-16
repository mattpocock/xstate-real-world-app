# XState Real World App

Introducing `XPay` - the most robust payments app you've ever used, built on state machines. The tech I've used is:

- [XState](https://xstate.js.org/docs/) - a library for creating statecharts
- [Next.js](https://nextjs.org/) - a React meta-framework for building apps
- [TRPC](http://trpc.io/) - a library for building typesafe API's
- [Prisma](https://www.prisma.io/docs/) - a typesafe ORM
- [Tailwind CSS](https://tailwindcss.com/) - for styling

## Getting started

1. Run `yarn` to install all the dependencies. After it's installed, it'll automatically set up a local `sqlite` database.

2. Run `yarn dev` to see the app on `localhost:3000`

3. You'll be directed to log in. You can log in with _any_ username, and it'll give you a new entry in the database as if you had already signed up.
