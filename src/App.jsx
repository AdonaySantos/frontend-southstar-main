import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword'; // Corrigi o nome da importação para corresponder ao arquivo
import Cadastro from './pages/Cadastro'
import Home from './pages/Home';
import './App.css';
import Perfil from "./pages/Perfil";
import PostDetails from "./pages/PostDetails";

// Criação do roteador com as rotas definidas
const router = createBrowserRouter([
  {
    element: (
      <>
        <main>
          <Outlet />
        </main>
      </>
    ),
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/cadastro',
        element: <Cadastro />
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />
      },
      {
        path: "/perfil",
        element: <Perfil />
      },
      {
        path: "/post/:id",
        element: <PostDetails />
      }
    ]
  }
]);

// Componente principal
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
