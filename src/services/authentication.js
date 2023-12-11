import api from "../api";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const register = async (newUser) => {
  try {
    const response = await api.post(`/auth/register`, newUser, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    return err.response;
  }
};

const login = async (loginUser) => {
  try {
    const response = await api.post(`/auth/login`, loginUser, {
      withCredentials: true,
    });
    let cookie = Cookies.get("jwt");
    return response;
  } catch (err) {
    return err.response;
  }
};

export { register, login };