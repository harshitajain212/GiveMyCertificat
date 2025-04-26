import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useSupabaseAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white/90 backdrop-blur-md py-4 w-full sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-sm">GC</span>
            </div>
            <span className="font-display font-bold text-xl">GiveMyCertificate</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">Home</Link>
            <Link to="/templates" className="text-foreground hover:text-primary transition-colors font-medium">Templates</Link>
            <Link to="/pricing" className="text-foreground hover:text-primary transition-colors font-medium">Pricing</Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium">About</Link>
            {user && (
              <Link to="/notes" className="text-foreground hover:text-primary transition-colors font-medium">Notes</Link>
            )}
          </div>
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <span className="font-medium text-foreground">{user.email}</span>
                <Button variant="outline" size="sm" onClick={async () => { await signOut(); navigate("/auth"); }}>Logout</Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>Login</Button>
                <Button size="sm" onClick={() => navigate("/auth")}>Sign Up Free</Button>
              </>
            )}
          </div>
        </div>

        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/templates" 
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Templates
            </Link>
            <Link 
              to="/pricing" 
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/about" 
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              {user ? (
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={async () => {
                    await signOut();
                    setIsMenuOpen(false);
                    navigate("/auth");
                  }}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button variant="outline" className="w-full" onClick={() => { setIsMenuOpen(false); navigate("/auth") }}>Login</Button>
                  <Button className="w-full" onClick={() => { setIsMenuOpen(false); navigate("/auth") }}>Sign Up Free</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
