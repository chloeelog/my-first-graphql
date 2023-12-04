import { FormEvent } from "react";

type InputSectionProps = {
  keyword: string;
  onKeywordChange: (keyword: string) => void;
  onInputSubmit: (keyword: string) => void;
};

export const InputSection = (props: InputSectionProps) => {
  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    props.onKeywordChange(event.currentTarget.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!props.keyword) {
      alert("검색어를 입력해주세요.");
      return;
    }

    props.onInputSubmit(props.keyword);
    // props.onKeywordChange("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={props.keyword} onChange={handleChange} />
      <button type="submit">검색</button>
    </form>
  );
};
