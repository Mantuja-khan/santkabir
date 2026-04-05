import { Link } from "react-router-dom";
import { GraduationCap, Users, BookOpen, Clock, Award, Star, MapPin } from "lucide-react";
import hero1 from "@/assets/1stimg.jpeg";
import hero2 from "@/assets/1st.jpeg";
import hero3 from "@/assets/2nd.jpeg";
import aboutImg1 from "@/assets/1stimg.jpeg";
import aboutImg2 from "@/assets/2ndimg.jpeg";
import aboutImg3 from "@/assets/3rdimg.jpeg";
import aboutImg4 from "@/assets/4th.jpeg";
import ImageCarousel from "@/components/ImageCarousel";

const stats = [
  { num: "15+", label: "Years of Experience" },
  { num: "500+", label: "Students Enrolled" },
  { num: "50+", label: "Expert Teachers" },
  { num: "500+", label: "Happy Parents" },
];

const features = [
  { icon: GraduationCap, title: "Quality Education", desc: "CBSE affiliated curriculum with modern teaching methodologies." },
  { icon: Users, title: "Expert Teachers", desc: "Highly qualified and experienced faculty dedicated to student success." },
  { icon: BookOpen, title: "E-Learning", desc: "Smart classrooms with digital learning tools and resources." },
  { icon: Clock, title: "Full Day Programs", desc: "Comprehensive programs including co-curricular activities." },
];

const heroImages = [hero1, hero2, hero3];
const aboutImages = [aboutImg1, aboutImg2, aboutImg3, aboutImg4];

const programs = [
  { title: "Nursery & KG", range: "Age 3-5", color: "bg-primary" },
  { title: "Primary (1-5)", range: "Age 6-10", color: "bg-secondary" },
  { title: "Middle (6-8)", range: "Age 11-13", color: "bg-accent" },
  { title: "Secondary (9-12)", range: "Age 14-17", color: "bg-teal" },
];

const HomePage = () => (
  <div>
    {/* Admission Banner */}
    <div className="bg-primary text-primary-foreground py-3 text-center animate-pulse">
      <div className="container mx-auto px-4">
        <p className="font-display text-lg md:text-2xl">
          🎓 Admissions Open for 2026-27 — Nursery to Class 12th!{" "}
          <Link to="/apply" className="underline font-bold hover:text-accent transition-colors">Apply Now →</Link>
        </p>
      </div>
    </div>

    {/* Hero */}
    <section className="relative bg-cream overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left space-y-6 z-10">
          <p className="text-primary font-bold uppercase tracking-wider text-sm">Welcome to St.Kabir Public Sr. Sec. School</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
            We Prepare Your<br />
            <span className="text-primary italic">Child For Life</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto md:mx-0">
            Empowering students from Nursery to Class 12th with holistic education, state-of-the-art facilities, and a nurturing environment at Nandrampur Bass road, Alawalpur.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link to="/apply" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-lg">
              Enroll Now
            </Link>
            <Link to="/about" className="border-2 border-secondary text-secondary px-8 py-3 rounded-full font-bold text-lg hover:bg-secondary hover:text-secondary-foreground transition-colors">
              Learn More
            </Link>
          </div>
        </div>
        <div className="flex-1 relative w-full overflow-hidden">
          <div className="blob-shape overflow-hidden shadow-2xl relative z-10 w-full aspect-[4/3] md:aspect-auto">
            <ImageCarousel images={heroImages} />
          </div>
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent rounded-full opacity-60 animate-float z-0" />
          <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary rounded-full opacity-40 animate-bounce-slow z-0" />
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-16 bg-card reveal-on-scroll">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-cream hover:shadow-lg transition-shadow group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-lg mb-2 text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* About preview */}
    <section className="py-16 bg-teal-light reveal-on-scroll">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 w-full order-2 md:order-1">
          <ImageCarousel images={aboutImages} />
        </div>
        <div className="flex-1 space-y-4">
          <p className="section-subtitle">About Us</p>
          <h2 className="section-title !text-left">Learn To Play, Converse With Confidence</h2>
          <p className="text-muted-foreground leading-relaxed">
            St.Kabir Public Sr. Sec. School, located at Nandram Pur Bus Stand, Dharuhera, Rewari, has been a beacon of quality education. We provide a balanced curriculum that develops intellectual, physical, and creative potential of every child from Nursery to Class 12th.
          </p>
          <div className="flex gap-6">
            <div className="flex items-start gap-2">
              <Award className="w-5 h-5 text-primary mt-1" />
              <div>
                <h4 className="font-bold text-foreground">Smart Programs</h4>
                <p className="text-xs text-muted-foreground">Modern approach to learning</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Star className="w-5 h-5 text-primary mt-1" />
              <div>
                <h4 className="font-bold text-foreground">Easy To Learn</h4>
                <p className="text-xs text-muted-foreground">Student-centered teaching</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-12 bg-secondary">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="text-center text-secondary-foreground">
            <p className="font-display text-3xl md:text-4xl">{s.num}</p>
            <p className="text-sm opacity-80">{s.label}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Programs */}
    <section className="py-16 bg-card reveal-on-scroll">
      <div className="container mx-auto px-4">
        <p className="section-subtitle">Our Programs</p>
        <h2 className="section-title mb-10">We Meet Kids At Their Level<br />Regardless Of Their Age</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((p, i) => (
            <div key={i} className={`${p.color} text-card rounded-2xl p-6 text-center hover:scale-105 transition-transform shadow-lg`}>
              <div className="w-16 h-16 bg-card/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl mb-1">{p.title}</h3>
              <p className="text-sm opacity-80">{p.range}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Admission CTA */}
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://i.pinimg.com/1200x/63/54/0d/63540d3056c21bdb9c62ef085f0e198d.jpg"
          alt="Graduation"
          className="w-full h-full object-cover brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]"></div>
      </div>
      <div className="container mx-auto px-4 text-center text-primary-foreground relative z-10">
        <h2 className="font-display text-4xl md:text-6xl mb-6 drop-shadow-2xl">Admissions Open 2026-27</h2>
        <p className="text-xl md:text-2xl mb-4 opacity-90 max-w-2xl mx-auto drop-shadow-lg">
          Give your child the best start in life! St.Kabir Public Sr. Sec. School is now accepting admissions for Nursery to Class 12th for the academic session 2026-27.
        </p>
        <p className="text-lg mb-10 opacity-75 font-semibold">Limited seats available. Enroll your child today!</p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/apply" className="bg-white text-primary px-12 py-5 rounded-full font-bold text-xl hover:bg-orange-light transition-all shadow-2xl hover:scale-105 active:scale-95">
            Apply Now
          </Link>
          <a href="tel:9813177106" className="backdrop-blur-md bg-white/10 border-2 border-white/30 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-primary transition-all shadow-2xl hover:scale-105 active:scale-95">
            Call: 9813177106
          </a>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;
