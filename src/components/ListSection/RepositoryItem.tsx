import { graphql, useFragment, useMutation } from "react-relay";
import { RepositoryItem_repository$key } from "./__generated__/RepositoryItem_repository.graphql";
import { RepositoryItemAddStarMutation } from "./__generated__/RepositoryItemAddStarMutation.graphql";
import { RepositoryItemRemoveStarMutation } from "./__generated__/RepositoryItemRemoveStarMutation.graphql";

type RepositoryItemProps = {
  repository: RepositoryItem_repository$key;
};

const RepositoryStarAddMutation = graphql`
  mutation RepositoryItemAddStarMutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const RepositoryStarRemoveMutation = graphql`
  mutation RepositoryItemRemoveStarMutation($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

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

  const [add] = useMutation<RepositoryItemAddStarMutation>(
    RepositoryStarAddMutation
  );

  const [remove] = useMutation<RepositoryItemRemoveStarMutation>(
    RepositoryStarRemoveMutation
  );

  if (!payload) {
    return null;
  }

  const { url, name, description, stargazerCount, viewerHasStarred } = payload;

  const handleStar = () => {
    if (viewerHasStarred) {
      remove({
        variables: {
          id: payload.id,
        },
      });
    }
    add({
      variables: {
        id: payload.id,
      },
    });
  };

  return (
    <li>
      <a href={url} target="_blank" rel="noreferrer">
        {name}
      </a>
      <p>{description}</p>
      <p>⭐️ {stargazerCount}</p>
      <button onClick={handleStar}>{viewerHasStarred ? "⭐️" : "☆"} </button>
    </li>
  );
};
