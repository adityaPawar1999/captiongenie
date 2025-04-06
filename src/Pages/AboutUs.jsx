import React from 'react';

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">About CaptionGenie</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700">
          We're dedicated to helping creators generate engaging captions for their social media posts, 
          making content creation easier and more efficient.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-medium mb-2">John Doe</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-medium mb-2">Jane Smith</h3>
            <p className="text-gray-600">Lead Developer</p>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700 mb-4">
          Have questions? Reach out to us at <a href="mailto:info@captiongenie.com" className="text-blue-600">info@captiongenie.com</a>
        </p>
      </section>
    </div>
  );
};

export default AboutUs;