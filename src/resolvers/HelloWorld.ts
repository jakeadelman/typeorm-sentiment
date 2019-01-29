import { GQL } from "../types/schema";
import { ResolverMap } from "../types/graphql-utils";

const helloWorldResolver: ResolverMap = {
  Query: {
    hello: (_: any, { name }: GQL.IHelloOnQueryArguments, context) => {
      // console.log((context.session as any).userId);
      // console.log(context.redis.return);
      // response.set("heady", "sldkjf");
      // console.log(response);
      context.response.header(
        "Access-Control-Allow-Origin",
        "http://localhost:3000"
      );

      if (context.session.userId) {
        return `Hello ${name || "World"}`;
      } else {
        return "not hello world";
      }
    }
  }
  //   Mutation: {
  //       register; {_, {}}
  //   }
};

export default helloWorldResolver;
