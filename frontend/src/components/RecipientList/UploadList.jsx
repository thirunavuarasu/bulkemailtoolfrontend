import React, { useState } from 'react';
import Papa from 'papaparse';

const UploadList = () => {
  const [file, setFile] = useState(null);
  const [recipients, setRecipients] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      // Parse the CSV file
      Papa.parse(file, {
        complete: (results) => {
          // Assuming the email IDs are in the first column
          const emails = results.data.map(row => row[0]).filter(email => email); // Filter out empty entries
          setRecipients(emails);
          console.log('Parsed Emails:', emails);
        },
        header: false, // Change to true if your CSV has headers
      });
      // Clear file input
      setFile(null);
    }
  };

  return (
    <div className="card p-3">
      <h3>Upload Recipient List</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
      {recipients.length > 0 && (
        <div className="mt-4">
          <h4>Recipient List</h4>
          <ul className="list-group">
            {recipients.map((email, index) => (
              <li key={index} className="list-group-item">{email}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadList;
