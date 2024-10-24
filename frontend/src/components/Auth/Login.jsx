import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const handleSubmit = async (values) => {
    try {
      // Example API call
      const response = await fetch('https://your-api-endpoint.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Login Successful:', data);
      // Handle successful login (e.g., redirect or save token)

    } catch (error) {
      console.error('Login Error:', error);
      // Optionally, you could show an error message to the user here
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .required('Required')
      .min(6, 'Password must be at least 6 characters'),
  });

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
