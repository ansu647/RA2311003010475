import { useEffect, useState } from "react";
import { fetchNotifications } from "./api";

// IMPORT LOGGER
import { Log, setToken } from "../../logging_middleware/logger";

// SET TOKEN
setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhczIxNTJAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMjkzNSwiaWF0IjoxNzc3NzAyMDM1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNmRmOWZhYzUtZjg2MC00NzkwLThkMTQtYjc0MmZiNDA4NDRmIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYW5zdSBzaW5oYSIsInN1YiI6Ijg0YjRiZjdmLWY4Y2UtNDNlNS1iMDJkLTdhZWZjMDI5ZjA3MyJ9LCJlbWFpbCI6ImFzMjE1MkBzcm1pc3QuZWR1LmluIiwibmFtZSI6ImFuc3Ugc2luaGEiLCJyb2xsTm8iOiJyYTIzMTEwMDMwMTA0NzUiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI4NGI0YmY3Zi1mOGNlLTQzZTUtYjAyZC03YWVmYzAyOWYwNzMiLCJjbGllbnRTZWNyZXQiOiJYd1pIRGJ4bkRUYlNKY2RzIn0.cyElyhdPLw9An9zmSZI-1FTGe_BCOym0RfcxSc1-ZZ0");

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    // LOG: API CALL START
    Log("frontend", "info", "api", "Fetching notifications");

    fetchNotifications()
      .then((res) => {
        setData(res);

        // LOG: SUCCESS
        Log("frontend", "info", "component", "Data loaded successfully");
      })
      .catch((err) => {
        console.error(err);

        // LOG: ERROR
        Log("frontend", "error", "api", "Failed to fetch notifications");
      });
  }, []);

  // PRIORITY LOGIC
  const weight = {
    Placement: 3,
    Result: 2,
    Event: 1
  };

  const sortedData = [...data].sort((a, b) => {
    if (weight[b.Type] !== weight[a.Type]) {
      return weight[b.Type] - weight[a.Type];
    }
    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });

  // FILTER
  const filteredData =
    filter === "All"
      ? sortedData
      : sortedData.filter((n) => n.Type === filter);

  // TOP N LIMIT
  const finalData = filteredData.slice(0, limit);

  return (
    <div style={{ padding: 20 }}>
      <h1>📢 Notifications</h1>

      {/* FILTER */}
      <label>Filter: </label>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Event">Event</option>
        <option value="Result">Result</option>
        <option value="Placement">Placement</option>
      </select>

      {/* LIMIT */}
      <label style={{ marginLeft: 20 }}>Show: </label>
      <select onChange={(e) => setLimit(Number(e.target.value))}>
        <option value={5}>Top 5</option>
        <option value={10}>Top 10</option>
        <option value={20}>Top 20</option>
      </select>

      {/* DISPLAY */}
      {finalData.map((n) => (
        <div
          key={n.ID}
          style={{
            border: "1px solid #ccc",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "8px"
          }}
        >
          <b>{n.Type}</b>
          <p>{n.Message}</p>
          <small>{n.Timestamp}</small>
        </div>
      ))}
    </div>
  );
}

export default App;