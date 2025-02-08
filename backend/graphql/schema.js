const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Todo {
        _id: ID!
        title: String!
        imageUrl: String!
        textError: String!
        textFix: String!
        textCode: String!
        createdAt: String!
        updatedAt: String!
    }

    input TodoInput {
        title: String!
        imageUrl: String!
        textError: String!
        textFix: String!
        textCode: String!
    }

    type RootMutation {
        createTodo(todoInput: TodoInput): Todo
        deleteTodo(id: ID!): Boolean
    }

    type RootQuery {
        todos: [Todo!]!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
