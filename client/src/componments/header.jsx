import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../usercontext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((userInfo) => {
            setUserInfo(userInfo);
            setLoading(false); // Set loading to false after successful fetch
          });
        } else {
          setUserInfo(null);
          setLoading(false); // Set loading to false even if the response is not OK
        }
      })
      .catch((err) => {
        console.log(err);
        setUserInfo(null);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [setUserInfo]);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    }).then(() => {
      setUserInfo(null);
      window.location.reload();
    });
  }

  const username = userInfo?.username;

  return (
    <>
      {loading ? (
        // Show a loading message or spinner while fetching the profile
        <div>Loading...</div>
      ) : (
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
      )}
    </>
  );
}
