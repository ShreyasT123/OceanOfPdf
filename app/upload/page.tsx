"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  FileImage,
  FileText,
  Loader2,
  Upload,
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
    <main className="min-h-screen bg-[#f6f1e8] text-zinc-950">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 md:px-10 lg:px-12">
        <div className="flex items-center justify-between border-b border-zinc-300 pb-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-zinc-600 transition-colors hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="flex items-center gap-3 text-right">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-500">
                Upload Desk
              </div>
              <div className="text-sm text-zinc-600">Supabase Storage + MongoDB catalog</div>
            </div>
          </div>
        </div>

        <div className="grid flex-1 gap-12 py-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.7fr)] lg:gap-16">
          <section className="flex flex-col justify-between gap-10">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-zinc-500">
                  Intake
                </p>
                <h1 className="max-w-3xl text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
                  Upload a book and make it searchable.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-zinc-600 md:text-lg">
                  PDF goes to Supabase Storage. Metadata lands in MongoDB. The archive can
                  then pick it up through the existing search flow.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="border border-zinc-300 bg-white px-4 py-5">
                  <FileText className="mb-4 h-5 w-5 text-zinc-700" />
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">
                    Required
                  </div>
                  <div className="mt-2 text-sm text-zinc-700">PDF file up to 50MB.</div>
                </div>
                <div className="border border-zinc-300 bg-white px-4 py-5">
                  <FileImage className="mb-4 h-5 w-5 text-zinc-700" />
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">
                    Optional
                  </div>
                  <div className="mt-2 text-sm text-zinc-700">Cover image up to 10MB.</div>
                </div>
                <div className="border border-zinc-300 bg-white px-4 py-5">
                  <BookOpen className="mb-4 h-5 w-5 text-zinc-700" />
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">
                    Indexed
                  </div>
                  <div className="mt-2 text-sm text-zinc-700">Title, author, tags, category.</div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 border-t border-zinc-300 pt-6 md:grid-cols-3">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-500">
                  PDF
                </div>
                <div className="mt-2 text-sm text-zinc-700">
                  {pdfFile ? `${pdfFile.name} (${formatBytes(pdfFile.size)})` : "No file selected"}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-500">
                  Cover
                </div>
                <div className="mt-2 text-sm text-zinc-700">
                  {coverFile ? `${coverFile.name} (${formatBytes(coverFile.size)})` : "Optional"}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-500">
                  Tags
                </div>
                <div className="mt-2 flex min-h-6 flex-wrap gap-2">
                  {tagPreview.length > 0 ? (
                    tagPreview.map((tag) => (
                      <span
                        key={tag}
                        className="border border-zinc-300 bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-zinc-600">No tags yet.</span>
                  )}
                </div>
              </div>
            </div>
          </section>

          <form className="grid gap-5 self-start" onSubmit={handleSubmit}>
            <div className="grid gap-5 bg-white p-6 shadow-[0_24px_80px_rgba(30,20,0,0.08)] md:p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-zinc-500">
                    Title
                  </span>
                  <input
                    required
                    value={form.title}
                    onChange={handleChange("title")}
                    className="h-12 border border-zinc-300 px-4 text-sm outline-none transition-colors focus:border-black"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-zinc-500">
                    Author
                  </span>
                  <input
                    required
                    value={form.author}
                    onChange={handleChange("author")}
                    className="h-12 border border-zinc-300 px-4 text-sm outline-none transition-colors focus:border-black"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_160px]">
                <label className="grid gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-zinc-500">
                    Category
                  </span>
                  <select
                    required
                    value={form.category}
                    onChange={handleChange("category")}
                    className="h-12 border border-zinc-300 bg-white px-4 text-sm outline-none transition-colors focus:border-black"
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
                  <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-zinc-500">
                    Year
                  </span>
                  <input
                    required
                    inputMode="numeric"
                    value={form.publishedYear}
                    onChange={handleChange("publishedYear")}
                    className="h-12 border border-zinc-300 px-4 text-sm outline-none transition-colors focus:border-black"
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-zinc-500">
                  Tags
                </span>
                <input
                  value={form.tags}
                  onChange={handleChange("tags")}
                  placeholder="classic, philosophy, physics"
                  className="h-12 border border-zinc-300 px-4 text-sm outline-none transition-colors focus:border-black"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-zinc-500">
                  Summary
                </span>
                <textarea
                  rows={5}
                  value={form.summary}
                  onChange={handleChange("summary")}
                  className="resize-none border border-zinc-300 px-4 py-3 text-sm leading-6 outline-none transition-colors focus:border-black"
                />
              </label>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-3 border border-dashed border-zinc-300 px-4 py-5">
                  <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.26em] text-zinc-500">
                    <Upload className="h-4 w-4" />
                    PDF file
                  </span>
                  <input type="file" accept="application/pdf" onChange={handlePdfChange} required />
                </label>
                <label className="grid gap-3 border border-dashed border-zinc-300 px-4 py-5">
                  <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.26em] text-zinc-500">
                    <FileImage className="h-4 w-4" />
                    Cover image
                  </span>
                  <input type="file" accept="image/*" onChange={handleCoverChange} />
                </label>
              </div>

              {(error || success) && (
                <div
                  className={`border px-4 py-3 text-sm ${
                    error
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "border-emerald-200 bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {error || success}
                </div>
              )}

              <button
                type="submit"
                disabled={isUploading}
                className="flex h-13 items-center justify-center gap-3 bg-black px-6 text-xs font-black uppercase tracking-[0.3em] text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
              >
                {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                {isUploading ? "Uploading" : "Upload Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
