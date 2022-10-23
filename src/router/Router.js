import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import AppLayout from "../components/AppLayout";

import { Categories, Appearance } from "../pages";
import CategoryDetail from "../pages/CategoryDetail";
import CategoryForm from "../pages/CategoryForm";
import QuestionDetail from "../pages/QuestionDetail";
import QuestionForm from "../pages/QuestionForm";

const Router = () => {
  const [breadcrumb, setBreadcrumb] = useState(null);
  const [action, setAction] = useState(null);

  return (
    <BrowserRouter>
    <AppLayout breadcrumb={breadcrumb} action={action}>
    <Routes>
        <Route exact path="/appearance" element={<Appearance setBreadcrumb={setBreadcrumb} setAction={setAction} />}/>
        <Route exact path="/category/new" element={<CategoryForm setBreadcrumb={setBreadcrumb} setAction={setAction} />}/>
        <Route exact path="/category/edit/:id" element={<CategoryForm setBreadcrumb={setBreadcrumb} setAction={setAction} />}/>
        <Route exact path="/category/:id" element={<CategoryDetail setBreadcrumb={setBreadcrumb} setAction={setAction} />}/>
        <Route exact path="/category/:categoryId/question/new" element={<QuestionForm setBreadcrumb={setBreadcrumb} setAction={setAction} />}/>
        <Route exact path="/category/:categoryId/question/edit/:id" element={<QuestionForm setBreadcrumb={setBreadcrumb} setAction={setAction} />}/>
        <Route exact path="/category/:categoryId/question/:id" element={<QuestionDetail setBreadcrumb={setBreadcrumb} setAction={setAction} />}/>
        <Route exact path="*" element={<Categories setBreadcrumb={setBreadcrumb} setAction={setAction} />}/>
      </Routes>
    </AppLayout>
    </BrowserRouter>
  );
};

export default Router;