import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

function Header() {
  const {userInfo, setUserInfo} = useContext(UserContext)

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        setUserInfo(userInfo)
      });
    });
  }, []);

  async function logout() {
    await fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include'
    })
    setUserInfo(null)
  }

  const username = userInfo?.username;

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
