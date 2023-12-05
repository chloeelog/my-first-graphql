import { Suspense, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { InputSection } from "./InputSection";
import { ListSection } from "./ListSection/ListSection";

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [keyword, setKeyword] = useState<string>(
    searchParams.get("keyword") || ""
  );

  const handleSearch = (keyword: string) => {
    console.log(keyword, " 를 검색합니다!");
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  return (
    <main>
      <InputSection initialValue={keyword} onSubmit={handleSearch} />
      {keyword ? (
        <Suspense fallback={<p>검색중...</p>}>
          <ListSection keyword={keyword} />
        </Suspense>
      ) : (
        <p>검색어를 입력해주세요</p>
      )}
    </main>
  );
};
