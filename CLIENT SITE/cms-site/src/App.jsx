import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import "./App.css";
import MainLayout from "./components/MainLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import { AiPage } from "./pages/AiPage";
import Planets from "./pages/Planets";

import AddMyCharacterPage from "./pages/AddMyCharacterPage";

function App() {
  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/detail/:id",
          element: <DetailPage />,
        },
        {
          path: "/planets",
          element: <Planets />,
        },
        {
          path: "/add/:id",
          element: <AddMyCharacterPage />,
        },
        {
          path: "/ai",
          element: <AiPage />,
          loader: () => {
            const isLogin = localStorage.getItem("access_token");
            if (!isLogin) {
              throw redirect("/login");
            } else {
              return null;
            }
          },
        },
      ],
    },

    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

// import HomePage from "./pages/HomePage";
// import DetailPage from "./pages/DetailPage";

// import MainLayout from "./components/MainLayout";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// function App() {
//   const router = createBrowserRouter([
//     {
//       element: <MainLayout />,
//       children: [
//         {
//           path: "/",
//           element: <HomePage />,
//         },
//         {
//           path: "/detail/:id",
//           element: <DetailPage />,
//         },
//       ],
//     },
//   ]);
//   return <RouterProvider router={router} />;
// }

// export default App;
