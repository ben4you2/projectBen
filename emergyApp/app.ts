// app.ts
type EmergencyType = 'robbery' | 'assault' | 'gunshot' | 'theft' | 'argument';

interface EmergencyReport {
  type: EmergencyType;
  location: GeolocationCoordinates | null;
  timestamp: Date;
  audioRecording?: Blob;
  additionalInfo: string;
}

class EmergencyReporter {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  constructor() {
    this.initUI();
    this.requestLocationPermissions();
  }

  private initUI(): void {
    const appContainer = document.createElement('div');
    appContainer.id = 'app';
    document.body.appendChild(appContainer);

    this.createEmergencyButtons();
    this.createRecordingUI();
  }

  private createEmergencyButtons(): void {
    const emergencyTypes: EmergencyType[] = [
      'robbery', 'assault', 'gunshot', 'theft', 'argument'
    ];

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'emergency-buttons';

    emergencyTypes.forEach(type => {
      const button = document.createElement('button');
      button.className = `emergency-btn ${type}`;
      button.textContent = this.formatType(type);
      button.addEventListener('click', () => this.handleEmergency(type));
      buttonsContainer.appendChild(button);
    });

    document.getElementById('app')?.appendChild(buttonsContainer);
  }

  private createRecordingUI(): void {
    const recordingContainer = document.createElement('div');
    recordingContainer.className = 'recording-ui';

    const recordButton = document.createElement('button');
    recordButton.id = 'record-btn';
    recordButton.textContent = 'Start Recording';
    recordButton.addEventListener('click', () => this.toggleRecording());

    recordingContainer.appendChild(recordButton);
    document.getElementById('app')?.appendChild(recordingContainer);
  }

  private async handleEmergency(type: EmergencyType): Promise<void> {
    const location = await this.getCurrentLocation();
    const report: EmergencyReport = {
      type,
      location,
      timestamp: new Date(),
      additionalInfo: ''
    };

    this.showAdditionalInfoDialog(report);
  }

  private async getCurrentLocation(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
      }

      navigator.geolocation.getCurrentPosition(
        position => resolve(position.coords),
        error => reject(error),
        { enableHighAccuracy: true, timeout: 5000 }
      );
    });
  }

  private async toggleRecording(): Promise<void> {
    if (!this.mediaRecorder) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      
      this.mediaRecorder.ondataavailable = e => {
        this.audioChunks.push(e.data);
      };

      this.mediaRecorder.start();
      document.getElementById('record-btn')!.textContent = 'Stop Recording';
    } else {
      this.mediaRecorder.stop();
      this.mediaRecorder = null;
      document.getElementById('record-btn')!.textContent = 'Start Recording';
    }
  }

  private showAdditionalInfoDialog(report: EmergencyReport): void {
    // Implementation for additional info input
  }

  private formatType(type: EmergencyType): string {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }

  private async submitReport(report: EmergencyReport): Promise<void> {
    try {
      const response = await fetch('/api/emergency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...report,
          audioRecording: this.audioChunks.length > 0 
            ? await this.blobToBase64(new Blob(this.audioChunks)) 
            : null
        })
      });

      if (!response.ok) throw new Error('Submission failed');
      this.showConfirmation();
    } catch (error) {
      this.showError('Failed to submit report. Please try again.');
    }
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  private showConfirmation(): void {
    // Implementation for success notification
  }

  private showError(message: string): void {
    // Implementation for error handling
  }
}

// Initialize application
new EmergencyReporter();


// Test case matrix
const testCases: EmergencyType[] = [
  'robbery',
  'assault',
  'gunshot',
  'theft',
  'argument'
];

testCases.forEach(type => {
  document.querySelector(`.${type}`)?.click();
});


console.log('Audio chunks:', this.audioChunks.length);


// Mock Geolocation
navigator.geolocation = {
  getCurrentPosition: (success) => {
    success({
      coords: {
        latitude: 40.7128,
        longitude: -74.0060,
        accuracy: 50
      },
      timestamp: Date.now()
    });
  }
};

// Test emergency report flow
const testReport: EmergencyReport = {
  type: 'assault',
  location: {
    latitude: 40.7128,
    longitude: -74.0060,
    accuracy: 50,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null
  },
  timestamp: new Date(),
  additionalInfo: 'Test emergency'
};

// Verify report submission
fetchMock.mockResponseOnce(JSON.stringify({ success: true }));
await emergencyReporter.submitReport(testReport);
expect(fetchMock).toHaveBeenCalledWith('/api/emergency', expect.any(Object));


// Test geolocation failure
navigator.geolocation.getCurrentPosition = (_, error) => {
  error(new GeolocationPositionError());
};
await expect(emergencyReporter.getCurrentLocation()).rejects.toThrow();

// Test audio recording failure
jest.spyOn(MediaRecorder.prototype, 'start').mockImplementation(() => {
  throw new Error('Audio error');
});
await expect(emergencyReporter.toggleRecording()).rejects.toThrow();

// Add audio constraints
navigator.mediaDevices.getUserMedia({
  audio: {
    sampleRate: 44100,
    channelCount: 1,
    echoCancellation: true
  }
});

/**
// Lighthouse audit
  lighthouse http: //localhost:3000 --view --output=json --output-path=./report.json
  
  // Load test
  artillery quick--count 50 - n 20 http: //localhost:3000/api/emergency
  
  // Increase timeout to 10 seconds
navigator.geolocation.getCurrentPosition(..., { timeout: 10000 });
**/
