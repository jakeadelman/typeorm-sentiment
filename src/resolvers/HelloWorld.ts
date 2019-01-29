import { GQL } from "../types/schema";
import { ResolverMap } from "../types/graphql-utils";

const helloWorldResolver: ResolverMap = {
  Query: {
    hello: (_: any, { name }: GQL.IHelloOnQueryArguments) =>
      `Hello ${name || "World"}`
  }
  //   Mutation: {
  //       register; {_, {}}
  //   }
};

export default helloWorldResolver;
