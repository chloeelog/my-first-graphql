import { useLazyLoadQuery } from "react-relay";
import { useSearchParams } from "react-router-dom";

import { graphql } from "relay-runtime";

import { ListSectionRepositorySearchQuery } from "./__generated__/ListSectionRepositorySearchQuery.graphql";
import { RepositoryItem } from "./RepositoryItem";

const RepositorySearchQuery = graphql`
  query ListSectionRepositorySearchQuery($keyword: String!) {
    search(query: $keyword, type: REPOSITORY, first: 10) {
      repositoryCount
      edges {
        node {
          ...RepositoryItem_repository
          ... on Repository {
            id
          }
        }
      }
    }
  }
`;

export const ListSection = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const data = useLazyLoadQuery<ListSectionRepositorySearchQuery>(
    RepositorySearchQuery,
    {
      keyword,
    }
  );

  if (!data.search.repositoryCount || !data.search.edges?.length) {
    return <p>검색 결과가 없어요.</p>;
  }
  return (
    <ul>
      {data.search.edges.map((repository) => {
        if (!repository || !repository.node) {
          return null;
        }
        return (
          <RepositoryItem
            key={repository.node.id}
            repository={repository.node}
          />
        );
      })}
    </ul>
  );
};
