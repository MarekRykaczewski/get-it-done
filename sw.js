// sw.js (Service Worker)

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'scheduleReminder') {
      const { date, description } = event.data; // The time is not needed, as datetime-local includes date and time together
  
      // Convert the date to a timestamp
      const reminderDateTime = new Date(date).getTime();
  
      // Calculate the delay until the reminder
      const delay = reminderDateTime - Date.now();
  
      if (delay > 0) {
        // Schedule the notification
        setTimeout(() => {
          self.registration.showNotification('Reminder', {
            body: description,
            icon: 'https://cdn2.iconfinder.com/data/icons/mixed-rounded-flat-icon/512/megaphone-64.png',
          });
        }, delay);
      }
    }
  });
  
self.addEventListener('notificationclick', (event) => {
    // Handle the action when the user clicks the notification
    // You can add the desired action here.
    event.notification.close();
  });