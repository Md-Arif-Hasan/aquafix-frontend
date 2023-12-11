import api from "../api";

const getAllUsers = async () => {
  try {
    const response = await api.get(`/users`);
    return response;
  } catch (err) {
    return err.response;
  }
};

export { getAllUsers };