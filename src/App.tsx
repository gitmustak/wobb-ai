import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchPage } from "@/pages/SearchPage";
import { ProfileDetailPage } from "@/pages/ProfileDetailPage";
import { SelectedList } from "@/components/SelectedList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/profile/:username" element={<ProfileDetailPage />} />
      </Routes>

      <div className="fixed top-6 right-6 w-64 max-h-[calc(100vh-48px)] overflow-y-auto z-50">
        <SelectedList />
      </div>
    </BrowserRouter>
  );
}

export default App;
