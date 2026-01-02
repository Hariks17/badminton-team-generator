import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import GuestTeamGenerator from "../pages/guest/GuestTeamGenerator";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route
            path="/guest/team-generator"
            element={<GuestTeamGenerator />}
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
