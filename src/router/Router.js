import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "../components/AppLayout";

import { Categories, Appearance } from "../pages";
import ApkDownload from "../pages/ApkDownload";
import CategoryDetail from "../pages/CategoryDetail";
import CategoryForm from "../pages/CategoryForm";
import Error401 from "../pages/error/Error401";
import Error404 from "../pages/error/Error404";
import Error500 from "../pages/error/Error500";
import Login from "../pages/Login";
import QuestionDetail from "../pages/QuestionDetail";
import QuestionForm from "../pages/QuestionForm";

const Router = () => {
  const [breadcrumb, setBreadcrumb] = useState(null);
  const [action, setAction] = useState(null);
  const [message, setMessage] = useState(null);

  const getRedirection = () => {
    return localStorage.getItem('ACCESS_TOKEN') ? '/categories' : '/login';
  }

  const setAppBarContent = (newBreadcrumb, newAction) => {
    setBreadcrumb(newBreadcrumb);
    setAction(newAction);
  }

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
        <Route exact path="/error-401" element={<Error401 />} />
        <Route exact path="/error-404" element={<Error404 />} />
        <Route exact path="/error-500" element={<Error500 />} />
        <Route exact path="/categories" element={<Categories setAppBarContent={setAppBarContent} />}/>
        <Route exact path="/download-app" element={<ApkDownload setAppBarContent={setAppBarContent} />}/>
        <Route path='*' element={ <Navigate to={getRedirection()} /> }/>
      </Routes>
    </AppLayout>
    </BrowserRouter>
  );
};

export default Router;