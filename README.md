## User Management Table
A simple and intuitive User Management Table built with React that allows users to add, edit, delete, and search user records. Users can manage details like name, email, and role, and also export the data as a CSV file.

✨ Features
✅ Add new users

✏️ Edit existing user details

❌ Delete individual or multiple users

🔍 Real-time search filter

📤 Export data as CSV


🚀 Getting Started
1. Clone the Repository
git clone https://github.com/your-username/user-management-table.git
cd user-management-table
2. Install Dependencies
npm install

3. Start the Development Server
npm start
App will run on http://localhost:3000

🛠️ Tech Stack
HTML, CSS, JS

FileSaver / papaparse (for CSV export)

📁 Folder Structure (Optional)

src/
├── js/
│   ├── UserTable.js
│   ├── UserForm.js
│   └── SearchBar.js
├── utils/
│   └── csvExport.js
├── style.css
└── index.js

📦 CSV Export
User data can be exported at any time using the "Export CSV" button. The downloaded file will include all visible user details (Name, Email, Role).

🔍 Search
Type into the search bar to filter users by name, email, or role — updated in real time.

📋 Example User Object
json
Copy
Edit
{
  "id": 1,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "role": "Admin"
}
🙌 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

📄 License
This project is open-source and available under the MIT License.