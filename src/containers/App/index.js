import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import HomePage from "../HomePage";
import BuildFormPage from "../BuildFormPage";

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/builder" element={<BuildFormPage />} />
        </Routes>
      </AppWrapper>
    </BrowserRouter>
  );
}
