document.addEventListener("DOMContentLoaded", function() {
  // Search functionality
  const searchInput = document.getElementById("searchVoter");
  searchInput.addEventListener("input", function() {
    const searchTerm = searchInput.value.toLowerCase();
    const voters = document.querySelectorAll(".voter");
    voters.forEach(voter => {
      const name = voter.querySelector(".voter-name").textContent.toLowerCase();
      const id = voter.querySelector(".voter-id").textContent.toLowerCase();
      if (name.includes(searchTerm) || id.includes(searchTerm)) {
        voter.style.display = "block";
      } else {
        voter.style.display = "none";
      }
    });
  });
  
  // Register voter button functionality
  document.getElementById("registerVoterButton").addEventListener("click", function(event) {
    event.preventDefault();
    if (formIsValid()) {
      registerVoter();
    } else {
      Swal.fire("Error", "Please fill in all the required fields.", "error");
    }
  });
  
  function formIsValid() {
    return document.getElementById("voterName").value && document.getElementById("voterId").value;
  }
  
  function registerVoter() {
    // Add voter registration logic
    const name = document.getElementById("voterName").value;
    const id = document.getElementById("voterId").value;
    
    // You can store the voter data in a local storage or your database here
    
    // Add to voter list
    const voterList = document.getElementById("voterList");
    const newVoter = document.createElement("div");
    newVoter.classList.add("voter", "mb-4", "p-4", "border", "rounded-lg", "bg-white");
    newVoter.innerHTML = `<p class="voter-name">${name}</p><p class="voter-id">${id}</p>`;
    voterList.appendChild(newVoter);
    
    // Alert success
    Swal.fire("Success!", "Voter has been successfully registered!", "success");
    
    // Clear form
    document.getElementById("voterForm").reset();
  }
  
  // Image upload or camera capture
  document.getElementById("imageInput").addEventListener("change", function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function() {
        const imagePreview = document.getElementById("imagePreview");
        imagePreview.src = reader.result;
        imagePreview.classList.remove("hidden");
      };
      reader.readAsDataURL(file);
    }
  });
});