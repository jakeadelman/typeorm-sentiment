import { GQL } from "../types/schema";
import { ResolverMap } from "../types/graphql-utils";
import { User } from "../entities/User";

const loginResolver: ResolverMap = {
  Mutation: {
    login: async (
      _: any,
      { email, password }: GQL.ILoginOnMutationArguments,
      { session }
    ) => {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return [
          {
            path: "email",
            message: "invalid login"
          }
        ];
      }
      let valid = user.password == password;
      if (!valid) {
        return [
          {
            path: "email",
            message: "invalid login"
          }
        ];
      }

      //login successful

      (session as any).userId = user.id;

      return null;
    }
  }
};

export default loginResolver;
