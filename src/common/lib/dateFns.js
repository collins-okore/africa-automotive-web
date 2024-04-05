function formatDate(date) {
  // Validate if date is a valid Date object
  if (!(date instanceof Date && !isNaN(date))) {
    return "Invalid date";
  }

  const dayOfMonth = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // Function to get ordinal suffix for day
  function getOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const ordinalSuffix = getOrdinalSuffix(dayOfMonth);

  return `${dayOfMonth}${ordinalSuffix} ${monthNames[monthIndex]} ${year}`;
}

export { formatDate };
