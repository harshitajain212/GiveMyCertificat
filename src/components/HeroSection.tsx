
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Clock, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6 max-w-xl">
            <div className="inline-flex items-center bg-muted rounded-full px-4 py-1.5 text-sm font-medium text-primary mb-2">
              <span className="flex items-center justify-center bg-primary/10 rounded-full w-5 h-5 mr-2">
                <Award size={12} className="text-primary" />
              </span>
              Trusted by 10,000+ organizations
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              Create Beautiful <span className="gradient-text">Certificates</span> in Minutes
            </h1>
            <p className="text-lg text-muted-foreground">
              The simplest way to design, generate and manage certificates for your events, courses, and achievements at scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button size="lg" className="w-full sm:w-auto" onClick={() => navigate("/auth")}>
                Get Started for Free <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => navigate("/templates")}>
                See Templates
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <div className="flex items-center">
                <div className="mr-3 bg-primary/10 p-2 rounded-full">
                  <Clock size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Save Time</p>
                  <p className="text-xs text-muted-foreground">Generate in seconds</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-3 bg-primary/10 p-2 rounded-full">
                  <Users size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Bulk Generate</p>
                  <p className="text-xs text-muted-foreground">For groups of any size</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -z-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative bg-white rounded-2xl shadow-xl border border-border overflow-hidden animate-float">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-secondary"></div>
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Certificate Example" 
                className="w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Professional Certificate</h3>
                <p className="text-sm text-muted-foreground mb-4">Customizable templates for every occasion - from academic achievements to professional certifications.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">Certificate of Achievement</span>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/templates")}>Preview</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
