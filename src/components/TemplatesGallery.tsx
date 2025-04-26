
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Extended templates demo data — 18 templates now
const templates = [
  {
    id: 1,
    title: "Academic Achievement",
    category: "Education",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Corporate Excellence",
    category: "Business",
    image: "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Workshop Completion",
    category: "Events",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Professional Training",
    category: "Career",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Award Recognition",
    category: "Achievement",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Digital Diploma",
    category: "Education",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    title: "Employee of the Month",
    category: "Business",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    title: "Course Completion",
    category: "Education",
    image: "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    title: "Volunteer Recognition",
    category: "Events",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    title: "Certificate of Appreciation",
    category: "Achievement",
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a0680?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    title: "Leadership Award",
    category: "Business",
    image: "https://images.unsplash.com/photo-1485218128980-11786ced9454?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 12,
    title: "Perfect Attendance",
    category: "Education",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  // Added more demo templates
  {
    id: 13,
    title: "Innovation Award",
    category: "Achievement",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 14,
    title: "Certification of Completion",
    category: "Education",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 15,
    title: "Top Performer",
    category: "Career",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 16,
    title: "Participation Certificate",
    category: "Events",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 17,
    title: "Attendance Award",
    category: "Education",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 18,
    title: "Digital Badge",
    category: "Achievement",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const TemplatesGallery = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Browse Our <span className="gradient-text">Certificate Templates</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Choose from our library of professionally designed templates for any occasion.
              Each template is fully customizable to match your brand.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="group relative overflow-hidden rounded-xl hover-card border border-border/50">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.title} 
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 w-full">
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <p className="text-white font-bold text-lg">{template.title}</p>
                      <p className="text-white/80 text-sm">{template.category}</p>
                    </div>
                    <Button variant="secondary" size="sm" onClick={() => navigate("/templates")}>
                      <Eye className="h-4 w-4 mr-1" /> Preview
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button size="lg" onClick={() => navigate("/templates")}>View All Templates</Button>
        </div>
      </div>
    </section>
  );
};

export default TemplatesGallery;
