export function sortData(data, key, asc = true) {
  return data.sort((a, b) => {
    if (a[key] < b[key]) return asc ? -1 : 1;
    if (a[key] > b[key]) return asc ? 1 : -1;
    return 0;
  });
}

export function paginate(data, currentPage, rowsPerPage) {
  const start = (currentPage - 1) * rowsPerPage;
  return data.slice(start, start + rowsPerPage);
}

export function getTotalPages(data, rowsPerPage) {
  return Math.ceil(data.length / rowsPerPage);
}
