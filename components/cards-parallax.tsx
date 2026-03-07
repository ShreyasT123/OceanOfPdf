import { MotionValue, motion, useTransform, useSpring } from "framer-motion";

interface CardsParallaxProps {
    scrollProgress: MotionValue<number>;
    inputRange: [number, number]; // e.g. [0.4, 1.0]
    onHoverChange?: (isHovering: boolean) => void;
}

const images = [
    "/books/deathnote.jpg",
    "/books/harrypotteraskaban.jpg",
    "/books/percyjackson.jpg",
    "/books/powerless.jpg",
    "/books/TheAlchemistcover.jpg",
    "/books/silentpatient.jpg",
];

export default function CardsParallax({ scrollProgress, inputRange, onHoverChange }: CardsParallaxProps) {
    // Map the relevant scroll range to 0-1 for local progress
    // We'll effectively normalize this so we can reason about "local time"

    // Actually, calculating individually is safer.
    const [start, end] = inputRange;
    const totalDuration = end - start;
    const step = totalDuration / (images.length + 2); // Spread them out

    return (
        <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
            {images.map((img, i) => {
                // Stagger logic
                const cardStart = start + (i * step);
                const cardEnd = cardStart + 0.275; // Duration of this card's full flight
                const transitionPoint = cardStart + 0.18; // Reduced diagonal phase

                // Ensure values don't exceed strict bounds if needed, but framer handles projection.

                // Y Motion: Bottom to Top
                // Start at 110vh (closer to screen edge) so they appear sooner
                const y = useTransform(
                    scrollProgress,
                    [cardStart, cardEnd],
                    ["110vh", "-110vh"]
                );

                // X Motion: Center to Side
                // Card Width: 25vw. Half: 12.5vw.
                // Screen Edge: 50vw. Margin: 5vw.
                // Target Edge: 45vw from center.
                // Target Center X: 45vw - 12.5vw = 32.5vw.
                const xTarget = i % 2 === 0 ? "-32.5vw" : "32.5vw";

                const x = useTransform(
                    scrollProgress,
                    [cardStart, transitionPoint, cardEnd], // [Start, Turn, End]
                    ["0vw", xTarget, xTarget] // [Center, Side, Side]
                );

                return (
                    <motion.div
                        key={i}
                        style={{ y, x }}
                        onMouseEnter={() => onHoverChange?.(true)}
                        onMouseLeave={() => onHoverChange?.(false)}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25vw] h-[35vw] bg-zinc-800 border border-white/10 overflow-hidden shadow-2xl origin-center pointer-events-auto"
                    >
                        <div className="relative w-full h-full">
                            {/* Fallback gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-900" />

                            {/* Actual Image */}
                            <img
                                src={img}
                                alt={`Card ${i + 1}`}
                                className="absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                            />

                            {/* Overlay for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/10 mix-blend-overlay pointer-events-none" />
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
