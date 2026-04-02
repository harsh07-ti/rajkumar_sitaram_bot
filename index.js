const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

// 🔐 Firebase Secrets from GitHub
const serviceAccount = JSON.parse(process.env.FIREBASE_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_URL
});

const db = admin.database();
const app = express();

app.use(bodyParser.json());

// ✅ Server Check
app.get("/", (req, res) => {
  res.send("Rajkumar Sitaram School Bot Running 🚀");
});

// ================================
// 📚 SCHOOL MODULES API
// ================================

// 1️⃣ Admission
app.post("/admission", async (req, res) => {
  try {
    await db.ref("admission").push(req.body);
    res.send("Admission Saved ✅");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 2️⃣ Attendance
app.post("/attendance", async (req, res) => {
  try {
    await db.ref("attendance").push(req.body);
    res.send("Attendance Saved ✅");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 3️⃣ Result
app.post("/result", async (req, res) => {
  try {
    await db.ref("result").push(req.body);
    res.send("Result Saved ✅");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 4️⃣ Fee
app.post("/fee", async (req, res) => {
  try {
    await db.ref("fee").push(req.body);
    res.send("Fee Saved ✅");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 5️⃣ Payment
app.post("/payment", async (req, res) => {
  try {
    await db.ref("payment").push(req.body);
    res.send("Payment Saved ✅");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 📊 Get Data (Admin Panel)
app.get("/data/:type", async (req, res) => {
  try {
    const snapshot = await db.ref(req.params.type).once("value");
    res.json(snapshot.val());
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 🚀 Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
