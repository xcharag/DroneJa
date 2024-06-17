import {gql} from '@apollo/client';

export const AUTHUSER = gql `
    mutation AuthenticateUser($input: AuthenticateInput) {
  authenticateUser(input: $input) {
    token
  }
}
`;

export const NEWUSER = gql `
mutation NewUser($input: UserInput) {
  newUser(input: $input) {
    id
    name
    lastName
    email
    role
    associatedSeller
  }
}
`;

export const UPDATEUSER = gql `
    mutation UpdateUser($updateUserId: ID!, $input: UserInput) {
  updateUser(id: $updateUserId, input: $input) {
    id
    name
    lastName
    email
    role
    associatedSeller
  }
}
`;

export const NEWPRODUCT = gql `
mutation NewProduct($input: ProductInput) {
  newProduct(input: $input) {
    id
    name
    description
    stock
    price
    imgRoute
    created
    totalQuantity
  }
}
`;

export const UPDATEPRODUCT = gql `
    mutation UpdateProduct($updateProductId: ID!, $input: ProductInput) {
  updateProduct(id: $updateProductId, input: $input) {
    id
    name
    description
    stock
    price
    imgRoute
    created
    totalQuantity
  }
}
`;

export const DELETEPRODUCT = gql `
 mutation DeleteProduct($deleteProductId: ID!) {
  deleteProduct(id: $deleteProductId) {
    id
    name
    description
    stock
    price
    imgRoute
    created
    totalQuantity
  }
}
`;
