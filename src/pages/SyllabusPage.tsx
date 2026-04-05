import { useState, useEffect } from "react";
import api from "@/api/client";
import { BookOpen, GraduationCap, X, CheckCircle, Loader2, FileText, ChevronRight, Bookmark } from "lucide-react";
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
    const groupName = item.group_name || "General";
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Dynamic Header */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 -left-20 w-96 h-96 bg-primary rounded-full blur-[100px]" />
            <div className="absolute bottom-0 -right-20 w-96 h-96 bg-secondary rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
            <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black uppercase tracking-[0.3em] bg-white/10 text-white/80 rounded-full backdrop-blur-md">
                Academic Session 2026-27
            </span>
            <h1 className="font-display text-5xl md:text-8xl text-white mb-6 uppercase tracking-tight">
                Curriculum <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">&</span> Syllabus
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-light">
                Discover our comprehensive educational journey designed to inspire future leaders Class by Class.
            </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-16 relative z-30 pb-32">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6 bg-white rounded-[3rem] shadow-2xl border border-slate-100">
            <div className="relative">
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
                <BookOpen className="w-6 h-6 text-primary absolute inset-0 m-auto" />
            </div>
            <p className="text-slate-800 font-display text-xl animate-pulse uppercase tracking-widest">Organizing Academic Modules...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-xl max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
                <FileText className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-display text-slate-900 mb-4 uppercase tracking-tighter">Updating Curriculum</h2>
            <p className="text-slate-500 max-w-md mx-auto mb-10">We are currently refreshing our course modules for the upcoming session. Please stay tuned.</p>
            <div className="inline-flex gap-2 p-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-400 px-4 uppercase tracking-widest">Coming Soon</div>
          </div>
        ) : (
          <div className="space-y-32">
            {Object.keys(groupedItems).map((groupName) => (
              <div key={groupName} className="relative">
                <div className="sticky top-24 z-40 mb-12">
                     <div className="bg-white/80 backdrop-blur-xl w-fit px-10 py-5 rounded-full shadow-2xl border border-white flex items-center gap-6 group hover:border-primary/20 transition-all">
                        <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-transform shadow-xl">
                            <Bookmark className="w-6 h-6" />
                        </div>
                        <h2 className="font-display text-3xl md:text-4xl text-slate-900 uppercase tracking-tighter">{groupName}</h2>
                     </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 pl-4 md:pl-20 border-l border-slate-200 ml-6 md:ml-10">
                  {groupedItems[groupName].map((item: SyllabusRow, idx: number) => (
                    <div 
                        key={item._id}
                        className="group relative"
                        style={{ animationDelay: `${idx * 150}ms` }}
                    >
                        <div className="absolute -left-[3.1rem] md:-left-[6.1rem] top-10 w-6 h-6 md:w-8 md:h-8 bg-white border-4 border-slate-900 rounded-full z-20 shadow-lg group-hover:bg-primary group-hover:border-primary transition-all duration-500" />
                        
                        <button 
                            className="w-full bg-white rounded-[2.5rem] p-10 md:p-12 shadow-md border border-slate-100 hover:shadow-2xl hover:border-primary/30 transition-all duration-500 text-left flex flex-col group relative overflow-hidden"
                            onClick={() => setSelectedClass(item)}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            
                            <div className="flex items-center justify-between mb-10 relative z-10 w-full">
                                <span className="bg-slate-50 text-slate-400 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest group-hover:bg-primary/10 group-hover:text-primary transition-colors italic">Class Profile</span>
                                <ChevronRight className="w-6 h-6 text-slate-300 group-hover:translate-x-2 group-hover:text-primary transition-all" />
                            </div>
                            
                            <h3 className="font-display text-3xl md:text-5xl text-slate-900 mb-6 group-hover:text-primary transition-colors leading-none tracking-tighter uppercase">{item.class_name}</h3>
                            
                            <div className="flex items-center gap-3 text-slate-400 group-hover:text-slate-600 transition-colors">
                                <BookOpen className="w-4 h-4" />
                                <span className="text-xs font-medium uppercase tracking-widest">{item.subjects.length} Subjects Included</span>
                            </div>
                            
                            <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between w-full">
                                <div className="flex -space-x-3">
                                    {[1,2,3].map(i => <div key={i} className="w-8 h-8 bg-slate-50 border-2 border-white rounded-full flex items-center justify-center text-[10px] font-bold text-slate-300">S{i}</div>)}
                                </div>
                                <span className="text-[10px] font-black uppercase text-primary tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Explore Scope</span>
                            </div>
                        </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modern Dialog for Syllabus Details */}
      {selectedClass && (
        <Dialog open={!!selectedClass} onOpenChange={(open) => !open && setSelectedClass(null)}>
            <DialogContent className="max-w-[95vw] sm:max-w-2xl rounded-[3rem] border-none shadow-3xl bg-white p-0 overflow-hidden max-h-[90vh] overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-20 duration-500">
                <div className="bg-slate-900 p-10 md:p-14 text-white relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-20 -mr-32 -mt-32" />
                    <DialogHeader className="text-left relative z-10">
                        <div className="flex items-center gap-3 opacity-50 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                            <GraduationCap className="w-4 h-4" /> Academic Overview
                        </div>
                        <DialogTitle className="font-display text-4xl md:text-7xl text-white outline-none tracking-tighter uppercase leading-none">
                            {selectedClass.class_name}
                        </DialogTitle>
                    </DialogHeader>
                    <button 
                        onClick={() => setSelectedClass(null)}
                        className="absolute top-8 right-8 bg-white/10 hover:bg-primary p-4 rounded-3xl text-white transition-all shadow-lg active:scale-90"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="p-10 md:p-14 space-y-12">
                    <div className="flex items-center justify-between">
                        <h3 className="font-display text-2xl text-slate-900 uppercase tracking-tight flex items-center gap-3">
                            <span className="w-1.5 h-8 bg-primary rounded-full" />
                            Curriculum Subjects
                        </h3>
                        <span className="px-5 py-2 bg-slate-50 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-widest outline outline-1 outline-slate-200">Session 26-27</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                       {selectedClass.subjects.map((sub, idx) => (
                         <div 
                            key={idx} 
                            className="bg-slate-50 p-6 md:p-8 rounded-[2rem] border border-slate-100 flex items-center gap-5 hover:bg-white hover:shadow-2xl hover:border-primary/10 transition-all group"
                         >
                           <div className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 rotate-3 group-hover:rotate-0 flex-shrink-0">
                             <CheckCircle className="w-6 h-6" />
                           </div>
                           <span className="font-bold text-slate-700 text-lg md:text-xl leading-tight">{sub}</span>
                         </div>
                       ))}
                    </div>
                    
                    <div className="pt-10 flex flex-col md:flex-row gap-4">
                        <button 
                            onClick={() => setSelectedClass(null)}
                            className="flex-1 bg-slate-900 text-white py-6 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-primary transition-all active:scale-95 shadow-2xl"
                        >
                            Close Syllabus
                        </button>
                        <a 
                            href="tel:9813177106"
                            className="bg-slate-50 text-slate-900 border border-slate-200 px-10 py-6 rounded-full font-bold uppercase tracking-widest text-[10px] text-center hover:bg-white transition-all"
                        >
                            Talk to Counselor
                        </a>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SyllabusPage;
