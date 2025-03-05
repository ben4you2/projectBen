// app.ts
type EmergencyType = 'robbery' | 'assault' | 'gunshot' | 'theft' | 'argument';

interface EmergencyReport {
  type: EmergencyType;
  location: GeolocationCoordinates | null;
  timestamp: Date;
  audioRecording?: string; // Changed from Blob to string for easier submission
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
        { enableHighAccuracy: true, timeout: 10000 } // Increased timeout to 10 seconds
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

// Removed test case matrix and mock implementations for production deployment
