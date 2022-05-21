const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    bookId: ID
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
    me: User
    us: [User]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(
      _id: ID!
      authors: [String]
      description: String
      title: String
      bookId: ID
    ): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
