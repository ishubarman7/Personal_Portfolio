"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, ExternalLink, X, Calendar, Building2, Download } from "lucide-react";
import TextReveal from "@/components/TextReveal";

import { CERTIFICATES, CATEGORIES, CertificateCategory, type Certificate } from "@/data/certificates";

// ─── Certificate Modal ──────────────────────────────────────────────

const CertificateModal = ({
    cert,
    onClose,
}: {
    cert: Certificate;
    onClose: () => void;
}) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        onClick={onClose}
    >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute -top-12 -right-3 z-20 p-2 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white hover:bg-red-500/80 transition-all shadow-lg"
                title="Close"
            >
                <X size={20} />
            </button>

            {/* Download Button */}
            <a
                href={cert.fileUrl}
                download
                target="_blank"
                rel="noreferrer"
                className="absolute -top-12 right-10 z-20 p-2 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white hover:bg-primary/80 transition-all shadow-lg"
                title="Download Certificate"
                onClick={(e) => e.stopPropagation()}
            >
                <Download size={20} />
            </a>

            {/* Full Certificate Content - edge to edge */}
            {cert.fileUrl.toLowerCase().endsWith('.pdf') ? (
                <iframe
                    src={cert.fileUrl}
                    title={cert.title}
                    className="w-full h-[70vh] rounded-lg shadow-2xl bg-white"
                />
            ) : (
                <img
                    src={cert.fileUrl}
                    alt={cert.title}
                    className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl bg-black/50"
                />
            )}

            {/* Title bar below */}
            <div className="mt-3 text-center">
                <h3 className="text-lg font-semibold text-white/90">{cert.title}</h3>
                <p className="text-sm text-white/50 mt-0.5">{cert.issuer} • {cert.date}</p>
            </div>
        </motion.div>
    </motion.div>
);

// ─── Hover-Reveal Certificate Card ──────────────────────────────────

const CertificateCard = ({
    cert,
    onView,
}: {
    cert: Certificate;
    onView: () => void;
}) => (
    <div className="cert-card group interactive">
        {/* Certificate Image */}
        <div className="cert-card-image">
            <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
        </div>

        {/* Title overlay - always visible at bottom of card */}
        <div className="cert-card-overlay">
            <h3>{cert.title}</h3>
        </div>

        {/* Full content - revealed on hover */}
        <section className="cert-card-content">
            <h3>{cert.title}</h3>
            <p className="cert-card-desc">{cert.description}</p>
            <div className="cert-card-footer">
                <div className="cert-card-meta">
                    <span className="flex items-center gap-1 text-xs">
                        <Building2 size={12} /> {cert.issuer}
                    </span>
                    <span className="flex items-center gap-1 text-xs opacity-60">
                        <Calendar size={12} /> {cert.date}
                    </span>
                </div>
                <div className="flex gap-2">
                    <a
                        href={cert.fileUrl}
                        download
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="cert-card-btn"
                        title="Download"
                    >
                        <Download size={14} />
                    </a>
                    <button onClick={onView} className="cert-card-btn">
                        <ExternalLink size={14} />
                        View
                    </button>
                </div>
            </div>
        </section>
    </div>
);

// ─── Certificates Section ───────────────────────────────────────────

export default function Certifications() {
    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
    const [activeCategory, setActiveCategory] = useState<CertificateCategory>("Featured");

    // Filter certificates based on selected category
    const filteredCertificates = CERTIFICATES.filter((cert) => {
        if (activeCategory === "Featured") {
            return cert.isFeatured;
        }
        return cert.category === activeCategory;
    });

    return (
        <>
            <section id="certifications" className="relative py-24 lg:py-32 overflow-hidden">
                <div className="container mx-auto px-3 sm:px-6 lg:px-12 relative z-10">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 flex justify-center items-center gap-4">
                            <BadgeCheck className="text-primary w-10 h-10" />
                            <TextReveal text="Certificates" />
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary to-muted mx-auto rounded-full mb-6" />
                        <p className="text-muted text-lg max-w-xl mx-auto">
                            Professional certifications and experiences that validate my skills.
                        </p>
                    </motion.div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                                    ? "bg-primary text-primary-foreground shadow-md scale-105"
                                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto justify-items-center"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredCertificates.map((cert, index) => (
                                <motion.div
                                    key={cert.title} // Use title as key so animation works when filtering
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.4 }}
                                    className="w-full flex justify-center"
                                >
                                    <CertificateCard
                                        cert={cert}
                                        onView={() => setSelectedCert(cert)}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            <AnimatePresence>
                {selectedCert && (
                    <CertificateModal
                        cert={selectedCert}
                        onClose={() => setSelectedCert(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
