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
- Clone the repository
   ```bash
git clone https://github.com/soorajas17/Csv-analyzer-backend.git
cd Csv-analyzer-backend
- Install dependencies
  npm install
- Start the server
  npm start
- Server runs on
  http://localhost:5000

# API Endpoints
- Upload CSV
  POST /upload
- Get Dataset Rows
  GET /dataset/:id
- Get Column Statistics
  GET /dataset/:id/column?column=columnName
- Get Histogram Data
  GET /dataset/:id/histogram?column=columnName

# Assumptions
- CSV file contains a header row
- Statistical calculations apply only to numeric columns
- Data is stored temporarily in memory


# Limitations
- No database persistence
- Large CSV files may affect performance
