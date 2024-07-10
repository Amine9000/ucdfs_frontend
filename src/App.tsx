import Login from "@/pages/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import { TabsProvider } from "./context/Tabs";
import { LoginForm } from "./components/login/loginForm";
import { Logins } from "./components/login/Logins";

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
        element: <LoginForm />,
      },
      {
        path: "students",
        element: <LoginForm />,
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
