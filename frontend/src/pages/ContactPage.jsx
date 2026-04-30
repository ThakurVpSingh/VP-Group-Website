import React, { useState, useEffect } from 'react';
import { 
    Send, 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    ChevronRight, 
    CheckCircle2, 
    X, 
    Shield, 
    Code2, 
    Zap, 
    MessageSquare,
    Headphones,
    Clock,
    Terminal,
    Lock
} from 'lucide-react';
import ProjectNavbar from '../components/ProjectNavbar';
import Footer from '../components/Footer';

const ContactPage = () => {
    const [selectedService, setSelectedService] = useState('web-development');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        priority: 'Medium',
        systemId: '',
        complexity: 'Standard'
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Contact Portal | VP Group";
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Determine backend URL based on environment
        const API_URL = window.location.hostname === 'localhost' 
            ? 'http://localhost:5000/api/contact'
            : 'https://vp-group-website-1.onrender.com/api/contact';

        try {
            // Set a 15-second timeout for the request
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000);

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal,
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: `Contact Request: ${formData.priority} Priority`,
                    message: `Phone: ${formData.phone}\nPriority: ${formData.priority}\nSystem ID: ${formData.systemId}\nComplexity: ${formData.complexity}\n\nMessage:\n${formData.message}`
                })
            });
            
            clearTimeout(timeoutId);
            const data = await response.json();
            
            if (response.ok) {
                setShowSuccess(true);
            } else {
                alert(`Server Error: ${data.error || 'Submission rejected.'}`);
            }
        } catch (error) {
            console.error('Submission error:', error);
            if (error.name === 'AbortError') {
                alert("The request timed out. The server might be starting up (if on Render Free Tier). Please try again in a few seconds.");
            } else {
                alert("Failed to connect to the backend server. Please check your internet connection and ensure the backend is active.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeSuccess = () => {
        setShowSuccess(false);
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
            priority: 'Medium',
            systemId: '',
            complexity: 'Standard'
        });
        setSelectedService('web-development');
    };

    const contactPersons = [
        {
            name: "Vaibhav Pratap Singh",
            role: "Founders & Strategic Strategy",
            email: "vaibhavsinghha@gmail.com",
            icon: Shield,
            color: "#ff4ef0"
        },
        {
            name: "Engineering Division",
            role: "Core Tech & Architecture",
            email: "contact.vpsdev@gmail.com",
            icon: Code2,
            color: "#22d3ee"
        },
        {
            name: "Support Operations",
            role: "Maintenance & Ticketing",
            email: "contact.vpsdev@gmail.com",
            icon: Headphones,
            color: "#10b981"
        },
        {
            name: "Legal & Compliance",
            role: "Legal & Partnership Terms",
            email: "contact.vpsdev@gmail.com",
            icon: Lock,
            color: "#f59e0b"
        }
    ];

    return (
        <div className="contact-portal-container">
            <ProjectNavbar />

            {/* Header Section */}
            <section className="contact-hero">
                <div className="hero-glow"></div>
                <div className="hero-content">
                    <div className="badge-reveal">CONTACT COMMAND CENTER</div>
                    <h1>Initiate <span className="text-gradient">Mission Control</span></h1>
                    <p>Connect with our specific engineering leads or open a high-priority support ticket.</p>
                </div>
            </section>

            <section className="contact-main-grid">
                {/* Left: Contact Persons */}
                <div className="contact-leads-section">
                    <h2 className="section-title">Direct <span className="text-cyan">Leads</span></h2>
                    <p className="section-desc">Reach out directly to our department architects for specialized inquiries.</p>
                    
                    <div className="leads-stack">
                        {contactPersons.map((person, idx) => (
                            <div key={idx} className="lead-card glass-panel">
                                <div className="lead-header">
                                    <div className="lead-icon-box" style={{background: `${person.color}15`, color: person.color}}>
                                        <person.icon size={24} />
                                    </div>
                                    <div className="lead-info">
                                        <h4>{person.name}</h4>
                                        <span>{person.role}</span>
                                    </div>
                                </div>
                                <div className="lead-details">
                                    <div className="detail-item">
                                        <Mail size={14} /> {person.email}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="hq-mini-card glass-panel">
                        <MapPin size={24} color="#ff4ef0" />
                        <div>
                            <h4>Global Headquarters</h4>
                            <p>Pratapgarh, Uttar Pradesh, India</p>
                        </div>
                    </div>
                </div>

                {/* Right: Dynamic Form */}
                <div className="contact-form-section">
                    <div className="form-glass-container glass-panel">
                        <div className="form-header">
                            <div className="form-group">
                                <label>SERVICE DEPARTMENT</label>
                                <select 
                                    className="v-input"
                                    value={selectedService}
                                    onChange={(e) => setSelectedService(e.target.value)}
                                >
                                    <option value="web-development">WEB DEVELOPMENT</option>
                                    <option value="software-engineering">SOFTWARE ENGINEERING</option>
                                    <option value="technical-support">TECHNICAL SUPPORT</option>
                                    <option value="ticketing">TICKETING</option>
                                </select>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="dynamic-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>FULL NAME</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        required 
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="John Doe" 
                                        className="v-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>EMAIL ADDRESS</label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        required 
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="john@example.com" 
                                        className="v-input"
                                    />
                                </div>
                            </div>

                            {/* Service Specific Fields */}
                            {selectedService === 'web-development' && (
                                <div className="service-fields-reveal">
                                    <div className="form-group">
                                        <label>INTERFACE COMPLEXITY</label>
                                        <select name="complexity" value={formData.complexity} onChange={handleInputChange} className="v-input">
                                            <option>Single Landing Page</option>
                                            <option>Full-Stack Ecosystem</option>
                                            <option>E-Commerce Hub</option>
                                            <option>Institutional Portal</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {selectedService === 'software-engineering' && (
                                <div className="service-fields-reveal">
                                    <div className="form-group">
                                        <label>ARCHITECTURE SCOPE</label>
                                        <select name="complexity" value={formData.complexity} onChange={handleInputChange} className="v-input">
                                            <option>Custom ERP/CRM</option>
                                            <option>IAM/Security Gateway</option>
                                            <option>Cloud Microservices</option>
                                            <option>Legacy Modernization</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {(selectedService === 'technical-support' || selectedService === 'ticketing') && (
                                <div className="service-fields-reveal">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>SYSTEM / PROJECT ID</label>
                                            <input 
                                                type="text" 
                                                name="systemId"
                                                value={formData.systemId}
                                                onChange={handleInputChange}
                                                placeholder="VP-XXXX-2026" 
                                                className="v-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>PRIORITY LEVEL</label>
                                            <select name="priority" value={formData.priority} onChange={handleInputChange} className="v-input">
                                                <option>Low - Minor Query</option>
                                                <option>Medium - Performance lag</option>
                                                <option>High - System Blocked</option>
                                                <option>Critical - Security Breach</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="form-group">
                                <label>DETAILED MISSION BRIEF / ISSUE DESCRIPTION</label>
                                <textarea 
                                    name="message"
                                    rows="5"
                                    required
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Please provide forensic details of your requirement..."
                                    className="v-input"
                                ></textarea>
                            </div>

                            <button type="submit" className="v-submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <><Terminal size={18} className="spin" /> DEPLOYING INQUIRY...</>
                                ) : (
                                    <><Zap size={18} /> INITIATE TRANSMISSION</>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Success Modal */}
            {showSuccess && (
                <div className="success-overlay">
                    <div className="success-modal glass-panel">
                        <button className="close-modal" onClick={closeSuccess}><X size={20} /></button>
                        <div className="success-icon">
                            <CheckCircle2 size={60} color="#10b981" />
                        </div>
                        <h3>Submission Successful!</h3>
                        <p>
                            Thank you, <span className="text-cyan">{formData.name}</span>. 
                            Our team has received your <span className="text-purple">{selectedService.replace('-', ' ')}</span> inquiry.
                        </p>
                        <p className="sub-text">
                            A specialized architect will get in touch within 24 operational hours.
                        </p>
                        <button className="btn-modal-close" onClick={closeSuccess}>RETURN TO COMMAND CENTER</button>
                    </div>
                </div>
            )}

            <Footer />

            <style>{`
                .contact-portal-container {
                    background: #030712;
                    color: #fff;
                    min-height: 100vh;
                }

                .contact-hero {
                    padding: 160px 5% 80px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }
                .hero-glow {
                    position: absolute;
                    top: 0; left: 50%; transform: translateX(-50%);
                    width: 600px; height: 300px;
                    background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
                    z-index: 0;
                }
                .hero-content { position: relative; z-index: 1; }
                .badge-reveal {
                    display: inline-block;
                    padding: 8px 20px;
                    background: rgba(255, 78, 240, 0.05);
                    border: 1px solid rgba(255, 78, 240, 0.1);
                    border-radius: 30px;
                    font-size: 0.7rem;
                    font-weight: 900;
                    letter-spacing: 2px;
                    color: #ff4ef0;
                    margin-bottom: 24px;
                }
                .contact-hero h1 { font-size: clamp(2.5rem, 7vw, 4.5rem); font-weight: 950; letter-spacing: -3px; margin-bottom: 16px; }
                .contact-hero p { color: #94a3b8; font-size: 1.2rem; }
                .text-gradient { background: linear-gradient(to right, #22d3ee, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

                .contact-main-grid {
                    display: grid;
                    grid-template-columns: 1fr 1.6fr;
                    gap: 60px;
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 5% 120px;
                }

                /* Leads Section */
                .section-title { font-size: 2.5rem; font-weight: 900; letter-spacing: -1.5px; margin-bottom: 16px; }
                .text-cyan { color: #22d3ee; }
                .section-desc { color: #64748b; margin-bottom: 40px; line-height: 1.6; }
                
                .leads-stack { display: flex; flex-direction: column; gap: 20px; margin-bottom: 40px; }
                .lead-card { padding: 24px; transition: 0.3s; }
                .lead-card:hover { transform: translateX(10px); background: rgba(255,255,255,0.03); }
                .lead-header { display: flex; align-items: center; gap: 20px; margin-bottom: 20px; }
                .lead-icon-box { width: 50px; height: 50px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
                .lead-info h4 { font-size: 1.1rem; font-weight: 800; }
                .lead-info span { font-size: 0.75rem; font-weight: 900; color: #64748b; text-transform: uppercase; letter-spacing: 1px; }
                .lead-details { display: flex; flex-direction: column; gap: 8px; }
                .detail-item { display: flex; align-items: center; gap: 10px; font-size: 0.85rem; color: #94a3b8; }
                
                .hq-mini-card { padding: 24px; display: flex; align-items: center; gap: 20px; }
                .hq-mini-card h4 { font-size: 1rem; font-weight: 800; }
                .hq-mini-card p { font-size: 0.85rem; color: #64748b; margin-bottom: 0; }

                /* Form Section */
                .form-glass-container { padding: 60px; border: 1px solid rgba(255,255,255,0.05); }
                .service-tabs {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-bottom: 40px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .tab-btn {
                    padding: 10px 20px;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 10px;
                    color: #64748b;
                    font-size: 0.65rem;
                    font-weight: 900;
                    letter-spacing: 1px;
                    cursor: pointer;
                    transition: 0.3s;
                }
                .tab-btn:hover { background: rgba(255,255,255,0.05); color: #fff; }
                .tab-btn.active { 
                    background: rgba(34, 211, 238, 0.1); 
                    border-color: #22d3ee; 
                    color: #22d3ee;
                    box-shadow: 0 0 20px rgba(34, 211, 238, 0.1);
                }

                .v-input {
                    width: 100%;
                    background: rgba(3, 7, 18, 0.6);
                    border: 1.5px solid rgba(255, 255, 255, 0.05);
                    padding: 18px;
                    border-radius: 12px;
                    color: #fff;
                    font-size: 1rem;
                    outline: none;
                    transition: 0.3s;
                    appearance: none; /* For better styling control */
                }
                .v-input option {
                    background: #0f172a;
                    color: #fff;
                    padding: 15px;
                }
                .v-input:focus { border-color: #22d3ee; background: rgba(34, 211, 238, 0.03); }
                .form-group label { display: block; font-size: 0.7rem; font-weight: 900; color: #475569; letter-spacing: 2px; margin-bottom: 12px; }
                .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }
                .form-group { margin-bottom: 24px; }

                .v-submit-btn {
                    width: 100%;
                    padding: 22px;
                    background: linear-gradient(135deg, #22d3ee, #0ea5e9);
                    border: none;
                    border-radius: 16px;
                    color: #fff;
                    font-weight: 950;
                    font-size: 1.1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 15px;
                    transition: 0.4s;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .v-submit-btn:hover:not(:disabled) { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(34, 211, 238, 0.3); }
                .v-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

                /* Success Modal */
                .success-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.8);
                    backdrop-filter: blur(10px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 5000;
                    padding: 20px;
                }
                .success-modal {
                    max-width: 500px;
                    width: 100%;
                    padding: 60px 40px;
                    text-align: center;
                    position: relative;
                }
                .close-modal { position: absolute; top: 20px; right: 20px; background: none; border: none; color: #64748b; cursor: pointer; }
                .success-icon { margin-bottom: 30px; animation: scale-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                .success-modal h3 { font-size: 2rem; font-weight: 950; margin-bottom: 16px; }
                .success-modal p { color: #94a3b8; font-size: 1.1rem; line-height: 1.6; margin-bottom: 12px; }
                .text-purple { color: #8b5cf6; font-weight: 800; }
                .sub-text { font-size: 0.9rem !important; opacity: 0.7; margin-bottom: 30px !important; }
                .btn-modal-close {
                    width: 100%;
                    padding: 18px;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    color: #fff;
                    font-weight: 800;
                    cursor: pointer;
                    transition: 0.3s;
                }
                .btn-modal-close:hover { background: rgba(255,255,255,0.1); }

                @keyframes scale-in {
                    from { transform: scale(0); }
                    to { transform: scale(1); }
                }

                @media (max-width: 1024px) {
                    .contact-main-grid { grid-template-columns: 1fr; }
                    .form-glass-container { padding: 40px 24px; }
                    .form-row { grid-template-columns: 1fr; gap: 0; }
                    .contact-leads-section { display: none; }
                }

                @media (max-width: 768px) {
                    .contact-hero { padding: 120px 5% 40px; }
                    .contact-hero h1 { font-size: 2rem; }
                    .form-glass-container { padding: 24px 16px; }
                    .v-input { padding: 14px; font-size: 0.9rem; }
                    .v-submit-btn { padding: 16px; font-size: 0.95rem; }
                    .form-group { margin-bottom: 16px; }
                    .form-group label { margin-bottom: 8px; }
                }

                .spin { animation: spin 2s infinite linear; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default ContactPage;
