
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSupabaseAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    if (mode === "signup") {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      });

      if (error) {
        if (/email.*already.*registered/i.test(error.message)) {
          setError("This email is already registered, please log in.");
        } else {
          setError(error.message);
        }
      } else {
        setInfo("A confirmation email has been sent. Please check your inbox and confirm your email before logging in.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        // Show a more descriptive error for unconfirmed email
        if (/Email not confirmed/i.test(error.message)) {
          setError("You need to confirm your email before you can log in. Please check your email for the confirmation link or request it again.");
        } else {
          setError(error.message);
        }
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold mb-2">{mode === "login" ? "Login" : "Sign Up"}</h2>
        {mode === "signup" && (
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} required />
          </div>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {info && <div className="text-green-600 text-sm">{info}</div>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Sign Up"}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="underline text-primary"
            disabled={loading}
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
        <div className="text-xs text-muted-foreground text-center pt-2">
          Trouble with confirmation email? <a href="mailto:support@givemycertificate.com" className="underline">Contact support</a>.
        </div>
        <div className="text-xs text-muted-foreground text-center pt-1">
          <strong>Note</strong>: In development, Supabase confirmation links may expire quickly. Consider disabling "Confirm email" in Supabase Auth settings for easier testing.
        </div>
      </form>
    </div>
  );
};

export default Auth;
