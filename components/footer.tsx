import Link from "next/link"
import Image from "next/image"

export function Footer() {
    return (
        <footer className="relative w-full min-h-screen bg-[#050505] text-white overflow-hidden flex flex-col justify-between">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                    src="/download (3).jpg"
                    alt="Footer Background"
                    fill
                    className="object-cover transition-opacity duration-1000"
                    priority
                />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full flex flex-col justify-between h-full px-8 md:px-16 pt-16 pb-0 flex-1">

                {/* Top Section */}
                <div className="flex flex-col flex-1 pb-16">
                    {/* Spacer to push middle content down */}
                    <div className="flex-1" />

                    {/* Middle Content */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-10 mt-auto">
                        {/* Left Text */}
                        <div className="text-[12px] md:text-[14px] font-sans tracking-[0.2em] font-medium leading-[2] uppercase text-white/90">
                            Every moment holds<br />
                            a story waiting to be<br />
                            captured
                        </div>

                        {/* Right Nav */}
                        <ul className="flex flex-wrap gap-8 md:gap-12 text-[12px] md:text-[14px] font-sans tracking-[0.2em] font-bold uppercase z-20">
                            <li><Link href="/" className="hover:text-white/60 transition-colors">Home</Link></li>
                            <li><Link href="/about" className="hover:text-white/60 transition-colors">About</Link></li>
                            <li><Link href="/projects" className="hover:text-white/60 transition-colors">Gallery</Link></li>
                            <li><Link href="/writing" className="hover:text-white/60 transition-colors">Articles</Link></li>
                            <li><Link href="mailto:shreyasthale54@gmail.com" className="hover:text-white/60 transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Divider Line */}
                <div className="w-full h-[1px] bg-white/20 mb-10" />

                {/* Bottom Content beneath line */}
                <div className="flex flex-col md:flex-row justify-between items-center w-full mb-8 gap-6 z-20">
                    <div className="text-[10px] md:text-[12px] font-sans tracking-[0.15em] font-semibold uppercase text-white/70">
                        © {new Date().getFullYear()}. SHREYAS RIGHTS RESERVED.
                    </div>

                    <ul className="flex gap-8 md:gap-12 text-[10px] md:text-[12px] font-sans tracking-[0.2em] font-bold uppercase">
                        <li><Link href="https://linkedin.com/in/shreyas-thale/" target="_blank" className="hover:text-white/60 transition-colors">LinkedIn</Link></li>
                        <li><Link href="https://github.com/ShreyasT123" target="_blank" className="hover:text-white/60 transition-colors">GitHub</Link></li>
                        <li><Link href="mailto:shreyasthale54@gmail.com" className="hover:text-white/60 transition-colors">Email</Link></li>
                    </ul>
                </div>

                {/* Huge Text at Bottom spanning the width */}
                <div className="w-full relative flex justify-center items-end h-[24vw] md:h-[22vw] overflow-hidden -mb-2 md:-mb-4 pointer-events-none select-none">
                    {/* Solid Text */}
                    <h1
                        className="text-[26vw] sm:text-[24vw] md:text-[23vw] leading-[0.75] font-black uppercase text-white tracking-tighter w-full text-center absolute bottom-0 z-10"
                    >
                        OceanofPDF
                    </h1>
                </div>
            </div>
        </footer>
    )
}