const User = require('../models')

const resolvers = {
  Query: {
    me: async (parent, args) => {
      const userData = await User.findOne({_id: args._id})
      return userData
    },
    us: async (parent, args) => {
      const userData = await User.find()
      return userData
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = User.create(args)
      return user
    }
  }
}

module.exports = resolvers