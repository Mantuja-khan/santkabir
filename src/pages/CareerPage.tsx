import { useState } from "react";
import api from "@/api/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase, Upload, Send, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const CareerPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
  });
  const [resume, setResume] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      toast({
        title: "Resume Required",
        description: "Please upload your resume to continue.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("position", formData.position);
    data.append("resume", resume);

    try {
      await api.post("/career", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSubmitted(true);
      toast({
        title: "Application Sent!",
        description: "Your resume has been sent successfully. We will review it and contact you.",
      });
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was a problem sending your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-cream/30 py-20">
        <div className="max-w-md w-full mx-4 bg-white rounded-[2.5rem] shadow-2xl p-10 text-center animate-in fade-in zoom-in duration-700">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="font-display text-3xl text-foreground mb-4">Application Received!</h2>
          <p className="text-muted-foreground mb-8 text-lg">Thank you for your interest in joining Sant Kabir Public School. We have received your resume and will get back to you if your profile matches our requirements.</p>
          <Link to="/">
            <Button className="w-full rounded-full py-6 font-bold text-lg">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.pinimg.com/1200x/63/54/0d/63540d3056c21bdb9c62ef085f0e198d.jpg" 
            alt="School Campus" 
            className="w-full h-full object-cover brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/40"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-display text-5xl md:text-7xl text-white mb-6 animate-in fade-in slide-in-from-top-10 duration-1000">Join Our Team</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-lg">We are always looking for passionate educators to help shape the future.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] reveal-on-scroll">
            {/* Left Side: Info & Image */}
            <div className="md:w-5/12 relative aspect-[4/3] md:aspect-auto flex flex-col justify-center overflow-hidden min-h-[350px]">
              <img 
                src="https://i.pinimg.com/736x/52/8b/2b/528b2be8affeeecc17e36d3a98d39c52.jpg" 
                alt="Working at School" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/80 backdrop-blur-[2px]"></div>
              
              <div className="relative z-10 p-8 md:p-12 text-white">
                <Briefcase className="w-12 h-12 md:w-16 md:h-16 mb-6 md:mb-8 text-white/40" />
                <h2 className="font-display text-2xl md:text-3xl mb-4 md:mb-6">Work With Us</h2>
                <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6 md:mb-8">
                  At Sant Kabir Public School, we value innovation, dedication, and a love for teaching. Join a community that supports your growth and empowers you to make a difference.
                </p>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm font-semibold">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-white/10 flex items-center justify-center">1</div>
                    <span>Submit your latest resume</span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm font-semibold">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-white/10 flex items-center justify-center">2</div>
                    <span>Our HR team will review your profile</span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm font-semibold">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-white/10 flex items-center justify-center">3</div>
                    <span>Interview call for shortlisted candidates</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="p-8 md:p-16 md:w-7/12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-bold">Full Name</Label>
                    <Input 
                      id="name" 
                      required 
                      placeholder="Jane Doe"
                      className="rounded-xl border-slate-200 bg-slate-50/50 py-6"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-bold">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        required 
                        placeholder="jane@example.com"
                        className="rounded-xl border-slate-200 bg-slate-50/50 py-6"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-bold">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        required 
                        placeholder="+91 XXXXX XXXXX"
                        className="rounded-xl border-slate-200 bg-slate-50/50 py-6"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position" className="text-sm font-bold">Position Applied For</Label>
                    <Input 
                      id="position" 
                      required 
                      placeholder="e.g. PGT English, Sports Coach"
                      className="rounded-xl border-slate-200 bg-slate-50/50 py-6"
                      value={formData.position}
                      onChange={(e) => setFormData({...formData, position: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold">Upload Resume (PDF/DOC)</Label>
                    <div className="relative">
                      <input 
                        type="file" 
                        id="resume"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setResume(e.target.files?.[0] || null)}
                      />
                      <label 
                        htmlFor="resume"
                        className="flex items-center justify-center w-full p-8 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group"
                      >
                        <div className="text-center">
                          <Upload className="w-10 h-10 mx-auto mb-2 text-slate-300 group-hover:text-primary transition-colors" />
                          <p className="text-sm text-slate-500">{resume ? resume.name : "Click to upload your resume"}</p>
                          <p className="text-[10px] text-slate-400 mt-1">MAX FILE SIZE 5MB</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full rounded-2xl py-8 font-display text-lg shadow-xl" disabled={loading}>
                  {loading ? "Sending Application..." : "Send Application"} <Send className="ml-3 w-5 h-5" />
                </Button>
                
                <p className="text-[10px] text-center text-muted-foreground italic">
                  By applying, you agree to allow us to process your data for recruitment purposes.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPage;
