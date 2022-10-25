import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "../components/AppLayout";

import { Categories, Appearance } from "../pages";
import CategoryDetail from "../pages/CategoryDetail";
import CategoryForm from "../pages/CategoryForm";
import Login from "../pages/Login";
import QuestionDetail from "../pages/QuestionDetail";
import QuestionForm from "../pages/QuestionForm";

const Router = () => {
  const [breadcrumb, setBreadcrumb] = useState(null);
  const [action, setAction] = useState(null);
  const [message, setMessage] = useState(null);

  return (
    <BrowserRouter>
    <AppLayout breadcrumb={breadcrumb} action={action} message={message}>
    <Routes>
        <Route exact path="/appearance" element={<Appearance setBreadcrumb={setBreadcrumb} setAction={setAction} setMessage={setMessage} />}/>
        <Route exact path="/category/new" element={<CategoryForm setBreadcrumb={setBreadcrumb} setAction={setAction} setMessage={setMessage} />}/>
        <Route exact path="/category/edit/:id" element={<CategoryForm setBreadcrumb={setBreadcrumb} setAction={setAction} setMessage={setMessage}/>}/>
        <Route exact path="/category/:id" element={<CategoryDetail setBreadcrumb={setBreadcrumb} setAction={setAction} />}/>
        <Route exact path="/category/:categoryId/question/new" element={<QuestionForm setBreadcrumb={setBreadcrumb} setAction={setAction} setMessage={setMessage}/>}/>
        <Route exact path="/category/:categoryId/question/edit/:id" element={<QuestionForm setBreadcrumb={setBreadcrumb} setAction={setAction} setMessage={setMessage}/>}/>
        <Route exact path="/category/:categoryId/question/:id" element={<QuestionDetail setBreadcrumb={setBreadcrumb} setAction={setAction} />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/" element={<Categories setBreadcrumb={setBreadcrumb} setAction={setAction} />}/>
        <Route exact path="*" element={<Login />}/>
      </Routes>
    </AppLayout>
    </BrowserRouter>
  );
};

export default Router;