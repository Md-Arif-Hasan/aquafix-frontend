import axios from 'axios';

export default axios.create({
  baseURL: `http://localhost:4008/api/v1`
});