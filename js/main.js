import { loadData, saveData } from "./storage.js";
import { initUI } from "./ui.js";

// Load data from localStorage or fallback to sample.json
async function initializeApp() {
  let data = loadData("users");
  if (data.length === 0) {
    try {
      const response = await fetch("../data/sample.json");
      data = await response.json();
      saveData("users", data);
    } catch (error) {
      console.error("Failed to load sample data:", error);
      data = [];
    }
  }
  initUI(data);
}

initializeApp();
