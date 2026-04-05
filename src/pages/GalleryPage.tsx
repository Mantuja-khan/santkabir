import { useState, useEffect } from "react";
import api from "@/api/client";
import { X, Maximize2, Loader2, ImageOff } from "lucide-react";
import { toast } from "sonner";
import { BACKEND_URL } from "@/config";

interface GalleryItem {
  _id: string;
  title: string;
  image_url: string;
}



const GalleryPage = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await api.get("/gallery");
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        toast.error("Failed to load gallery images");
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-slate-900 py-20 text-center">
        <h1 className="font-display text-4xl md:text-6xl text-white mb-4">School Gallery</h1>
        <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
        <p className="text-slate-400 max-w-xl mx-auto px-4 uppercase tracking-widest text-sm font-bold">
          Capturing the spirit of St.Kabir Public School
        </p>
      </section>

      <div className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-slate-500 font-medium">Loading gallery...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-32 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <ImageOff className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-display text-slate-800">No Photos Yet</h2>
            <p className="text-slate-500">Our gallery is currently being updated. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((item) => (
              <div
                key={item._id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer aspect-square"
                onClick={() => setSelectedImg(`${BACKEND_URL}${item.image_url}`)}
              >
                <img
                  src={`${BACKEND_URL}${item.image_url}`}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center">
                  <Maximize2 className="w-8 h-8 text-white mb-3" />
                  <p className="text-white font-display text-lg drop-shadow-md">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox / Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImg(null)}
        >
          <button
            className="absolute top-6 right-6 text-white bg-primary p-3 rounded-full hover:scale-110 transition-transform active:scale-95"
            onClick={() => setSelectedImg(null)}
          >
            <X className="w-6 h-6" />
          </button>

          <img
            src={selectedImg}
            alt="Expanded view"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
