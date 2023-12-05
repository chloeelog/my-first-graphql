import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";

import { ListSectionRepositorySearchQuery } from "./__generated__/ListSectionRepositorySearchQuery.graphql";

import { RepositoryPagination } from "./RepositoryPagination";

type ListSectionProps = {
  keyword: string;
};

export const ListSection = (props: ListSectionProps) => {
  const data = useLazyLoadQuery<ListSectionRepositorySearchQuery>(
    graphql`
      query ListSectionRepositorySearchQuery($keyword: String!) {
        ...RepositoryPagination @arguments(keyword: $keyword)
      }
    `,
    {
      keyword: props.keyword,
    }
  );

  return (
    <ul>
      <RepositoryPagination data={data} />
    </ul>
  );
};
