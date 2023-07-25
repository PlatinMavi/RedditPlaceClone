import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../usercontext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((userInfo) => {
            setUserInfo(userInfo); // Use setUserInfo here, not this.setUserInfo
          });
        } else {
          setUserInfo(null); // If the response is not OK, clear user info
        }
      })
      .catch((err) => {
        console.log(err);
        setUserInfo(null); // In case of an error, clear user info
      });
  }, [setUserInfo]); // Add setUserInfo as a dependency to prevent infinite loop

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    }).then(() => {
      setUserInfo(null);
      window.location.reload(); // Reload the page after successful logout
    });
  }

  const username = userInfo?.username;

  return (
    <header className="flex justify-between font-bold text-2xl p-4 bg-white">
      <Link to="/" className="logo">
        Place
      </Link>
      <nav className="flex gap-4">
        {username && (
          <>
            <div onClick={logout} className="logout cursor-pointer">
              Logout
            </div>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" className="login">
              Login
            </Link>
            <Link to="/register" className="register">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
