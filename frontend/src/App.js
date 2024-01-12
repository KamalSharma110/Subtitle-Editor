import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HistoryPage from './pages/HistoryPage';
import HomePage from './pages/HomePage';
import Root from './pages/Root';
import EditPage from "./pages/EditPage";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "home", element: <HomePage /> },
        { path: "history", element: <HistoryPage /> },
        { path: "edit", element: <EditPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
