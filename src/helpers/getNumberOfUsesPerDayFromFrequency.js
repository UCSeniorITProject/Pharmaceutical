module.exports = (frequency) => {
  let numPerDay = 0;
  switch (frequency) {
    case "Twice Daily":
      numPerDay = 2;
    case "Daily":
      numPerDay = 1;
    default:
      numPerDay = 0;
  }
  return numPerDay;
};
