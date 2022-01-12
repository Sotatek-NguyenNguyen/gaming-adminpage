import axios from "./api/axios-adapter";

export const getJSON = async (path, options = null) => {
  try {
    const data = await axios.get(path, options);

    return data;
  } catch (error) {
    throw new Error("Cannot connect to the server");
  }
};

export const sendJSON = async (path, data) => {
  try {
    const response = await axios.post(path, data);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateJSON = async (path, updateData) => {
  try {
    const res = await axios.put(path, updateData);

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
