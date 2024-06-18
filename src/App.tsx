import Login from "@/pages/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "@/pages/dashboard";

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/*",
    element: <Dashboard />,
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
