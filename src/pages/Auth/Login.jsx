import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { client } from "../../utils/clientUtils";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleGetApiKey = async (e) => {
    e.preventDefault();
    const { data } = await client.get(`/api-key?email=${email}`);
    if (data.code === 200) {
      localStorage.setItem("apiKey", JSON.stringify(data.data.apiKey));
      navigate("/");
    }
  };
  return (
    <form onSubmit={handleGetApiKey}>
      <label htmlFor="email" className="form-label">
        Email đăng nhập
      </label>
      <input
        type="email"
        className="form-control"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
      />
    </form>
  );
}
