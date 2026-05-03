import React, { useEffect, useState } from 'react';
import ProjectNavbar from './ProjectNavbar';
import { getApiUrl } from '../config';
import { submitContactForm } from '../services/formService';
import Footer from './Footer';
import { Mail, MapPin, Phone, ArrowRight, CheckCircle, ChevronRight, Github, Linkedin, Twitter } from 'lucide-react';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const result = await submitContactForm(formData, {
            source: `Page Template: ${document.title}`,
            accessKey: '236495cb-64bc-4467-87df-5e925b42d10f'
        });

        if (result.success) {
            alert("Success! Your message has been received by the VP Command Center.");
            setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
            alert(result.error || "Submission failed. Please try again later.");
        }
        setIsSubmitting(false);
    };

    return (
        <section id="contact" style={{ padding: '80px 5%', background: '#030712', position: 'relative' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', marginBottom: '16px' }}>Get In <span className="text-gradient">Touch</span></h2>
                    <p style={{ color: '#9ca3af', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
                        Have a project in mind or just want to say hello? We'd love to hear from you.
                    </p>
                </div>

                <div className="contact-main-grid">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div className="glass-panel" style={{ padding: '32px', borderLeft: '3px solid #ff4ef0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{ width: 50, height: 50, borderRadius: '12px', background: 'rgba(255, 78, 240, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Mail size={24} color="#ff4ef0" />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px' }}>Email Us</h4>
                                    <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>contact.vpsdev@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel" style={{ padding: '32px', borderLeft: '3px solid #8b5cf6' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{ width: 50, height: 50, borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <MapPin size={24} color="#8b5cf6" />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px' }}>Our Office</h4>
                                    <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Pratapgarh, Uttar Pradesh, India</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel" style={{ padding: '32px', borderLeft: '3px solid #10b981' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{ width: 50, height: 50, borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Phone size={24} color="#10b981" />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px' }}>Call Us</h4>
                                    <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Contact for business inquiries</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '48px', position: 'relative' }}>
                        <form 
                            onSubmit={handleSubmit}
                            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                        >
                            <div className="contact-form-grid">
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#fff', marginBottom: '8px' }}>Full Name</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        placeholder="John Doe" 
                                        className="terminal-input" 
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required 
                                        style={{ background: 'rgba(255,255,255,0.02)' }} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#fff', marginBottom: '8px' }}>Email Address</label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        placeholder="john@example.com" 
                                        className="terminal-input" 
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required 
                                        style={{ background: 'rgba(255,255,255,0.02)' }} 
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#fff', marginBottom: '8px' }}>Subject</label>
                                <input 
                                    type="text" 
                                    name="subject"
                                    placeholder="How can we help?" 
                                    className="terminal-input" 
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required 
                                    style={{ background: 'rgba(255,255,255,0.02)' }} 
                                />
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#fff', marginBottom: '8px' }}>Message</label>
                                <textarea 
                                    name="message"
                                    placeholder="Tell us more about your project..." 
                                    rows="5" 
                                    className="terminal-input" 
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    style={{ resize: 'none', background: 'rgba(255,255,255,0.02)' }} 
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="terminal-button attractive-submit" disabled={isSubmitting} style={{ 
                                padding: '18px', 
                                fontSize: '1.05rem', 
                                background: 'linear-gradient(135deg, #ff4ef0 0%, #8b5cf6 100%)', 
                                fontWeight: '900',
                                border: 'none',
                                borderRadius: '12px',
                                color: '#fff',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px'
                            }}>
                                {isSubmitting ? 'Sending Proposal...' : 'Send Proposal'}
                                {!isSubmitting && <ArrowRight size={20} />}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

const PageTemplate = ({ title, subtitle, description, techDetails, procedures, suitability, icon: Icon, children, showContact = true, showStandardGrid = true, fullScreenHero = false }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ background: '#0a0c10', color: '#fff', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <ProjectNavbar />
            
            <main>
                {/* Hero Section */}
                <header style={{ 
                    padding: fullScreenHero ? '0 5%' : '120px 5% 60px', 
                    textAlign: 'center', 
                    position: 'relative', 
                    zIndex: 1,
                    minHeight: fullScreenHero ? '100vh' : 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: '100%', background: 'radial-gradient(circle at 50% 50%, rgba(255, 0, 255, 0.05) 0%, transparent 70%)', zIndex: -1 }}></div>
                    {Icon && (
                        <div style={{ 
                            width: '80px', 
                            height: '80px', 
                            background: 'rgba(255,255,255,0.03)', 
                            borderRadius: '24px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            margin: '0 auto 32px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            boxShadow: '0 0 40px rgba(0,0,0,0.5)'
                        }}>
                            <Icon size={40} color="#fff" />
                        </div>
                    )}
                    <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: '900', marginBottom: '24px', letterSpacing: '-2px', lineHeight: 1 }}>{title}</h1>
                    <div style={{ fontSize: 'clamp(0.8rem, 2vw, 1rem)', fontWeight: '900', color: '#ff4ef0', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '32px' }}>{subtitle}</div>
                    <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: '#94a3b8', lineHeight: 1.6 }}>{description}</p>
                    
                    {fullScreenHero && (
                        <div className="scroll-indicator" style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }}>
                            <div className="mouse" style={{ width: '25px', height: '40px', border: '2px solid #fff', borderRadius: '15px', position: 'relative' }}>
                                <div className="wheel" style={{ width: '4px', height: '8px', background: '#fff', margin: '8px auto', borderRadius: '2px', animation: 'scroll 1.5s infinite' }}></div>
                            </div>
                        </div>
                    )}
                </header>

                {/* Content Grid */}
                {showStandardGrid && (
                    <section style={{ padding: '80px 5%', maxWidth: '1200px', margin: '0 auto' }}>
                        <div className="template-content-grid">
                            {/* Technical Details */}
                            <div className="glass-panel" style={{ padding: '40px', borderTop: '4px solid #ff4ef0' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <ChevronRight size={24} color="#ff4ef0" /> Technical Details
                                </h3>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {techDetails.map((detail, i) => (
                                        <li key={i} style={{ display: 'flex', gap: '12px', color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.5 }}>
                                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff4ef0', marginTop: '8px', flexShrink: 0 }}></div>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Working Procedure */}
                            <div className="glass-panel" style={{ padding: '40px', borderTop: '4px solid #8b5cf6' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <ChevronRight size={24} color="#8b5cf6" /> Working Procedure
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {procedures.map((proc, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '16px' }}>
                                            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '900', flexShrink: 0 }}>{i + 1}</div>
                                            <p style={{ color: '#9ca3af', fontSize: '0.95rem', margin: 0 }}>{proc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Why Choose Us */}
                            <div className="glass-panel" style={{ padding: '40px', borderTop: '4px solid #10b981' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <ChevronRight size={24} color="#10b981" /> Why Suitability
                                </h3>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {suitability.map((item, i) => (
                                        <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                            <CheckCircle size={18} color="#10b981" style={{ marginTop: '3px', flexShrink: 0 }} />
                                            <span style={{ color: '#9ca3af', fontSize: '0.95rem' }}>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                )}

                {/* Dynamic Children (e.g. Roadmap) */}
                <div style={{ marginTop: '40px' }}>
                    {children}
                </div>

                {showContact && <ContactSection />}
            </main>

            <Footer />

            <style>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 24px;
                    transition: all 0.3s ease;
                }
                .glass-panel:hover {
                    background: rgba(255, 255, 255, 0.05);
                    transform: translateY(-5px);
                    border-color: rgba(255, 0, 255, 0.1);
                }
                .text-gradient {
                    background: linear-gradient(to right, #ff4ef0, #8b5cf6);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .terminal-input {
                    width: 100%;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.08);
                    padding: 14px;
                    border-radius: 12px;
                    color: #fff;
                    font-family: inherit;
                    transition: 0.3s;
                    outline: none;
                }
                .terminal-input:focus {
                    border-color: #ff4ef0;
                    box-shadow: 0 0 15px rgba(255, 78, 240, 0.1);
                }
                .attractive-submit:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 40px rgba(255, 78, 240, 0.4);
                    filter: brightness(1.1);
                }
                .attractive-submit:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                @keyframes scroll {
                    0% { transform: translateY(0); opacity: 1; }
                    100% { transform: translateY(15px); opacity: 0; }
                }

                /* Responsive Grids */
                .contact-main-grid {
                    display: grid;
                    grid-template-columns: 1fr 1.5fr;
                    gap: 40px;
                }
                .contact-form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 24px;
                }
                .template-content-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 40px;
                }

                @media (max-width: 968px) {
                    .contact-main-grid { grid-template-columns: 1fr; }
                    .template-content-grid { grid-template-columns: 1fr; }
                }
                @media (max-width: 640px) {
                    .contact-form-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
};

export default PageTemplate;
