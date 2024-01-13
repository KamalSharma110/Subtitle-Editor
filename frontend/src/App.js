import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import Root from "./pages/Root";
import EditPage from "./pages/EditPage";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { index: true, element: <Navigate to="/home" replace /> },
        {
          path: "home",
          element: <Root />,
          children: [
            { index: true, element: <HomePage /> },
            { path: "edit", element: <EditPage /> },
          ],
        },
      ],
    },
    { path: '*', element: <Navigate to='/home' replace /> }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
