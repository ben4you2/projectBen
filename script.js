// 🚀 Authentication System (Local Storage)
function register() {
  let username = document.getElementById("register-username").value;
  let password = document.getElementById("register-password").value;
  if (username && password) {
    localStorage.setItem(username, btoa(password)); // Encrypt password (basic)
    alert("Registration successful! You can now log in.");
    showLogin();
  } else {
    alert("Please enter valid details.");
  }
}

function login() {
  let username = document.getElementById("login-username").value;
  let password = document.getElementById("login-password").value;
  let storedPassword = localStorage.getItem(username);
  
  if (storedPassword && atob(storedPassword) === password) {
    localStorage.setItem("loggedInUser", username);
    window.location.href = "dashboard.html"; // Redirect
  } else {
    alert("Invalid login credentials!");
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

// 🏠 Show Login/Register Forms
function showRegister() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "block";
}

function showLogin() {
  document.getElementById("register-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

// 🚨 Emergency Request System
function submitEmergency() {
  let desc = document.getElementById("emergency-desc").value;
  if (!desc) {
    alert("Please enter emergency details.");
    return;
  }
  
  let emergencies = JSON.parse(localStorage.getItem("emergencies")) || [];
  let newEmergency = { id: Date.now(), description: desc, status: "Pending", comments: [] };
  emergencies.push(newEmergency);
  localStorage.setItem("emergencies", JSON.stringify(emergencies));
  
  document.getElementById("emergency-desc").value = ""; // Clear input
  loadEmergencies();
}

// 📜 Load Emergency Requests
function loadEmergencies() {
  let list = document.getElementById("emergency-list");
  list.innerHTML = "";
  
  let emergencies = JSON.parse(localStorage.getItem("emergencies")) || [];
  emergencies.forEach(emergency => {
    let li = document.createElement("li");
    li.innerHTML = `
            <strong>${emergency.description}</strong> 
            <span style="color:${emergency.status === 'Resolved' ? 'green' : 'red'}">(${emergency.status})</span>
          // <button onclick ="addComment(${emergency.id})">Comment</button>
          // <button onclick="resolveEmergency(${emergency.id})">Mark Resolved</button>
            <ul id="comments-${emergency.id}">
                ${emergency.comments.map(comment => `<li>${comment}</li>`).join("")}
            </ul>
        `;
    list.appendChild(li);
  });
}

// ✍️ Add Comment to Emergency
function addComment(id) {
  let comment = prompt("Enter your comment:");
  if (!comment) return;
  
  let emergencies = JSON.parse(localStorage.getItem("emergencies")) || [];
  let emergency = emergencies.find(e => e.id === id);
  emergency.comments.push(comment);
  localStorage.setItem("emergencies", JSON.stringify(emergencies));
  
  loadEmergencies();
}

// ✅ Mark Emergency as Resolved
function resolveEmergency(id) {
  let emergencies = JSON.parse(localStorage.getItem("emergencies")) || [];
  let emergency = emergencies.find(e => e.id === id);
  emergency.status = "Resolved";
  localStorage.setItem("emergencies", JSON.stringify(emergencies));
  
  loadEmergencies();
}

// 🔄 Load emergencies when dashboard is opened
if (window.location.pathname.includes("dashboard.html")) {
  loadEmergencies();
}
