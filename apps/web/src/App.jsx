import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/root/Home";
import RootLayout from "./components/layouts/RootLayout";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/root/Dashboard";
import CreateCV from "./pages/root/cv/CreateCV";
import PreviewCV from "./pages/root/cv/PreviewCV";
import CreatePortfolio from "./pages/root/portfolio/CreatePortfolio";
import PreviewPortfolio from "./pages/root/portfolio/PreviewPortfolio";
import CreateProduct from "./pages/root/product/CreateProduct";
import PreviewProduct from "./pages/root/product/PreviewProduct";
import Templates from "./pages/root/Templates";
import Examples from "./pages/root/Examples";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cv/create" element={<CreateCV />} />
          <Route path="/cv/edit/:id" element={<CreateCV />} />
          {/* add props to make this component for edit*/}
          <Route path="/cv/preview" element={<PreviewCV />} />
          <Route path="/portfolio/create" element={<CreatePortfolio />} />
          <Route path="/portfolio/edit/:id" element={<CreatePortfolio />} />
          {/* add props to make this component for edit*/}
          <Route path="/portfolio/preview" element={<PreviewPortfolio />} />
          <Route path="/product/create" element={<CreateProduct />} />
          <Route path="/product/edit/:id" element={<CreateProduct />} />
          {/* add props to make this component for edit*/}
          <Route path="/product/preview" element={<PreviewProduct />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/auth/login" element={<Login/>} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
