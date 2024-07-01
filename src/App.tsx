import Login from "@/pages/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import { TabsProvider } from "./context/Tabs";

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
  return (
    <TabsProvider>
      <RouterProvider router={router} />
    </TabsProvider>
  );
}

export default App;
