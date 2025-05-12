export function renderTable(data) {
  const tableBody = document.getElementById("dataTableBody");
  tableBody.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.email}</td>
      <td>${item.role}</td>
      <td>
        <button class="btn btn-sm btn-secondary edit-btn">Edit</button>
        <button class="btn btn-sm btn-danger delete-btn">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}
