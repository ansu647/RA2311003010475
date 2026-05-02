import axios from "axios";

const URL = "http://20.207.122.201/evaluation-service/logs";

let TOKEN = "";

export const setToken = (t) => {
  TOKEN = t;
};

export const Log = async (stack, level, pkg, message) => {
  try {
    await axios.post(
      URL,
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );
  } catch (err) {
    console.log("Log failed");
  }
};