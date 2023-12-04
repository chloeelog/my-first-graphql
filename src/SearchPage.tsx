import { Suspense, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { InputSection } from "./components/InputSection";
import { ListSection } from "./components/ListSection/ListSection";

export const SearchPage = () => {
  const [, setSearchParams] = useSearchParams();

  const [keyword, setKeyword] = useState<string>("");

  const handleKeywordChange = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleSearch = (keyword: string) => {
    console.log("검색어: ", keyword);
    setSearchParams({ keyword });
  };

  return (
    <main>
      <InputSection
        keyword={keyword}
        onKeywordChange={handleKeywordChange}
        onInputSubmit={handleSearch}
      />
      {keyword ? (
        <Suspense fallback={<p>검색중...</p>}>
          <ListSection />
        </Suspense>
      ) : (
        <p>검색어를 입력해주세요</p>
      )}
    </main>
  );
};
