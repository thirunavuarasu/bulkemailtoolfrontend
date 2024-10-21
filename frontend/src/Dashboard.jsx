import React, { useState } from 'react';
import TemplateEditor from './components/EmailTemplates/TemplateEditor';
import UploadList from './components/RecipientList/UploadList';
import Notification from './components/Notifications/Notifications';

const Dashboard = () => {
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [template, setTemplate] = useState(null);
  const [recipients, setRecipients] = useState([]);

  const handleTemplateSave = (savedTemplate) => {
    setTemplate(savedTemplate);
    setNotification({ message: "Template saved successfully!", type: "success" });
  };

  const handleRecipientsUpdate = (emails) => {
    setRecipients(emails);
    setNotification({ message: "Recipients updated!", type: "success" });
  };

  const handleSendEmail = async () => {
    if (!template || recipients.length === 0) {
      setNotification({ message: "Please ensure you have a template and recipients selected.", type: "error" });
      return;
    }

    setIsLoading(true);
    setNotification(null);

    try {
      const response = await sendEmailAPI(template, recipients);
      if (response.success) {
        setNotification({ message: "Emails sent successfully!", type: "success" });
      } else {
        setNotification({ message: "Failed to send emails. Please try again.", type: "error" });
      }
    } catch (error) {
      setNotification({ message: "An error occurred while sending emails.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmailAPI = async (template, recipients) => {
    // Simulated API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true }); // Simulate a successful response
      }, 2000);
    });
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>

      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}

      <div className="row">
        <div className="col-md-6">
          <TemplateEditor onTemplateSave={handleTemplateSave} />
        </div>
        <div className="col-md-6">
          <UploadList onRecipientsUpdate={handleRecipientsUpdate} />
        </div>
      </div>

      <div className="mt-4">
        <button className="btn btn-primary" onClick={handleSendEmail} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Emails'}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
