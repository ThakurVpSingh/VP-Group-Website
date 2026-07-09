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
import { animate, createTimeline, stagger } from "animejs";

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

  const eyeX = mousePos.x * 8;
  const eyeY = mousePos.y * 8;

  let mouthStyle: React.CSSProperties = {};
  let eyeStyle: React.CSSProperties = {};

  switch (expression) {
    case 'smile':
      mouthStyle = { width: '32px', height: '16px', borderRadius: '0 0 16px 16px', border: '4px solid #18181b', borderTop: 'none', transform: 'translateY(2px)' };
      eyeStyle = { height: '12px' };
      break;
    case 'surprised':
      mouthStyle = { width: '14px', height: '14px', borderRadius: '50%', border: '4px solid #18181b', transform: 'translateY(6px)' };
      eyeStyle = { height: '14px', width: '14px' }; 
      break;
    case 'amazing':
      mouthStyle = { width: '36px', height: '20px', borderRadius: '0 0 20px 20px', background: '#18181b', transform: 'translateY(2px)' };
      eyeStyle = { height: '6px', borderRadius: '6px 6px 0 0', transform: `translate(${eyeX}px, ${eyeY - 4}px)` };
      break;
    default:
      mouthStyle = { width: '22px', height: '4px', borderRadius: '2px', background: '#18181b', transform: 'translateY(8px)' };
      eyeStyle = { height: '12px' };
      break;
  }

  return (
    <section className="w-full flex flex-col items-center text-center gap-8 z-10">
      <div className="relative mb-4 group avatar-container" style={{ perspective: '1000px', opacity: 0 }}>
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 opacity-60 blur-2xl group-hover:opacity-100 transition-all duration-700 animate-[pulse_3s_ease-in-out_infinite]" />
        
        <div
          ref={avatarRef}
          style={{ 
            transform, 
            transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)' 
          }}
          className="relative size-36 md:size-40 rounded-full border-4 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.15)] z-10 bg-zinc-100 flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="flex gap-8 mb-1">
            <div 
              className="w-3 h-3 bg-zinc-900 rounded-full transition-all duration-200"
              style={{ 
                transform: `translate(${eyeX}px, ${eyeY}px)`,
                ...eyeStyle 
              }}
            />
            <div 
              className="w-3 h-3 bg-zinc-900 rounded-full transition-all duration-200"
              style={{ 
                transform: `translate(${eyeX}px, ${eyeY}px)`,
                ...eyeStyle 
              }}
            />
          </div>
          
          <div 
            className="transition-all duration-300 ease-out"
            style={mouthStyle}
          />
        </div>
      </div>
      
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-xl hero-title" style={{ opacity: 0 }}>
          Hi, I'm <span 
            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 cursor-default"
            onMouseEnter={() => triggerExpression("smile")}
            onMouseLeave={() => triggerExpression("neutral")}
          >
            Vaibhav Pratap Singh
          </span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 mx-auto font-light leading-relaxed px-4 md:px-0 hero-desc" style={{ opacity: 0 }}>
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
          'group social-btn flex items-center justify-center w-16 h-16 rounded-full border border-white/10 bg-[#09090b] shadow-xl transition-all duration-300 hover:-translate-y-2',
          link.borderGlow,
          link.shadow
        )}
        style={{ opacity: 0 }}
      >
        {link.icon}
      </a>
    ))}
  </div>
);

const ExperienceSection = () => (
  <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 z-10 px-6 md:px-8 mx-auto">
    <div 
      className="glass-panel owner-card expertise"
      onMouseEnter={() => triggerExpression("surprised")}
      onMouseLeave={() => triggerExpression("neutral")}
      style={{ opacity: 0 }}
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-[50px] group-hover:bg-purple-500/40 transition-all duration-700 group-hover:scale-150 pointer-events-none" />
      <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-transparent border border-purple-500/30 shadow-lg text-purple-400 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all duration-500 group-hover:animate-[float-icon_3s_ease-in-out_infinite] shrink-0">
        <Code2 size={28} strokeWidth={1.5} />
      </div>
      <div className="flex flex-col z-10 space-y-5 mt-4">
        <h3 className="text-2xl font-bold text-white tracking-tight">Project Expertise</h3>
        <p className="text-[15px] text-zinc-400 font-light leading-[1.85]">
          Developed full-scale client solutions worldwide. Specializations include high-performance <strong className="text-white font-medium">E-commerce platforms</strong>, highly responsive landing pages, and custom startup tools such as <strong className="text-white font-medium">payment management systems</strong>.
        </p>
      </div>
    </div>
    
    <div 
      className="glass-panel owner-card global"
      onMouseEnter={() => triggerExpression("amazing")}
      onMouseLeave={() => triggerExpression("neutral")}
      style={{ opacity: 0 }}
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-[50px] group-hover:bg-cyan-500/40 transition-all duration-700 group-hover:scale-150 pointer-events-none" />
      <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-transparent border border-cyan-500/30 shadow-lg text-cyan-400 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-500 group-hover:animate-[float-icon_3s_ease-in-out_infinite] shrink-0">
        <Globe2 size={28} strokeWidth={1.5} />
      </div>
      <div className="flex flex-col z-10 space-y-5 mt-4">
        <h3 className="text-2xl font-bold text-white tracking-tight">Global Footprint</h3>
        <p className="text-[15px] text-zinc-400 font-light leading-[1.85]">
          Successfully delivered complex projects and collaborated seamlessly with international clients across the <strong className="text-white font-medium">UK, USA, Australia, Canada, and England</strong> — consistently adapting to global tech standards and workflows.
        </p>
      </div>
    </div>

    <div 
      className="glass-panel owner-card domestic"
      onMouseEnter={() => triggerExpression("smile")}
      onMouseLeave={() => triggerExpression("neutral")}
      style={{ opacity: 0 }}
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-500/20 rounded-full blur-[50px] group-hover:bg-pink-500/40 transition-all duration-700 group-hover:scale-150 pointer-events-none" />
      <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-transparent border border-pink-500/30 shadow-lg text-pink-400 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(236,72,153,0.5)] transition-all duration-500 group-hover:animate-[float-icon_3s_ease-in-out_infinite] shrink-0">
        <MapPin size={28} strokeWidth={1.5} />
      </div>
      <div className="flex flex-col z-10 space-y-5 mt-4">
        <h3 className="text-2xl font-bold text-white tracking-tight">Domestic Footprint</h3>
        <p className="text-[15px] text-zinc-400 font-light leading-[1.85]">
          Partnered extensively with fast-growing Indian startups based in key tech hubs including <strong className="text-white font-medium">Hyderabad, Bengaluru, New Delhi, and Lucknow</strong>, delivering localized and highly scalable solutions.
        </p>
      </div>
    </div>
  </div>
);

const ConnectSection: React.FC = () => {
  return (
    <section className="w-full flex flex-col items-center text-center gap-6 mt-16 relative z-10 px-4 pb-8 connect-section" style={{ opacity: 0 }}>
      <div className="relative inline-block group">
        <div 
          className="absolute inset-0 rounded-full blur-[30px] opacity-70"
          style={{
            background: 'linear-gradient(270deg, #ec4899, #a855f7, #06b6d4, #ec4899)',
            backgroundSize: '300% 300%',
            animation: 'button-breathe 3s ease-in-out infinite, gradient-shift 4s ease infinite',
          }}
        />
        
        <Link
          to="/help/contact"
          className="relative inline-flex items-center justify-center rounded-full px-8 py-4 sm:px-12 sm:py-6 text-lg sm:text-xl font-extrabold text-white overflow-hidden border border-white/20"
          style={{
            background: 'linear-gradient(270deg, #ec4899, #a855f7, #06b6d4, #ec4899)',
            backgroundSize: '300% 300%',
            animation: 'button-breathe 3s ease-in-out infinite, gradient-shift 4s ease infinite',
          }}
        >
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

const OwnerStatsBlock: React.FC = () => {
  return (
    <div className="w-full max-w-5xl grid grid-cols-3 gap-4 md:gap-8 z-10 px-6 mx-auto my-12">
      <div className="glass-panel stat-card-item text-center py-6 md:py-8 rounded-3xl border border-white/5 bg-zinc-900/40 relative overflow-hidden group hover:border-cyan-500/20 transition-all duration-300" style={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="text-2xl md:text-5xl font-black text-cyan-400 mb-2">
          <span className="stat-number-val" data-target="45">0</span>+
        </div>
        <div className="text-[10px] md:text-xs font-semibold tracking-wider text-zinc-400 uppercase">PROJECTS COMPLETED</div>
      </div>
      
      <div className="glass-panel stat-card-item text-center py-6 md:py-8 rounded-3xl border border-white/5 bg-zinc-900/40 relative overflow-hidden group hover:border-purple-500/20 transition-all duration-300" style={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="text-2xl md:text-5xl font-black text-purple-400 mb-2">
          <span className="stat-number-val" data-target="100">0</span>%
        </div>
        <div className="text-[10px] md:text-xs font-semibold tracking-wider text-zinc-400 uppercase">CLIENT SATISFACTION</div>
      </div>

      <div className="glass-panel stat-card-item text-center py-6 md:py-8 rounded-3xl border border-white/5 bg-zinc-900/40 relative overflow-hidden group hover:border-pink-500/20 transition-all duration-300" style={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="text-2xl md:text-5xl font-black text-pink-400 mb-2">
          <span className="stat-number-val" data-target="3">0</span>+
        </div>
        <div className="text-[10px] md:text-xs font-semibold tracking-wider text-zinc-400 uppercase">YEARS EXPERIENCE</div>
      </div>
    </div>
  );
};

export const PersonalLanding = () => {
  useEffect(() => {
    // Entrance Animations timeline
    const tl = createTimeline({
      defaults: {
        easing: 'easeOutExpo'
      }
    });

    tl.add({
      targets: '.avatar-container',
      scale: [0.3, 1],
      opacity: [0, 1],
      duration: 1200,
    })
    .add({
      targets: '.hero-title',
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 1000,
    }, '-=800')
    .add({
      targets: '.hero-desc',
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 800,
    }, '-=700')
    .add({
      targets: '.stat-card-item',
      translateY: [30, 0],
      opacity: [0, 1],
      delay: stagger(150),
      duration: 800,
      complete: () => {
        // Trigger Stats Number Count Up animation
        animate({
          targets: '.stat-number-val',
          innerHTML: [0, (el: HTMLElement) => el.getAttribute('data-target') || '0'],
          round: 1,
          easing: 'easeOutQuad',
          duration: 2000,
          delay: stagger(200)
        });
      }
    }, '-=500')
    .add({
      targets: '.owner-card',
      translateY: [40, 0],
      opacity: [0, 1],
      delay: stagger(150),
      duration: 1000,
    }, '-=600')
    .add({
      targets: '.social-btn',
      scale: [0.5, 1],
      opacity: [0, 1],
      delay: stagger(100),
      duration: 800,
    }, '-=700')
    .add({
      targets: '.connect-section',
      opacity: [0, 1],
      duration: 600,
    }, '-=500');
  }, []);

  return (
    <div 
      className="w-full flex flex-col items-center justify-start bg-[#030712] text-zinc-50 font-outfit relative overflow-hidden"
      style={{ 
        paddingTop: '180px', 
        paddingBottom: '120px' 
      }}
    >
      <div 
        className="absolute w-[800px] h-[800px] bg-gradient-to-br from-purple-600/20 via-cyan-500/10 to-pink-500/10 rounded-full blur-[120px] animate-[pulse_6s_ease-in-out_infinite] pointer-events-none" 
        style={{ top: '80px', left: '50%', transform: 'translateX(-50%)', zIndex: 0 }}
      />
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" style={{ zIndex: 0 }} />

      <div className="w-full flex flex-col items-center gap-6 sm:gap-10 relative" style={{ zIndex: 10 }}>
        <HeroSection />
        <OwnerStatsBlock />
        <ExperienceSection />
        <SocialsBlock />
        <ConnectSection />
      </div>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        .font-outfit { font-family: 'Outfit', system-ui, sans-serif; }
        
        .owner-card {
          background: rgba(17, 24, 39, 0.75) !important;
          backdrop-filter: blur(20px) !important;
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
          border-radius: 24px !important;
          padding: 40px !important;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4) !important;
          text-align: left;
        }
        
        .owner-card:hover {
          background: rgba(17, 24, 39, 0.85) !important;
          transform: translateY(-8px) !important;
        }

        .owner-card.expertise:hover {
          border-color: rgba(168, 85, 247, 0.4) !important;
          box-shadow: 0 15px 40px rgba(168, 85, 247, 0.15) !important;
        }

        .owner-card.global:hover {
          border-color: rgba(6, 182, 212, 0.4) !important;
          box-shadow: 0 15px 40px rgba(6, 182, 212, 0.15) !important;
        }

        .owner-card.domestic:hover {
          border-color: rgba(255, 78, 240, 0.4) !important;
          box-shadow: 0 15px 40px rgba(255, 78, 240, 0.15) !important;
        }
        
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
