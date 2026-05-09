import { useState, useEffect } from "react";
import api from "@/api/client";
import { BookOpen, Loader2, FileText, GraduationCap, X, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import syllabus from "../assets/syllabus.png";

interface SyllabusRow {
  _id: string;
  group_name: string;
  class_name: string;
  subjects: any[];
  sort_order: number;
}

const SyllabusPage = () => {
  const [items, setItems] = useState<SyllabusRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<SyllabusRow | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<{ name: string; chapters: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const { data } = await api.get("/syllabus");
        const list = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
        setItems(list.sort((a: SyllabusRow, b: SyllabusRow) => (a.sort_order || 0) - (b.sort_order || 0)));
      } catch (err: any) {
        setError(err?.message || "Failed to load syllabus");
        toast.error("Failed to load syllabus");
      } finally {
        setLoading(false);
      }
    };
    fetchSyllabus();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedClass ? "hidden" : "";
    if (!selectedClass) setSelectedSubject(null);
    return () => { document.body.style.overflow = ""; };
  }, [selectedClass]);

  const groupedItems = items.reduce((acc: Record<string, SyllabusRow[]>, item) => {
    const key = item.group_name || "General";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 pb-16">

      {/* Hero */}
      <section className="relative h-52 sm:h-72 flex items-center justify-center overflow-hidden">
        <img
          src={syllabus}
          alt="School"
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] brightness-50"
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight drop-shadow-lg">
            Academic Syllabus
          </h1>
          <p className="mt-2 text-sm sm:text-base opacity-80 max-w-sm mx-auto">
            Class-wise curriculum for session 2026–27 · St. Kabir Public Sr. Sec. School
          </p>
        </div>
      </section>

      <div className="w-full max-w-[1440px] mx-auto lg:mx-0 px-4 md:px-8 lg:px-16 py-10">

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin mb-3" />
            <p className="text-sm">Loading syllabus…</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-20">
            <FileText className="w-12 h-12 text-red-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary text-white rounded-full text-sm font-semibold hover:opacity-90 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && items.length === 0 && (
          <div className="text-center py-20">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 italic">Syllabus will be available soon.</p>
          </div>
        )}

        {/* Groups */}
        {!loading && !error && items.length > 0 && (
          <div className="space-y-12">
            {Object.keys(groupedItems).map((groupName) => (
              <section key={groupName}>
                {/* Group heading */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">
                    {groupName}
                  </h2>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {groupedItems[groupName].map((item) => (
                    <button
                      key={item._id}
                      onClick={() => setSelectedClass(item)}
                      className="relative overflow-hidden group bg-white border border-gray-100 rounded-2xl p-5 text-left hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      {/* Background Image with low opacity */}
                      <div className="absolute inset-0 z-0 opacity-[0.08] group-hover:opacity-[0.14] group-hover:scale-110 transition-all duration-500">
                        <img
                          src={syllabus}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/80 via-white/95 to-primary/5" />

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <p className="font-bold text-gray-800 text-base leading-tight group-hover:text-primary transition-colors">
                          {item.class_name}
                        </p>
                        <p className="text-xs text-gray-400 font-semibold mt-1.5 uppercase tracking-wider">
                          {(item.subjects ?? []).length} subject{(item.subjects ?? []).length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedClass && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
          onClick={() => setSelectedClass(null)}
        >
          <div
            className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl overflow-hidden shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              {selectedSubject ? (
                <div className="flex items-center gap-2 text-left">
                  <button
                    onClick={() => setSelectedSubject(null)}
                    className="p-1 hover:bg-gray-100 rounded-lg text-gray-500 transition duration-200 text-xs font-bold mr-1"
                  >
                    ← Back
                  </button>
                  <div>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none mb-1">{selectedClass.class_name}</p>
                    <h3 className="text-lg font-bold text-gray-900 leading-none">{selectedSubject.name}</h3>
                  </div>
                </div>
              ) : (
                <div className="text-left">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Syllabus</p>
                  <h3 className="text-xl font-bold text-gray-900">{selectedClass.class_name}</h3>
                </div>
              )}
              <button
                onClick={() => setSelectedClass(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content list */}
            <div className="px-5 py-4 max-h-[60vh] overflow-y-auto">
              {selectedSubject ? (
                /* Chapters list */
                selectedSubject.chapters.length > 0 ? (
                  <ul className="space-y-2 text-left">
                    {selectedSubject.chapters.map((chap, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-primary/5 text-primary rounded-xl border border-primary/10"
                      >
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-semibold text-gray-800">{chap}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400 italic text-center py-6">
                    No chapters listed for this subject yet.
                  </p>
                )
              ) : (selectedClass.subjects ?? []).length > 0 ? (
                <ul className="space-y-2 text-left">
                  {selectedClass.subjects.map((sub: any, idx) => {
                    const subjectName = typeof sub === "string" ? sub : sub.name;
                    const subjectChapters = typeof sub === "string" ? [] : sub.chapters || [];

                    return (
                      <li key={idx}>
                        <button
                          onClick={() => {
                            setSelectedSubject({ name: subjectName, chapters: subjectChapters });
                          }}
                          className="w-full flex items-center justify-between p-3.5 bg-gray-50 hover:bg-primary/5 hover:border-primary/20 border border-gray-100 rounded-xl transition text-left"
                        >
                          <div className="flex items-center gap-3">
                            <BookOpen className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-sm font-semibold text-gray-800">{subjectName}</span>
                          </div>
                          <span className="text-xs text-slate-400 font-bold bg-white px-2 py-1 rounded-lg border border-slate-100">
                            {subjectChapters.length > 0 ? `${subjectChapters.length} Chapters` : "View"} →
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-sm text-gray-400 italic text-center py-6">
                  No subjects listed yet.
                </p>
              )}
            </div>

            {/* Modal footer */}
            <div className="px-5 py-4 border-t border-gray-100">
              <button
                onClick={() => setSelectedClass(null)}
                className="w-full py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SyllabusPage;