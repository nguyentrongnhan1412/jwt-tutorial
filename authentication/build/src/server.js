const express = require("express");
require('dotenv').config();
const initAPIRoutes = require('./routes/authAPI');
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
initAPIRoutes(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});