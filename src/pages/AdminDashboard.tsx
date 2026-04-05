import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/client";
import { BACKEND_URL } from "@/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Trash2, Plus, Edit, Users, BookOpen, Image as ImageIcon, LayoutDashboard, ChevronRight, Upload, X, Files } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Admission = {
  _id: string;
  student_name: string;
  class_applied: string;
  phone_number: string;
  father_name: string;
  mother_name: string;
  age: number;
  status: string;
  created_at: string;
};

type SyllabusRow = {
  _id: string;
  group_name: string;
  class_name: string;
  subjects: string[];
  sort_order: number;
};

type GalleryItem = {
  _id: string;
  title: string;
  image_url: string;
};

const groupOptions = [
  "Pre-Primary (Nursery, LKG, UKG)",
  "Primary (Class 1 to 5)",
  "Middle School (Class 6 to 8)",
  "Secondary (Class 9 & 10)",
  "Senior Secondary (Class 11 & 12)",
];



const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [syllabus, setSyllabus] = useState<SyllabusRow[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("admissions");

  // Syllabus form
  const [syllabusDialog, setSyllabusDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [sForm, setSForm] = useState({ group_name: "", class_name: "", subjects: "", sort_order: "0" });

  // Gallery form
  const [galleryDialog, setGalleryDialog] = useState(false);
  const [galleryForm, setGalleryForm] = useState({ title: "" });
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate("/admin"); return; }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);

    // Fetch admissions independently (protected)
    try {
      const { data } = await api.get("/admissions");
      setAdmissions(Array.isArray(data) ? data : []);
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast({ title: "Session Expired", description: "Please login again.", variant: "destructive" });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/admin");
        return;
      }
      toast({ title: "Error fetching admissions", variant: "destructive" });
    }

    // Fetch others independently (not protected on server usually, but let's be safe)
    try {
      const [sylRes, galRes] = await Promise.all([
        api.get("/syllabus"),
        api.get("/gallery"),
      ]);
      setSyllabus(Array.isArray(sylRes.data) ? sylRes.data : []);
      setGallery(Array.isArray(galRes.data) ? galRes.data : []);
    } catch (err) {
      console.error("Fetch content error:", err);
      toast({ title: "Error fetching content", variant: "destructive" });
    }

    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate("/admin");
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/admissions/${id}`, { status });
      setAdmissions((prev) => prev.map((a) => a._id === id ? { ...a, status } : a));
      toast({ title: `Status updated to ${status}` });
    } catch (err) {
      toast({ title: "Error updating status", variant: "destructive" });
    }
  };

  const deleteAdmission = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/admissions/${id}`);
      setAdmissions((prev) => prev.filter((a) => a._id !== id));
      toast({ title: "Admission deleted" });
    } catch (err) {
      toast({ title: "Error deleting", variant: "destructive" });
    }
  };

  // Syllabus CRUD
  const openSyllabusForm = (row?: SyllabusRow) => {
    if (row) {
      setEditingId(row._id);
      setSForm({ group_name: row.group_name, class_name: row.class_name, subjects: row.subjects.join(", "), sort_order: String(row.sort_order) });
    } else {
      setEditingId(null);
      setSForm({ group_name: "", class_name: "", subjects: "", sort_order: "0" });
    }
    setSyllabusDialog(true);
  };

  const saveSyllabus = async () => {
    const subjects = sForm.subjects.split(",").map((s) => s.trim()).filter(Boolean);
    if (!sForm.group_name || !sForm.class_name || subjects.length === 0) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }

    const payload = {
      group_name: sForm.group_name,
      class_name: sForm.class_name,
      subjects,
      sort_order: parseInt(sForm.sort_order) || 0,
    };

    try {
      if (editingId) {
        await api.put(`/syllabus/${editingId}`, payload);
        toast({ title: "Syllabus updated" });
      } else {
        await api.post(`/syllabus`, payload);
        toast({ title: "Syllabus added" });
      }
      setSyllabusDialog(false);
      fetchData();
    } catch (err) {
      toast({ title: "Error saving syllabus", variant: "destructive" });
    }
  };

  const deleteSyllabus = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/syllabus/${id}`);
      setSyllabus((prev) => prev.filter((s) => s._id !== id));
      toast({ title: "Syllabus entry deleted" });
    } catch (err) {
      toast({ title: "Error deleting", variant: "destructive" });
    }
  };

  // Gallery CRUD
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setGalleryFiles((prev) => [...prev, ...files]);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setGalleryPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeFile = (index: number) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const saveGallery = async () => {
    if (!galleryForm.title || galleryFiles.length === 0) {
      toast({ title: "Title and at least one Image are required", variant: "destructive" });
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("title", galleryForm.title);
    galleryFiles.forEach(file => {
      formData.append("images", file);
    });

    try {
      await api.post("/gallery", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast({ title: "Photos uploaded successfully!" });
      setGalleryDialog(false);
      setGalleryFiles([]);
      setGalleryPreviews([]);
      setGalleryForm({ title: "" });
      fetchData();
    } catch (err) {
      toast({ title: "Error uploading images", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const deleteGallery = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/gallery/${id}`);
      setGallery((prev) => prev.filter((g) => g._id !== id));
      toast({ title: "Photo deleted" });
    } catch (err) {
      toast({ title: "Error deleting", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-card">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-primary font-display animate-pulse">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-card flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-secondary text-secondary-foreground flex flex-col h-auto md:h-screen sticky top-0 z-50">
        <div className="p-6 border-b border-secondary-foreground/10">
          <h1 className="font-display text-2xl tracking-tighter">St.KABIR</h1>
          <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold">Admin Portal</p>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          {[
            { id: "admissions", icon: Users, label: "Admissions" },
            { id: "syllabus", icon: BookOpen, label: "Syllabus" },
            { id: "gallery", icon: ImageIcon, label: "Gallery" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === item.id ? "bg-primary text-primary-foreground shadow-lg scale-105" : "hover:bg-white/10"}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-semibold text-sm">{item.label}</span>
              {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-secondary-foreground/10">
          <Button variant="ghost" className="w-full text-secondary-foreground hover:bg-destructive/20 hover:text-destructive flex items-center justify-start gap-3 py-6" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
            <span className="font-bold">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-10 overflow-y-auto bg-slate-50/50">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-foreground capitalize">{activeTab}</h2>
            <p className="text-muted-foreground mt-1">Manage your school's {activeTab} data efficiently.</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-border">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">A</div>
            <div className="hidden md:block">
              <p className="text-xs font-bold leading-none">Administrator</p>
              <p className="text-[10px] text-muted-foreground mt-1">santkabirschool@gmail.com</p>
            </div>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Admissions Tab */}
          <TabsContent value="admissions" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-3xl shadow-xl shadow-primary/5 p-6 border border-border">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                <h3 className="font-display text-xl text-foreground flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users className="w-5 h-5" /></div>
                  Active Applications
                </h3>
                <div className="px-4 py-2 bg-slate-100 rounded-full text-xs font-bold text-slate-600 uppercase tracking-widest">{admissions.length} Total</div>
              </div>

              {admissions.length === 0 ? (
                <div className="text-center py-20 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-muted-foreground font-medium">No applications received yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-100">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead className="font-bold text-slate-700">Student</TableHead>
                        <TableHead className="font-bold text-slate-700">Class</TableHead>
                        <TableHead className="font-bold text-slate-700">Parent Details</TableHead>
                        <TableHead className="font-bold text-slate-700">Status</TableHead>
                        <TableHead className="font-bold text-slate-700">Applied On</TableHead>
                        <TableHead className="font-bold text-slate-700 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {admissions.map((a) => (
                        <TableRow key={a._id} className="hover:bg-slate-50/50 transition-colors">
                          <TableCell>
                            <div className="font-bold text-slate-900">{a.student_name}</div>
                            <div className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1"><LayoutDashboard className="w-3 h-3" /> Age: {a.age}</div>
                          </TableCell>
                          <TableCell className="font-semibold text-primary">{a.class_applied}</TableCell>
                          <TableCell>
                            <div className="text-xs font-medium">{a.father_name} (F)</div>
                            <div className="text-xs font-medium">{a.mother_name} (M)</div>
                            <div className="text-[10px] font-bold text-slate-400 mt-1">{a.phone_number}</div>
                          </TableCell>
                          <TableCell>
                            <Select value={a.status} onValueChange={(v) => updateStatus(a._id, v)}>
                              <SelectTrigger className={`w-32 h-9 text-xs font-bold rounded-lg border-2 border-slate-100 shadow-none capitalize ${a.status === 'approved' ? 'text-green-600 bg-green-50/50' : a.status === 'rejected' ? 'text-red-600 bg-red-50/50' : 'text-orange-600 bg-orange-50/50'}`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl border-2">
                                <SelectItem value="pending" className="font-bold text-orange-600">Pending</SelectItem>
                                <SelectItem value="approved" className="font-bold text-green-600">Approved</SelectItem>
                                <SelectItem value="rejected" className="font-bold text-red-600">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-[10px] font-medium text-muted-foreground uppercase">{new Date(a.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => deleteAdmission(a._id)} className="hover:bg-red-50 hover:text-red-500 rounded-lg">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Syllabus Tab */}
          <TabsContent value="syllabus" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-3xl shadow-xl shadow-primary/5 p-6 border border-border">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
                <h3 className="font-display text-xl text-foreground flex items-center gap-3">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><BookOpen className="w-5 h-5" /></div>
                  Academic Syllabus
                </h3>
                <Dialog open={syllabusDialog} onOpenChange={setSyllabusDialog}>
                  <DialogTrigger asChild>
                    <Button onClick={() => openSyllabusForm()} className="rounded-xl font-bold px-6 shadow-lg shadow-primary/20"><Plus className="w-4 h-4 mr-2" /> Add Entry</Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-3xl border-2 sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="font-display text-2xl">{editingId ? "Edit Syllabus" : "New Syllabus"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-5 py-4">
                      <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase tracking-widest text-slate-400">Class Group</Label>
                        <Select value={sForm.group_name} onValueChange={(v) => setSForm((p) => ({ ...p, group_name: v }))}>
                          <SelectTrigger className="rounded-xl h-12 border-2"><SelectValue placeholder="Select group" /></SelectTrigger>
                          <SelectContent className="rounded-xl border-2">
                            {groupOptions.map((g) => (<SelectItem key={g} value={g}>{g}</SelectItem>))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase tracking-widest text-slate-400">Class Name</Label>
                        <Input value={sForm.class_name} onChange={(e) => setSForm((p) => ({ ...p, class_name: e.target.value }))} placeholder="e.g. Class 5" className="rounded-xl h-12 border-2" />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase tracking-widest text-slate-400">Subjects (comma-separated)</Label>
                        <Input value={sForm.subjects} onChange={(e) => setSForm((p) => ({ ...p, subjects: e.target.value }))} placeholder="English, Hindi, Mathematics" className="rounded-xl h-12 border-2" />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase tracking-widest text-slate-400">Display Order</Label>
                        <Input type="number" value={sForm.sort_order} onChange={(e) => setSForm((p) => ({ ...p, sort_order: e.target.value }))} className="rounded-xl h-12 border-2" />
                      </div>
                      <Button onClick={saveSyllabus} className="w-full h-12 rounded-xl font-bold text-lg mt-4">{editingId ? "Update Entry" : "Create Entry"}</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {syllabus.length === 0 ? (
                <div className="text-center py-20 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
                  <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-muted-foreground font-medium">No syllabus entries found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-100">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead className="font-bold text-slate-700">Group</TableHead>
                        <TableHead className="font-bold text-slate-700">Class</TableHead>
                        <TableHead className="font-bold text-slate-700">Subjects</TableHead>
                        <TableHead className="font-bold text-slate-700">Order</TableHead>
                        <TableHead className="font-bold text-slate-700 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {syllabus.map((s) => (
                        <TableRow key={s._id} className="hover:bg-slate-50/50 transition-colors">
                          <TableCell className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{s.group_name}</TableCell>
                          <TableCell className="font-bold text-primary">{s.class_name}</TableCell>
                          <TableCell className="text-xs max-w-xs overflow-hidden">
                            <div className="flex flex-wrap gap-1">
                              {s.subjects.map((sub, si) => (
                                <span key={si} className="px-2 py-0.5 bg-slate-100 rounded text-slate-600 font-medium">{sub}</span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="font-bold text-slate-600">{s.sort_order}</TableCell>
                          <TableCell className="text-right flex justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => openSyllabusForm(s)} className="hover:bg-primary/10 hover:text-primary rounded-lg">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => deleteSyllabus(s._id)} className="hover:bg-red-50 hover:text-red-500 rounded-lg">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-3xl shadow-xl shadow-primary/5 p-6 border border-border">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
                <h3 className="font-display text-xl text-foreground flex items-center gap-3">
                  <div className="p-2 bg-pink-50 text-pink-600 rounded-lg"><ImageIcon className="w-5 h-5" /></div>
                  School Media Gallery
                </h3>
                <Dialog open={galleryDialog} onOpenChange={(val) => {
                  setGalleryDialog(val);
                  if (!val) { setGalleryPreviews([]); setGalleryFiles([]); setGalleryForm({ title: "" }); }
                }}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setGalleryDialog(true)} className="rounded-xl font-bold px-6 shadow-lg shadow-pink-500/20 bg-pink-600 hover:bg-pink-700 text-white"><Plus className="w-4 h-4 mr-2" /> Upload Multiple</Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-3xl border-2 sm:max-w-xl">
                    <DialogHeader>
                      <DialogTitle className="font-display text-2xl">Upload Multiple Photos</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                      {galleryPreviews.length > 0 ? (
                        <div className="grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto p-2 border-2 border-slate-50 rounded-2xl">
                          {galleryPreviews.map((pre, idx) => (
                            <div key={idx} className="relative rounded-xl overflow-hidden aspect-square group shadow-sm">
                              <img src={pre} alt="Preview" className="w-full h-full object-cover" />
                              <button
                                onClick={() => removeFile(idx)}
                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => document.getElementById('file-upload-more')?.click()}
                            className="border-2 border-dashed border-slate-200 rounded-xl aspect-square flex items-center justify-center text-slate-300 hover:text-primary hover:border-primary/20 transition-all"
                          >
                            <Plus className="w-8 h-8" />
                          </button>
                          <input id="file-upload-more" type="file" className="hidden" accept="image/*" multiple onChange={handleFileChange} />
                        </div>
                      ) : (
                        <div
                          className="border-4 border-dashed border-slate-100 rounded-3xl aspect-[16/6] flex flex-col items-center justify-center gap-3 transition-colors hover:border-primary/20 hover:bg-slate-50 cursor-pointer relative"
                          onClick={() => document.getElementById('file-upload')?.click()}
                        >
                          <div className="p-4 bg-primary/5 text-primary rounded-full">
                            <Files className="w-8 h-8" />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-bold text-slate-600">Click to choose multiple photos</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">PNG, JPG up to 5MB each</p>
                          </div>
                          <input id="file-upload" type="file" className="hidden" accept="image/*" multiple onChange={handleFileChange} />
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase tracking-widest text-slate-400">All Photos Title</Label>
                        <Input value={galleryForm.title} onChange={(e) => setGalleryForm((p) => ({ ...p, title: e.target.value }))} placeholder="e.g. Annual Sports Meet 2024" className="rounded-xl h-12 border-2" />
                      </div>

                      <Button onClick={saveGallery} className="w-full h-12 rounded-xl font-bold text-lg bg-pink-600 shadow-lg shadow-pink-500/20 text-white" disabled={galleryFiles.length === 0 || !galleryForm.title || uploading}>
                        {uploading ? `Uploading ${galleryFiles.length} images...` : `Start Upload (${galleryFiles.length} files)`}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {gallery.length === 0 ? (
                <div className="text-center py-20 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
                  <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-muted-foreground font-medium">No photos uploaded yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {gallery.map((g) => (
                    <div key={g._id} className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                      <div className="relative aspect-square">
                        <img src={`${BACKEND_URL}${g.image_url}`} alt={g.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                          <p className="text-white font-bold text-sm truncate">{g.title}</p>
                        </div>
                      </div>
                      <div className="p-2 border-t border-slate-50">
                        <Button variant="ghost" size="sm" className="w-full text-destructive hover:bg-red-50 hover:text-red-600 font-bold text-[10px] uppercase tracking-widest" onClick={() => deleteGallery(g._id)}>
                          <Trash2 className="w-3 h-3 mr-2" /> Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
