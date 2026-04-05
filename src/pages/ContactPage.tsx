import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.pinimg.com/1200x/63/54/0d/63540d3056c21bdb9c62ef085f0e198d.jpg"
            alt="School Exterior"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10 animate-in fade-in slide-in-from-top-10 duration-1000">
          <h1 className="font-display text-5xl md:text-7xl text-white mb-6 drop-shadow-xl">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-xl">Get in touch with St.Kabir Public Sr. Sec. School</p>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl text-foreground mb-6">Reach Out To Us</h2>
              <p className="text-muted-foreground mb-8">We'd love to hear from you! Whether you have questions about admissions, facilities, or anything else, feel free to reach out.</p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Phone, title: "Phone", lines: ["9813177106", "9813177141"] },
                { icon: Mail, title: "Email", lines: ["stkabirpublicschool.dhr@gmail.com"] },
                { icon: MapPin, title: "Address", lines: ["Nandrampur Bass road,", "Alawalpur, Haryana"] },
                { icon: Clock, title: "School Hours", lines: ["Mon - Sat: 8:00 AM - 2:30 PM", "Office: 8:00 AM - 4:00 PM"] },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{c.title}</h4>
                    {c.lines.map((l, li) => (
                      <p key={li} className="text-sm text-muted-foreground">{l}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-64">
              <iframe
                title="School Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.5!2d76.7966!3d28.2074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDEyJzI2LjYiTiA3NsKwNDcnNDcuOCJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <div className="bg-cream p-8 rounded-2xl shadow-lg">
            <h3 className="font-display text-2xl text-foreground mb-6">Send Us A Message</h3>
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h4 className="font-display text-xl text-foreground mb-2">Thank You!</h4>
                <p className="text-muted-foreground">Your message has been received. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { label: "Full Name", key: "name", type: "text", placeholder: "Enter your name" },
                  { label: "Email", key: "email", type: "email", placeholder: "Enter your email" },
                  { label: "Phone Number", key: "phone", type: "tel", placeholder: "Enter your phone number" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-sm font-bold text-foreground mb-1">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      required
                      value={form[f.key as keyof typeof form]}
                      onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Message</label>
                  <textarea
                    placeholder="Type your message here..."
                    required
                    rows={4}
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                  />
                </div>
                <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
