const User = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });
        console.log(userData);
        console.log(context.user);
        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    us: async (parent, args) => {
      const userData = await User.find();
      return userData;
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const login = await User.findOne({ email });
      // console.log(login)
      if (!login) {
        throw new AuthenticationError("Incorrect email/password");
      }
      const correctPassword = await login.isCorrectPassword(password);
      // console.log(correctPassword)

      if (!correctPassword) {
        throw new AuthenticationError("Incorrect email/password");
      }
      const token = signToken(login);
      return { token, login };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeBook: async (parent, args, context) => {
      if (context.user) {
        console.log(context.user);
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: args.bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
