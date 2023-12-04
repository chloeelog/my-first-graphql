import { useLazyLoadQuery } from "react-relay";
import { useSearchParams } from "react-router-dom";

import { graphql } from "relay-runtime";

import { ListSectionRepositorySearchQuery } from "./__generated__/ListSectionRepositorySearchQuery.graphql";

import { RepositoryPagination } from "./RepositoryPagination";

export const ListSection = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const data = useLazyLoadQuery<ListSectionRepositorySearchQuery>(
    graphql`
      query ListSectionRepositorySearchQuery($keyword: String!) {
        ...RepositoryPagination @arguments(keyword: $keyword)
      }
    `,
    {
      keyword,
    }
  );

  return (
    <ul>
      <RepositoryPagination data={data} />
    </ul>
  );
};
