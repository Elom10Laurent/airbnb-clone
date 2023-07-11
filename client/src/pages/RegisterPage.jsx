import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.post("/register", {
        name,
        email,
        password,
      });
      alert('Registration successful. Now you can log in !')
    } catch (e) {
      // Traiter l'erreur ici
     alert('Registration failed.Please try again later !');
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="you@gmail.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary" type="submit">
            Register
          </button>
          <div className="mt-3 text-center text-gray-500">
            Already a member?{" "}
            <Link to={"/login"} className="text-red-500 underline">
              Go login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
