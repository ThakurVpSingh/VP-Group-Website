import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Globe, 
  Terminal, 
  Zap, 
  Database, 
  MapPin, 
  Mail, 
  Phone, 
  ArrowRight, 
  Layout, 
  Server,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Cpu,
  Layers,
  Shield,
  Users
} from 'lucide-react';
import Footer from '../components/Footer';
import ProjectNavbar from '../components/ProjectNavbar';

const CodingBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    const particleCount = 60;
    const lines = [
      'const system = new vpx.Core();',
      'system.deploy({ cloud: true });',
      'import { AI } from "@vpgroup/neural";',
      'await database.connect();',
      'console.log("READY");',
      'npm install @vpgroup/toolkit',
      'git push origin master',
      'docker-compose up -d',
      '<Component />',
      'while(true) { build(); }'
    ];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.text = lines[Math.floor(Math.random() * lines.length)];
        this.alpha = Math.random() * 0.5;
        this.fontSize = Math.random() * 10 + 10;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.font = `${this.fontSize}px monospace`;
        ctx.fillStyle = `rgba(139, 92, 246, ${this.alpha * 0.3})`;
        ctx.fillText(this.text, this.x, this.y);
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const drawLine = (p1, p2) => {
      const dist = Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
      if (dist < 200) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - dist/200) * 0.1})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
        particles.forEach(p2 => drawLine(p, p2));
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0, 
        opacity: 0.6,
        pointerEvents: 'none'
      }} 
    />
  );
};

const VPGroup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Home | VP Group";
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      if (response.ok) {
        alert("Success! Your message has been received by the VP Command Center.");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert(`Error: ${result.error || 'Failed to send message.'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert("Submission failed. Ensure the VP Backend is online.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#030712', color: '#f3f4f6', overflowX: 'hidden', fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif' }}>
      
      <CodingBackground />

      <ProjectNavbar />

      <main style={{ position: 'relative', zIndex: 10, marginTop: '100px' }}>
        
        {/* Hero Section */}
        <section id="about" className="hero-section">
          <div className="hero-content animate-fade-in">
            <div className="hero-badge">
              <div className="badge-dot"></div>
              ELITE DEVELOPMENT HUB
            </div>
            <h1 className="hero-title">
              Web & Software <br/>
              <span className="text-gradient">At Infinite Scale.</span>
            </h1>
            <p className="hero-desc">
              We specialize in high-fidelity web development, mission-critical software engineering, and 24/7 technical support. Our goal is to provide enterprise-grade digital infrastructure at an <strong style={{ color: '#ff4ef0' }}>affordable price point</strong>, empowering businesses of all sizes.
            </p>
            <div className="hero-actions">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Launch Project <ArrowRight size={20} />
              </button>
              <button className="btn-secondary" onClick={() => document.getElementById('technologies')?.scrollIntoView({ behavior: 'smooth' })}>
                Our Services
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="glass-panel code-window">
              <div className="code-header">
                 <div className="dot red"></div>
                 <div className="dot yellow"></div>
                 <div className="dot green"></div>
              </div>
              <div className="code-content">
                <span className="code-keyword">service</span> WebDevelopment {'{'}<br/>
                &nbsp;&nbsp;<span className="code-keyword">get</span> expertise() {'{'}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-return">return</span> ['Web', 'Software', 'Support'];<br/>
                &nbsp;&nbsp;{'}'}<br/>
                &nbsp;&nbsp;async build() {'{'}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-return">return</span> await this.deploy(budget: <span className="code-string">'Affordable'</span>);<br/>
                &nbsp;&nbsp;{'}'}<br/>
                {'}'}
              </div>
            </div>
          </div>
        </section>

        {/* 2. High-Impact Mission Statement */}
        <section className="mission-section">
          <div className="mission-container">
            <div className="mission-icon-box">
                <div className="line"></div>
                <Terminal size={24} />
                <div className="line"></div>
            </div>
            <h2 className="mission-text">
                "Our aim is simple: To become the <span className="text-glow-cyan">global skeleton</span> of the secure digital infrastructure. <br/>
                <span className="sub-mission">We engineer the platforms that move the world."</span>
            </h2>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="section-container">
          <div className="section-header">
            <h2 className="section-title">The Portfolio</h2>
          </div>
          <div className="portfolio-grid">
            
            {/* VexioGate Card */}
            <div className="glass-panel portfolio-card">
              <div className="portfolio-visual">
                <div className="visual-overlay"></div>
                <div className="visual-content">
                  <Shield size={48} color="#a78bfa" />
                  <div className="visual-title">VEXIOGATE</div>
                </div>
              </div>
              <div className="portfolio-info">
                <div className="info-header">
                  <h3>IAM Ecosystem</h3>
                  <span className="badge-Employee">LIVE</span>
                </div>
                <p className="portfolio-desc">
                  Next-gen identity tracking and secure gateway provisioning for enterprise workforce.
                </p>
                <div className="portfolio-tags">
                  {['React', 'MERN', 'Security'].map(tag => (
                    <span key={tag} className="tag">{tag.toUpperCase()}</span>
                  ))}
                </div>
                <div className="portfolio-actions">
                  <button onClick={() => navigate('/portfolio/vault-iam')} className="btn-standard-accent">
                    VIEW CASE STUDY <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Expansion Slot Placeholder */}
            <div className="glass-panel expansion-slot">
               <div className="slot-border"></div>
               <div className="slot-content">
                 <Layers size={36} color="#3b82f6" className="slot-icon" />
                 <h3>NEURAL CORE</h3>
                 <span className="slot-badge">IN DEVELOPMENT</span>
                 <p>Future integration module. Our ecosystem is actively expanding to include autonomous neural tracking.</p>
               </div>
            </div>

          </div>
        </section>

        {/* 4. Partners Section */}
        <section id="clients" className="section-container cyan-tint">
          <div className="section-header-left">
            <div className="sub-badge">TRUSTED BY INNOVATORS</div>
            <h2 className="section-title">Project <span className="text-glow-cyan">Partnerships.</span></h2>
            <p className="section-desc">
              We don't just build for clients; we partner with visionary leaders who entrust us with their ambitious projects.
            </p>
          </div>
          
          <div className="partners-grid">
            
            <div className="glass-panel partner-card">
              <div className="partner-header">
                <div>
                  <h3 className="partner-name">Mother Bliss</h3>
                  <p className="partner-type">Maternal E-Commerce</p>
                </div>
                <div className="partner-icon">
                  <Globe size={24} color="#22d3ee" />
                </div>
              </div>
              <p className="partner-desc">
                A comprehensive maternal care ecosystem engineered by VP Group. We architected the full-stack infrastructure for seamless commerce.
              </p>
              <div className="partner-actions">
                <a href="https://wwwmotherbliss-dd920f26.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn-standard-accent-blue">
                  PRODUCTION REALM <ExternalLink size={14} />
                </a>
                <a href="https://thakurvpsingh.github.io/mothers-bliss/" target="_blank" rel="noopener noreferrer" className="btn-standard-outline">
                  LEGACY ARCHIVE <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Partner Expansion Slot */}
            <div className="glass-panel expansion-slot cyan">
               <div className="slot-border"></div>
               <div className="slot-content">
                 <Users size={36} color="#22d3ee" className="slot-icon" />
                 <h4>NEW PARTNER</h4>
                 <span className="slot-badge">AWAITING PROVISIONING</span>
                 <p>Open socket for future enterprise partnerships. Join the infrastructure that moves the world.</p>
               </div>
            </div>

          </div>
        </section>

        {/* Arsenal / Technologies Section */}
        <section id="technologies" className="section-container dark-bg">
          <div className="section-header">
            <h2 className="section-title">Our Services</h2>
          </div>
          <div className="services-grid">
            <div className="glass-panel service-card" onClick={() => navigate('/services/web-development')}>
              <Layout size={32} color="#ff4ef0" />
              <h3>Web Development</h3>
              <p>Fluid React interfaces and robust e-commerce ecosystems engineered for high-velocity conversion.</p>
            </div>
            <div className="glass-panel service-card" onClick={() => navigate('/services/software-engineering')}>
              <Server size={32} color="#a78bfa" />
              <h3>Software Engineering</h3>
              <p>Custom enterprise software solutions, mission-critical IAM platforms, and scalable backends.</p>
            </div>
            <div className="glass-panel service-card" onClick={() => navigate('/services/technical-support')}>
              <Shield size={32} color="#10b981" />
              <h3>Technical Support</h3>
              <p>24/7 dedicated support mesh ensuring your digital infrastructure remains resilient and secure.</p>
            </div>
          </div>
        </section>

        {/* Aim & Culture Section */}
        <section id="culture" className="section-container">
          <div className="glass-panel culture-panel">
            <div className="culture-grid">
              <div className="culture-main">
                  <div className="sub-badge purple">OUR DNA</div>
                  <h2 className="culture-title">Strategic Aim <br/> & <span className="text-glow-cyan">Culture.</span></h2>
                  <p className="culture-desc">
                      At VP Group, our mission is to democratize high-end engineering. We combine enterprise-grade security with accessible pricing models.
                  </p>
              </div>
              
              <div className="culture-sub-grid">
                  <div className="culture-card">
                      <h4>WORKING CULTURE</h4>
                      <p>We thrive on radical transparency. Every engineer is a decision-maker in our flat-hierarchy mesh.</p>
                  </div>
                  <div className="culture-card">
                      <h4>INDUSTRY STANDING</h4>
                      <p>Positioned at the intersection of security and performance, solving the "Infinite Scale" problem.</p>
                  </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Standard Contact Information Section */}
        <section id="contact" className="section-container dark-bg">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="sub-badge">INSTITUTIONAL REACH</div>
            <h2 className="section-title">Direct <span className="text-glow-cyan">Communication.</span></h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              Connect with our specialized departments for technical inquiries, partnership opportunities, or institutional support.
            </p>
          </div>

          <div className="contact-details-grid">
            <div className="glass-panel detail-card cyan">
              <div className="card-coord">[ 27.60° N, 77.04° E ]</div>
              <div className="detail-icon"><Mail size={28} color="#22d3ee" /></div>
              <h3>COMMAND CENTER</h3>
              <p>contact.vpsdev@gmail.com</p>
              <div className="detail-tag">24/7 MONITORING</div>
              <div className="card-trace"></div>
            </div>

            <div className="glass-panel detail-card purple">
              <div className="card-coord">[ ACTIVE_HQ_HUB ]</div>
              <div className="detail-icon"><MapPin size={28} color="#a78bfa" /></div>
              <h3>HEADQUARTERS</h3>
              <p>Pratapgarh, Uttar Pradesh, India</p>
              <div className="detail-tag">REGIONAL HUB</div>
              <div className="card-trace"></div>
            </div>

            <div className="glass-panel detail-card blue">
              <div className="card-coord">[ SYNC_READY ]</div>
              <div className="detail-icon"><Phone size={28} color="#60a5fa" /></div>
              <h3>BUSINESS LINE</h3>
              <p>Inquiry via Email Recommended</p>
              <div className="detail-tag">SUPPORT MESH</div>
              <div className="card-trace"></div>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      <style>{`
        /* Core Section Layout - Fix for Overlapping */
        .section-container {
          padding: 120px 5%;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          position: relative;
          z-index: 10;
          overflow: hidden;
        }
        .dark-bg { background: #000; }
        .cyan-tint { background: rgba(34, 211, 238, 0.02); }

        /* Hero Section */
        .hero-section {
          min-height: calc(100vh - 100px);
          padding: 60px 5%;
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 80px;
          align-items: center;
        }
        .hero-content { text-align: left; }
        .hero-visual { width: 100%; position: relative; }
        
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 10px 24px;
          background: rgba(255, 78, 240, 0.05);
          backdrop-filter: blur(10px);
          color: #ff4ef0;
          border-radius: 40px;
          font-size: 0.75rem;
          font-weight: 900;
          letter-spacing: 3px;
          margin-bottom: 40px;
          border: 1px solid rgba(255, 78, 240, 0.2);
          text-transform: uppercase;
        }
        .badge-dot { 
            width: 10px; height: 10px; border-radius: 50%; background: #ff4ef0; 
            box-shadow: 0 0 15px #ff4ef0;
            animation: pulse-neon 2s infinite;
        }
        @keyframes pulse-neon {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.5; }
            100% { transform: scale(1); opacity: 1; }
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 5.5rem);
          font-weight: 950;
          line-height: 1;
          margin-bottom: 32px;
          letter-spacing: -4px;
          color: #fff;
        }
        .hero-desc {
          font-size: clamp(1.1rem, 2.8vw, 1.3rem);
          color: #94a3b8;
          line-height: 1.8;
          max-width: 650px;
          margin-bottom: 56px;
        }
        .hero-actions { display: flex; gap: 24px; flex-wrap: wrap; }
        
        /* Premium Buttons */
        .btn-primary {
          background: #fff;
          color: #030712;
          border: none;
          padding: 20px 40px;
          border-radius: 16px;
          font-size: 1.1rem;
          font-weight: 900;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .btn-primary::after {
            content: '';
            position: absolute;
            top: -50%; left: -50%; width: 200%; height: 200%;
            background: linear-gradient(45deg, transparent, rgba(255,255,255,0.8), transparent);
            transform: rotate(45deg);
            transition: 0.6s;
            opacity: 0;
        }
        .btn-primary:hover { 
            transform: translateY(-5px) scale(1.02); 
            box-shadow: 0 20px 40px rgba(255,255,255,0.15);
        }
        .btn-primary:hover::after { left: 100%; opacity: 1; }
        
        .btn-secondary {
          background: rgba(255,255,255,0.02);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 20px 40px;
          border-radius: 16px;
          font-size: 1.1rem;
          font-weight: 800;
          cursor: pointer;
          transition: 0.3s;
          backdrop-filter: blur(10px);
        }
        .btn-secondary:hover { 
            background: rgba(255,255,255,0.08); 
            border-color: rgba(255,255,255,0.3);
            transform: translateY(-2px);
        }

        /* Portfolio & Partner Button View - Enhanced */
        .btn-standard-accent { 
            width: 100%; 
            padding: 20px; 
            background: linear-gradient(135deg, #22d3ee, #0ea5e9); 
            border: none; 
            color: #fff; 
            border-radius: 16px; 
            font-weight: 950; 
            cursor: pointer; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            gap: 12px; 
            transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
            margin-bottom: 16px; 
            text-transform: uppercase; 
            letter-spacing: 1px;
            font-size: 0.9rem;
        }
        .btn-standard-accent:hover { 
            transform: translateY(-4px);
            box-shadow: 0 15px 30px rgba(34, 211, 238, 0.3);
            filter: brightness(1.1);
        }

        .btn-standard-outline { 
            width: 100%; 
            padding: 18px; 
            background: transparent; 
            border: 2px solid rgba(255,255,255,0.1); 
            color: #fff; 
            border-radius: 16px; 
            font-weight: 800; 
            cursor: pointer; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            gap: 12px; 
            transition: 0.3s; 
            font-size: 0.9rem;
        }
        .btn-standard-outline:hover { 
            background: rgba(255,255,255,0.05); 
            border-color: rgba(255,255,255,0.3); 
            transform: translateY(-2px);
        }

        .btn-standard-accent-blue { 
            width: 100%; 
            padding: 20px; 
            background: linear-gradient(to right, #22d3ee, #0ea5e9); 
            border: none; 
            color: #fff; 
            border-radius: 16px; 
            font-weight: 950; 
            cursor: pointer; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            gap: 12px; 
            transition: 0.4s; 
            text-decoration: none; 
            margin-bottom: 16px; 
            box-shadow: 0 10px 20px rgba(34, 211, 238, 0.1);
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .btn-standard-accent-blue:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(34, 211, 238, 0.4);
            filter: brightness(1.1);
        }

        /* Mission Section - High Impact */
        .mission-section {
            padding: 80px 5%;
            margin: 0 auto;
            max-width: 1200px;
            display: flex;
            justify-content: center;
            position: relative;
            z-index: 10;
        }
        .mission-container {
            background: rgba(10, 15, 30, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 40px;
            padding: 80px 40px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            box-shadow: 0 30px 60px rgba(0,0,0,0.3);
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
        }
        .mission-container::after {
            content: '';
            position: absolute;
            top: 0; left: 50%; transform: translateX(-50%);
            width: 50%; height: 2px;
            background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.5), transparent);
        }
        .mission-icon-box {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            max-width: 400px;
            margin-bottom: 40px;
            color: #22d3ee;
        }
        .mission-icon-box .line {
            flex: 1;
            height: 1px;
            background: rgba(34, 211, 238, 0.3);
            margin: 0 20px;
        }
        .mission-text {
            font-size: clamp(1.8rem, 4vw, 2.8rem);
            font-weight: 900;
            line-height: 1.4;
            color: #fff;
            max-width: 900px;
            letter-spacing: -1px;
        }
        .sub-mission {
            display: block;
            margin-top: 24px;
            font-size: clamp(1rem, 2vw, 1.3rem);
            color: #94a3b8;
            font-weight: 500;
            letter-spacing: 0;
        }

        /* Section Titles & Sub-badges */
        .section-header { margin-bottom: 60px; text-align: center; }
        .section-title { 
            font-size: clamp(2.5rem, 6vw, 4rem); 
            font-weight: 900; color: #fff; 
            letter-spacing: -2px; margin: 20px 0;
        }
        .sub-badge {
            display: inline-block;
            font-size: 0.7rem;
            font-weight: 950;
            color: #22d3ee;
            letter-spacing: 4px;
            text-transform: uppercase;
            padding: 8px 16px;
            background: rgba(34, 211, 238, 0.05);
            border-radius: 4px;
            border-left: 3px solid #22d3ee;
        }
        .sub-badge.purple { color: #a78bfa; background: rgba(167, 139, 250, 0.05); border-left-color: #a78bfa; }

        /* Grids */
        .portfolio-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 48px; }
        .partners-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-top: 60px;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-top: 60px;
        }
        .contact-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 60px; }
        
        /* Cards */
        .portfolio-card { 
            padding: 0; overflow: hidden; display: flex; flex-direction: column; 
            border: 1px solid rgba(255,255,255,0.03);
            transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .portfolio-card:hover { 
            transform: translateY(-10px); 
            border-color: rgba(167, 139, 250, 0.2); 
            background: rgba(255,255,255,0.01);
            box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }

        .portfolio-visual { height: 240px; background: #0f172a; position: relative; display: flex; align-items: center; justify-content: center; }
        .visual-overlay { position: absolute; inset: 0; background: radial-gradient(circle, rgba(167, 139, 250, 0.2) 0%, transparent 70%); }
        .visual-content { position: relative; z-index: 1; text-align: center; }
        .visual-title { font-size: 1.8rem; font-weight: 950; margin-top: 16px; letter-spacing: 5px; color: #fff; text-transform: uppercase; }
        
        .portfolio-info { padding: 40px; flex: 1; display: flex; flex-direction: column; gap: 20px; }
        .info-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0px; }
        .portfolio-desc { color: #94a3b8; font-size: 1rem; line-height: 1.7; margin-bottom: 10px; }
        .portfolio-tags { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; }
        .tag { font-size: 0.65rem; font-weight: 900; color: #a78bfa; background: rgba(167, 139, 250, 0.1); padding: 6px 16px; border-radius: 30px; letter-spacing: 1px; }
        .portfolio-actions { margin-top: auto; }

        .partner-card { 
            padding: 50px; 
            border: 1px solid rgba(255,255,255,0.03);
            transition: 0.4s;
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        .partner-card:hover { 
            transform: translateY(-10px); 
            background: rgba(255,255,255,0.02);
            border-color: rgba(34, 211, 238, 0.3);
        }
        .partner-actions { margin-top: auto; padding-top: 30px; display: flex; flex-direction: column; gap: 12px; }
        .partner-name { font-size: 2rem; font-weight: 950; color: #fff; letter-spacing: -1px; }
        .partner-type { color: #22d3ee; font-size: 0.75rem; font-weight: 950; text-transform: uppercase; margin-top: 8px; letter-spacing: 3px; opacity: 0.8; }
        
        /* Expansion Slots (Placeholders) */
        .expansion-slot {
            align-self: center;
            background: rgba(3, 7, 18, 0.4);
            border: 2px dashed rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
            transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: default;
        }
        .expansion-slot:hover {
            border-color: rgba(59, 130, 246, 0.4);
            background: rgba(59, 130, 246, 0.02);
            transform: translateY(-5px);
        }
        .expansion-slot.cyan:hover {
            border-color: rgba(34, 211, 238, 0.4);
            background: rgba(34, 211, 238, 0.02);
        }
        .slot-content {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
        }
        .slot-icon {
            opacity: 0.6;
            transition: 0.4s;
        }
        .expansion-slot:hover .slot-icon {
            opacity: 1;
            transform: scale(1.1);
        }
        .expansion-slot h3, .expansion-slot h4 {
            font-size: 1.2rem;
            font-weight: 900;
            color: #94a3b8;
            letter-spacing: 2px;
            margin: 0;
        }
        .expansion-slot:hover h3, .expansion-slot:hover h4 { color: #fff; }
        .slot-badge {
            font-size: 0.65rem;
            font-weight: 950;
            letter-spacing: 2px;
            padding: 6px 12px;
            background: rgba(255, 255, 255, 0.05);
            color: #64748b;
            border-radius: 20px;
        }
        .expansion-slot p {
            color: #64748b;
            font-size: 0.9rem;
            line-height: 1.6;
            margin: 0;
            max-width: 80%;
        }
        
        .service-card {
          padding: 40px;
          text-align: left;
          cursor: pointer;
          transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255,255,255,0.05);
          position: relative;
          overflow: hidden;
        }
        .service-card:hover {
          transform: translateY(-10px);
          background: rgba(255,255,255,0.02);
          border-color: rgba(255,255,255,0.1);
        }
        .service-card h3 { font-size: 1.5rem; margin: 24px 0 16px; color: #fff; }
        .service-card p { color: #94a3b8; font-size: 0.95rem; line-height: 1.6; }

        /* Culture */
        .culture-panel { padding: clamp(30px, 5vw, 100px); border-radius: 40px; }
        .culture-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 80px; align-items: center; }
        .culture-title { font-size: clamp(2.5rem, 6vw, 3.5rem); font-weight: 950; margin-bottom: 32px; letter-spacing: -2.5px; }
        .culture-desc { color: #94a3b8; line-height: 1.8; font-size: 1.15rem; margin-bottom: 40px; }
        .culture-card { 
            padding: 48px; background: rgba(255,255,255,0.02); border-radius: 32px; 
            border: 1px solid rgba(255,255,255,0.04); 
            transition: 0.4s;
        }
        .culture-card:hover { transform: scale(1.02); background: rgba(255,255,255,0.04); }

        /* Unique Contact Command Center View */
        .contact-details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
          margin-top: 80px;
        }
        .detail-card {
          padding: 80px 40px;
          text-align: center;
          transition: all 0.5s cubic-bezier(0.2, 1, 0.3, 1);
          border: 1px solid rgba(255,255,255,0.03);
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          background: rgba(10, 15, 30, 0.4);
          border-radius: 32px;
          overflow: hidden;
          min-height: 400px;
          justify-content: center;
        }
        .detail-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 4px;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            opacity: 0;
            transition: 0.5s;
        }
        .detail-card:hover { 
            transform: translateY(-15px) scale(1.02); 
            background: rgba(255,255,255,0.02); 
            border-color: rgba(255,255,255,0.1);
            box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }
        .detail-card:hover::before { opacity: 1; }

        .card-coord {
            position: absolute;
            top: 24px;
            right: 24px;
            font-family: 'Monospace', sans-serif;
            font-size: 0.6rem;
            color: rgba(255,255,255,0.2);
            letter-spacing: 1px;
        }
        .card-trace {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 1px solid transparent;
            border-radius: 32px;
            pointer-events: none;
            transition: 0.5s;
        }
        .detail-card:hover .card-trace {
            border-color: rgba(34, 211, 238, 0.2);
            box-shadow: inset 0 0 30px rgba(34, 211, 238, 0.05);
        }

        .detail-icon { 
            width: 80px; height: 80px; border-radius: 24px; 
            background: rgba(255,255,255,0.03); 
            display: flex; align-items: center; justify-content: center; 
            margin-bottom: 32px;
            transition: 0.5s;
        }
        .detail-card:hover .detail-icon {
            transform: rotateY(180deg);
            background: rgba(255,255,255,0.08);
        }

        .detail-card h3 { font-size: 0.75rem; font-weight: 900; letter-spacing: 4px; color: #64748b; margin-bottom: 16px; text-transform: uppercase; }
        .detail-card p { font-size: 1.3rem; font-weight: 900; color: #fff; margin-bottom: 24px; line-height: 1.3; }
        .detail-tag { font-size: 0.6rem; font-weight: 950; letter-spacing: 2px; padding: 8px 20px; border-radius: 40px; background: rgba(255,255,255,0.05); color: #94a3b8; text-transform: uppercase; }

        .detail-card.cyan:hover .card-trace { border-color: rgba(34, 211, 238, 0.4); }
        .detail-card.purple:hover .card-trace { border-color: rgba(167, 139, 250, 0.4); }
        .detail-card.blue:hover .card-trace { border-color: rgba(96, 165, 250, 0.4); }

        /* Tablet/Mobile Responsive */
        @media (max-width: 1024px) {
            .contact-details-grid { grid-template-columns: repeat(2, 1fr); }
            .detail-card.blue { grid-column: span 2; }
        }
        @media (max-width: 768px) {
            .contact-details-grid { grid-template-columns: 1fr; }
            .detail-card.blue { grid-column: span 1; }
            .detail-card { padding: 50px 30px; }
        }

        /* Contact Section */
        .contact-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 60px; margin-top: 60px; }
        .contact-info-stack { display: flex; flex-direction: column; gap: 20px; }
        .contact-item { 
            padding: 30px; display: flex; align-items: center; gap: 20px; 
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.05);
            transition: 0.3s ease;
        }
        .contact-item:hover { transform: translateX(10px); background: rgba(255,255,255,0.04); }
        .contact-icon-box { width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); }
        .contact-text h4 { font-size: 1rem; color: #fff; margin-bottom: 4px; }
        .contact-text p { color: #94a3b8; font-size: 0.9rem; }

        .terminal-input { 
          width: 100%; 
          background: rgba(3, 7, 18, 0.6); 
          border: 1.5px solid rgba(255, 255, 255, 0.05); 
          padding: 20px; 
          border-radius: 12px; 
          color: #fff; 
          font-size: 1rem;
          transition: all 0.3s;
        }
        .terminal-input:focus { 
            border-color: #22d3ee; 
            background: rgba(34, 211, 238, 0.03); 
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.1);
        }
        
        .attractive-submit { 
            width: 100%; padding: 24px; 
            background: linear-gradient(135deg, #ff4ef0, #8b5cf6); 
            border: none; border-radius: 20px; color: #fff; 
            font-weight: 950; cursor: pointer; display: flex; 
            align-items: center; justify-content: center; gap: 16px; 
            transition: 0.4s; font-size: 1.2rem; 
            letter-spacing: 1px; text-transform: uppercase;
        }
        .attractive-submit:hover:not(:disabled) { 
            transform: translateY(-6px); 
            box-shadow: 0 25px 50px rgba(255, 78, 240, 0.4); 
        }

        /* Responsive Overrides */
        @media (max-width: 1200px) {
          .hero-section { grid-template-columns: 1fr; gap: 60px; text-align: center; }
          .hero-content { text-align: center; }
          .hero-desc { margin-left: auto; margin-right: auto; }
          .hero-actions { justify-content: center; }
          .hero-visual { max-width: 600px; margin: 0 auto; }
        }

        @media (max-width: 768px) {
          .section-container { padding: 60px 4%; }
          .hero-title { font-size: clamp(2.5rem, 10vw, 3.5rem); letter-spacing: -2px; }
          .hero-section { padding-top: 100px; min-height: auto; }
          .contact-grid { grid-template-columns: 1fr; }
          .culture-grid { grid-template-columns: 1fr; gap: 40px; }
          .form-row { grid-template-columns: 1fr; }
          .hero-actions .btn-primary, .hero-actions .btn-secondary { width: 100%; justify-content: center; padding: 16px 24px; }
          .portfolio-grid { grid-template-columns: 1fr; gap: 30px; }
          .partners-grid { grid-template-columns: 1fr; gap: 20px; }
          .services-grid { grid-template-columns: 1fr; gap: 20px; }
          .contact-details-grid { grid-template-columns: 1fr; }
          .partner-card { padding: 30px; }
          .portfolio-info { padding: 24px; }
          .detail-card { padding: 40px 24px; min-height: auto; }
          .mission-container { padding: 40px 20px; border-radius: 24px; }
        }

        @media (max-width: 480px) {
          .hero-badge { padding: 8px 16px; font-size: 0.65rem; letter-spacing: 1px; }
          .service-card { padding: 24px; }
          .section-title { font-size: 2rem; letter-spacing: -1px; }
          .section-container { padding: 40px 4%; }
          .btn-primary, .btn-secondary { font-size: 0.95rem; padding: 14px 20px; }
        }
      `}</style>
    </div>
  );
};

export default VPGroup;
