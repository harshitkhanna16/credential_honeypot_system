# Credential Honeypot System

A security-focused honeypot system designed to simulate a login portal, capture unauthorized login attempts, log attacker information, and alert the administrator via email.

## Workflow

- A Login page.
- If correct actual credentials ---> Go to Success Page.
- If credentials are wrong 3 times ---> Redirect to Access Denied Page + log attacker details  and send Alert on Mail.
-If login happens at odd hours (like after 12:00 AM or customizable hours) ---> Redirect to Access Denied Page + log attacker details  and send Alert on Mail.
- If correct planted credentials ---> Redirect to Access Denied Page + log attacker details  and send Alert on Mail.

## Features
- Fake login system with realistic UI
- Tracks failed login attempts
- Logs attacker details (IP address and timestamp)
- Sends real-time email alerts on unauthorized access
- Blocks access during odd hours
- Detects planted (fake) credentials
- Redirects users after suspicious activity

## Technologies Used
- Node.js
- Express.js
- Nodemailer (for email alerts)
- HTML, CSS, JavaScript (Frontend

## Project Structure
credential_honeypot_system/
│
├── public/ # Contains HTML, CSS, and client-side JS files
├── server.js # Main backend server file (Node.js)
├── package.json # Project dependencies and metadata
└── README.md # Project documentation

## To Do-
- Implement IP address detection and logging  
- Add IP blocking feature after repeated failures  
- Enhance UI/UX for a more convincing honeypot

  ## Author-
  Developed by **Harshit Khanna**, **Divyanshu Sharma**, and **Kshitij Bansal**
