
import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { register } from "../../services/authentication";
import "./register.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../contexts/Contexts";
import { useContext } from "react";

export default function Form() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { checkLoggedIn } = useContext(AuthContext);
  const [errorOrSuccessLine, setErrorOrSuccessLine] = useState("");
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorLineUsername, setErrorLineUsername] = useState("");
  const [errorLineEmail, setErrorLineEmail] = useState("");
  const [errorLinePassword, setErrorLinePassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (checkLoggedIn()) {
      navigate("/dashboard");
    }
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (
      validateUsername(username) &&
      validateEmail(email) &&
      validatePassword(password)
    ) {
      const newUser = {
        username: username,
        password: password,
        email: email,
      };
      try {
        //navigate("/login");
        const response = await register(newUser);
              if (response.data.status === 201) {
            setErrorOrSuccessLine(
            "User successfully registered! Please go to the login section"
          );

          navigate("/dashboard");
        } else {
          setErrorOrSuccessLine(response.data.message);
        }
      } catch (err) {
        setErrorOrSuccessLine("An error occured");
      }
    } else {
      setErrorOrSuccessLine("Please enter all the fields correctly!");
    }
  };

  const validateUsername = (value) => {
    if (value === "") {
      setErrorUsername(true);
      setErrorLineUsername("\u{26A0} Username is required");
      return false;
    }
    if (!value.match(/^[a-zA-Z0-9]+$/)) {
      setErrorUsername(true);
      setErrorLineUsername(
        "\u{26A0} Username cannot contain any special characters"
      );
      return false;
    }
    setErrorUsername(false);
    setErrorLineUsername("");
    return true;
  };

  const validateEmail = (value) => {
    if (value === "") {
      setErrorEmail(true);
      setErrorLineEmail("\u{26A0} Email is required");
      return false;
    }
    setErrorEmail(false);
    setErrorLineEmail("");
    return true;
  };

  const validatePassword = (value) => {
    if (value === "") {
      setErrorPassword(true);
      setErrorLinePassword("\u{26A0} Password is required");
      return false;
    }
    if (value.length < 6) {
      setErrorPassword(true);
      setErrorLinePassword("\u{26A0} Password must be atleast of 6 characters");
      return false;
    }
    setErrorPassword(false);
    setErrorLinePassword("");
    return true;  
  };

  return (
    <>
      <Navbar />
      <div className="containerRegister" style={{ padding: "1rem 4rem 1.5rem" }}>
      <div className="page">
        <div className="image">
          <img
            className="logo"
            style={{ width: "220px", height: "220", marginTop: "2rem" }}
            src="src\assets\verified.png"
          />
        </div>
        <div className="form">
          <form>
            <TextField
              id="username"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
              variant="filled"
              error={errorUsername}
              helperText={errorLineUsername}
            />
            <TextField
              id="email"
              className="input"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              variant="filled"
              error={errorEmail}
              helperText={errorLineEmail}
            />
            <TextField
              id="password"
              type="password"
              className="input"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              label="Password"
              variant="filled"
              error={errorPassword}
              helperText={errorLinePassword}
            />

            <Button className="button" data-testid="register" onClick={submit} variant="contained">
              Register
            </Button>

            <h4 className="loginLine">
              {" "}
              Already have an account?
              <span>
                <Button data-testid="signin" onClick={(e) => navigate("/login")} >
                 Sign In
                </Button>
                 
              </span>
            </h4>
          </form>
        </div>
      </div>
      </div>
    </>
  );
}