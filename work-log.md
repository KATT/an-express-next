# Work Log

### 2024-09-01

- [x] Base project setup
- [x] installed dependencies
  - express
  - express-jwt
  - typescript
  - prisma
  - dotenv
- [x] setup prisma
- [x] setup routes for express auth
- [x] setup typescript
- [x] setup MVC structure
- [x] setup express-jwt middleware

### 2024-10-24

- [x] added clerk login and login route
- [x] added GuardedRoute for the about page
- [x] polished up the nav

### 2024-10-16

- [x] need a way to customize the font on the UserButton in the Nav
- [x] get the release builds working with the shared project in the monorepo
- [x] make sure all the dev runners working correctly together
- [x] fix the name spacing for the shared package
- [x] built a user api route to get the user information, needs pull from prisma

### 2024-10-30

- [x] find the correct way to share the user type from teh server/prisma to the front-solid
- [x] added `tsc-alias` to get the server tsc alias working for ~
- [x] dev run, build, and start in prod mode work for all packages now

### 2024-11-24

- [-] wont do - go through the sst express setup here: https://sst.dev/docs/start/aws/express
- [x] pulumi: get the local aws creds installed with `granted`

### 2025-01-22

- [x] removed sst and infra
- [x] cleaned up the tsconfig files setup
- [x] added tRpc to the server and added the client to the front-solid

### 2025-01-23

- [x] switch to @clerk/express for server
  - https://www.npmjs.com/package/@clerk/express
- [x] added @tanstack/solid-query
- [x] creat a query with trpc calls
- [x] add auth to the trpc calls and protected version which reroutes

### 2025-02-04

- [x] decided to try nextjs because the clerk+trpc+tanstack/solid-query was so complex in solid
- [x] added a nextjs app front project to the monorepo
- [x] added trpc server and client
- [x] made protected adn unprotected trpc calls
- [x] added clerk auth

### 2025-02-05

- [x] added protected and unprotected trpc procedures
- [x] added protected meta value to reroute to login if protected calls is UNAUTHORIZED
- [x] prettier the react front
- [x] realigned the trpc, FE, and BE clerk to pass auth around better
- [x] realigned the createClient for trpc to be a hook and created a TRpcProvider for it in _app.tsx
- [x] get the clerk jwt and add it into the headers of each trpc call

### 2025-02-06

- [x] currently trying to swap from session to jwt so that the server doesn't have to verify with clerk costantly
- [x] get the jwks-rsa from my clerk account site .wellknown for local verify the jwt
- [x] wired up my public key from clerk to verify tokens from client on server
- [x] get the jwt passing on the client
- [x] get the jwt verify working on the server
- [x] fixed the UNAUTHORIZED redirect to login in the TRpcProvider
- [x] polished up the Header and Nav
- [x] remove front-solid
- [x] rename the entire project `solid-express` to `next-trpc-express` and rename all mono packages
- [x] added a root format with prettier


### Backlog

- [ ] pulumi: get the express server launched into aws
- [ ] pulumi: get the front-react launched into aws
- [ ] add some real data into the prisma db for a given user.
  - [ ] use the clerk userId to look up the db User and pass that around (clerkUserId is a field)


## Ideas

- figure out nice app-loaders
- make puml diagram of the token flow to protect data server and auth
- get the server to share the types of the prisma:generate types
  - so that front-react can use the types like prisma::User from the server
- Share the prisma types from the server with the front-react through monorepo

