// graphQl/mutations/checkoutCreate.ts
import { gql } from "@apollo/client";

export const CHECKOUT_CREATE_MUTATION = gql`
  mutation CheckoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        webUrl
      }
      checkoutUserErrors {
        message
        field
        code
      }
    }
  }
`;
