import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

const AdminLoginPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("santkabirschool@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate("/admin/dashboard");
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (loginMethod === "phone") {
      if (phone === "9813177106" && password === "santkabirschool@789") {
        toast({
          title: "Phone Login Sim",
          description: "Logging you in with the primary admin account.",
          variant: "default"
        });
        try {
          const { data } = await api.post('/auth/login', { email: "santkabirschool@gmail.com", password: "santkabirschool@789" });
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate("/admin/dashboard");
          return;
        } catch (err) {
          // fall through
        }
      } else {
        toast({ title: "Login failed", description: "Invalid phone or password", variant: "destructive" });
        setLoading(false);
        return;
      }
    }

    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast({ title: "Login successful" });
      navigate("/admin/dashboard");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Invalid credentials. Please make sure the admin is seeded.";
      toast({ title: "Login Error", description: msg, variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-card py-16">
      <div className="w-full max-w-md mx-4">
        <div className="bg-cream rounded-2xl shadow-lg p-8 space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-2xl text-foreground">Admin Login</h1>
            <p className="text-muted-foreground text-sm mt-1">St.Kabir Public Sr. Sec. School</p>
          </div>

          <div className="flex rounded-lg bg-orange-light p-1">
            <button
              onClick={() => setLoginMethod("email")}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${loginMethod === "email" ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-primary"}`}
            >
              Email
            </button>
            <button
              onClick={() => setLoginMethod("phone")}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${loginMethod === "phone" ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-primary"}`}
            >
              Phone
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {loginMethod === "email" ? (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="santkabirschool@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="9813177106" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            Contact the system administrator if you cannot access your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
