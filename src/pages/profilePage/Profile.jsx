import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { TextField, Button } from "@mui/material";
import "./profile.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByUsername, updateUserByUsername } from "../../services/user";
import NavbarDashboard from "../../components/navbarDashboard/NavbarDashboard";
import { AuthContext } from "../../contexts/Contexts";
import { useContext } from "react";

function UserInfo() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userdetails, setUserDetails] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorLinePassword, setErrorLinePassword] = useState("");
  const [errorOldPassword, setErrorOldPassword] = useState(false);
  const [errorLineOldPassword, setErrorLineOldPassword] = useState("");
  const { checkLoggedIn, loggedInUsername } = useContext(AuthContext);
  const [disableSave, setDisableSave] = useState(true);
  const navigate = useNavigate();

  const updatePassword = async () => {
    const updatedUser = {
      oldPassword: oldPassword,
      newPassword: password,
    };
    if (password.length >= 6) {
      let response = await updateUserByUsername(username, updatedUser);
      if (response.status === 200) {
        setPassword("");
        setOldPassword("");
        setErrorPassword(false);
        setErrorLinePassword("");
        setErrorOldPassword(false);
        setErrorLineOldPassword("");
      } else {
        setErrorOldPassword(true);
        setErrorLineOldPassword(response.data.message);
      }
    } else {
      setErrorPassword(true);
      setErrorLinePassword("Password must be atleast of 6 characters");
    }
  };

  useEffect(() => {
    if (!checkLoggedIn()) {
      navigate("/dashboard");
    }
  }, []);

  useEffect(() => {
    async function getUserDetails() {
      let details = await getUserByUsername(loggedInUsername);
      setUserDetails(details.data);
      setUsername(details.data.username);
      setEmail(details.data.email);
    }
    if (password.length === 0) {
      setDisableSave(true);
    } else {
      setDisableSave(false);
    }
    getUserDetails();
  }, [password]);

  return (
    <div className="userInfoWrapper">
      <div className="profilePicWrap">
        <img src="src\assets\boy.png" alt="profile" className="profilePic" />
      </div>
      <div className="info">
        <div className="infoForm">
          <form>
            <div className="individual">
              <h4>Username</h4>
              <TextField
                id="username"
                label={username === "" ? "Username" : ""}
                variant="standard"
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: false }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: "50%" }}
              />
            </div>
            <div className="individual">
              <h4>Email</h4>
              <TextField
                id="email"
                label={email === "" ? "Email" : ""}
                variant="standard"
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: false }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "50%" }}
              />
            </div>
          </form>
        </div>
        <hr style={{ border: "1px solid #e0d8c3" }} />

        <div className="infoForm" style={{ padding: "1rem 4rem 1.5rem" }}>
          <div className="individual">
            <h4 style={{ marginRight: "2rem" }}>Old Password</h4>
            <TextField
              id="oldpassword"
              size="small"
              label={oldPassword === "" ? "Enter Old Password" : ""}
              variant="outlined"
              type="password"
              InputLabelProps={{ shrink: false }}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              style={{ width: "50%" }}
              error={errorOldPassword}
              helperText={errorLineOldPassword}
            />
          </div>
          <div className="individual">
            <h4 style={{ marginRight: "2rem" }}>New Password</h4>
            <TextField
              id="password"
              size="small"
              label={password === "" ? "Enter New Password" : ""}
              variant="outlined"
              type="password"
              InputLabelProps={{ shrink: false }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "50%" }}
              error={errorPassword}
              helperText={errorLinePassword}
            />
          </div>
        </div>
      </div>
      <div className="profileButtons">
        <Button
          variant="outlined"
          className="goBack"
          onClick={(e) => navigate("/dashboard")}
        >
          Back
        </Button>
        <Button
          disabled={disableSave}
          variant="contained"
          className="save"
          onClick={(e) => updatePassword()}
        >
          Save Password
        </Button>
      </div>
    </div>
  );
}

export default function Profile() {
  const [selectedOption, setSelectedOption] = useState("userInfo");
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  return (
    <>
      <NavbarDashboard />
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "#EBE4D2", p: 3, margin: "auto" }}
        >
          <Toolbar />
          {selectedOption === "userInfo" ? <UserInfo /> : null}
        </Box>
      </Box>
    </>
  );
}