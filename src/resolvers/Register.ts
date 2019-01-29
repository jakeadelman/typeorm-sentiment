import { GQL } from "../types/schema";
import { ResolverMap } from "../types/graphql-utils";
import { User } from "../entities/User";

const registerResolver: ResolverMap = {
  Mutation: {
    register: async (
      _: any,
      { email, password }: GQL.IRegisterOnMutationArguments
    ) => {
      const user = User.create({
        email,
        password
      });
      await user.save();

      return true;
    }
  }
};

export default registerResolver;
