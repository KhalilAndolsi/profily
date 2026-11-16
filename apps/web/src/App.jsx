import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Home from "./pages/root/Home";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/root/Dashboard";
import CreateCV from "./pages/root/cv/CreateCV";
import PreviewCV from "./pages/root/cv/PreviewCV";
import CreatePortfolio from "./pages/root/portfolio/CreatePortfolio";
import PreviewPortfolio from "./pages/root/portfolio/PreviewPortfolio";
import CreateLinkPage from "./pages/root/link-page/CreateLinkPage";
import PreviewLinkPage from "./pages/root/link-page/PreviewLinkPage";
import Templates from "./pages/root/Templates";
import Examples from "./pages/root/Examples";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Contact from "./pages/root/Contact";
import PrivacyPolicy from "./pages/root/PrivacyPolicy";
import Profile from "./pages/root/Profile";

import RootLayout from "./components/layouts/RootLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import AdminDashboard from "./pages/root/AdminDashboard";
import { ProtectedRoute } from "./hooks/useProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="templates" element={<Templates />} />
          <Route path="examples" element={<Examples />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="contact" element={<Contact />} />

          <Route
            path="cv/create"
            element={
              <ProtectedRoute>
                <CreateCV />
              </ProtectedRoute>
            }
          />
          <Route
            path="cv/edit/:id"
            element={
              <ProtectedRoute>
                <CreateCV forEdit={true} />
              </ProtectedRoute>
            }
          />
          <Route path="cv/preview" element={<PreviewCV />} />

          <Route
            path="portfolio/create"
            element={
              <ProtectedRoute>
                <CreatePortfolio />
              </ProtectedRoute>
            }
          />
          <Route
            path="portfolio/edit/:id"
            element={
              <ProtectedRoute>
                <CreatePortfolio />
              </ProtectedRoute>
            }
          />
          <Route path="portfolio/preview" element={<PreviewPortfolio forEdit={true}/>} />

          <Route
            path="link-page/create"
            element={
              <ProtectedRoute>
                <CreateLinkPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="link-page/edit/:id"
            element={
              <ProtectedRoute>
                <CreateLinkPage forEdit={true} />
              </ProtectedRoute>
            }
          />
          <Route path="link-page/preview" element={<PreviewLinkPage />} />
          
          <Route path="/admin/dashboard" element={<ProtectedRoute isAdminRoute={true}><AdminDashboard /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
