# MERN Stack [YouTube Clone](https://smfils1-youtube-clone.herokuapp.com)

This is a YouTube Clone that implements the main features of [YouTube](https://www.youtube.com/) **solely intended for educational purposes** and is created under **fair use**.

##### \* **Video Uploads are limited to 25 MB.**

## Technologies

- [MongoDB & Mongoose](https://mongoosejs.com/) for the database
- [Node & Express](http://expressjs.com/) for the backend
- [Fluent FFMPEG](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) for video proccessing
- [Google OAuth2](https://developers.google.com/identity/protocols/oauth2/web-server) for authentication
- [Google Drive API](https://developers.google.com/drive/api/v3/quickstart/nodejs) for cloud storage (services like AWS S3 and Google Cloud is recommended for production applications)
- [React](https://reactjs.org/docs/create-a-new-react-app.html) for the frontend
- [Redux](https://react-redux.js.org/) for frontend application state
- [Material UI](https://material-ui.com/) for UI

## Features

- [x] Google OAuth
- [x] Video upload, streaming, commenting, and rating
- [x] Channel subscriptions
- [x] Trending, recommended, and categorized videos
- [x] Video searching
- [ ] Pagination
- [ ] Watch history
- [ ] Video Playlist
- [ ] Updating & deleting videos
- [ ] Going live

## Running Locally

### Configuring environment variables

- Rename client's [.env-sample](https://github.com/smfils1/youtube-clone/blob/master/client/sample.env) to `.env`
- Rename server's [.env-sample](https://github.com/smfils1/youtube-clone/blob/master/server/sample.env) to `.env`
- Fill in the environment variable values in both `.env` files

### Starting the App

- `npm install` to install all dependencies
- `npm run dev` to run both client & backend in development
- `cd server && npm run server` to run only backend
- `cd client && npm start` to run only client

## Deploy to Heroku

##### The neccessary environment variables & buildpacks are defined in [app.json](https://github.com/smfils1/youtube-clone/blob/master/app.json)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
