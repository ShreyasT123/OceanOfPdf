"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, ArrowLeft, Heart, Users, BookOpen, Globe } from "lucide-react";

import { Noise } from "@/components/noise";

import { CharByCharReveal, WordByWordFade } from "@/components/text-animations";
import { MenuOverlay } from "@/components/menu-overlay";
import { SubpageHeader } from "@/components/subpage-header";

export default function DonatePage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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

    const donationTiers = [
        {
            amount: 5,
            title: "Reader",
            description: "Support a day of operations",
            perks: ["Early access to new collections", "Digital thank you certificate"]
        },
        {
            amount: 25,
            title: "Scholar",
            description: "Support a week of operations",
            perks: ["Everything in Reader", "Named credit on website", "Monthly newsletter"]
        },
        {
            amount: 100,
            title: "Patron",
            description: "Support a month of operations",
            perks: ["Everything in Scholar", "Custom category suggestion", "Direct team updates"]
        },
        {
            amount: 500,
            title: "Guardian",
            description: "Support quarterly operations",
            perks: ["Everything in Patron", "Logo placement", "Annual report access"]
        }
    ];

    const impactMetrics = [
        {
            icon: BookOpen,
            metric: "50,000+",
            description: "Books indexed and searchable"
        },
        {
            icon: Users,
            metric: "100,000+",
            description: "Active readers monthly"
        },
        {
            icon: Globe,
            metric: "180+",
            description: "Countries accessing content"
        },
        {
            icon: Heart,
            metric: "$0",
            description: "Always free to use"
        }
    ];

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
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-4 h-4 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                />
            </motion.div>

            {/* Shared Nav Components */}
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
                                <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/50 flex items-center gap-2">
                                    <Heart className="w-4 h-4 text-red-500" /> Support Knowledge
                                </p>
                            </motion.div>

                            <div className="space-y-3">
                                <CharByCharReveal
                                    text="Keep Knowledge Free."
                                    className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                                />
                                <WordByWordFade
                                    text="Help us maintain the world's largest open library. Every contribution makes a difference."
                                    className="text-base lg:text-lg text-white/60 max-w-3xl leading-relaxed"
                                />
                            </div>
                        </div>
                    </div>
                </motion.section>

                <div className="mx-auto max-w-7xl px-8 lg:px-16">
                    {/* Impact Section */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-20"
                    >
                        {impactMetrics.map((metric, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.5 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="border border-white/20 bg-white/5 backdrop-blur p-6 rounded-lg"
                            >
                                <metric.icon className="w-8 h-8 text-white/80 mb-4" />
                                <div className="text-3xl font-bold text-white mb-2">{metric.metric}</div>
                                <p className="text-sm text-white/60">{metric.description}</p>
                            </motion.div>
                        ))}
                    </motion.section>

                    {/* Donation Tiers */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                        className="py-20"
                    >
                        <div className="space-y-12">
                            <div className="space-y-3">
                                <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/50">
                                    Choose Your Impact
                                </p>
                                <h2 className="text-4xl lg:text-5xl font-bold text-white">
                                    Donation Tiers
                                </h2>
                                <p className="text-base text-white/60 max-w-2xl">
                                    Select a tier that works for you and join thousands of supporters.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {donationTiers.map((tier, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false, amount: 0.5 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="border border-white/20 bg-white/5 backdrop-blur p-6 rounded-2xl hover:border-white/40 transition-colors group"
                                    >
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-sm text-white/60 mb-1">{tier.description}</p>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-4xl font-bold text-white">${tier.amount}</span>
                                                    <span className="text-white/60">/once</span>
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold text-white">{tier.title}</h3>
                                            <ul className="space-y-2">
                                                {tier.perks.map((perk, i) => (
                                                    <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                                                        <span className="text-red-500 mt-1">→</span>
                                                        {perk}
                                                    </li>
                                                ))}
                                            </ul>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="w-full mt-6 h-11 bg-white text-black font-bold text-sm rounded-lg group-hover:bg-white/90 transition-colors"
                                            >
                                                Donate ${tier.amount}
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    {/* FAQ Section */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                        className="py-20 max-w-3xl"
                    >
                        <div className="space-y-6">
                            <div className="space-y-3 mb-12">
                                <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/50">
                                    Questions
                                </p>
                                <h2 className="text-4xl font-bold text-white">
                                    Frequently Asked
                                </h2>
                            </div>

                            <div className="space-y-4">
                                {[
                                    {
                                        q: "Where does my donation go?",
                                        a: "Every donation supports server costs, book scanning, metadata curation, and development to keep the archive growing and accessible."
                                    },
                                    {
                                        q: "Can I get a tax receipt?",
                                        a: "Yes, we're a registered nonprofit. You'll receive a tax-deductible receipt for your donation."
                                    },
                                    {
                                        q: "Can I make a monthly donation?",
                                        a: "Absolutely! Contact us at donate@oceanofpdf.com to set up recurring donations."
                                    },
                                    {
                                        q: "Is OceanOfPdf always free?",
                                        a: "Yes. Donations keep it that way. We'll never paywall knowledge or require subscriptions."
                                    }
                                ].map((faq, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false, amount: 0.5 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="border border-white/20 bg-white/5 backdrop-blur p-6 rounded-lg"
                                    >
                                        <h3 className="font-bold text-white mb-2">{faq.q}</h3>
                                        <p className="text-white/70">{faq.a}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    {/* CTA Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                        className="py-20 text-center border-t border-white/20"
                    >
                        <div className="space-y-6 max-w-2xl mx-auto">
                            <h2 className="text-4xl lg:text-5xl font-bold text-white">
                                Ready to Support?
                            </h2>
                            <p className="text-white/60 text-lg">
                                Join our community of supporters and help preserve knowledge for the world.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-white/90 transition-colors"
                            >
                                Start Donating
                            </motion.button>
                        </div>
                    </motion.section>
                </div>
            </div>
        </main>
    );
}
