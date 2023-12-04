import { graphql, useFragment } from "react-relay";
import { RepositoryItem_repository$key } from "./__generated__/RepositoryItem_repository.graphql";

type RepositoryItemProps = {
  repository: RepositoryItem_repository$key;
};

export const RepositoryItem = (props: RepositoryItemProps) => {
  const payload = useFragment(
    graphql`
      fragment RepositoryItem_repository on Repository {
        id
        name
        url
        description
        stargazerCount
      }
    `,
    props.repository
  );

  if (!payload) {
    return null;
  }

  const { url, name, description, stargazerCount } = payload;
  return (
    <li>
      <a href={url} target="_blank" rel="noreferrer">
        {name}
      </a>
      <p>{description}</p>
      <p>⭐️ {stargazerCount}</p>
    </li>
  );
};
