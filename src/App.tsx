import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchPage } from "@/pages/SearchPage";
import { ProfileDetailPage } from "@/pages/ProfileDetailPage";
import { SelectedList } from "@/components/SelectedList";
import { useThemeStore } from "@/store/useThemeStore";

function App() {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/profile/:username" element={<ProfileDetailPage />} />
      </Routes>

      <div className="fixed top-20 right-6 w-64 max-h-[calc(100vh-88px)] overflow-y-auto z-50">
        <SelectedList />
      </div>
    </BrowserRouter>
  );
}

export default App;
