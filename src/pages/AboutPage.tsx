import { Award, BookOpen, Users, Heart, Target, Eye } from "lucide-react";
import ImageCarousel from "@/components/ImageCarousel";
import aboutImg1 from "@/assets/1stimg.jpeg";
import aboutImg2 from "@/assets/2ndimg.jpeg";
import aboutImg3 from "@/assets/3rdimg.jpeg";
import aboutImg4 from "@/assets/4th.jpeg";

const galleryImages = [aboutImg1, aboutImg2, aboutImg3, aboutImg4];

const AboutPage = () => (
  <div>
    {/* Hero */}
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://i.pinimg.com/1200x/63/54/0d/63540d3056c21bdb9c62ef085f0e198d.jpg"
          alt="School"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60"></div>
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="font-display text-4xl md:text-6xl text-white mb-4 drop-shadow-xl animate-in fade-in slide-in-from-top-10 duration-1000">About Our School</h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-lg">A legacy of quality education and holistic development since 25+ years.</p>
      </div>
    </section>

    {/* About content */}
    <section className="py-16 bg-card reveal-on-scroll">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 w-full order-2 md:order-1">
          <ImageCarousel images={galleryImages} />
        </div>
        <div className="flex-1 space-y-4">
          <p className="section-subtitle !text-left">Who We Are</p>
          <h2 className="font-display text-3xl text-foreground">A Legacy of Excellence in Education</h2>
          <p className="text-muted-foreground leading-relaxed">
            St.Kabir Public Sr. Sec. School, situated at Nandrampur Bass road, Alawalpur, is a premier educational institution providing quality education from Nursery to Class 12th. Our school is committed to nurturing the intellectual, physical, emotional, and social development of every student.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            With a team of over 100 dedicated and experienced teachers, state-of-the-art infrastructure, and a student-centered approach, we ensure that each child receives personalized attention and the best learning experience.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our motto is to create responsible, confident, and knowledgeable citizens who are ready to face the challenges of the modern world.
          </p>
        </div>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="py-16 bg-cream reveal-on-scroll">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card p-8 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-primary" />
            <h3 className="font-display text-2xl text-foreground">Our Mission</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            To provide holistic education that develops critical thinking, creativity, and moral values. We aim to empower students with knowledge, skills, and confidence to succeed in an ever-changing world.
          </p>
        </div>
        <div className="bg-card p-8 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-8 h-8 text-secondary" />
            <h3 className="font-display text-2xl text-foreground">Our Vision</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            To be a leading educational institution recognized for academic excellence, innovative teaching, and holistic development of students, creating future leaders who contribute positively to society.
          </p>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-16 bg-card reveal-on-scroll">
      <div className="container mx-auto px-4">
        <p className="section-subtitle">Our Values</p>
        <h2 className="section-title mb-10">What Makes Us Special</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Award, title: "Excellence", desc: "Striving for the highest standards in everything we do." },
            { icon: Heart, title: "Care", desc: "A nurturing environment where every child feels valued." },
            { icon: Users, title: "Community", desc: "Building strong bonds between students, parents, and teachers." },
            { icon: BookOpen, title: "Innovation", desc: "Embracing modern teaching methods and technology." },
          ].map((v, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-cream hover:shadow-lg transition-shadow">
              <v.icon className="w-10 h-10 text-primary mx-auto mb-4" />
              <h4 className="font-display text-lg mb-2 text-foreground">{v.title}</h4>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default AboutPage;
