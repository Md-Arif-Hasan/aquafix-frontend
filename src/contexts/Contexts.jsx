
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { parseCookie, tokenExpired } from "../services/loggedIn";

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const [loggedInUsername, setLoggedInUsername] = useState(localStorage.getItem("username"));
  const [expired, setExpired] = useState(false);
  const pageNumber = 1;
  const pageSize = 5;

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = () => {
    if(!tokenExpired()){
    const tokenUsername = parseCookie();
    if(tokenUsername){
      setExpired(false);
      setLoggedInUsername(tokenUsername);
      localStorage.setItem("username", tokenUsername);
      return true;
    }
    setExpired(false);
    setLoggedInUsername(null);
    localStorage.removeItem("username");
    return false;
   } else {
      setExpired(true);
      setLoggedInUsername(null);
      localStorage.removeItem("username");
      return false;
   }
  }

  const setStatusSignedIn = () => {
    try {
      // let jwtcookie = Cookies.get("jwt");
      let jwtcookie = document.cookie;
      // console.log(jwtcookie, "jwtcookie"	)
      let { username } = jwt_decode(jwtcookie);
      setExpired(false);
      setLoggedInUsername(username);
      localStorage.setItem("username", username);
    } catch {
      Cookies.remove("jwt");
      setExpired(false);
      setLoggedInUsername(null);
    }
  };

  const setStatusSignedOut = () => {
    Cookies.remove("jwt");
    localStorage.removeItem("username");
    setExpired(false);
    setLoggedInUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{
        pageNumber,
        pageSize,
        expired,
        setExpired,
        checkLoggedIn,
        loggedInUsername,
        setStatusSignedIn,
        setStatusSignedOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};