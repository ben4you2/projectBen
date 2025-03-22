function showNotification(message, type = 'info') {
  const container = document.getElementById('notification-container');
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;

  container.appendChild(notification);
  setTimeout(() => {
    notification.classList.add('show');
  }, 10); // Small delay to trigger transition

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300); // Remove after fade-out
  }, 3000); // Display for 3 seconds
}
