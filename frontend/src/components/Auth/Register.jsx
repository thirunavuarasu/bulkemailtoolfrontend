import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const handleSubmit = async (values) => {
    try {
      // Example API call
      const response = await fetch('https://your-api-endpoint.com/register', {
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
      console.log('Registration Successful:', data);
      // Handle successful registration (e.g., redirect or display success message)

    } catch (error) {
      console.error('Registration Error:', error);
      // Optionally, show an error message to the user
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .required('Required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
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
            <div className="form-group mb-3">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field name="confirmPassword" type="password" className="form-control" />
              <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
