import axios from "axios";

export default (token = null) => {
  console.log('token authorization', token);
  if (token) {
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.authorization;
  }
};
