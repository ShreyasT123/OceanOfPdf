import { NextResponse } from "next/server";

export const runtime = "nodejs";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_BOOKS_BUCKET = process.env.SUPABASE_BOOKS_BUCKET || "oop";
const SUPABASE_COVERS_BUCKET = SUPABASE_BOOKS_BUCKET;
const SUPABASE_BOOKS_PREFIX = process.env.SUPABASE_BOOKS_PREFIX || "books";
const SUPABASE_COVERS_PREFIX = process.env.SUPABASE_COVERS_PREFIX || "cover_imgs";

const MAX_PDF_SIZE = 50 * 1024 * 1024;
const MAX_COVER_SIZE = 10 * 1024 * 1024;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "book";

const encodeStoragePath = (path: string) =>
  path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

const formatBytes = (bytes: number) => {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const uploadToSupabase = async (file: File, bucket: string, path: string) => {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase storage is not configured");
  }

  const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${bucket}/${encodeStoragePath(path)}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "true",
    },
    body: buffer,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Supabase upload failed");
  }

  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${encodeStoragePath(path)}`;
};

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const formData = await request.formData();

    const title = String(formData.get("title") || "").trim();
    const author = String(formData.get("author") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const publishedYear = String(formData.get("publishedYear") || "").trim();
    const summary = String(formData.get("summary") || "").trim();
    const tagsValue = String(formData.get("tags") || "").trim();
    const pdf = formData.get("pdf");
    const cover = formData.get("cover");

    if (!authHeader) {
      return NextResponse.json({ message: "Missing authorization token" }, { status: 401 });
    }

    if (!title || !author || !category || !publishedYear || !(pdf instanceof File)) {
      return NextResponse.json({ message: "Missing required upload fields" }, { status: 400 });
    }

    if (pdf.type !== "application/pdf") {
      return NextResponse.json({ message: "Only PDF files are supported" }, { status: 400 });
    }

    if (pdf.size > MAX_PDF_SIZE) {
      return NextResponse.json({ message: "PDF exceeds the 50MB limit" }, { status: 400 });
    }

    if (cover instanceof File && cover.size > MAX_COVER_SIZE) {
      return NextResponse.json({ message: "Cover image exceeds the 10MB limit" }, { status: 400 });
    }

    const stamp = `${Date.now()}-${crypto.randomUUID()}`;
    const baseName = slugify(title);
    const pdfPath = `${SUPABASE_BOOKS_PREFIX}/${baseName}-${stamp}.pdf`;
    const coverExtension =
      cover instanceof File && cover.name.includes(".")
        ? cover.name.split(".").pop()?.toLowerCase() || "jpg"
        : "jpg";
    const coverPath = `${SUPABASE_COVERS_PREFIX}/${baseName}-${stamp}.${coverExtension}`;

    const fileUrl = await uploadToSupabase(pdf, SUPABASE_BOOKS_BUCKET, pdfPath);
    const coverUrl =
      cover instanceof File && cover.size > 0
        ? await uploadToSupabase(cover, SUPABASE_COVERS_BUCKET, coverPath)
        : undefined;

    const tags = tagsValue
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const backendResponse = await fetch(`${BACKEND_URL}/api/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({
        title,
        author,
        category,
        publishedYear: Number(publishedYear),
        size: formatBytes(pdf.size),
        coverUrl,
        fileUrl,
        summary,
        tags,
      }),
      cache: "no-store",
    });

    const backendData = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: backendData.message || "Failed to save book metadata" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(
      {
        message: "Book uploaded successfully",
        book: backendData.book,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Book upload route error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}
