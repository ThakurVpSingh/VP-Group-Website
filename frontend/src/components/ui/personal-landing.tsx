import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  Github,
  Linkedin,
  Facebook,
  Code2,
  Globe2,
  MapPin,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export const triggerExpression = (exp: string) => {
  window.dispatchEvent(new CustomEvent('avatar-expression', { detail: exp }));
};

const HeroSection: React.FC = () => {
  const avatarRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg) translate(0px, 0px)");
  const [expression, setExpression] = useState("neutral");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleExpression = (e: Event) => {
      const customEvent = e as CustomEvent;
      setExpression(customEvent.detail);
    };
    window.addEventListener('avatar-expression', handleExpression);
    const handleMouseMove = (e: MouseEvent) => {
      if (!avatarRef.current) return;
      
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x: mouseX, y: mouseY });
      
      const maxTilt = 25; 
      const maxMove = 12; 
      
      const rotateY = mouseX * maxTilt;
      const rotateX = -(mouseY * maxTilt); 
      const translateX = mouseX * maxMove;
      const translateY = mouseY * maxMove;

      setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(${translateX}px, ${translateY}px)`);
    };

    const handleMouseLeave = () => {
      setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) translate(0px, 0px)");
      setMousePos({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener('avatar-expression', handleExpression);
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Compute eye tracking logic
  const eyeX = mousePos.x * 8;
  const eyeY = mousePos.y * 8;

  let mouthStyle: React.CSSProperties = {};
  let eyeStyle: React.CSSProperties = {};

  switch (expression) {
    case 'smile':
      mouthStyle = { width: '32px', height: '16px', borderRadius: '0 0 16px 16px', border: '4px solid #18181b', borderTop: 'none', transform: 'translateY(2px)' };
      eyeStyle = { height: '12px' };
      break;
    case 'surprised': // ooo
      mouthStyle = { width: '14px', height: '14px', borderRadius: '50%', border: '4px solid #18181b', transform: 'translateY(6px)' };
      eyeStyle = { height: '14px', width: '14px' }; 
      break;
    case 'amazing':
      mouthStyle = { width: '36px', height: '20px', borderRadius: '0 0 20px 20px', background: '#18181b', transform: 'translateY(2px)' };
      eyeStyle = { height: '6px', borderRadius: '6px 6px 0 0', transform: `translate(${eyeX}px, ${eyeY - 4}px)` };
      break;
    default: // neutral
      mouthStyle = { width: '22px', height: '4px', borderRadius: '2px', background: '#18181b', transform: 'translateY(8px)' };
      eyeStyle = { height: '12px' };
      break;
  }

  return (
    <section className="w-full flex flex-col items-center text-center gap-8 z-10">
      <div className="relative mb-4 group" style={{ perspective: '1000px' }}>
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 opacity-60 blur-2xl group-hover:opacity-100 transition-all duration-700 animate-[pulse_3s_ease-in-out_infinite]" />
        
        {/* Custom Interactive Avatar */}
        <div
          ref={avatarRef}
          style={{ 
            transform, 
            transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)' 
          }}
          className="relative size-36 md:size-40 rounded-full border-4 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.15)] z-10 bg-zinc-100 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Eyes Container */}
          <div className="flex gap-8 mb-1">
            {/* Left Eye */}
            <div 
              className="w-3 h-3 bg-zinc-900 rounded-full transition-all duration-200"
              style={{ 
                transform: `translate(${eyeX}px, ${eyeY}px)`,
                ...eyeStyle 
              }}
            />
            {/* Right Eye */}
            <div 
              className="w-3 h-3 bg-zinc-900 rounded-full transition-all duration-200"
              style={{ 
                transform: `translate(${eyeX}px, ${eyeY}px)`,
                ...eyeStyle 
              }}
            />
          </div>
          
          {/* Dynamic Morphed Mouth */}
          <div 
            className="transition-all duration-300 ease-out"
            style={mouthStyle}
          />
        </div>
      </div>
      
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-xl">
          Hi, I'm <span 
            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 cursor-default"
            onMouseEnter={() => triggerExpression("smile")}
            onMouseLeave={() => triggerExpression("neutral")}
          >
            Vaibhav Pratap Singh
          </span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 mx-auto font-light leading-relaxed px-4 md:px-0">
          B.Tech CSE graduate focused on <strong className="text-white font-semibold">Software</strong>, <strong className="text-white font-semibold">MERN</strong>, <strong className="text-white font-semibold">Full-Stack Web</strong>, and <strong className="text-white font-semibold">Application Development</strong>. Experienced Freelancer delivering high-performance solutions for global clients.
        </p>
      </div>
    </section>
  );
};

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  borderGlow: string;
  shadow: string;
}

const socialLinks: SocialLink[] = [
  {
    href: 'https://www.linkedin.com/in/vaibhav-pratap-singh1/',
    label: 'LinkedIn',
    icon: <Linkedin size={28} className="text-[#0077b5] group-hover:text-white transition-colors" />,
    borderGlow: 'hover:border-[#0077b5] hover:bg-[#0077b5]',
    shadow: 'hover:shadow-[0_0_20px_rgba(0,119,181,0.5)]'
  },
  {
    href: 'https://www.facebook.com/profile.php?id=61558199380360',
    label: 'Facebook',
    icon: <Facebook size={28} className="text-[#1877F2] group-hover:text-white transition-colors" />,
    borderGlow: 'hover:border-[#1877F2] hover:bg-[#1877F2]',
    shadow: 'hover:shadow-[0_0_20px_rgba(24,119,242,0.5)]'
  },
  {
    href: 'https://github.com/ThakurVpSingh',
    label: 'GitHub',
    icon: <Github size={28} className="text-white group-hover:text-zinc-950 transition-colors" />,
    borderGlow: 'hover:border-white hover:bg-white',
    shadow: 'hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]'
  },
];

const SocialsBlock: React.FC = () => (
  <div className="flex flex-row justify-center gap-6 w-full z-10 my-8 px-4">
    {socialLinks.map((link) => (
      <a
        key={link.label}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={link.label}
        className={twMerge(
          'group flex items-center justify-center w-16 h-16 rounded-full border border-white/10 bg-[#09090b] shadow-xl transition-all duration-300 hover:-translate-y-2',
          link.borderGlow,
          link.shadow
        )}
      >
        {link.icon}
      </a>
    ))}
  </div>
);

const ExperienceSection = () => (
  <div className="w-[90%] md:w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 z-10 md:px-8 mx-auto">
    
    {/* Expertise Card */}
    <div 
      className="group relative flex flex-col justify-between gap-6 rounded-2xl bg-gradient-to-b from-[#0f0f13] to-[#050507] p-[24px] lg:p-[32px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(168,85,247,0.4)] overflow-hidden border border-white/10 hover:border-purple-500/50 box-border w-full"
      onMouseEnter={() => triggerExpression("surprised")}
      onMouseLeave={() => triggerExpression("neutral")}
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-[50px] group-hover:bg-purple-500/40 transition-all duration-700 group-hover:scale-150 pointer-events-none" />
      
      <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-transparent border border-purple-500/30 shadow-lg text-purple-400 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all duration-500 group-hover:animate-[float-icon_3s_ease-in-out_infinite] shrink-0">
        <Code2 size={28} />
      </div>
      
      <div className="relative z-10 flex flex-col gap-3">
        <h3 className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 group-hover:to-white transition-all duration-500 tracking-tight text-left">Project Expertise</h3>
        <p className="text-zinc-400 text-[15px] leading-relaxed text-left font-light">
          Developed worldwide client solutions including <span className="text-white font-medium group-hover:text-purple-300 transition-colors">E-commerce platforms</span>, highly responsive landing pages, portfolios, and custom tools like <span className="text-purple-300 font-medium group-hover:text-purple-400 transition-colors">payment management</span> systems.
        </p>
      </div>
    </div>
    
    {/* Global Card */}
    <div 
      className="group relative flex flex-col justify-between gap-6 rounded-2xl bg-gradient-to-b from-[#0f0f13] to-[#050507] p-[24px] lg:p-[32px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(6,182,212,0.4)] overflow-hidden border border-white/10 hover:border-cyan-500/50 box-border w-full"
      onMouseEnter={() => triggerExpression("amazing")}
      onMouseLeave={() => triggerExpression("neutral")}
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-[50px] group-hover:bg-cyan-500/40 transition-all duration-700 group-hover:scale-150 pointer-events-none" />
      
      <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-transparent border border-cyan-500/30 shadow-lg text-cyan-400 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-500 group-hover:animate-[float-icon_3s_ease-in-out_infinite] shrink-0">
        <Globe2 size={28} />
      </div>
      
      <div className="relative z-10 flex flex-col gap-3">
        <h3 className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 group-hover:to-white transition-all duration-500 tracking-tight text-left">Global Footprint</h3>
        <p className="text-zinc-400 text-[15px] leading-relaxed text-left font-light">
          Successfully delivered projects and collaborated with international clients across the <span className="text-white font-medium group-hover:text-cyan-300 transition-colors">UK, USA, Australia, Canada, and England</span>, adapting to global standards.
        </p>
      </div>
    </div>

    {/* Domestic Card */}
    <div 
      className="group relative flex flex-col justify-between gap-6 rounded-2xl bg-gradient-to-b from-[#0f0f13] to-[#050507] p-[24px] lg:p-[32px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(236,72,153,0.4)] overflow-hidden border border-white/10 hover:border-pink-500/50 box-border w-full"
      onMouseEnter={() => triggerExpression("smile")}
      onMouseLeave={() => triggerExpression("neutral")}
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-500/20 rounded-full blur-[50px] group-hover:bg-pink-500/40 transition-all duration-700 group-hover:scale-150 pointer-events-none" />
      
      <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-transparent border border-pink-500/30 shadow-lg text-pink-400 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(236,72,153,0.5)] transition-all duration-500 group-hover:animate-[float-icon_3s_ease-in-out_infinite] shrink-0">
        <MapPin size={28} />
      </div>
      
      <div className="relative z-10 flex flex-col gap-3">
        <h3 className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 group-hover:to-white transition-all duration-500 tracking-tight text-left">Domestic Footprint</h3>
        <p className="text-zinc-400 text-[15px] leading-relaxed text-left font-light">
          Partnered extensively with fast-growing Indian startups based in key tech hubs including <span className="text-white font-medium group-hover:text-pink-300 transition-colors">Hyderabad, Bengaluru, New Delhi, and Lucknow</span>.
        </p>
      </div>
    </div>

  </div>
);

const ConnectSection: React.FC = () => {
  return (
    <section className="w-full flex flex-col items-center text-center gap-6 mt-16 relative z-10 px-4 pb-8">
      <div className="relative inline-block group">
        
        {/* Massive Ambient Glow - Always Animating */}
        <div 
          className="absolute inset-0 rounded-full blur-[30px] opacity-70"
          style={{
            background: 'linear-gradient(270deg, #ec4899, #a855f7, #06b6d4, #ec4899)',
            backgroundSize: '300% 300%',
            animation: 'button-breathe 3s ease-in-out infinite, gradient-shift 4s ease infinite',
          }}
        />
        
        {/* The Infinite Animated Button */}
        <Link
          to="/help/contact"
          className="relative inline-flex items-center justify-center rounded-full px-[40px] py-[20px] sm:px-[48px] sm:py-[24px] text-xl sm:text-2xl font-extrabold text-white overflow-hidden border border-white/20"
          style={{
            background: 'linear-gradient(270deg, #ec4899, #a855f7, #06b6d4, #ec4899)',
            backgroundSize: '300% 300%',
            animation: 'button-breathe 3s ease-in-out infinite, gradient-shift 4s ease infinite',
          }}
        >
          {/* Inner metallic glass overlay for ultra-premium depth */}
          <div className="absolute inset-[2px] rounded-full bg-gradient-to-b from-white/20 via-zinc-900/60 to-zinc-950/90 mix-blend-overlay pointer-events-none" />
          
          <span className="relative z-10 flex items-center gap-4 tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] italic">
            Let's go
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-[pulse_2s_infinite]">
               <ArrowRight size={24} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            </div>
          </span>
        </Link>

      </div>
    </section>
  );
};

export const PersonalLanding = () => {
  return (
    <div 
      className="w-full flex flex-col items-center justify-start bg-[#030712] text-zinc-50 font-outfit relative overflow-hidden"
      style={{ 
        paddingTop: '180px', 
        paddingBottom: '120px' // Added clear massive gap before footer
      }}
    >
      {/* 3D Animated Background Blob */}
      <div 
        className="absolute w-[800px] h-[800px] bg-gradient-to-br from-purple-600/20 via-cyan-500/10 to-pink-500/10 rounded-full blur-[120px] animate-[pulse_6s_ease-in-out_infinite] pointer-events-none" 
        style={{ top: '80px', left: '50%', transform: 'translateX(-50%)', zIndex: 0 }}
      />
      
      {/* Grid overlay for professional tech look */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" style={{ zIndex: 0 }} />

      <div className="w-full flex flex-col items-center gap-12 sm:gap-16 relative" style={{ zIndex: 10 }}>
        <HeroSection />
        <ExperienceSection />
        <SocialsBlock />
        <ConnectSection />
      </div>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        .font-outfit { font-family: 'Outfit', system-ui, sans-serif; }
        
        @keyframes float-icon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes button-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};
