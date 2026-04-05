import { useState, useEffect } from "react";
import api from "@/api/client";
import { BookOpen, X, Loader2, FileText, CheckCircle, GraduationCap } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface SyllabusRow {
  _id: string;
  group_name: string;
  class_name: string;
  subjects: string[];
  sort_order: number;
}

const SyllabusPage = () => {
  const [items, setItems] = useState<SyllabusRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<SyllabusRow | null>(null);

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const { data } = await api.get("/syllabus");
        if (Array.isArray(data)) {
          setItems(data.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)));
        } else {
          setItems([]);
        }
      } catch (err) {
        toast.error("Failed to load syllabus");
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSyllabus();
  }, []);

  const groupedItems = (items || []).reduce((acc: any, item) => {
    const groupName = item.group_name || "General";
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
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

        <div className="relative z-10 container mx-auto px-4 
                  flex flex-col items-center justify-center 
                  text-center text-white 
                  animate-in fade-in slide-in-from-top-10 duration-1000">

          <h1 className="text-4xl md:text-7xl font-display mb-6 uppercase tracking-tighter drop-shadow-2xl">
            Academic Syllabus
          </h1>

          <p className="max-w-xl text-lg md:text-2xl opacity-90 font-light leading-relaxed drop-shadow-lg">
            Class-wise curriculum for session 2026-27 at St.Kabir Public School
          </p>

        </div>
      </section>

      <div className="container mx-auto px-4 py-16 -mt-12 relative z-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] shadow-xl border border-slate-100 reveal-on-scroll">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-slate-500 mt-6 font-bold uppercase tracking-widest text-sm text-center">Synchronizing Academic Data...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-xl max-w-3xl mx-auto reveal-on-scroll">
            <FileText className="w-16 h-16 text-slate-200 mx-auto mb-6" />
            <h2 className="text-2xl font-display text-slate-900 mb-4 uppercase tracking-tighter">Updating Curriculum</h2>
            <p className="text-slate-500 max-w-md mx-auto italic font-medium">We are currently refreshing our academic modules for the upcoming session.</p>
          </div>
        ) : (
          <div className="space-y-24 reveal-on-scroll">
            {Object.keys(groupedItems).map((groupName) => (
              <div key={groupName}>
                <div className="flex items-center gap-6 mb-10 group">
                  <div className="w-14 h-14 bg-white rounded-3xl shadow-lg border border-primary/10 flex items-center justify-center text-primary rotate-3 group-hover:rotate-0 transition-all">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl font-display text-slate-900 uppercase tracking-tighter border-b-4 border-primary pb-1 group-hover:border-primary/40 transition-colors">
                    {groupName}
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {groupedItems[groupName].map((item: SyllabusRow) => (
                    <button
                      key={item._id}
                      className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-100 hover:shadow-2xl hover:border-primary/20 hover:-translate-y-2 transition-all duration-500 text-center flex flex-col items-center justify-center gap-4 group active:scale-95"
                      onClick={() => setSelectedClass(item)}
                    >
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-500">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <h3 className="font-display text-xl text-slate-900 group-hover:text-primary transition-colors leading-tight tracking-tight uppercase">{item.class_name}</h3>
                      <div className="text-[10px] uppercase font-black text-primary/40 opacity-0 group-hover:opacity-100 tracking-[0.2em] transition-opacity">Details</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pop-up Dialog Details is now very simple but clean */}
      {selectedClass && (
        <Dialog open={!!selectedClass} onOpenChange={(open) => !open && setSelectedClass(null)}>
          <DialogContent className="max-w-md rounded-[2.5rem] border-none shadow-3xl bg-white p-0 overflow-hidden outline-none animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-primary/5 p-8 border-b border-primary/10 flex justify-between items-center text-left">
              <div>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] leading-none mb-2">Academic Profile</p>
                <DialogTitle className="text-3xl font-display text-slate-900 outline-none leading-none uppercase">
                  {selectedClass.class_name}
                </DialogTitle>
              </div>
              <button
                onClick={() => setSelectedClass(null)}
                className="bg-primary/10 hover:bg-primary/20 p-3 rounded-2xl text-primary transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-10 text-left">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                Included Subjects
              </h3>

              <div className="space-y-3">
                {selectedClass.subjects.map((sub, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:bg-white transition-all">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="font-bold text-slate-700 text-base">{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-10 pb-10">
              <button
                onClick={() => setSelectedClass(null)}
                className="w-full bg-primary text-white py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-lg"
              >
                Close Details
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SyllabusPage;
