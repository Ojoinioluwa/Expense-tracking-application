import { BASE_URL } from "../../utils/url";
import axios from "axios";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

// the token
const token = getUserFromStorage();

//! login
export const loginAPI = async ({ email, password }) => {
  const response = await axios.post(`${BASE_URL}/users/login`, {
    email,
    password,
  });
  // !return promise
  return response.data;
};
// ! register
export const registerAPI = async ({ email, password, username }) => {
  const response = await axios.post(`${BASE_URL}/users/register`, {
    email,
    username,
    password,
  });
  // !return a promise
  return response.data;
};

// ! change password
export const changePasswordAPI = async (newPassword) => {
  const response = await axios.put(
    `${BASE_URL}/users/change-password`,
    {
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // !return a promise
  return response.data;
};

// ! Update profile
export const updateProfileAPI = async ({ username, email }) => {
  const response = await axios.put(
    `${BASE_URL}/users/update-profile`,
    {
      username,
      email,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // !return a promise
  return response.data;
};
