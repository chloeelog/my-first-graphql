import { graphql, useFragment, useMutation } from "react-relay";

import { RepositoryItem_repository$key } from "./__generated__/RepositoryItem_repository.graphql";
import { RepositoryItemAddStarMutation } from "./__generated__/RepositoryItemAddStarMutation.graphql";
import { RepositoryItemRemoveStarMutation } from "./__generated__/RepositoryItemRemoveStarMutation.graphql";

import { StarButton } from "./StarButton";

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
        viewerHasStarred
      }
    `,
    props.repository
  );

  const [add, isAdding] = useMutation<RepositoryItemAddStarMutation>(
    graphql`
      mutation RepositoryItemAddStarMutation($id: ID!) {
        addStar(input: { starrableId: $id }) {
          starrable {
            id
            viewerHasStarred
          }
        }
      }
    `
  );

  const handleAddStar = (id: string) => {
    add({ variables: { id } });
  };

  const [remove, isRemoving] = useMutation<RepositoryItemRemoveStarMutation>(
    graphql`
      mutation RepositoryItemRemoveStarMutation($id: ID!) {
        removeStar(input: { starrableId: $id }) {
          starrable {
            id
            viewerHasStarred
          }
        }
      }
    `
  );

  const handleRemoveStar = (id: string) => {
    remove({ variables: { id } });
  };

  const isLoading = isAdding || isRemoving;

  if (!payload) {
    return null;
  }

  const { id, url, name, description, stargazerCount, viewerHasStarred } =
    payload;

  return (
    <li>
      <a href={url} target="_blank" rel="noreferrer">
        {name}
      </a>
      <p>{description}</p>
      <p>⭐️ {stargazerCount}</p>

      <StarButton
        repositoryId={id}
        isStarred={viewerHasStarred}
        onAddStar={handleAddStar}
        onRemoveStar={handleRemoveStar}
        isLoading={isLoading}
      />
    </li>
  );
};
