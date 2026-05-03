"use client";

import { ChangeEvent, FormEvent, useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  FileImage,
  FileText,
  Loader2,
  Upload,
  Menu,
  X,
} from "lucide-react";

type FormState = {
  title: string;
  author: string;
  category: string;
  publishedYear: string;
  tags: string;
  summary: string;
};

const initialForm: FormState = {
  title: "",
  author: "",
  category: "",
  publishedYear: "",
  tags: "",
  summary: "",
};

import { Noise } from "@/components/noise";

import { CharByCharReveal, WordByWordFade } from "@/components/text-animations";
import { MenuOverlay } from "@/components/menu-overlay";
import { SubpageHeader } from "@/components/subpage-header";

const categories = [
  "Fiction",
  "Non-Fiction",
  "Science",
  "Technology",
  "Biography",
  "Philosophy",
  "History",
  "Self-Help",
  "Academic",
];

const formatBytes = (bytes: number) => {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function UploadPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCustomCursor, setShowCustomCursor] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Custom cursor tracking
  const springConfig = { stiffness: 1000, damping: 50, mass: 0.1 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.remove("hide-default-cursor");
    } else {
      document.body.classList.add("hide-default-cursor");
    }
  }, [isMenuOpen]);

  const tagPreview = useMemo(
    () =>
      form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    [form.tags]
  );

  const handleChange =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handlePdfChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPdfFile(event.target.files?.[0] || null);
  };

  const handleCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCoverFile(event.target.files?.[0] || null);
  };

  const resetForm = () => {
    setForm(initialForm);
    setPdfFile(null);
    setCoverFile(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please sign in before uploading.");
      return;
    }

    if (!pdfFile) {
      setError("Choose a PDF to upload.");
      return;
    }

    setIsUploading(true);

    try {
      const payload = new FormData();
      payload.append("title", form.title);
      payload.append("author", form.author);
      payload.append("category", form.category);
      payload.append("publishedYear", form.publishedYear);
      payload.append("tags", form.tags);
      payload.append("summary", form.summary);
      payload.append("pdf", pdfFile);

      if (coverFile) {
        payload.append("cover", coverFile);
      }

      const response = await fetch("/api/books/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setSuccess("Book uploaded and indexed.");
      resetForm();

      if (data.book?.title) {
        router.push(`/search?q=${encodeURIComponent(data.book.title)}`);
      }
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#0C0A00]">
      <Noise />

      {/* Global Custom Cursor */}
      <motion.div
        className="fixed pointer-events-none z-[150] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: 1,
          opacity: isMenuOpen ? 0 : 1,
        }}
      >
        <AnimatePresence mode="wait">
          {!showCustomCursor ? (
            <motion.div
              key="default-cursor"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="w-4 h-4 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            />
          ) : (
            <motion.div
              key="visit-cursor"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-24 h-24 rounded-full bg-white flex flex-col items-center justify-center shadow-2xl"
            />
          )}
        </AnimatePresence>
      </motion.div>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SubpageHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className="relative pt-32 pb-20">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[60vh] flex items-center justify-center px-8 lg:px-16"
        >
          <div className="max-w-5xl w-full">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/50">
                  Share Knowledge
                </p>
              </motion.div>

              <div className="space-y-3">
                <CharByCharReveal 
                  text="Upload & Share." 
                  className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                />
                <WordByWordFade 
                  text="Add your books to the archive and make them discoverable to readers worldwide." 
                  className="text-base lg:text-lg text-white/60 max-w-3xl leading-relaxed"
                />
              </div>
            </div>
          </div>
        </motion.section>

        <div className="mx-auto max-w-7xl px-8 lg:px-16">
          <div className="grid flex-1 gap-12 py-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.7fr)] lg:gap-16">
            <section className="flex flex-col justify-between gap-10">
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/50">
                    Intake
                  </p>
                  <h2 className="max-w-3xl text-4xl font-black uppercase leading-none tracking-tight md:text-5xl text-white">
                    Upload a book and make it searchable.
                  </h2>
                  <p className="max-w-2xl text-base leading-7 text-white/60 md:text-lg">
                    PDF goes to Supabase Storage. Metadata lands in MongoDB. The archive can
                    then pick it up through the existing search flow.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="border border-white/20 bg-white/5 backdrop-blur px-4 py-5 rounded-lg"
                  >
                    <FileText className="mb-4 h-5 w-5 text-white/80" />
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">
                      Required
                    </div>
                    <div className="mt-2 text-sm text-white/70">PDF file up to 50MB.</div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="border border-white/20 bg-white/5 backdrop-blur px-4 py-5 rounded-lg"
                  >
                    <FileImage className="mb-4 h-5 w-5 text-white/80" />
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">
                      Optional
                    </div>
                    <div className="mt-2 text-sm text-white/70">Cover image up to 10MB.</div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="border border-white/20 bg-white/5 backdrop-blur px-4 py-5 rounded-lg"
                  >
                    <BookOpen className="mb-4 h-5 w-5 text-white/80" />
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">
                      Indexed
                    </div>
                    <div className="mt-2 text-sm text-white/70">Title, author, tags, category.</div>
                  </motion.div>
                </div>
              </div>

              <div className="grid gap-4 border-t border-white/20 pt-6 md:grid-cols-3">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/60">
                    PDF
                  </div>
                  <div className="mt-2 text-sm text-white/70">
                    {pdfFile ? `${pdfFile.name} (${formatBytes(pdfFile.size)})` : "No file selected"}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/60">
                    Cover
                  </div>
                  <div className="mt-2 text-sm text-white/70">
                    {coverFile ? `${coverFile.name} (${formatBytes(coverFile.size)})` : "Optional"}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/60">
                    Tags
                  </div>
                  <div className="mt-2 flex min-h-6 flex-wrap gap-2">
                    {tagPreview.length > 0 ? (
                      tagPreview.map((tag) => (
                        <span
                          key={tag}
                          className="border border-white/20 bg-white/10 backdrop-blur px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70 rounded"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-white/60">No tags yet.</span>
                    )}
                  </div>
                </motion.div>
              </div>
            </section>

            <motion.form 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-5 self-start" 
              onSubmit={handleSubmit}
            >
              <div className="grid gap-5 bg-white/5 backdrop-blur border border-white/20 p-6 md:p-8 rounded-2xl">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/60">
                      Title
                    </span>
                    <input
                      required
                      value={form.title}
                      onChange={handleChange("title")}
                      className="h-12 border border-white/20 bg-white/10 backdrop-blur px-4 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-white/40 rounded-lg"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/60">
                      Author
                    </span>
                    <input
                      required
                      value={form.author}
                      onChange={handleChange("author")}
                      className="h-12 border border-white/20 bg-white/10 backdrop-blur px-4 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-white/40 rounded-lg"
                    />
                  </label>
                </div>

                <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_160px]">
                  <label className="grid gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/60">
                      Category
                    </span>
                    <select
                      required
                      value={form.category}
                      onChange={handleChange("category")}
                      className="h-12 border border-white/20 bg-white/10 backdrop-blur px-4 text-sm text-white outline-none transition-colors focus:border-white/40 rounded-lg"
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/60">
                      Year
                    </span>
                    <input
                      required
                      inputMode="numeric"
                      value={form.publishedYear}
                      onChange={handleChange("publishedYear")}
                      className="h-12 border border-white/20 bg-white/10 backdrop-blur px-4 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-white/40 rounded-lg"
                    />
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/60">
                    Tags
                  </span>
                  <input
                    value={form.tags}
                    onChange={handleChange("tags")}
                    placeholder="classic, philosophy, physics"
                    className="h-12 border border-white/20 bg-white/10 backdrop-blur px-4 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-white/40 rounded-lg"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/60">
                    Summary
                  </span>
                  <textarea
                    rows={5}
                    value={form.summary}
                    onChange={handleChange("summary")}
                    className="resize-none border border-white/20 bg-white/10 backdrop-blur px-4 py-3 text-sm text-white placeholder-white/40 leading-6 outline-none transition-colors focus:border-white/40 rounded-lg"
                  />
                </label>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="grid gap-3 border border-dashed border-white/20 px-4 py-5 rounded-lg cursor-pointer hover:border-white/40 transition-colors">
                    <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.26em] text-white/60">
                      <Upload className="h-4 w-4" />
                      PDF file
                    </span>
                    <input type="file" accept="application/pdf" onChange={handlePdfChange} required />
                  </label>
                  <label className="grid gap-3 border border-dashed border-white/20 px-4 py-5 rounded-lg cursor-pointer hover:border-white/40 transition-colors">
                    <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.26em] text-white/60">
                      <FileImage className="h-4 w-4" />
                      Cover image
                    </span>
                    <input type="file" accept="image/*" onChange={handleCoverChange} />
                  </label>
                </div>

                {(error || success) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`border px-4 py-3 text-sm rounded-lg ${
                      error
                        ? "border-red-500/50 bg-red-500/10 text-red-400"
                        : "border-green-500/50 bg-green-500/10 text-green-400"
                    }`}
                  >
                    {error || success}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isUploading}
                  whileHover={{ scale: isUploading ? 1 : 1.05 }}
                  whileTap={{ scale: isUploading ? 1 : 0.95 }}
                  className="flex h-13 items-center justify-center gap-3 bg-white text-black px-6 text-xs font-black uppercase tracking-[0.3em] transition-all hover:bg-white/90 disabled:cursor-not-allowed disabled:bg-white/50 rounded-lg"
                >
                  {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  {isUploading ? "Uploading" : "Upload Book"}
                </motion.button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </main>
  );
}

