import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useToast } from "@/hooks/use-toast";

const templateCategories = [
  "Education", "Business", "Events", "Professional", "Achievement"
];

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSupabaseAuth();
  const { toast } = useToast();

  React.useEffect(() => {
    setLoading(true);
    let query = supabase
      .from('templates')
      .select('*')
      .order('id', { ascending: true });
    if (selectedCategory) {
      query = query.eq('category', selectedCategory);
    }
    query.then(({ data, error }) => {
      if (!error && data) setTemplates(data);
      setLoading(false);
    });
  }, [selectedCategory]);

  const filteredTemplates = templates.filter(template =>
    template.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUseTemplate = async (templateId: number) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to use a template."
      });
      return;
    }
    // Insert into user_templates
    const { error } = await supabase.from("user_templates").insert({
      user_id: user.id,
      template_id: templateId,
    });
    if (!error) {
      toast({
        title: "Template added!",
        description: "You can now customize and issue certificates with this template."
      });
    } else {
      toast({ title: "Error", description: error.message });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16">
        <section>
          <h1 className="text-4xl font-bold mb-8">Certificate Templates</h1>
          
          <div className="flex items-center space-x-4 mb-8">
            <div className="relative flex-grow">
              <Input 
                placeholder="Search templates" 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            </div>
            <div className="flex space-x-2">
              {templateCategories.map(category => (
                <Button 
                  key={category} 
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {loading
            ? <div className="text-center text-muted-foreground">Loading templates...</div>
            : <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredTemplates.map(template => (
                <div 
                  key={template.id} 
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img 
                    src={template.image_url} 
                    alt={template.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{template.title}</h2>
                    <p className="text-muted-foreground">{template.category}</p>
                    <Button
                      className="mt-4 w-full"
                      onClick={() => handleUseTemplate(template.id)}
                    >
                      Use Template
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          }
          {!user && (
            <div className="text-center mt-8">
              <a href="/auth" className="underline text-primary">Sign up or Log in to use templates</a>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
