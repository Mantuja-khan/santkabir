
import scienceLab from "@/assets/science-lab.jpg";
import mathsLab from "@/assets/maths-lab.jpg";
import activityRoom from "@/assets/activity-room.jpg";
import roboticsLab from "@/assets/robotics-lab.jpg";
import library from "@/assets/library.jpg";
import artCraft from "@/assets/art-craft.jpg";
import aiLab from "@/assets/ai-lab.jpg";
import computerLab from "@/assets/computer-lab.jpg";

const facilities = [
  { 
    name: "Science Lab", 
    img: scienceLab, 
    desc: "A fully equipped science laboratory for Physics, Chemistry, and Biology experiments. Students get hands-on experience with modern equipment and apparatus.",
    color: "bg-blue-50 border-blue-100"
  },
  { 
    name: "Maths Lab", 
    img: mathsLab, 
    desc: "Our mathematics lab makes abstract concepts tangible with geometric models, measuring instruments, and interactive learning tools.",
    color: "bg-orange-50 border-orange-100"
  },
  { 
    name: "Activity Room", 
    img: activityRoom, 
    desc: "A vibrant space for indoor activities, group discussions, personality development sessions, and creative workshops for students of all ages.",
    color: "bg-purple-50 border-purple-100"
  },
  { 
    name: "Robotics Lab", 
    img: roboticsLab, 
    desc: "State-of-the-art robotics lab where students learn coding, build robots, and develop problem-solving skills through hands-on STEM projects.",
    color: "bg-cyan-50 border-cyan-100"
  },
  { 
    name: "Library", 
    img: library, 
    desc: "A vast collection of books, journals, and digital resources. Our library provides a quiet, inspiring space for reading and research.",
    color: "bg-green-50 border-green-100"
  },
  { 
    name: "Art & Craft Room", 
    img: artCraft, 
    desc: "A creative haven where students explore painting, sculpting, pottery, and various crafts to express their artistic talents.",
    color: "bg-pink-50 border-pink-100"
  },
  { 
    name: "AI Lab (Proposed)", 
    img: aiLab, 
    desc: "Our upcoming AI Lab will introduce students to artificial intelligence, machine learning, and data science with cutting-edge tools and curriculum.", 
    proposed: true,
    color: "bg-yellow-50 border-yellow-100"
  },
  { 
    name: "Computer Lab", 
    img: computerLab, 
    desc: "Modern computer lab with latest systems and software, providing students digital literacy skills and programming knowledge.",
    color: "bg-indigo-50 border-indigo-100"
  },
];

const FacilitiesPage = () => (
  <div className="min-h-screen">
    {/* Top CTA section with background image */}
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.pinimg.com/1200x/63/54/0d/63540d3056c21bdb9c62ef085f0e198d.jpg" 
          alt="School Campus" 
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="font-display text-4xl md:text-6xl text-white mb-4 drop-shadow-xl">Our Facilities</h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-lg">Providing a world-class environment where curiosity meets innovation and excellence.</p>
      </div>
    </section>

    <section className="py-24 bg-cream/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((f, i) => (
            <div 
              key={i} 
              className={`group flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 p-3 reveal-on-scroll`}
              style={{ transitionDelay: `${(i % 3) * 150}ms` }}
            >
              <div className="relative h-72 overflow-hidden rounded-[2rem]">
                <img 
                  src={f.img} 
                  alt={f.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  loading="lazy" 
                />
                {f.proposed && (
                  <span className="absolute top-6 right-6 bg-primary text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-xl backdrop-blur-md">
                    Proposed
                  </span>
                )}
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="font-display text-2xl text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {f.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Bottom CTA */}
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl mb-6">Want to see our campus in person?</h2>
        <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">Schedule a school tour today and experience our world-class infrastructure and learning environment firsthand.</p>
        <a 
          href="/contact" 
          className="inline-block bg-white text-primary font-bold px-10 py-4 rounded-full text-lg shadow-xl hover:bg-orange- light transition-all hover:-translate-y-1"
        >
          Book a School Tour
        </a>
      </div>
    </section>
  </div>
);

export default FacilitiesPage;
