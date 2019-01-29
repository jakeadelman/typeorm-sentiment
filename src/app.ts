import express from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";
import { GraphQLServer } from "graphql-yoga";
import session from "express-session";
import { redis } from "./redis";
import connectRedis from "connect-redis";

import resolvers from "./resolvers/merged-resolvers";

const cors = require("cors");
createConnection().then(connection => {
  const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers,
    context: ({ request, response }) => ({
      redis,
      url: request.protocol + "://" + request.get("host"),
      session: request.session,
      response
    })
  });

  // console.log(server.context);

  const RedisStore = connectRedis(session);

  const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000"
  };

  server.express.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  server.express.use(cors(corsOptions));
  server.express.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "qid",
      secret: "random",
      resave: true,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 100000
      }
    })
  );

  // const opts = {
  //   port: 4000,
  //   cors: {
  //     credentials: true,
  //     origin: ["http://localhost:3000"] // your frontend url.
  //   }
  // };

  server.start(opts => console.log(`Server is running on localhost:4000`));
});
