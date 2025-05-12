import { saveData, loadData } from "./storage.js";
import { renderTable } from "./table.js";
import { sortData, paginate, getTotalPages } from "./utils.js";

export function initUI(data) {
  AOS.init();

  let currentPage = 1;
  const rowsPerPage = 5;

  function displayPage(page) {
    currentPage = page;
    const pageData = paginate(data, currentPage, rowsPerPage);
    renderTable(pageData);
    updatePaginationControls();
  }

  function updatePaginationControls() {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";
    const totalPages = getTotalPages(data, rowsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.className = `page-item ${i === currentPage ? "active" : ""}`;
      const a = document.createElement("a");
      a.className = "page-link";
      a.href = "#";
      a.textContent = i;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        displayPage(i);
      });
      li.appendChild(a);
      paginationContainer.appendChild(li);
    }
  }

  // Initial render
  displayPage(currentPage);

  // Search functionality
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.role.toLowerCase().includes(query)
    );
    renderTable(paginate(filtered, 1, rowsPerPage));
    updatePaginationControls();
  });

  // Sorting
  document.querySelectorAll("#dataTable thead th").forEach((th, idx) => {
    if (idx > 0 && idx < 4) {
      let asc = true;
      th.style.cursor = "pointer";
      th.addEventListener("click", () => {
        const key = ["id", "name", "email", "role"][idx];
        sortData(data, key, asc);
        asc = !asc;
        displayPage(1);
      });
    }
  });

  // Add new entry
  const addForm = document.getElementById("addForm");
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("addName").value.trim();
    const email = document.getElementById("addEmail").value.trim();
    const role = document.getElementById("addRole").value.trim();
    if (name && email) {
      const newId = data.length ? Math.max(...data.map((d) => d.id)) + 1 : 1;
      const newItem = { id: newId, name, email, role };
      data.push(newItem);
      saveData("users", data);
      displayPage(getTotalPages(data, rowsPerPage));
      addForm.reset();
    }
  });

  // Edit/Delete functionality
  document.getElementById("dataTable").addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    if (!row) return;
    const id = parseInt(row.firstElementChild.textContent);
    const idx = data.findIndex((item) => item.id === id);

    if (e.target.classList.contains("delete-btn")) {
      if (idx > -1) {
        data.splice(idx, 1);
        saveData("users", data);
        displayPage(currentPage);
      }
    } else if (e.target.classList.contains("edit-btn")) {
      // Inline edit: make cells editable
      const row = e.target.closest("tr");
      const cells = row.children;
      for (let i = 1; i < 4; i++) {
        cells[i].contentEditable = "true";
        cells[i].classList.add("editing");
      }

      // Focus and select the "Name" cell
      const nameCell = cells[1];
      nameCell.focus();

      // Select the text content
      const range = document.createRange();
      range.selectNodeContents(nameCell);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      // Update button to "Save"
      e.target.textContent = "Save";
      e.target.classList.replace("btn-secondary", "btn-success");
      e.target.classList.add("save-btn");
      e.target.classList.remove("edit-btn");
    } else if (e.target.classList.contains("save-btn")) {
      // Save edited row
      const row = e.target.closest("tr");
      const id = parseInt(row.firstElementChild.textContent);
      const idx = data.findIndex((item) => item.id === id);
      const cells = row.children;
      const name = cells[1].textContent.trim();
      const email = cells[2].textContent.trim();
      const role = cells[3].textContent.trim();
      if (idx > -1 && name && email) {
        data[idx] = { id, name, email, role };
        saveData(data);
        renderTable(data);
      }
    }
  });

  // Export CSV
  const exportBtn = document.getElementById("exportBtn");
  exportBtn.addEventListener("click", () => {
    let csvContent = "ID,Name,Email,Role\n";
    data.forEach((item) => {
      csvContent += `${item.id},"${item.name}","${item.email}","${item.role}"\n`;
    });
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.download = "table_data.csv";
    link.href = URL.createObjectURL(blob);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
