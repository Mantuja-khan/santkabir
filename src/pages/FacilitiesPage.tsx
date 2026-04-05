
import scienceLab from "@/assets/science-lab.jpg";
import mathsLab from "@/assets/maths-lab.jpg";
import activityRoom from "@/assets/activity-room.jpg";
import roboticsLab from "@/assets/robotics-lab.jpg";
import library from "@/assets/library.jpg";
import artCraft from "@/assets/art-craft.jpg";
import aiLab from "@/assets/ai-lab.jpg";
import computerLab from "@/assets/computer-lab.jpg";

const facilities = [
  { name: "Science Lab", img: scienceLab, desc: "A fully equipped science laboratory for Physics, Chemistry, and Biology experiments." },
  { name: "Maths Lab", img: mathsLab, desc: "Our mathematics lab makes abstract concepts tangible with geometric models and tools." },
  { name: "Activity Room", img: activityRoom, desc: "A vibrant space for indoor activities and creative workshops for students." },
  { name: "Robotics Lab", img: roboticsLab, desc: "State-of-the-art robotics lab for coding and building robots." },
  { name: "Library", img: library, desc: "A vast collection of books and digital resources for reading and research." },
  { name: "Art & Craft Room", img: artCraft, desc: "A creative haven for painting, sculpting, and crafts." },
  { name: "AI Lab (Proposed)", img: aiLab, desc: "Upcoming AI Lab for introducing artificial intelligence and data science.", proposed: true },
  { name: "Computer Lab", img: computerLab, desc: "Modern computer lab with latest systems for digital literacy." },
];

const FacilitiesPage = () => (
  <div className="min-h-screen bg-white">
    {/* Page Header with Background Image (Top CTA) */}
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://i.pinimg.com/1200x/63/54/0d/63540d3056c21bdb9c62ef085f0e198d.jpg"
          alt="School"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10 text-white">
        <h1 className="text-4xl md:text-7xl font-display mb-6 animate-in fade-in slide-in-from-top-10 duration-1000 uppercase tracking-tighter">
          Our Facilities
        </h1>

        <p className="max-w-3xl mx-auto text-lg md:text-2xl opacity-90 font-light leading-relaxed drop-shadow-lg">
          Providing a world-class environment where curiosity meets innovation and excellence at St.Kabir Public School.
        </p>
      </div>
    </section>

    <section className="py-24 reveal-on-scroll">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilities.map((f, i) => (
            <div key={i} className="border border-slate-100 rounded-[2rem] overflow-hidden flex flex-col bg-white shadow-sm hover:shadow-2xl transition-all duration-500 group">
              <div className="h-56 overflow-hidden">
                <img src={f.img} alt={f.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8 flex-1">
                <h3 className="text-xl font-display mb-3 flex items-center justify-between group-hover:text-primary transition-colors">
                  {f.name}
                  {f.proposed && <span className="text-[10px] bg-primary text-white px-3 py-1 rounded-full font-black uppercase tracking-widest shadow-lg">New</span>}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <div className="py-12 bg-slate-50 border-t border-slate-100 text-center">
      <p className="text-slate-500 text-sm font-bold uppercase tracking-widest opacity-60">© 2026 St.Kabir Public Sr. Sec. School</p>
    </div>
  </div>
);

export default FacilitiesPage;
