import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import { Footer, Navbar } from "./components";
import { CreatePost, Home, Login, PostPage, Register } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/postpage/:id", element: <PostPage /> },
      { path: "/createpost", element: <CreatePost /> },
    ],
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Layout() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
