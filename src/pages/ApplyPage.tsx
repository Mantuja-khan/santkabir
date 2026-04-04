import { useState } from "react";
import api from "@/api/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { GraduationCap, Phone, User, Calendar, Users, ArrowRight, CheckCircle2 } from "lucide-react";

const classes = [
  "Nursery", "LKG", "UKG", 
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", 
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
  "Class 11", "Class 12"
];

const ApplyPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    student_name: "",
    class_applied: "",
    phone_number: "",
    father_name: "",
    mother_name: "",
    age: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/admissions", {
        ...formData,
        age: parseInt(formData.age),
      });
      setSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "We have received your application and will contact you soon.",
      });
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-cream/30 py-20">
        <div className="max-w-md w-full mx-4 bg-white rounded-3xl shadow-2xl p-10 text-center animate-scale-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="font-display text-3xl text-foreground mb-4">Application Received!</h2>
          <p className="text-muted-foreground mb-8 text-lg">Thank you for applying to Sant Kabir Public School. Our admissions team will review your application and contact you on the provided phone number shortly.</p>
          <Link to="/">
            <Button className="w-full rounded-full py-6 font-bold text-lg">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream/30 pb-20">
      {/* Hero section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.pinimg.com/1200x/63/54/0d/63540d3056c21bdb9c62ef085f0e198d.jpg" 
            alt="School Campus" 
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-display text-4xl md:text-6xl text-white mb-6 drop-shadow-xl">Online Admission</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-lg">Begin your child's journey towards excellence. Fill out the application form below to start the admission process.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] reveal-on-scroll">
            {/* Left Side: School Image */}
            <div className="md:w-1/2 relative aspect-[4/3] md:aspect-auto h-auto min-h-[300px] md:h-auto">
              <img 
                src="https://i.pinimg.com/736x/52/8b/2b/528b2be8affeeecc17e36d3a98d39c52.jpg" 
                alt="School Environment" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
            </div>

            {/* Right Side: Form */}
            <div className="p-8 md:p-16 md:w-1/2 flex flex-col justify-center">
              <div className="mb-10">
                <h2 className="font-display text-3xl text-foreground mb-2 flex items-center gap-3">
                  <GraduationCap className="w-8 h-8 text-primary" /> Admission Application
                </h2>
                <p className="text-muted-foreground">Please fill in the details below to begin the enrollment process.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student_name" className="text-sm font-semibold">Student Full Name</Label>
                    <Input 
                      id="student_name" 
                      required 
                      placeholder="Enter student's name"
                      className="rounded-xl border-slate-200 focus:border-primary py-6 bg-slate-50/50"
                      value={formData.student_name}
                      onChange={(e) => setFormData({...formData, student_name: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="class_applied" className="text-sm font-semibold">Class Seeking</Label>
                      <Select onValueChange={(v) => setFormData({...formData, class_applied: v})} required>
                        <SelectTrigger className="rounded-xl border-slate-200 py-6 h-auto bg-slate-50/50">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {classes.map((cls) => (
                            <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-sm font-semibold">Student Age</Label>
                      <Input 
                        id="age" 
                        type="number" 
                        required 
                        placeholder="Age"
                        className="rounded-xl border-slate-200 py-6 bg-slate-50/50"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone_number" className="text-sm font-semibold">Parent's Mobile Number</Label>
                    <Input 
                      id="phone_number" 
                      type="tel" 
                      required 
                      placeholder="+91 XXXXX XXXXX"
                      className="rounded-xl border-slate-200 py-6 bg-slate-50/50"
                      value={formData.phone_number}
                      onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="father_name" className="text-sm font-semibold">Father's Name</Label>
                      <Input 
                        id="father_name" 
                        required 
                        placeholder="Father's name"
                        className="rounded-xl border-slate-200 py-6 bg-slate-50/50"
                        value={formData.father_name}
                        onChange={(e) => setFormData({...formData, father_name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mother_name" className="text-sm font-semibold">Mother's Name</Label>
                      <Input 
                        id="mother_name" 
                        required 
                        placeholder="Mother's name"
                        className="rounded-xl border-slate-200 py-6 bg-slate-50/50"
                        value={formData.mother_name}
                        onChange={(e) => setFormData({...formData, mother_name: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full rounded-xl py-7 font-bold text-lg mt-4 shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98]" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Application"} <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
                
                <p className="text-[10px] text-center text-muted-foreground">
                  Our admissions office will reach out to you within 24-48 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
