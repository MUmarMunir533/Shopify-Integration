import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  link: createHttpLink({
    uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});

// GraphQL Query to Fetch Carousel Data (existing functionality)
export const hero = gql`
  query {
    heroCollection {
      items {
        title
        description
        image {
          url
        }
      }
    }
  }
`;

// New GraphQL Query to Fetch Header Data (Logo)
export const header = gql`
  query {
    headerCollection {
      items {
        logo
        image {
          url
        }
      }
    }
  }
`;

export default client;
