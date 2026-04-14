"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone } from "lucide-react";
import TextReveal from "@/components/TextReveal";
import Magnetic from "@/components/Magnetic";

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const form = e.currentTarget;
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        
        // Custom FormSubmit settings
        object._subject = `New Portfolio Contact from ${object.name || "Guest"}`;
        object._template = "box";

        try {
            const response = await fetch("https://formsubmit.co/ajax/ishu.barman9067900@gmail.com", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(object)
            });

            if (response.ok) {
                setStatus("success");
                form.reset();
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 5000);
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    return (
        <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">

            {/* Abstract Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-muted/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                        <TextReveal text="Let's Connect" />
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-muted mx-auto rounded-full mb-6" />
                    <p className="text-muted max-w-2xl mx-auto text-lg">
                        Have a project in mind or just want to chat? Drop me a message and I'll get back to you as soon as possible.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">

                    {/* Contact Info (Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div className="glass-card p-8 rounded-3xl h-full border-white/5 flex flex-col justify-center bg-surface/50">
                            <h3 className="text-2xl font-bold text-foreground mb-8">Contact Information</h3>

                            <div className="space-y-6">
                                <ContactInfoItem
                                    icon={<Mail className="text-primary" />}
                                    title="Email"
                                    value="ishu.barman9067900@gmail.com"
                                    link="mailto:ishu.barman9067900@gmail.com"
                                />

                                <ContactInfoItem
                                    icon={<MapPin className="text-primary" />}
                                    title="Location"
                                    value="Chandigarh, India"
                                />

                                <ContactInfoItem
                                    icon={<Phone className="text-primary" />}
                                    title="Phone"
                                    value="+91 96935 31421"
                                    link="tel:+919693531421"
                                />
                            </div>

                            <div className="mt-12 pt-8 border-t border-muted/30">
                                <p className="text-muted text-sm">
                                    I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form (Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-3"
                    >
                        <form onSubmit={handleSubmit} className="glass-card bg-surface/50 p-8 md:p-10 rounded-3xl border-muted/30 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-muted ml-1">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full bg-background/50 border border-muted/30 rounded-xl px-4 py-3 text-foreground placeholder-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all interactive"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-muted ml-1">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full bg-background/50 border border-muted/30 rounded-xl px-4 py-3 text-foreground placeholder-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all interactive"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-muted ml-1">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    className="w-full bg-background/50 border border-muted/30 rounded-xl px-4 py-3 text-foreground placeholder-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all interactive"
                                    placeholder="Just saying hi!"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-muted ml-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    className="w-full bg-background/50 border border-muted/30 rounded-xl px-4 py-3 text-foreground placeholder-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none interactive"
                                    placeholder="How can we collaborate?"
                                />
                            </div>

                            <div className="flex justify-start">
                                <Magnetic strength={0.2}>
                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="px-8 py-4 rounded-xl bg-primary text-white font-bold tracking-wide flex items-center justify-center gap-3 shadow-lg transition-all interactive group disabled:opacity-75 disabled:cursor-wait"
                                    >
                                        {status === "submitting" ? "Sending..." : status === "success" ? "Message Sent!" : status === "error" ? "Failed to send" : "Send Message"}
                                        {status === "idle" && <Send size={18} className="group-hover:translate-x-1 -translate-y-0.5 transition-transform" />}
                                    </button>
                                </Magnetic>
                            </div>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

function ContactInfoItem({ icon, title, value, link }: { icon: React.ReactNode, title: string, value: string, link?: string }) {
    const content = (
        <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-background/50 border border-muted/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                {icon}
            </div>
            <div>
                <h4 className="text-sm text-muted font-medium">{title}</h4>
                <p className="text-lg text-foreground font-semibold group-hover:text-primary transition-colors">{value}</p>
            </div>
        </div>
    );

    return link ? (
        <a href={link} className="block interactive" target={link.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
            {content}
        </a>
    ) : (
        content
    );
}
