// emergency.js

class EmergencyManager {
  constructor() {
    this.emergencies = JSON.parse(localStorage.getItem('emergencies')) || [];
  }

  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  saveToLocalStorage() {
    localStorage.setItem('emergencies', JSON.stringify(this.emergencies));
  }

  addEmergency(name, phone, location, type, description) {
    const newEmergency = {
      id: this.generateId(),
      name,
      phone,
      location,
      type,
      description,
      timestamp: new Date(),
      notified: false,
    };
    this.emergencies.push(newEmergency);
    this.saveToLocalStorage();
    return newEmergency;
  }

  getEmergencies() {
    return this.emergencies;
  }

  deleteEmergency(id) {
    this.emergencies = this.emergencies.filter((emergency) => emergency.id !== id);
    this.saveToLocalStorage();
  }

  sendNotification(id) {
    const emergency = this.emergencies.find((e) => e.id === id);
    if (emergency) {
      // In a real application, implement SMS gateway integration here.
      console.log(`Sending notification to ${emergency.phone} for ${emergency.type} at ${emergency.location}`);
      emergency.notified = true;
      this.saveToLocalStorage();
    }
  }

  getEmergency(id) {
    return this.emergencies.find((emergency) => emergency.id === id);
  }

  updateEmergency(updatedEmergency) {
    const index = this.emergencies.findIndex(emergency => emergency.id === updatedEmergency.id);
    if(index !== -1){
        this.emergencies[index] = updatedEmergency;
        this.saveToLocalStorage();
    }
  }
}

const emergencyManager = new EmergencyManager();

function displayEmergencies() {
  const emergencies = emergencyManager.getEmergencies();
  const emergencyList = document.getElementById('emergencyList');
  if (emergencyList) {
    emergencyList.innerHTML = '';
    emergencies.forEach((emergency) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${emergency.name} - ${emergency.type} at ${emergency.location}`;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => {
        emergencyManager.deleteEmergency(emergency.id);
        displayEmergencies();
      };

      const notifyButton = document.createElement('button');
      notifyButton.textContent = 'Notify';
      notifyButton.onclick = () => {
        emergencyManager.sendNotification(emergency.id);
        displayEmergencies();
      };
      listItem.appendChild(deleteButton);
      listItem.appendChild(notifyButton);

      emergencyList.appendChild(listItem);
    });
  }
}

function addEmergency() {
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const locationInput = document.getElementById('location');
  const typeSelect = document.getElementById('type');
  const descriptionInput = document.getElementById('description');

  if (nameInput && phoneInput && locationInput && typeSelect && descriptionInput) {
    emergencyManager.addEmergency(
      nameInput.value,
      phoneInput.value,
      locationInput.value,
      typeSelect.value,
      descriptionInput.value
    );
    nameInput.value = '';
    phoneInput.value = '';
    locationInput.value = '';
    descriptionInput.value = '';
    displayEmergencies();
  }
}

document.addEventListener('DOMContentLoaded', displayEmergencies);

/*
<input type="text" id="name" placeholder="Name">
<input type="tel" id="phone" placeholder="Phone">
<input type="text" id="location" placeholder="Location">
<select id="type">
  <option value="Fire">Fire</option>
  <option value="Medical">Medical</option>
  <option value="Police">Police</option>
  <option value="Accident">Accident</option>
  <option value="Other">Other</option>
</select>
<textarea id="description" placeholder="Description"></textarea>
<button onclick="addEmergency()">Add Emergency</button>
<ul id="emergencyList"></ul>
*/
