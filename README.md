# crud-api
Simple CRUD API using in-memory database underneath, without frameworks.

All dependencies are in accordance with the task requirements, for build purpose used `webpack`
Steps to review work:
- Clone the repository
- Switch to the `develop` branch
- Do the `npm install`
- to start the server in dev mode with nodemon: `npm run start:dev`
- to build and start production server: `npm run start:prod`
- to start the server in multi mode with load balancer: `npm run start:multi`
- to run tests: `npm run test`

The server will be listening on port 5000 (create `.env` to change server port).
In multi mode, the balancer will listen on 5000 and worker servers will be accessible on 5001, 5002, 5003 ... (depending on the .env file configuration)
The address will be like http://localhost:5000/api/users
There is no frontend with UI, please use Postman for testing, see the assignment.md

To get all users, please, don't use link `http://localhost:5000/api/users/`, valid will be `http://localhost:5000/api/users` last slash in address will point to get empty user not all users.
Cheers!

