require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// DB - backend
// Database Info
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kunjesh123",
  database: "Webproject",
});

// Database connection
db.connect((err) => {
  if (err) {
    console.error("MySQL Connection Error:", err);
    process.exit(1); // Exit if the database connection fails
  }
  console.log("MySQL Connected...");
});

// Frontend - backend
// Login
app.post("/api/login", (req, res) => {
  console.log("Received Request:", req.body);
  const { id, password, role } = req.body;

  let table = "";
  if (role === "student login") table = "Student";
  else if (role === "placement login") table = "Placement";
  else if (role === "eduroam login") table = "Edurom";
  else if (role === "guest login") table = "Guest";
  else return res.status(400).json({ message: "Invalid role" });

  const sql = `SELECT * FROM ${table} WHERE id = ? AND password = ?`;
  db.query(sql, [id, password], (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (result.length === 0) return res.status(400).json({ message: "Invalid ID or password" });

    const user = result[0];
    const token = jwt.sign({ id: user.id, role }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token, user });
  });
});

// Get inforamtion for user
app.get('/api/devices/:dept/:categories', (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { dept, categories } = req.params;
    const categoryList = categories.split(",");

    let queryWiFi = "SELECT * FROM WiFi WHERE Location = ?";
    let querySwitches = "SELECT * FROM Switch WHERE Location = ?";
    let queryParamsWiFi = [dept];
    let queryParamsSwitches = [dept];

    if (categoryList.includes('E') || decoded.role === 'E') {
      console.log("Fetching all WiFi and Switches for role E");
    } else {
      queryWiFi += " AND Category IN (?)";
      querySwitches += " AND Category IN (?)";
      queryParamsWiFi.push(categoryList);
      queryParamsSwitches.push(categoryList);
    }

    db.query(queryWiFi, queryParamsWiFi, (err, wifiResults) => {
      if (err) return res.status(500).send(err);

      db.query(querySwitches, queryParamsSwitches, (err, switchResults) => {
        if (err) return res.status(500).send(err);

        res.json({ wifi: wifiResults, switches: switchResults });
      });
    });
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
});

// Admin - backend
// Add WiFi Details
app.post("/api/wifi/add", (req, res) => {
  const { WiFiId, IP_Addr, Location, Category, Password } = req.body;  

  if (!WiFiId || !IP_Addr || !Location || !Category || !Password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const sql = "INSERT INTO WiFi (WiFiId, IP_Addr, Location, Category, Password) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [WiFiId, IP_Addr, Location, Category, Password], (err) => {
    if (err) {
      console.error("Error inserting WiFi data:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    res.json({ success: true, message: "WiFi details added successfully" });
  });
});

// Add Switch Details
app.post('/api/switch/add', (req, res) => {
  const { SwitchId, IP_Addr, Location, Category } = req.body;  

  if (!SwitchId || !Location || !Category || !IP_Addr) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const sql = "INSERT INTO Switch (SwitchId, IP_Addr, Location, Category) VALUES (?, ?, ?, ?)";
  db.query(sql, [SwitchId, IP_Addr, Location, Category], (err) => {
    if (err) {
      console.error("Error inserting Switch data:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    res.json({ success: true, message: "Switch details added successfully" });
  });
});

// DELETE WiFi
app.delete("/api/wifi/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM WiFi WHERE WiFiId = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Error deleting WiFi", error: err });
    }
    return res.json({ success: true, message: "WiFi deleted successfully" });
  });
});

// DELETE Switch
app.delete("/api/switch/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Switch WHERE SwitchId = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Error deleting Switch", error: err });
    }
    return res.json({ success: true, message: "Switch deleted successfully" });
  });
});

// Get 
app.get('/api/wifi/list', (req, res) => {
  db.query("SELECT * FROM WiFi", (err, result) => {
      if (err) return res.status(500).json({ success: false, message: "DB Error" });
      res.json({ success: true, data: result });
  });
});

app.get('/api/switch/list', (req, res) => {
  db.query("SELECT * FROM Switch", (err, result) => {
      if (err) return res.status(500).json({ success: false, message: "DB Error" });
      res.json({ success: true, data: result });
  });
});

app.get('/api/:type/get/:id', (req, res) => {
  const table = req.params.type === 'wifi' ? 'WiFi' : 'Switch';
  db.query(`SELECT * FROM ${table} WHERE ${table}Id = ?`, [req.params.id], (err, result) => {
      if (err || result.length === 0) return res.status(500).json({ success: false, message: "DB Error" });
      res.json({ success: true, data: result[0] });
  });
});

//Update
app.post('/api/:type/update', (req, res) => {
  const table = req.params.type === 'wifi' ? 'WiFi' : 'Switch';
  const idField = req.params.type === 'wifi' ? 'WiFiId' : 'SwitchId';

  // Extract IDs
  const originalId = req.body.originalId;  // Old ID (WHERE clause)
  const newId = req.body[idField];         // Updated ID (SET clause)

  if (!originalId || !newId) {
      return res.status(400).json({ success: false, message: "Missing ID for update" });
  }

  // Remove originalId from update fields
  const updateFields = { ...req.body };
  delete updateFields.originalId;

  // Create update query
  const updates = Object.keys(updateFields).map(key => `${key} = ?`).join(', ');
  const values = [...Object.values(updateFields), originalId];

  db.query(`UPDATE ${table} SET ${updates} WHERE ${idField} = ?`, values, (err) => {
      if (err) return res.status(500).json({ success: false, message: "DB Error" });
      res.json({ success: true, message: "Updated Successfully" });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
