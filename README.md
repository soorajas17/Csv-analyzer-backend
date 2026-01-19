# CSV Analyzer Backend

# Tech Stack
- Node.js
- Express.js
- Multer (CSV upload handling)
- JavaScript
---
# Features
- Upload CSV files (CSV only)
- Handles empty or malformed CSV files with readable error messages
- Column-wise statistics calculation:
  - Missing values
  - Minimum & Maximum
  - Mean, Median, Mode
- Histogram data generation for numeric columns
---
# Safety & Validation
- Accepts **only `.csv` files**
- Rejects invalid file formats
- Graceful error handling for empty or malformed CSV files
---
# Setup & Run Instructions
1. Clone the repository
   ```bash
git clone https://github.com/soorajas17/Csv-analyzer-backend.git
cd Csv-analyzer-backend
2.Install dependencies
npm install
3.Start the server
npm start
4.Server runs on
http://localhost:5000

# API Endpoints
1.Upload CSV
POST /upload
2.Get Dataset Rows
GET /dataset/:id
3.Get Column Statistics
GET /dataset/:id/column?column=columnName
4.Get Histogram Data
GET /dataset/:id/histogram?column=columnName

# Assumptions
1.CSV file contains a header row
2.Statistical calculations apply only to numeric columns
3.Data is stored temporarily in memory


# Limitations
1.No database persistence
2.Large CSV files may affect performance
