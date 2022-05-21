import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        email
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(
    $id: ID!
    $description: String
    $title: String
    $bookId: ID
  ) {
    saveBook(
      _id: $id
      description: $description
      title: $title
      bookId: $bookId
    ) {
      username
      email
      savedBooks {
        bookId
        title
        description
      }
    }
  }
`;
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        title
        description
      }
    }
  }
`;
