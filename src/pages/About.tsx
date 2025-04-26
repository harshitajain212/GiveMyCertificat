
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About GiveMyCertificate</h1>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              GiveMyCertificate is a powerful platform designed to simplify certificate creation 
              and management for organizations of all sizes.
            </p>
            <p>
              Our mission is to provide an intuitive, efficient solution for generating 
              professional certificates with just a few clicks.
            </p>
            <h2 className="text-2xl font-semibold mt-8">Our Story</h2>
            <p>
              Founded in 2023, we recognized the complexity of certificate generation 
              and set out to create a tool that makes the process seamless and enjoyable.
            </p>
            <h2 className="text-2xl font-semibold mt-8">Our Values</h2>
            <ul className="list-disc list-inside">
              <li>Simplicity in design</li>
              <li>Flexibility for all organizations</li>
              <li>Continuous innovation</li>
              <li>User-centric approach</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
