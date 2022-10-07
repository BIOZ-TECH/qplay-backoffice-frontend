import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "../components/AppLayout";
import { Categories, Appearance } from "../pages";

const Router = () => {
  return (
    <BrowserRouter>
    <AppLayout>
    <Routes>
        <Route exact path="/appearance" element={<Appearance />}/>
        <Route exact path="*" element={<Categories />}/>
      </Routes>
    </AppLayout>
    </BrowserRouter>
  );
};

export default Router;