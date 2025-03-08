// emergency.ts

/*interface Emergency {
  id: string;
  name: string;
  phone: string;
  location: string;
  type: 'Fire' | 'Medical' | 'Police' | 'Accident' | 'Other';
  description: string;
  timestamp: Date;
  notified: boolean;
}

class EmergencyManager {
  private emergencies: Emergency[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('emergencies', JSON.stringify(this.emergencies));
  }

  private loadFromLocalStorage(): void {
    const storedEmergencies = localStorage.getItem('emergencies');
    if (storedEmergencies) {
      try {
        this.emergencies = JSON.parse(storedEmergencies);
      } catch (error) {
        console.error("Error parsing stored emergencies:", error);
        this.emergencies = []; // Reset if parsing fails
      }
    }
  }

  addEmergency(
    name: string,
    phone: string,
    location: string,
    type: Emergency['type'],
    description: string
  ): Emergency {
    const newEmergency: Emergency = {
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

  getEmergencies(): Emergency[] {
    return this.emergencies;
  }

  deleteEmergency(id: string): void {
    this.emergencies = this.emergencies.filter((emergency) => emergency.id !== id);
    this.saveToLocalStorage();
  }

  sendNotification(id: string): void {
    const emergency = this.emergencies.find((e) => e.id === id);
    if (emergency) {
      // In a real application, implement SMS gateway integration here.
      console.log(`Sending notification to ${emergency.phone} for ${emergency.type} at ${emergency.location}`);
      emergency.notified = true;
      this.saveToLocalStorage();
    }
  }

  getEmergency(id: string): Emergency | undefined {
    return this.emergencies.find((emergency) => emergency.id === id);
  }

  updateEmergency(updatedEmergency: Emergency): void {
    const index = this.emergencies.findIndex(emergency => emergency.id === updatedEmergency.id);
    if(index !== -1){
        this.emergencies[index] = updatedEmergency;
        this.saveToLocalStorage()
    }
  }
}

// Example Usage (in an HTML/JavaScript context):

const emergencyManager = new EmergencyManager();

function displayEmergencies(): void {
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

function addEmergency(): void {
  const nameInput = document.getElementById('name') as HTMLInputElement;
  const phoneInput = document.getElementById('phone') as HTMLInputElement;
  const locationInput = document.getElementById('location') as HTMLInputElement;
  const typeSelect = document.getElementById('type') as HTMLSelectElement;
  const descriptionInput = document.getElementById('description') as HTMLTextAreaElement;

  if (nameInput && phoneInput && locationInput && typeSelect && descriptionInput) {
    emergencyManager.addEmergency(
      nameInput.value,
      phoneInput.value,
      locationInput.value,
      typeSelect.value as Emergency['type'],
      descriptionInput.value
    );
    nameInput.value = '';
    phoneInput.value = '';
    locationInput.value = '';
    descriptionInput.value = '';
    displayEmergencies();
  }
}

// Call displayEmergencies() on page load
document.addEventListener('DOMContentLoaded', displayEmergencies);

// Example HTML (basic):

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

*/


// emergency.ts

interface Emergency {
  id: string;
  name: string;
  phone: string;
  location: string;
  type: 'Fire' | 'Medical' | 'Police' | 'Accident' | 'Other';
  description: string;
  timestamp: Date;
  notified: boolean;
}

class EmergencyManager {
  private emergencies: Emergency[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('emergencies', JSON.stringify(this.emergencies));
  }

  private loadFromLocalStorage(): void {
    const storedEmergencies = localStorage.getItem('emergencies');
    if (storedEmergencies) {
      this.emergencies = JSON.parse(storedEmergencies);
    }
  }

  addEmergency(
    name: string,
    phone: string,
    location: string,
    type: Emergency['type'],
    description: string
  ): Emergency {
    const newEmergency: Emergency = {
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

  getEmergencies(): Emergency[] {
    return this.emergencies;
  }

  deleteEmergency(id: string): void {
    this.emergencies = this.emergencies.filter((emergency) => emergency.id !== id);
    this.saveToLocalStorage();
  }

  sendNotification(id: string): void {
    const emergency = this.emergencies.find((e) => e.id === id);
    if (emergency) {
      // In a real application, implement SMS gateway integration here.
      console.log(`Sending notification to ${emergency.phone} for ${emergency.type} at ${emergency.location}`);
      emergency.notified = true;
      this.saveToLocalStorage();
    }
  }

  getEmergency(id: string): Emergency | undefined {
    return this.emergencies.find((emergency) => emergency.id === id);
  }

  updateEmergency(updatedEmergency: Emergency): void {
    const index = this.emergencies.findIndex(emergency => emergency.id === updatedEmergency.id);
    if(index !== -1){
        this.emergencies[index] = updatedEmergency;
        this.saveToLocalStorage()
    }
  }
}

// Example Usage (in an HTML/JavaScript context):

const emergencyManager = new EmergencyManager();

function displayEmergencies(): void {
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

function addEmergency(): void {
  const nameInput = document.getElementById('name') as HTMLInputElement;
  const phoneInput = document.getElementById('phone') as HTMLInputElement;
  const locationInput = document.getElementById('location') as HTMLInputElement;
  const typeSelect = document.getElementById('type') as HTMLSelectElement;
  const descriptionInput = document.getElementById('description') as HTMLTextAreaElement;

  if (nameInput && phoneInput && locationInput && typeSelect && descriptionInput) {
    emergencyManager.addEmergency(
      nameInput.value,
      phoneInput.value,
      locationInput.value,
      typeSelect.value as Emergency['type'],
      descriptionInput.value
    );
    nameInput.value = '';
    phoneInput.value = '';
    locationInput.value = '';
    descriptionInput.value = '';
    displayEmergencies();
  }
}

// Call displayEmergencies() on page load
document.addEventListener('DOMContentLoaded', displayEmergencies);

// Example HTML (basic):

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
