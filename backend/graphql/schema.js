const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Todo {
        _id: ID!
        title: String!
        imageUrl: String!
        textError: String!
        textFix: String!
        textCode: String!
        creator: User
        createdAt: String!
        updatedAt: String!
    }

    type User {
        _id: ID!
        email: String!
        password: String!
        name: String!
        todos: [Todo!]!
    }

    type AuthData {
        token: String!
        userId: String!
    }

    input TodoInput {
        title: String!
        imageUrl: String!
        textError: String!
        textFix: String!
        textCode: String!
    }

    input UserInput {
        email: String!
        password: String!
        name: String!
    }

    type RootMutation {
        createTodo(todoInput: TodoInput!): Todo!
        createUser(userInput: UserInput!): User!
        updateTodo(id: ID! , todoInput: TodoInput!): Todo!
        deleteTodo(id: ID!): Boolean
    }

    type RootQuery {
        todos: [Todo!]!
        login(email: String! , password: String!): AuthData!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
