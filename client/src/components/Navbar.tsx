import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";

export default function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <nav className="container mx-auto flex justify-between items-center">
      <div>
        <Link to="/">
          <img src={Logo} alt="logo" width="200px" height="200px" />
        </Link>
      </div>
      <div className="flex items-center gap-x-20">
        <ul className="flex gap-x-8">
          <li>
            <Link to="/?cat=art">Art</Link>
          </li>
          <li>
            <Link to="/?cat=science">Science</Link>
          </li>
          <li>
            <Link to="/?cat=technology">Technology</Link>
          </li>
          <li>
            <Link to="/?cat=cinema">Cinema</Link>
          </li>
          <li>
            <Link to="/?cat=design">Design</Link>
          </li>
          <li>
            <Link to="/?cat=food">Food</Link>
          </li>
        </ul>
        <div className="flex gap-x-4 text-xs text-neutral-600">
          <span className="max-w-[60px] truncate">{currentUser?.username}</span>
          {currentUser ? (
            <span
              onClick={logout}
              className="underline underline-offset-4 cursor-pointer"
            >
              Logout
            </span>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <span className="font-semibold">
            <Link to="createpost">Create Post</Link>
          </span>
        </div>
      </div>
    </nav>
  );
}
