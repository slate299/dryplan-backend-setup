// frontend/src/services/api.js
const API_BASE = "http://localhost:5000/api";

export const eventAPI = {
  // Get all events
  getEvents: async () => {
    const response = await fetch(`${API_BASE}/events`);
    return await response.json();
  },

  // Create new event
  createEvent: async (eventData) => {
    const response = await fetch(`${API_BASE}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    return await response.json();
  },

  // Get weather for event
  getWeather: async (eventId) => {
    const response = await fetch(`${API_BASE}/weather/${eventId}`);
    return await response.json();
  },
};
