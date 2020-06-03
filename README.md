# MERN Boilerplate (Counter App)

This is a MERN boilerplate project that implements a realtime counter application with authentication

## Technologies

- [MongoDB & Mongoose](https://mongoosejs.com/) for the database
- [Node & Express](http://expressjs.com/) for the backend
- [React](https://reactjs.org/docs/create-a-new-react-app.html) for the frontend
- [React Router](https://reacttraining.com/react-router/) for the frontend routing
- [Sendgid](https://github.com/sendgrid/sendgrid-nodejs) for email service
- [Socket.io](https://socket.io/) for realtime events
- [Json Web Tokens](https://github.com/auth0/node-jsonwebtoken) for authentication
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) for hashing the user passwords
- [Redux](https://react-redux.js.org/) for application state
- [Formik](https://jaredpalmer.com/formik/) for forms
- [React Bootstrap](https://react-bootstrap.github.io/) for styles
- [Material UI](https://material-ui.com/) for styles (pagination)

## Features

- [x] Login and Signup (email & password)
- [x] Forgot Password
- [x] Authenticated Routes
- [x] Realtime counter updates
- [x] History paginated logs
- [ ] Google OAuth

## Running Locally

### Configuring environment variables

- Rename client's [.env-sample](https://github.com/smfils1/mern-boilerplate/blob/master/client/.env-sample) to `.env`
- Rename server's [.env-sample](https://github.com/smfils1/mern-boilerplate/blob/master/server/.env-sample) to `.env`
- Fill in the environment variable values in both `.env` files

### Starting the App

- `npm install` to install all dependencies
- `npm run dev` to run both client & backend
- `cd server && npm run server` to run only backend
- `cd client && npm start` to run only client
