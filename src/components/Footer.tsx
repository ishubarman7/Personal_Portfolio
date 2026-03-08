import { Github, Linkedin, Mail, Twitter, ArrowUp } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative bg-background pt-16 pb-8 border-t border-muted/30 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-primary/10 blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-foreground tracking-wider">
                            ishubarman7
                        </h3>
                        <p className="mt-2 text-muted max-w-sm">
                            Building futuristic web experiences and solving complex problems with clean code.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <a href="https://github.com/IshuBarman" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_rgba(165,200,214,0.3)] transition-all">
                            <Github size={20} />
                        </a>
                        <a href="https://linkedin.com/in/ishubarman" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_rgba(165,200,214,0.3)] transition-all">
                            <Linkedin size={20} />
                        </a>
                        <a href="mailto:ishu.barman@example.com" className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_rgba(165,200,214,0.3)] transition-all">
                            <Mail size={20} />
                        </a>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-muted/30 flex flex-col md:flex-row items-center justify-between">
                    <p className="text-muted text-sm border-white/5 border-t-transparent">
                        © {new Date().getFullYear()} Ishu Barman. All rights reserved.
                    </p>

                    <a href="#home" className="mt-4 md:mt-0 flex items-center text-sm font-medium text-muted hover:text-primary transition-colors group">
                        Back to Top
                        <ArrowUp size={16} className="ml-2 group-hover:-translate-y-1 transition-transform" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
