// Check if the admin is logged in
firebase.auth().onAuthStateChanged((user) => {
    if (user && user.emailVerified) {
        console.log("Admin logged in:", user.email);
        // Display main app interface
        displayVoterManagement();
        startAutoLogout();
    } else {
        // Redirect to login page
        window.location.href = "login.html";
    }
});

// Auto logout after inactivity (10 minutes)
let logoutTimer;
function startAutoLogout() {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
        firebase.auth().signOut();
        window.location.href = "login.html"; // Redirect to login after logout
    }, 600000); // 10 minutes
}

window.addEventListener("mousemove", startAutoLogout);
window.addEventListener("keydown", startAutoLogout);