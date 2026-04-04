import { useState, useEffect } from "react";
import api from "@/api/client";
import { BookOpen, GraduationCap, X, CheckCircle, Loader2, FileText } from "lucide-react";
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
        toast.error("Failed to load academic syllabus");
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSyllabus();
  }, []);

  const groupedItems = (items || []).reduce((acc: any, item) => {
    const groupName = item.group_name || "School";
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-primary/95 py-20 text-center text-white">
        <h1 className="font-display text-4xl md:text-6xl mb-4">Academic Curriculum</h1>
        <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
        <p className="text-white/80 max-w-xl mx-auto px-4 uppercase tracking-[0.2em] text-sm font-bold">
          Empowering Minds Class by Class
        </p>
      </section>

      <div className="container mx-auto px-4 py-16 -mt-10 relative z-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4 bg-white rounded-3xl shadow-xl">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-slate-500 font-medium">Synchronizing Academic Data...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-xl max-w-3xl mx-auto">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-display text-slate-800">Curriculum Pending</h2>
            <p className="text-slate-500 italic">We are currently updating our academic modules for the new session.</p>
          </div>
        ) : (
          <div className="space-y-20">
            {Object.keys(groupedItems).map((groupName) => (
              <div key={groupName} className="space-y-10 focus-within:z-10">
                <div className="flex items-center gap-4 bg-white w-fit px-8 py-3 rounded-full shadow-lg border border-primary/10">
                    <GraduationCap className="w-6 h-6 text-primary" />
                    <h2 className="font-display text-2xl text-slate-900 border-b-2 border-primary/20 pb-1">{groupName}</h2>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-10">
                  {groupedItems[groupName].map((item: SyllabusRow) => (
                    <button 
                        key={item._id}
                        className="bg-white rounded-[2rem] p-8 md:p-12 shadow-md border border-slate-100 hover:shadow-2xl hover:border-primary/20 hover:-translate-y-2 transition-all duration-500 text-center flex flex-col items-center justify-center gap-6 group aspect-square md:aspect-auto"
                        onClick={() => setSelectedClass(item)}
                    >
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-primary transition-all duration-500">
                        <BookOpen className="w-8 h-8" />
                      </div>
                      <h3 className="font-display text-xl md:text-2xl text-slate-800 group-hover:text-primary transition-colors">{item.class_name}</h3>
                      <div className="text-[10px] uppercase font-black text-primary/40 group-hover:opacity-100 tracking-[0.2em]">View Details</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Simple Dialog for Syllabus Details */}
      {selectedClass && (
        <Dialog open={!!selectedClass} onOpenChange={(open) => !open && setSelectedClass(null)}>
            <DialogContent className="max-w-[95vw] sm:max-w-xl rounded-[2.5rem] border-none shadow-3xl bg-white p-0 overflow-hidden max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
                <div className="bg-primary p-10 text-white relative">
                    <DialogHeader className="text-left">
                        <div className="flex items-center gap-3 opacity-60 text-xs font-bold uppercase tracking-widest mb-3">
                            <GraduationCap className="w-4 h-4" /> Academic Syllabus
                        </div>
                        <DialogTitle className="font-display text-3xl md:text-5xl text-white outline-none">
                            {selectedClass.class_name}
                        </DialogTitle>
                    </DialogHeader>
                    <button 
                        onClick={() => setSelectedClass(null)}
                        className="absolute top-6 right-6 bg-white/20 hover:bg-white/40 p-3 rounded-full text-white transition-all shadow-lg active:scale-95"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="p-10 space-y-10">
                    <h3 className="font-display text-2xl text-slate-800 flex items-center gap-3 border-b-2 border-slate-50 pb-4">
                        Included Subjects
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {selectedClass.subjects.map((sub, idx) => (
                         <div 
                            key={idx} 
                            className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 flex items-center gap-4 hover:bg-white hover:shadow-xl hover:border-primary/10 transition-all group"
                         >
                           <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary transition-all">
                             <CheckCircle className="w-5 h-5" />
                           </div>
                           <span className="font-bold text-slate-700 text-lg">{sub}</span>
                         </div>
                       ))}
                    </div>
                    
                    <div className="pt-10 flex justify-center">
                        <button 
                            onClick={() => setSelectedClass(null)}
                            className="w-full bg-primary text-white py-5 rounded-full font-black uppercase tracking-widest text-xs hover:shadow-2xl hover:scale-[1.02] transition-all active:scale-95 shadow-lg shadow-primary/20"
                        >
                            Got it, thanks!
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SyllabusPage;
