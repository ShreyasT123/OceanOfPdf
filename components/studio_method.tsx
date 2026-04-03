"use client";

export default function StudioMethodSection() {
  return (
    <section className="relative w-full bg-[#0b0b0b] text-zinc-200 py-24 md:py-32 overflow-hidden">
      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-semibold">
          (Process)
        </div>

        <h2 className="mt-6 text-[12vw] md:text-[9vw] leading-[0.9] font-black tracking-tight text-zinc-200">
          STUDIO
          <br />
          METHOD
        </h2>

        <div className="mt-8 flex items-center gap-4 text-zinc-600">
          <span className="text-xs">+</span>
          <div className="h-px w-full bg-zinc-800" />
          <span className="text-xs">+</span>
        </div>

        <p className="mt-6 max-w-3xl text-lg md:text-2xl text-zinc-400 leading-snug">
          More than just steps our process is a collaborative path that shapes
          concepts into cinematic, editorial, and emotionally impactful visuals.
        </p>
      </div>
    </section>
  );
}
