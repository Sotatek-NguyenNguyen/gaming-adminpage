import axios from "axios";
import { JWT_TOKEN } from "./config";

export const getJSON = async (url) => {
  try {
    const data = await axios.get(url, {
      headers: { Authorization: `Bearer ${JWT_TOKEN}` },
    });

    return data;
  } catch (error) {
    throw new Error("Cannot connect to the server");
  }
};

export const sendJSON = async (url, data) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    });

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateJSON = async () => {
  try {
    const res = await axios.put(url, updateData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    });

    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};
