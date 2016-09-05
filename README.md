# KBjs

> A simple Knowledge Base CMS written in JavaScript.

## Requirements

KBjs doesn't require much

* Node 4.x
* MongoDB

There's also a `docker-compose.yml` which you can use to start a MongoDB instance using Docker.

## Install

KBjs is split into two main parts: Client, and Server. You'll have to build the client to use it.

### Client

It's pretty easy:

```shell
cd client/
npm install
npm run build
```

The built client will be placed in `server/public`.

### Server

Things are similar to the client, except you don't have to build anything. Fire up a terminal emulator and…

```shell
cd server/
npm install
npm start
```

That's it. The server should be up and running and listening to port `3030`.

## Production

Building the client and starting the server using [PM2](https://github.com/Unitech/pm2) in production environments is as easy as opening a terminal and running…

```shell
npm start
```

This will build the client and run the server in cluster mode to take advantage of all your CPU cores. Please note that you need to install dependencies first, so…

```shell
cd client/
npm install
cd ../server
npm install
```

Here's the full list of scripts to manage your KBjs instance:

```shell
npm start       # Build the client and starts the server
npm run restart # Rebuilds and restarts
npm run stop    # Stops all Node processes for KBjs
npm run deploy  # Pulls changes from Git and restarts all processes
```
