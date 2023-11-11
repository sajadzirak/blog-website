import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        setUsername(userInfo.username)
      });
    });
  }, []);

  async function logout() {
    await fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include'
    })
    setUsername(null)
  }

  return (
    <header>
      <Link to={"/"} className="logo">
        MyBlog
      </Link>
      <nav>
        {username ? (
          <>
            <Link to="/create">Create new article</Link>
            <a onClick={logout}>Logout</a>
          </>
        ) : (
          <>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
