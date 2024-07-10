import Login from "@/pages/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import { TabsProvider } from "./context/Tabs";
import { AdminLoginForm } from "./components/login/AdminLoginForm";
import { Logins } from "./components/login/Logins";
import { StudentsLoginForm } from "./components/login/StudentsLoginForm";

const routes = [
  {
    path: "/login",
    element: (
      <Login>
        <Logins />
      </Login>
    ),
    children: [
      {
        path: "admins",
        element: <AdminLoginForm />,
      },
      {
        path: "students",
        element: <StudentsLoginForm />,
      },
    ],
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
