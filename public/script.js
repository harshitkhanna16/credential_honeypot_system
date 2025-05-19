let failedAttempts = 0;

function getCurrentHour() {
  return new Date().getHours();
}

function sendAlert(reason, username) {
  const time = new Date().toLocaleString();

  fetch('/send-alert', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reason, username, time })
  })
  .then(res => console.log('Alert sent:', res.status))
  .catch(err => console.error('Failed to send alert:', err));
}

function handleLogin() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const hour = getCurrentHour();

  const validUsername = "admin";
  const validPassword = "secure123";

  if (hour >= 0 && hour < 5) {
    sendAlert("Login attempt during odd hours", username);
    window.location.href = "access-denied.html";
    return;
  }

  if (username === "hacker" && password === "404") {
    sendAlert("Planted credentials used", username);
    window.location.href = "access-denied.html";
    return;
  }

  if (username === validUsername && password === validPassword) {
    failedAttempts = 0;
    window.location.href = "success.html";
  } else {
    failedAttempts++;
    if (failedAttempts >= 3) {
      sendAlert("3 failed login attempts", username);
      window.location.href = "access-denied.html";
    } else {
      alert(`Login failed. Attempt ${failedAttempts}/3`);
    }
  }
}
