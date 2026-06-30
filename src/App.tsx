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

      {/* Mobile: bottom sheet — Desktop: top-right sidebar */}
      <div className="
        fixed z-50
        bottom-0 left-0 right-0 max-h-[50vh] overflow-y-auto
        sm:bottom-auto sm:left-auto sm:top-20 sm:right-6 sm:w-64 sm:max-h-[calc(100vh-88px)]
      ">
        <SelectedList />
      </div>
    </BrowserRouter>
  );
}

export default App;
