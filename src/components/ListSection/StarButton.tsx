type StarButtonProps = {
  repositoryId: string;
  isStarred: boolean;
  onAddStar: (id: string) => void;
  onRemoveStar: (id: string) => void;
};

export const StarButton = (props: StarButtonProps) => {
  const handleStar = () => {
    if (props.isStarred) {
      props.onRemoveStar(props.repositoryId);
      return;
    }
    props.onAddStar(props.repositoryId);
  };

  return <button onClick={handleStar}>{props.isStarred ? "⭐️" : "☆"} </button>;
};
