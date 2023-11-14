import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {UserContext} from "../UserContext"

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setUserInfo} = useContext(UserContext)
  const navigate = useNavigate()

  async function login(e) {
    e.preventDefault()
    const response = await fetch('http://localhost:4000/login', {
      method: "POST",
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    })
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
        navigate("/")
      })
    } else {
      alert("You can not login, something is wrong")
    }
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="text" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
}

export default LoginPage;
