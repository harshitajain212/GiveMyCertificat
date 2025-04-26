
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import TemplatesGallery from '@/components/TemplatesGallery';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for individuals and small projects",
      features: [
        "Up to 50 certificates/month",
        "5 templates",
        "Basic customization",
        "Email delivery",
        "PDF downloads"
      ]
    },
    {
      name: "Pro",
      price: "$29",
      description: "For growing organizations with advanced needs",
      features: [
        "Up to 500 certificates/month",
        "All templates included",
        "Advanced customization",
        "Bulk generation",
        "Custom branding",
        "Verification links",
        "Priority support"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with specific requirements",
      features: [
        "Unlimited certificates",
        "Custom templates",
        "API access",
        "Advanced analytics",
        "Dedicated support",
        "SSO integration",
        "Custom workflows"
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <TemplatesGallery />

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary/5 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Ready to Create Your First Certificate?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of organizations that trust GiveMyCertificate for their certification needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" onClick={() => navigate("/auth")}>
                  Get Started for Free <ArrowRight size={16} className="ml-2" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate("/about")}>
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose the plan that works for your organization, with no hidden fees.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`rounded-xl overflow-hidden ${
                    plan.highlighted 
                      ? 'ring-2 ring-primary shadow-lg relative' 
                      : 'border border-border'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center text-sm py-1 font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className={`p-8 ${plan.highlighted ? 'pt-10' : ''}`}>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-end mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.price !== "Custom" && <span className="text-muted-foreground ml-1">/month</span>}
                    </div>
                    <p className="text-muted-foreground mb-6">{plan.description}</p>
                    <Button 
                      variant={plan.highlighted ? "default" : "outline"} 
                      className="w-full mb-8"
                      onClick={() => navigate("/auth")}
                    >
                      {plan.name === "Free" ? "Sign Up Free" : "Get Started"}
                    </Button>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <TestimonialsSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
