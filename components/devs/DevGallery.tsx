"use client";

import React from "react";
import { motion } from "framer-motion";

interface AlbumItem {
  id: string | number;
  title: string;
  year: string;
  subtitle: string;
  mainImage: string;
  hoverImage: string;
}

interface DevGalleryProps {
  albums?: AlbumItem[];
}

const defaultAlbums: AlbumItem[] = [
  {
    id: 1,
    title: "SOPHIE & ALEX",
    year: "2025",
    subtitle: "A timeless celebration of love and light",
    mainImage: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1000&auto=format&fit=crop", // Placeholder
    hoverImage: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000&auto=format&fit=crop", // Spawned Image
  },
  {
    id: 2,
    title: "GOLDEN HOUR VOWS — SARAH & MARK",
    year: "2025",
    subtitle: "Countryside wedding",
    mainImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop", // Placeholder
    hoverImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop", // Spawned Image
  },
  {
    id: 3,
    title: "ANNA & JAMES",
    year: "2025",
    subtitle: "Countryside Wedding",
    mainImage: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000&auto=format&fit=crop", // Placeholder
    hoverImage: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1000&auto=format&fit=crop", // Spawned Image
  },
];

// Custom staggered layout configurations to match the screenshot exactly
const layoutConfigs = [
  {
    wrapper: "w-full md:w-[28%] flex flex-col pt-0 md:pt-16",
    image: "w-full aspect-[4/5]",
  },
  {
    wrapper: "w-full md:w-[44%] flex flex-col",
    image: "w-full aspect-[3/4] md:aspect-[4/5]",
  },
  {
    wrapper: "w-full md:w-[28%] flex flex-col pt-0 md:pt-48",
    image: "w-full aspect-square md:aspect-[4/5]",
  },
];

const DevGallery: React.FC<DevGalleryProps> = ({ albums = defaultAlbums }) => {
  return (
    <section className="relative w-full bg-[#080808] text-[#fefefe] py-20 lg:py-32 font-sans overflow-hidden">
      <div className="max-w-[100vw] mx-auto px-4 lg:px-8">

        {/* Gallery Container */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-6 lg:gap-8 w-full">
          {albums.map((album, i) => {
            const config = layoutConfigs[i % layoutConfigs.length];

            return (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={config.wrapper}
              >
                {/* Image Wrapper with Hover Effect */}
                <div className={`relative group overflow-hidden cursor-pointer bg-zinc-900 ${config.image}`}>

                  {/* Main Background Image */}
                  <img
                    src={album.mainImage}
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-105"
                  />

                  {/* Overlay Dimmer */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10 pointer-events-none" />

                  {/* Spawned Hover Image (Centered, scales up) */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <img
                      src={album.hoverImage}
                      alt={`${album.title} detail`}
                      className="w-[50%] h-[50%] object-cover opacity-0 scale-50 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:scale-100 shadow-2xl"
                    />
                  </div>
                </div>

                {/* Text Block */}
                <div className="flex flex-col mt-5">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-sm md:text-base font-medium tracking-wide uppercase text-white leading-tight">
                      {album.title}
                    </h3>
                    <span className="text-sm md:text-base font-medium text-zinc-300">
                      {album.year}
                    </span>
                  </div>
                  <p className="text-sm md:text-[15px] text-zinc-400 mt-2 font-normal">
                    {album.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DevGallery;