function getYearsFrom1950() {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = 1995; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
}

// Example usage:
const years = getYearsFrom1950();

export default years;
