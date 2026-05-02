export const getPriorityScore = (n) => {
  let weight = 0;

  if (n.Type === "Placement") weight = 3;
  else if (n.Type === "Result") weight = 2;
  else weight = 1;

  return weight * 1000000000 + new Date(n.Timestamp).getTime();
};

export const getTopNotifications = (list, n) => {
  return list
    .sort((a, b) => getPriorityScore(b) - getPriorityScore(a))
    .slice(0, n);
};