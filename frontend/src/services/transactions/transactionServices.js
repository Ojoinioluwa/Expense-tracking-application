import { getUserFromStorage } from "../../utils/getUserFromStorage";
import { BASE_URL } from "../../utils/url";
import axios from "axios";

// the token
const token = getUserFromStorage();

//! add
export const addTransactionAPI = async ({
  type,
  category,
  date,
  amount,
  description,
}) => {
  const response = await axios.post(
    `${BASE_URL}/transactions/create`,
    {
      category,
      amount,
      date,
      description,
      type,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // !return promise
  return response.data;
};

export const listTransactionsAPI = async ({
  startDate,
  endDate,
  type,
  category,
}) => {
  const response = await axios.get(`${BASE_URL}/transactions/lists`, {
    params: { startDate, endDate, type, category },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // !return a promise
  return response.data;
};
//! Update
export const updateCategoryAPI = async ({ type, name, id }) => {
  const response = await axios.put(
    `${BASE_URL}/categories/update/${id}`,
    {
      name,
      type,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // !return promise
  return response.data;
};

//! delete
export const deleteCategoryAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/categories/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // !return promise
  return response.data;
};
