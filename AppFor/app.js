document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("voterForm");
  const voterList = document.getElementById("voterList");
  const searchInput = document.getElementById("search");
  const generatePdfBtn = document.getElementById("generatePdf");
  let voters = JSON.parse(localStorage.getItem("voters")) || [];
  
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const idNumber = document.getElementById("idNumber").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const photo = document.getElementById("photo").files[0];
    
    if (name && idNumber && email && address && photo) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const voter = { name, idNumber, email, address, photo: e.target.result };
        voters.push(voter);
        localStorage.setItem("voters", JSON.stringify(voters));
        displayVoters();
        form.reset();
      };
      reader.readAsDataURL(photo);
    }
  });
  
  function displayVoters() {
    voterList.innerHTML = "";
    voters.forEach((voter, index) => {
      const li = document.createElement("li");
      li.classList.add("p-2", "border-b", "flex", "justify-between", "items-center");
      li.innerHTML = `
                <div>
                    <strong>${voter.name}</strong> - ${voter.idNumber}
                    <br>
                    <img src="${voter.photo}" class="w-12 h-12 rounded-full">
                </div>
                <button onclick="deleteVoter(${index})" class="text-red-500">Delete</button>
            `;
      voterList.appendChild(li);
    });
  }
  
  window.deleteVoter = function(index) {
    voters.splice(index, 1);
    localStorage.setItem("voters", JSON.stringify(voters));
    displayVoters();
  };
  
  searchInput.addEventListener("input", function() {
    const query = searchInput.value.toLowerCase();
    const filteredVoters = voters.filter(voter => voter.name.toLowerCase().includes(query));
    voterList.innerHTML = "";
    filteredVoters.forEach((voter, index) => {
      const li = document.createElement("li");
      li.classList.add("p-2", "border-b");
      li.innerHTML = `<strong>${voter.name}</strong> - ${voter.idNumber}`;
      voterList.appendChild(li);
    });
  });
  
  function generateChart() {
    const ctx = document.getElementById("voterChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: voters.map(voter => voter.name),
        datasets: [{
          label: "Voter Registrations",
          data: voters.map(() => 1),
          backgroundColor: "blue"
        }]
      }
    });
  }
  
  generatePdfBtn.addEventListener("click", function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Voter List", 10, 10);
    voters.forEach((voter, i) => {
      doc.text(`${i + 1}. ${voter.name} - ${voter.idNumber}`, 10, 20 + i * 10);
    });
    doc.save("voters.pdf");
  });
  
  displayVoters();
  generateChart();
});


// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


// Register admin account
document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Admin Registered:", user.email);
      // Send verification email
      user.sendEmailVerification()
        .then(() => {
          alert("Verification email sent!");
          window.location.href = "login.html"; // Redirect to login
        })
        .catch((error) => {
          console.error(error.message);
        });
    })
    .catch((error) => {
      console.error(error.message);
    });
});


// Login admin account
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user.emailVerified) {
        console.log("Logged in:", user.email);
        // Redirect to the main app page
        window.location.href = "index.html";
      } else {
        alert("Please verify your email before logging in.");
      }
    })
    .catch((error) => {
      console.error(error.message);
    });
});

// Reset password
document.getElementById("forgotPasswordForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("resetEmail").value;
  
  auth.sendPasswordResetEmail(email)
    .then(() => {
      alert("Password reset email sent!");
    })
    .catch((error) => {
      console.error(error.message);
    });
});


// Check if the admin is logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        if (user.emailVerified) {
            console.log("Admin logged in:", user.email);
            // Display voter management system
            displayVoterManagement();
        } else {
            window.location.href = "login.html"; // Redirect to login
        }
    } else {
        window.location.href = "login.html"; // Redirect to login if no user
    }
});

// Auto logout after inactivity (10 minutes)
let logoutTimer;
function resetLogoutTimer() {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
        auth.signOut();
        window.location.href = "login.html"; // Redirect to login after logout
    }, 600000); // 10 minutes
}

window.addEventListener("mousemove", resetLogoutTimer);
window.addEventListener("keydown", resetLogoutTimer);

/** Voter lookup**/

document.getElementById("voterLookupForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const voterId = document.getElementById("voterId").value;
  
  // Look up voter by ID in LocalStorage
  const voterData = JSON.parse(localStorage.getItem("voters")) || [];
  const voter = voterData.find(v => v.id === voterId);
  
  if (voter) {
    document.getElementById("voterDetails").innerHTML = `
            <p>Name: ${voter.name}</p>
            <p>Email: ${voter.email}</p>
            <p>Address: ${voter.address}</p>
            <p>Registration Status: Registered</p>
        `;
  } else {
    document.getElementById("voterDetails").innerHTML = `
            <p>No voter found with this ID.</p>
        `;
  }
});