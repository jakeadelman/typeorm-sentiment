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
      session: request.session
    })
  });

  console.log(server.context);

  const RedisStore = connectRedis(session);

  const corsOptions = {
    credentials: true,
    // origin: false
    origin: "http://localhost:3000"
  };

  server.express.use(cors(corsOptions));
  server.express.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "qid",
      secret: "random",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 100000
      }
    })
  );

  server.start(() => console.log("Server is running on localhost:4000"));
});
