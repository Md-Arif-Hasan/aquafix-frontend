import "./homepage.css";
import Navbar from "../../components/navbar/Navbar";
import * as React from "react";
import { AuthContext } from "../../contexts/Contexts";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { checkLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (checkLoggedIn()) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="container"  style={{ padding: "1rem 4rem 1.5rem" }}></div>
        <div className="right">
          <h1 className="title">A Q U A F I X</h1>
          <h1 className="quote">
          “ "Transform Your Images: Enhance and Restore Brilliance."”
          </h1>
          <a onClick={() => navigate(`/login`)}   className="goToLogin">Login & Start your journey with us</a>
        </div>
    </>
  );
}