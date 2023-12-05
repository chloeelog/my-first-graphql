import { graphql, usePaginationFragment } from "react-relay";

import { RepositoryPaginationQuery } from "./__generated__/RepositoryPaginationQuery.graphql";
import { RepositoryPagination$key } from "./__generated__/RepositoryPagination.graphql";
import { RepositoryItem } from "./RepositoryItem";

type RepositoryPaginationProps = {
  data: RepositoryPagination$key;
};

export const RepositoryPagination = (props: RepositoryPaginationProps) => {
  const { data, hasNext, loadNext } = usePaginationFragment<
    RepositoryPaginationQuery,
    RepositoryPagination$key
  >(
    graphql`
      fragment RepositoryPagination on Query
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
        keyword: { type: "String!" }
      )
      @refetchable(queryName: "RepositoryPaginationQuery") {
        search(
          query: $keyword
          type: REPOSITORY
          first: $count
          after: $cursor
        ) @connection(key: "RepositoryPagination_search") {
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
    `,
    props.data
  );

  if (!data || !data.search || !data.search.edges?.length) {
    return <p>검색 결과가 존재하지 않아요</p>;
  }

  return (
    <>
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
      {hasNext && <button onClick={() => loadNext(10)}>더보기</button>}
    </>
  );
};
