// server.js

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/loginLogs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schema and Model
const logSchema = new mongoose.Schema({
  username: String,
  reason: String,
  time: String
});
const Log = mongoose.model('Log', logSchema);

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cyberivt064@gmail.com',
    pass: 'rsos wjpt erzm jjlb'     // replace with your Gmail App Password
  }
});

// Routes
app.post('/send-alert', async (req, res) => {
  const { reason, username, time } = req.body;

  const mailOptions = {
    from: 'cyberivt064@gmail.com',
    to: 'cyberivt064@gmail.com',
    subject: '⚠️ Security Alert: Suspicious Login Attempt',
    text: `Reason: ${reason}\nUsername: ${username}\nTime: ${time}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Alert email sent');

    const newLog = new Log({ username, reason, time });
    await newLog.save();

    res.status(200).send('Alert sent and logged');
  } catch (error) {
    console.error('Failed to send alert or save log:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/logs', async (req, res) => {
  try {
    const logs = await Log.find().sort({ time: -1 });
    res.json(logs);
  } catch (err) {
    console.error("Failed to fetch logs:", err);
    res.status(500).send("Error fetching logs");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
