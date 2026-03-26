"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import DevHero from "@/components/devs/DevHero";
import DevExpertise from "@/components/devs/DevExpertise";
import DevGallery from "@/components/devs/DevGallery";

interface AlbumItem {
  id: number;
  title: string;
  year: string;
  subtitle: string;
  mainImage: string;
  hoverImage: string;
}

interface Developer {
  id: string;
  name: string;
  role: string;
  location: string;
  time: string;
  bio: string;
  email: string;
  imagePrefix: string;
  skills: { title: string; description: string; index: string }[];
  albums: AlbumItem[];
}

const DEVELOPERS: Record<string, Developer> = {
  "aarushi-sontakke": {
    id: "aarushi-sontakke",
    name: "Aarushi Sontakke",
    role: "UI/UX Engineer",
    location: "MUMBAI, INDIA",
    time: "7:14 PM",
    bio: "Crafting digital experiences that feel human and look extraordinary. I bridge the gap between imagination and implementation with a focus on buttery-smooth interactions.",
    email: "aarushi@lumen.dev",
    imagePrefix: "aarushi",
    skills: [
      { title: "UI/UX DESIGN", description: "Pixel-perfect visual design.", index: "01" },
      { title: "INTERACTION", description: "Framer Motion and GSAP.", index: "02" },
      { title: "PROTOTYPING", description: "High-fidelity rapid prototyping.", index: "03" },
    ],
    albums: [
      {
        id: 1,
        title: "waiting for my letter… still",
        year: "2024",
        subtitle: "living in books, surviving in reality",
        mainImage: "/devs/aarushi_0.jpeg",
        hoverImage: "/devs/a0.jpeg",
      },
      {
        id: 2,
        title: "99% books, 1% reality",
        year: "2025",
        subtitle: "pretty, poetic, and a little problematic",
        mainImage: "/devs/aarushi_2.jpeg",
        hoverImage: "/devs/a2.jpeg",
      },
      {
        id: 3,
        title: "main character in her own story (and 10 others)",
        year: "2025",
        subtitle: "crying over fictional characters since forever",
        mainImage: "/devs/aarushi_1.jpeg",
        hoverImage: "/devs/a1.jpeg",
      },
    ],
  },
  "shreyas-thale": {
    id: "shreyas-thale",
    name: "Shreyas Thale",
    role: "Backend Engineer",
    location: "MUMBAI, INDIA",
    time: "7:14 PM",
    bio: "Architecting the invisible backbone of high-performance web applications. I turn complex logic into scalable, efficient systems that handle millions of requests.",
    email: "shreyas@lumen.dev",
    imagePrefix: "shreyas",
    skills: [
      { title: "SYSTEM ARCHITECTURE", description: "Designing robust microservices.", index: "01" },
      { title: "DATABASE DESIGN", description: "Expertise in SQL and NoSQL.", index: "02" },
      { title: "API ENGINEERING", description: "GraphQL and RESTful APIs.", index: "03" },
    ],
    albums: [
      {
        id: 1,
        title: "DATA PIPELINE",
        year: "2024",
        subtitle: "Real-time stream processing architecture",
        mainImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: 2,
        title: "AUTH SERVICE",
        year: "2023",
        subtitle: "Zero-trust identity management",
        mainImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: 3,
        title: "PAYMENT GATEWAY",
        year: "2022",
        subtitle: "High-throughput transaction processing",
        mainImage: "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=1000&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
      },
    ],
  },
  // Add fallback empty albums for others to prevent errors if you haven't filled them out yet
  "shone-thomas": {
    id: "shone-thomas",
    name: "Shone Thomas",
    role: "Cloud Infra Lead",
    location: "BENGALURU, INDIA",
    time: "7:14 PM",
    bio: "Automating the path to production and ensuring world-class scalability. I make the cloud feel invisible and infrastructure feel like a competitive advantage.",
    email: "shone@lumen.dev",
    imagePrefix: "shone",
    skills: [],
    albums: [],
  },
  "john-prince": {
    id: "john-prince",
    name: "John Prince",
    role: "Cloud Infra Asst Lead",
    location: "KOCHI, INDIA",
    time: "7:14 PM",
    bio: "Optimizing deployments and maintaining the health of distributed systems. I keep the engines running so the creators can focus on moving fast.",
    email: "john@lumen.dev",
    imagePrefix: "john",
    skills: [],
    albums: [],
  },
};

export default function DevPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const dev = DEVELOPERS[slug];

  if (!dev) {
    notFound();
  }

  // FIXED: Based on your directory, images are in /devs/ and use .jpeg
  // Example result: /devs/aarushi_0.jpeg
  const images = Array.from({ length: 3 }, (_, i) => `/devs/${dev.imagePrefix}_${i}.jpeg`);

  return (
    <main className="bg-[#080808] min-h-screen font-sans">
      <DevHero
        name={dev.name}
        role={dev.role}
        location={dev.location}
        time={dev.time}
        bio={dev.bio}
        images={images}
      />

      {/* Passing the bio text to the new scrolling component */}
      <DevExpertise text={dev.bio} />

      {/* View My Work Divider */}
      <div className="w-full bg-[#080808] pt-32 pb-16 flex flex-col items-center justify-center px-8 text-center border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <span className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-zinc-500 mb-8">
            ( Portfolio )
          </span>
          <h2 className="text-[11vw] md:text-[8vw] lg:text-[7vw] font-normal leading-none tracking-tight uppercase text-white drop-shadow-2xl">
            View My Work
          </h2>
        </motion.div>
      </div>

      {/* Dynamically injecting the dev's specific portfolio data */}
      {dev.albums && dev.albums.length > 0 ? (
        <DevGallery albums={dev.albums} />
      ) : (
        <DevGallery /> // Will fallback to the default wedding template if albums array is empty
      )}
    </main>
  );
}