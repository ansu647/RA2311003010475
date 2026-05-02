import axios from "axios";
import { getTopNotifications } from "./logic.js";
import { Log, setToken } from "../logging_middleware/logger.js";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhczIxNTJAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMjkzNSwiaWF0IjoxNzc3NzAyMDM1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNmRmOWZhYzUtZjg2MC00NzkwLThkMTQtYjc0MmZiNDA4NDRmIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYW5zdSBzaW5oYSIsInN1YiI6Ijg0YjRiZjdmLWY4Y2UtNDNlNS1iMDJkLTdhZWZjMDI5ZjA3MyJ9LCJlbWFpbCI6ImFzMjE1MkBzcm1pc3QuZWR1LmluIiwibmFtZSI6ImFuc3Ugc2luaGEiLCJyb2xsTm8iOiJyYTIzMTEwMDMwMTA0NzUiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI4NGI0YmY3Zi1mOGNlLTQzZTUtYjAyZC03YWVmYzAyOWYwNzMiLCJjbGllbnRTZWNyZXQiOiJYd1pIRGJ4bkRUYlNKY2RzIn0.cyElyhdPLw9An9zmSZI-1FTGe_BCOym0RfcxSc1-ZZ0";

setToken(TOKEN);

const run = async () => {
  try {
    await Log("backend", "info", "api", "Fetching notifications");

    const res = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );

    const data = res.data.notifications;

    await Log("backend", "info", "service", "Data fetched successfully");

    const top10 = getTopNotifications(data, 10);

    await Log("backend", "debug", "utils", "Sorting completed");

    console.log("\nTOP 10 PRIORITY NOTIFICATIONS:\n");
    console.log(top10);

  } catch (err) {
    await Log("backend", "error", "api", "Fetch failed");
    console.error(err.response?.data || err.message);
  }
};

run();