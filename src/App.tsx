import { BrowserRouter, Routes, Route } from "react-router-dom";

import { RelayEnvironmentProvider } from "react-relay/hooks";
import { RelayEnvironment } from "./RelayEnvironment";

import { SearchPage } from "./components/SearchPage";

function App() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </RelayEnvironmentProvider>
  );
}

export default App;
