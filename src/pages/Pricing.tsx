
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2, CreditCard } from 'lucide-react';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const pricingPlans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    features: [
      "Up to 50 certificates/month",
      "Basic templates",
      "Email support"
    ]
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    features: [
      "Unlimited certificates",
      "Advanced templates",
      "Priority support",
      "Custom branding"
    ],
    recommended: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    features: [
      "Unlimited certificates",
      "Dedicated account manager",
      "API access",
      "Advanced security"
    ]
  }
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleSubscribe = (planId: string) => {
    if (planId === "enterprise") {
      // For enterprise, we show a toast and would redirect to contact
      toast({
        title: "Enterprise Plan Selected",
        description: "Our team will contact you shortly to discuss your needs.",
      });
      return;
    }
    
    // For regular plans, we would continue with subscription
    handlePlanSelect(planId);
  };

  const calculatePrice = (basePrice: number | string) => {
    if (basePrice === "Custom") return "Custom";
    const price = basePrice as number;
    return billingCycle === 'annually' ? (price * 10).toFixed(0) : price;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const plan = pricingPlans.find(p => p.id === selectedPlan);
    if (!plan) return;
    
    toast({
      title: "Subscription Initiated",
      description: `You've subscribed to the ${plan.name} plan with ${billingCycle} billing.`,
    });
    
    setSelectedPlan(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your organization's certificate needs.
          </p>
        </section>

        <div className="flex justify-center mb-8">
          <div className="bg-muted rounded-full p-1 inline-flex">
            <Button
              variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === 'annually' ? 'default' : 'ghost'}
              onClick={() => setBillingCycle('annually')}
            >
              Annually {billingCycle === 'annually' && "(Save 16%)"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map(plan => (
            <div 
              key={plan.id} 
              className={`border rounded-lg p-6 transition-all ${
                plan.recommended ? 'ring-2 ring-primary' : ''
              } ${selectedPlan === plan.id ? 'bg-muted' : ''}`}
            >
              {plan.recommended && (
                <div className="text-center bg-primary text-white py-1 mb-4 rounded">
                  Most Popular
                </div>
              )}
              <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {plan.price === 'Custom' ? 'Custom' : `$${calculatePrice(plan.price)}`}
                </span>
                {plan.price !== 'Custom' && (
                  <span className="text-muted-foreground">
                    {billingCycle === 'monthly' ? '/month' : '/year'}
                  </span>
                )}
              </div>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="w-full mb-6" onClick={() => handleSubscribe(plan.id)}>
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </SheetTrigger>
                {plan.id !== 'enterprise' && (
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Subscribe to {plan.name} Plan</SheetTitle>
                      <SheetDescription>
                        Enter your payment details to subscribe to the {plan.name} plan with {billingCycle} billing.
                      </SheetDescription>
                    </SheetHeader>
                    <form onSubmit={handleCheckoutSubmit} className="space-y-6 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Cardholder Name</Label>
                        <Input id="name" placeholder="John Doe" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                          <Input id="cardNumber" placeholder="4242 4242 4242 4242" required />
                          <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" required />
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button type="submit" className="w-full">Subscribe Now</Button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground text-center">
                        This is a demo. No actual charges will be made.
                      </p>
                    </form>
                  </SheetContent>
                )}
              </Sheet>
              
              <ul className="space-y-3">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-center">
                    <CheckCircle2 className="mr-2 text-primary" size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
