const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const taskRoutes = require('./routes/tasks');
const habitRoutes = require('./routes/habits');

app.use('/api/tasks', taskRoutes);
app.use('/api/habits', habitRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
