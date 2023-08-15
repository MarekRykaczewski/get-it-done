import { useState } from 'react'
import Modal from './Modal'

const ReminderModal = ({ open, onClose }) => {
  const [reminderDateTime, setReminderDateTime] = useState('')
  const [reminderDescription, setReminderDescription] = useState('')

  const saveReminder = () => {
    if (!('Notification' in window)) {
      alert('Notifications are not supported by your browser.');
      return;
    }

    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          scheduleReminder();
        } else {
          alert('Please grant permission to display notifications.');
        }
      });
    } else {
      scheduleReminder();
    }
  };

  const scheduleReminder = () => {
    if (!reminderDateTime || !reminderDescription) {
      alert('Please select a valid date and time and provide a description for the reminder.');
      return;
    }

    if ('serviceWorker' in navigator && 'MessageChannel' in window) {
      navigator.serviceWorker.ready.then((registration) => {
        const channel = new MessageChannel();
        channel.port1.onmessage = (event) => {
          // Handle the response from the Service Worker, if needed
          console.log('Response from Service Worker:', event.data);
        };

        // Send reminder data to the Service Worker with the correct format
        registration.active.postMessage(
          {
            type: 'scheduleReminder',
            date: new Date(reminderDateTime).toISOString(),
            description: reminderDescription,
          },
          [channel.port2]
        );
      });
      onClose(); // Close the modal after saving
    } else {
      console.log('Service Worker or MessageChannel is not supported.');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col gap-3 mb-3">
        <h1 className="font-bold text-center text-2xl">Set a reminder</h1>
        <h2>Date</h2>
        <input
          className="border rounded-lg border-black p-1"
          type="datetime-local"
          value={reminderDateTime}
          onChange={(e) => setReminderDateTime(e.target.value)}
        />
        <h2>Message</h2>
        <input
          className="border rounded-lg border-black p-1"
          type="text"
          placeholder="Reminder text"
          value={reminderDescription}
          onChange={(e) => setReminderDescription(e.target.value)}
        />
        <div className="flex w-full justify-around">
          <button
            className="bg-cyan-500 text-md text-lg rounded-md px-4 h-12 text-white"
            onClick={saveReminder}
          >
            Confirm
          </button>
          <button
            className="bg-red-500 text-md text-lg rounded-md px-4 h-12 text-white"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReminderModal;