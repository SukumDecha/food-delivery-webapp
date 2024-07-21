"use client";
import { gql } from "@apollo/client";
import { DocumentNode } from "graphql";

export const GET_FOOD: DocumentNode = gql`
  query {
    getLoggedInRestaurantFoods {
      foods {
        id
        name
        description
        price
        estimatedPrice
        category
        images {
          public_id
          url
        }
        createdAt
        updatedAt
      }
    }
  }
`;
