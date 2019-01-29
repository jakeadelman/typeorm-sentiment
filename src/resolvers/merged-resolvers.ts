import { mergeResolvers } from "merge-graphql-schemas";
import helloWorldResolver from "./HelloWorld";
import registerResolver from "./Register";
import loginResolver from "./Login";

const resolversArray = [loginResolver, registerResolver, helloWorldResolver];
const resolvers = mergeResolvers(resolversArray);

export default resolvers;
