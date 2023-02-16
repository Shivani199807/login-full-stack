import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const onChange = (e, name) => {
    setUserInfo({
      ...userInfo,
      [name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = userInfo;
    console.log(userInfo);
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("login successful");
      navigate("/dashboard");
    } else {
      alert("please check ur email and password");
    }
    console.log(data);
  };
  return (
    <div className="App">
      <div>Login</div>
      <form onSubmit={onSubmit}>
        <label>Enter email</label>
        <br></br>
        <input
          type="email"
          onChange={(e) => onChange(e, "email")}
          value={userInfo.email}
        />
        <br></br>
        <label>Enter password</label>
        <br></br>
        <input
          type="password"
          onChange={(e) => onChange(e, "password")}
          value={userInfo.password}
        />
        <br></br>
        <button>Submit</button>
      </form>
    
    </div>
  );
};

export default Login;
