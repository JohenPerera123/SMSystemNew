import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const contactNumbers = [
    { label: 'Customer Support', number: '+94 77 123 4567' },
    { label: 'Sales Enquiries', number: '+94 71 987 6543' }
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setError('All fields are required.');
      return;
    }

    emailjs
      .send(
        'service_eb8byc6',
        'template_3uwoxwj',
        formData,
        'z_qNmHv9XehZmEdJ5'
      )
      .then(() => {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setError('');
      })
      .catch((err) => {
        console.error('EmailJS Error:', err);
        setError('Failed to send message. Try again later.');
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700">Contact Us</h2>

      {/* Contact Info Section */}
      <div className="mb-10 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Get in Touch</h3>
        <p className="mb-4 text-gray-600">Feel free to call or email us at any time. We're here to help!</p>
        
        <ul className="space-y-3">
          {contactNumbers.map(({ label, number }) => (
            <li key={number} className="flex items-center space-x-3 text-gray-700">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h2.28a.75.75 0 01.67.41l1.528 3.057a.75.75 0 01-.217.976L7.5 9.5a11.042 11.042 0 005 5l1.566-1.566a.75.75 0 01.976-.217l3.057 1.528a.75.75 0 01.41.67V19a2 2 0 01-2 2h-1c-9.941 0-18-8.059-18-18V5z"
                />
              </svg>
              <div>
                <p className="font-medium">{label}</p>
                <p className="text-blue-600">{number}</p>
              </div>
            </li>
          ))}
          <li className="flex items-center space-x-3 text-gray-700">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 12a4 4 0 01-8 0 4 4 0 018 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14v7"
              />
            </svg>
            <div>
              <p className="font-medium">Email</p>
              <p className="text-blue-600">stadiummsystem@gmail.com</p>
            </div>
          </li>
        </ul>
      </div>

      {/* Contact Form */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        {submitted && (
          <p className="text-green-600 mb-6 text-center font-semibold">
            Your message has been sent successfully!
          </p>
        )}
        {error && (
          <p className="text-red-500 mb-6 text-center font-semibold">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
