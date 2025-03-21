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
