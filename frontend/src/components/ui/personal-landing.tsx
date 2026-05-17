import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Github, Linkedin, Globe, Send, Sparkles, Code, Rocket, ShieldCheck } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="w-full flex flex-col items-center text-center gap-6 relative z-10">
      <div className="relative mb-4 group cursor-pointer">
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 opacity-60 blur-xl group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 animate-pulse-slow" />
        <div className="relative size-36 md:size-44 rounded-full border-2 border-white/10 shadow-[0_0_40px_rgba(139,92,246,0.3)] z-10 bg-zinc-950/80 flex items-center justify-center p-6 backdrop-blur-sm transition-transform duration-500 group-hover:scale-105">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 10px rgba(34,211,238,0.5))' }}>
            <defs>
              <linearGradient id="splashGradOwner" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#8b5cf6' }} />
                <stop offset="100%" style={{ stopColor: '#22d3ee' }} />
              </linearGradient>
            </defs>
            <path d="M50 10 L90 35 L50 55 Z" fill="url(#splashGradOwner)" opacity="0.9" />
            <path d="M50 10 L10 35 L50 55 Z" fill="url(#splashGradOwner)" opacity="0.7" />
            <path d="M50 55 L10 35 L50 90 L90 35 Z" fill="url(#splashGradOwner)" opacity="0.5" />
          </svg>
        </div>
      </div>
      <div className="space-y-5">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs md:text-sm font-semibold tracking-widest uppercase mb-2 backdrop-blur-md shadow-lg">
          <Sparkles size={16} className="text-purple-400" />
          Founder & Lead Engineer
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-2xl">
          Hi, I'm <br className="md:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient-x leading-normal py-2 block md:inline">Vaibhav Pratap Singh</span>
        </h1>
        <p className="text-lg md:text-2xl text-zinc-300 max-w-3xl mx-auto font-light leading-relaxed px-4">
          B.Tech in Computer Science and Engineering. Specialized in <span className="text-white font-semibold">Software</span>, <span className="text-white font-semibold">FullStack</span>, <span className="text-white font-semibold">MERN Stack</span>, and <span className="text-white font-semibold">High-Performance Web Applications</span>.
        </p>
      </div>
    </section>
  );
};

const StatsBlock = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl mx-auto z-10 mt-6 mb-6 px-4">
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:bg-white/10 transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-2 shadow-xl hover:shadow-[0_10px_40px_rgba(139,92,246,0.2)]">
      <div className="p-4 bg-purple-500/20 rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-inner">
        <Code size={32} className="text-purple-400" />
      </div>
      <h3 className="text-3xl font-bold text-white mb-2">Global</h3>
      <p className="text-xs md:text-sm text-zinc-400 uppercase tracking-widest font-semibold">Freelance Reach</p>
    </div>
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:bg-white/10 transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-2 shadow-xl hover:shadow-[0_10px_40px_rgba(34,211,238,0.2)]">
      <div className="p-4 bg-cyan-500/20 rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-inner">
        <Globe size={32} className="text-cyan-400" />
      </div>
      <h3 className="text-3xl font-bold text-white mb-2">5+</h3>
      <p className="text-xs md:text-sm text-zinc-400 uppercase tracking-widest font-semibold">Countries (USA, UK, AUS, CAN, IND)</p>
    </div>
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:bg-white/10 transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-2 shadow-xl hover:shadow-[0_10px_40px_rgba(236,72,153,0.2)]">
      <div className="p-4 bg-pink-500/20 rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-inner">
        <Rocket size={32} className="text-pink-400" />
      </div>
      <h3 className="text-3xl font-bold text-white mb-2">2023+</h3>
      <p className="text-xs md:text-sm text-zinc-400 uppercase tracking-widest font-semibold">Professional Experience</p>
    </div>
  </div>
);

const socialLinks = [
  {
    href: 'https://www.linkedin.com/in/vaibhav-pratap-singh1/',
    label: 'LinkedIn',
    icon: <Linkedin size={26} />,
    bg: 'bg-[#0077b5]/90 hover:bg-[#0077b5]',
    text: 'text-white',
    glow: 'hover:shadow-[0_0_25px_rgba(0,119,181,0.7)]'
  },
  {
    href: 'https://github.com/ThakurVpSingh',
    label: 'GitHub',
    icon: <Github size={26} />,
    bg: 'bg-white/10 hover:bg-white/20',
    text: 'text-white',
    glow: 'hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] border border-white/10'
  },
  {
    href: 'https://thakurvpsingh.github.io/VPS-Portfolio',
    label: 'Portfolio',
    icon: <Globe size={26} />,
    bg: 'bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400',
    text: 'text-white',
    glow: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]'
  },
];

const SocialsBlock: React.FC = () => (
  <div className="flex flex-wrap justify-center gap-5 w-full z-10 px-4">
    {socialLinks.map((link) => (
      <a
        key={link.label}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={link.label}
        className={twMerge(
          'flex items-center gap-3 rounded-2xl px-8 py-5 text-lg font-bold shadow-xl transition-all duration-300 hover:-translate-y-2 focus:outline-none backdrop-blur-md w-full sm:w-auto justify-center',
          link.bg,
          link.text,
          link.glow
        )}
      >
        {link.icon}
        <span>{link.label}</span>
      </a>
    ))}
  </div>
);

const ConnectSection: React.FC = () => {
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return setError("Message cannot be empty.");
    if (message.trim().length < 3) return setError("Message must be at least 3 characters.");
    
    setShowToast(true);
    setMessage("");
    setError("");
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <section className="w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-6 mt-8 relative z-10 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl mx-4">
      {showToast && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.5)] font-bold text-base flex items-center gap-2 animate-bounce-in w-max">
          <ShieldCheck size={20} /> Message secured and delivered!
        </div>
      )}
      
      <div className="mb-2">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Let's Build Something Great</h3>
        <p className="text-zinc-400 text-base sm:text-lg">
          Interested in collaborating or discussing architecture? Drop a quick message below.
        </p>
      </div>

      <form onSubmit={handleSend} className="flex flex-col sm:flex-row w-full gap-4 relative">
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => { setMessage(e.target.value); setError(""); }}
            placeholder="Initialize secure connection..."
            className={twMerge(
              "w-full rounded-2xl border px-6 py-5 text-base sm:text-lg text-zinc-100 placeholder-zinc-500 transition-all focus:outline-none shadow-inner bg-black/40 backdrop-blur-sm",
              error ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-white/10 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400"
            )}
          />
          {error && <div className="absolute -bottom-7 left-3 text-red-400 text-sm font-semibold">{error}</div>}
        </div>
        <button
          type="submit"
          className={twMerge(
            "inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 px-10 py-5 text-lg font-bold text-white shadow-lg focus:outline-none transition-all duration-300",
            message.trim() ? "hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] cursor-pointer" : "opacity-50 cursor-not-allowed grayscale"
          )}
          disabled={!message.trim()}
        >
          <Send size={20} />
          Send
        </button>
      </form>
    </section>
  );
};

export const PersonalLanding = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#030712] px-4 py-16 sm:py-24 text-zinc-50 relative overflow-hidden">
      
      {/* --- Advanced Background Animations --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full bg-purple-900/20 blur-[100px] md:blur-[150px] mix-blend-screen animate-blob" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] md:w-[40vw] md:h-[40vw] rounded-full bg-cyan-900/20 blur-[100px] md:blur-[150px] mix-blend-screen animate-blob animation-delay-2000" />
      <div className="absolute top-[30%] right-[10%] w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw] rounded-full bg-pink-900/10 blur-[100px] md:blur-[150px] mix-blend-screen animate-blob animation-delay-4000" />
      
      {/* Subtle grid and noise overlay for premium feel */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* --- Content --- */}
      <div className="w-full max-w-7xl flex flex-col items-center gap-10 md:gap-16 z-10 relative mt-10">
        <HeroSection />
        <StatsBlock />
        <SocialsBlock />
        <ConnectSection />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&display=swap');
        * { font-family: 'Outfit', sans-serif; }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 15s infinite alternate ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 6s ease infinite;
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: translate(-50%, -20px) scale(0.9); }
          50% { opacity: 1; transform: translate(-50%, 5px) scale(1.05); }
          100% { transform: translate(-50%, 0) scale(1); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};
