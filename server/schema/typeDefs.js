const { gql } = require("apollo-server-express");

const typeDefs = gql`

type Book {
  bookId: ID,
  authors: [String]
  description: String
  title: String
  link: String
}

input bookInput {
  authors: [String]
  description: String
  title: String
  imagePath: String
  link: String
}

type User {
  _id: ID
  username: String
  email: String
  bookCount: Int
  savedBooks: [Book]
}

type Query {
  me (_id: ID!): User
  us: [User]
}

type Mutation {
  login(email: String!, password: String!) : Auth
  addUser(username:String!, email: String!, password: String!): User
  saveBook(_id: ID!, input: bookInput) : User
  removeBook(_id: ID!) : User
}

type Auth {
  token: ID!
  user: User
}
`

module.exports = typeDefs