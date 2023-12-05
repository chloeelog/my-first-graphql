import { FormEvent, useRef } from "react";

type InputSectionProps = {
  initialValue: string;
  onSubmit: (keyword: string) => void;
};

export const InputSection = (props: InputSectionProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputRef.current) {
      throw new Error("검색창에 문제가 발생했어요!");
    }

    const keyword: string = inputRef.current.value.trim();
    props.onSubmit(keyword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} type="text" defaultValue={props.initialValue} />
      <button type="submit">검색</button>
    </form>
  );
};
