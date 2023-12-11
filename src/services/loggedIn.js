import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

function parseCookie() {
  try {
    const jwtcookie = Cookies.get("jwt");
    const token = jwt_decode(jwtcookie);
    return token.username;
  } catch {
    Cookies.remove("jwt");
    return false;
  }
}

function tokenExpired() {
  try {
    const jwtcookie = Cookies.get("jwt");
    const token = jwt_decode(jwtcookie);
    const expirationTime = token.exp;
    const current_time = Date.now() / 1000;
    if (expirationTime < current_time) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export { parseCookie, tokenExpired };