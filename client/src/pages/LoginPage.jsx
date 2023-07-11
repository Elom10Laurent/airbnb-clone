import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../components/UserContext.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleLoginSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const {data} = await axios.post("/login", {
        email,
        password,
      });

      alert("Login successful!");
      // Mettre à jour le contexte utilisateur avec les données de connexion
      setUser(data);
      setRedirect(true);
    } catch (error) {
      // Traiter l'erreur ici
      alert("Login failed. Please try again later!");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
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
            Login
          </button>
          <div className="mt-3 text-center text-gray-500">
            Don't have an account yet?{" "}
            <Link to={"/register"} className="text-red-500 underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
