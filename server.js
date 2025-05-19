const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html when user visits "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/send-alert', (req, res) => {
  const { reason, username, time } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cyberivt064@gmail.com',
      pass: 'nzhi koth ofan mscm'
    }
  });

  const mailOptions = {
    from: 'cyberivt064@gmail.com',
    to: 'cyberivt064@gmail.com',
    subject: '⚠️ Security Alert: Suspicious Login Attempt',
    text: `Reason: ${reason}\nUsername: ${username}\nTime: ${time}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email send failed:', error);
      res.status(500).send('Email failed');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent');
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
