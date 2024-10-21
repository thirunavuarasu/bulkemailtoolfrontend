import React, { useState } from 'react';

const TemplateEditor = () => {
  const [templateName, setTemplateName] = useState('');
  const [templateContent, setTemplateContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle saving the template (e.g., API call)
    console.log('Template Saved:', { templateName, templateContent });
    // Clear the form after submission
    setTemplateName('');
    setTemplateContent('');
  };

  return (
    <div className="card p-3">
      <h3>Create Email Template</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="templateName">Template Name</label>
          <input
            type="text"
            className="form-control"
            id="templateName"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="templateContent">Template Content</label>
          <textarea
            className="form-control"
            id="templateContent"
            rows="10"
            value={templateContent}
            onChange={(e) => setTemplateContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success">
          Save Template
        </button>
      </form>
      <div className="mt-4">
        <h4>Preview</h4>
        <div className="border p-3" style={{ minHeight: '150px' }}>
          <h5>{templateName || 'Template Name'}</h5>
          <div dangerouslySetInnerHTML={{ __html: templateContent || '<p>Your content here...</p>' }} />
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;
