// backend/server.js

const express = require('express');
const cors = require('cors');
const cohortRoutes = require('./routes/cohorts');

const app = express();
app.use(cors());
app.use(express.json());

// Route for cohorts (handles cohort actions like add, remove, get cohorts)
app.use('/api/cohorts', cohortRoutes);

// Port Configuration
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
