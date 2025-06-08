
import app from "./src/app.js";
import connection from "./src/Configuration/DB.js";
import dotenv from 'dotenv';
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});