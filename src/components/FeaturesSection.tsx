
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Edit3, FileText, Users, Zap, Globe } from "lucide-react";

const features = [
  {
    title: "Easy Certificate Creation",
    description: "Design beautiful certificates in minutes with our intuitive drag-and-drop editor.",
    icon: <Edit3 className="h-10 w-10 text-primary" />,
    badge: "Popular"
  },
  {
    title: "Bulk Generation",
    description: "Generate hundreds of certificates at once by simply uploading your recipient list.",
    icon: <Users className="h-10 w-10 text-primary" />
  },
  {
    title: "Template Library",
    description: "Choose from dozens of professionally designed templates for any occasion.",
    icon: <FileText className="h-10 w-10 text-primary" />
  },
  {
    title: "Instant Delivery",
    description: "Send certificates directly via email or share with secure verification links.",
    icon: <Zap className="h-10 w-10 text-primary" />
  },
  {
    title: "Verification System",
    description: "Let recipients verify the authenticity of their certificates with unique QR codes.",
    icon: <CheckCircle className="h-10 w-10 text-primary" />,
    badge: "New"
  },
  {
    title: "Custom Branding",
    description: "Add your logo, colors, and brand elements to maintain consistent branding.",
    icon: <Globe className="h-10 w-10 text-primary" />
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Powerful Features for <span className="gradient-text">Certificate Management</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to create, manage, and distribute professional certificates efficiently.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-border bg-card hover-card">
              <CardContent className="pt-6">
                <div className="mb-5">{feature.icon}</div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  {feature.badge && (
                    <Badge variant="default" className="text-xs">
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
