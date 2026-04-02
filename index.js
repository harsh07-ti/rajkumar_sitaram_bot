const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

const app = express();
app.use(bodyParser.json());

// Firebase Config
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com"
});

const db = admin.database();

// WhatsApp Webhook
app.post("/webhook", async (req, res) => {
  const message = req.body.message;
  const number = req.body.from;

  let reply = "❌ Invalid Option";

  if (message === "1") {
    reply = "📘 Admission Details:\nName: Rajkumar School\nApply Online: Link...";
  }

  else if (message === "2") {
    const snap = await db.ref("attendance/" + number).once("value");
    reply = "📅 Attendance: " + (snap.val() || "No Data");
  }

  else if (message === "3") {
    const snap = await db.ref("result/" + number).once("value");
    reply = "📊 Result: " + (snap.val() || "No Result Found");
  }

  else if (message === "4") {
    const snap = await db.ref("fees/" + number).once("value");
    reply = "💰 Fee Status: " + (snap.val() || "No Data");
  }

  else if (message === "5") {
    reply = "💳 Payment Link:\nhttps://yourpaymentlink.com";
  }

  else {
    reply = `👋 Welcome to Rajkumar Sitaram School

Reply with:
1️⃣ Admission
2️⃣ Attendance
3️⃣ Result
4️⃣ Fee
5️⃣ Payment`;
  }

  console.log("Reply:", reply);
  res.send({ reply });
});

// Server Start
app.listen(3000, () => console.log("🚀 Bot Running on Port 3000"));
