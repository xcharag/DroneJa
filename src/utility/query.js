import { gql } from '@apollo/client';

export const GETUSERINFO = gql `
    query GetUser($token: String!) {
      getUser(token: $token) {
        id
        name
        lastName
        email
        role
        associatedSeller
      }
    }
`;

export const GETLASTADDEDPRODUCTS = gql `
    query GetLastAddedProducts {
      getLastAddedProducts {
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

export const GETORDERSBYSELLER = gql `
    query GetOrdersBySeller {
      getOrdersBySeller {
        id
        order {
          id
          name
          quantity
          price
        }
        total
        client
        seller
        status
        created
      }
    }
`;

export const GETPRODUCTS = gql `
    query GetProducts {
      getProducts {
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

export const GETUSERSBYSELLER = gql `
    query GetUsersBySeller {
  getUsersBySeller {
    id
    name
    lastName
    email
    role
    associatedSeller
  }
}
`;