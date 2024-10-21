import axios from 'axios';

// Set the base URL for your API
const API_BASE_URL = 'http://localhost:4000/api'; // Assuming your backend runs on port 4000
; // Update with your API URL

// Function to send email
export const sendEmail = async (template, recipients) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sendEmail`, {
      template,
      recipients,
    });
    return response.data; // Assumes the API responds with data
  } catch (error) {
    throw new Error('Failed to send email: ' + error.message);
  }
};

// Function to save email template
export const saveTemplate = async (template) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/templates`, {
      template,
    });
    return response.data; // Assumes the API responds with data
  } catch (error) {
    throw new Error('Failed to save template: ' + error.message);
  }
};

// Function to upload recipient list (if needed)
export const uploadRecipients = async (recipients) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/recipients`, {
      recipients,
    });
    return response.data; // Assumes the API responds with data
  } catch (error) {
    throw new Error('Failed to upload recipients: ' + error.message);
  }
};

// Exporting all functions together
const api = {
  sendEmail,
  saveTemplate,
  uploadRecipients,
};

export default api;
