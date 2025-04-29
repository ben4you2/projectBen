$();


document.addEventListener('DOMContentLoaded', function() {
  const cameraIcon = document.getElementById('cameraIcon');
  const modal = document.getElementById('cameraDetailsModal');
  const closeButton = modal.querySelector('.close-button');
  const cameraNameElement = document.getElementById('cameraName');
  const cameraModelElement = document.getElementById('cameraModel');
  const cameraResolutionElement = document.getElementById('cameraResolution');
  const cameraDateElement = document.getElementById('cameraDate');
  const cameraImageContainer = document.getElementById('cameraImageContainer');

  // Dummy camera data (replace with your actual data source)
  const cameraData = {
    name: "My Brand New Camera",
    model: "XYZ-5000",
    resolution: "4K",
    date: "2024-4-27",
    /*imageSrc: "/IMG_1323.jpeg" // Optional image path*/
  };
  

  cameraIcon.addEventListener('click', () => {
    // Populate the modal with camera details
    cameraNameElement.textContent = cameraData.name;
    cameraModelElement.textContent = cameraData.model;
    cameraResolutionElement.textContent = cameraData.resolution;
    cameraDateElement.textContent = cameraData.date;

    // Add the image if available
    cameraImageContainer.innerHTML = ''; // Clear previous image
    if (cameraData.imageSrc) {
      const img = document.createElement('img');
      img.src = cameraData.imageSrc;
      img.alt = cameraData.name;
      cameraImageContainer.appendChild(img);
    }

    modal.style.display = "block";
  });

  // Close the modal when the close button is clicked
  closeButton.addEventListener('click', () => {
    modal.style.display = "none";
  });

  // Close the modal if the user clicks outside of it
  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
});


