# CRUD API

## Description

Simple CRUD API using in-memory database underneath, without frameworks. [Task link](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

### Technical requirements

- Task can be implemented on Javascript or Typescript
- Only `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `ts-node-dev`, `eslint` and its plugins, `webpack-cli`, `webpack` and its plugins and loaders, `prettier`, `uuid`, `@types/*` as well as libraries used for testing are allowed
- Use 24.x.x version (24.14.0 or upper) of Node.js
- Prefer asynchronous API whenever possible

### Getting Started

#### 1. Clone the repository

```bash
git clone https://github.com/Sepulator/crud-api.git
```

#### 2. Switch to the `develop` branch

```bash
git switch develop
```

#### 3. Run the `npm install`

```bash
npm install
```

#### 4. Start the server in dev mode with nodemon

```bash
npm run start:dev
```

### Available scripts

#### To build and start production server

```bash
npm run start:prod
```

#### Start the server in multi mode with load balancer

```bash
npm run start:multi
```

#### Run tests

```bash
npm run test
```

The server will be listening on port 4000 (create `.env` to change server port).
In multi mode, the balancer will listen on 4000 and worker servers will be accessible on 4001, 4002, 4003 ... (depending on the .env file configuration)
The address will be like <http://localhost:4000/api/users>

To get all users, please, don't use link `http://localhost:4000/api/users/`, valid will be only the `http://localhost:4000/api/users`
last slash in address will point to get empty user and not all users.

Cheers!
