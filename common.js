import axios from "axios";
import { JWT_TOKEN_DUMMY } from "./config";

export const getJSON = async (url) => {
  try {
    const data = await axios.get(url, {
      headers: { Authorization: `Bearer ${JWT_TOKEN_DUMMY}` },
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
        Authorization: `Bearer ${JWT_TOKEN_DUMMY}`,
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
        Authorization: `Bearer ${JWT_TOKEN_DUMMY}`,
      },
    });

    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDateBefore = (days = 1) => {
   const todayTimeStamp = new Date().getTime();
   const daysBeforeTimeStamp = todayTimeStamp - (days * 24*60*60*1000);
   return new Date(daysBeforeTimeStamp);
};
