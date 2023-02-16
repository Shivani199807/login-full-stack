import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
const Dashboard = () => {
  const navigate = useNavigate();
  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");
  const populateQuote = async () => {
    const res = await fetch("http://localhost:5000/api/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.quote) {
      setQuote(data.quote);
    } else {
      alert(data.error);
    }
    console.log(data);
  };
  const onChange = (e, name) => {
    console.log(e);
    setTempQuote(e.target.value);
  };
  const onSubmitButton = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        quote: tempQuote,
      }),
    });
    const data = await res.json();
    if ((data.status = "ok")) {
      setTempQuote("");
      setQuote(data.quote);
      populateQuote();
    } else {
      alert(data.error);
    }
    console.log(data);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        populateQuote();
      }
    }
  }, []);
  return (
    <div>
      <div>Welcome to dashboard</div>{" "}
      <div>{quote || "No quote found"} quote found</div>
      <div>
        <form onSubmit={onSubmitButton}>
          <input
            type="text"
            value={tempQuote}
            onChange={(e) => onChange(e, "quote")}
          />
          <input type="submit" value="Updated quote" />
        </form>
      </div>
    </div>
  );
};
export default Dashboard;
