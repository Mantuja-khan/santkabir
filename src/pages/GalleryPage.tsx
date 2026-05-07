import { useState, useEffect, useMemo } from "react";
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

  const sortedGroupedItems = useMemo(() => {
    const groups: Record<string, GalleryItem[]> = {};
    items.forEach((item) => {
      if (!groups[item.title]) groups[item.title] = [];
      groups[item.title].push(item);
    });
    // Sort sections so that those with the most images appear first (at the top)
    return Object.entries(groups).sort((a, b) => b[1].length - a[1].length);
  }, [items]);

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
          <div className="space-y-24">
            {sortedGroupedItems.map(([title, images]) => (
              <div key={title} className="reveal-on-scroll show px-2">
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="font-display text-2xl md:text-4xl text-slate-900 whitespace-nowrap">
                    {title}
                  </h3>
                  <div className="h-px flex-grow bg-slate-200 rounded-full"></div>
                  <div className="hidden sm:flex items-center gap-2 text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                    {images.length} {images.length === 1 ? "Image" : "Images"}
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-1">
                  {images.map((item) => (
                    <div
                      key={item._id}
                      className="group relative bg-white rounded-2xl md:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer aspect-square border border-slate-100"
                      onClick={() => setSelectedImg(`${BACKEND_URL}${item.image_url}`)}
                    >
                      <img
                        src={`${BACKEND_URL}${item.image_url}`}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <div className="bg-white/20 p-4 rounded-full backdrop-blur-md scale-75 group-hover:scale-100 transition-all duration-500 border border-white/30">
                          <Maximize2 className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
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
