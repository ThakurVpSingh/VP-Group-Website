import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProjectNavbar from '../components/ProjectNavbar';
import Footer from '../components/Footer';
import { Shield, Send, CheckCircle, FileText, Calendar, ArrowLeft, Loader2, Upload, ExternalLink } from 'lucide-react';
import { getApiUrl } from '../config';
import { submitContactForm } from '../services/formService';

const PartnershipApplyPage = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [fileData, setFileData] = useState(null);
    const [formData, setFormData] = useState({
        companyName: '',
        website: '',
        industry: '',
        collabType: 'Strategic',
        projectVolume: '5-10',
        techStack: [],
        securityCommitment: false
    });

    useEffect(() => {
        document.title = "Partnership & Careers | VP Group and Technologies";
        window.scrollTo(0, 0);
    }, []);

    const handleTechToggle = (tech) => {
        setFormData(prev => ({
            ...prev,
            techStack: prev.techStack.includes(tech) 
                ? prev.techStack.filter(t => t !== tech)
                : [...prev.techStack, tech]
        }));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        if (file.size > 10 * 1024 * 1024) {
            alert("File is too large! Maximum size is 10MB.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64String = event.target.result.split(',')[1];
            setFileData({
                filename: file.name,
                content: base64String,
                encoding: 'base64'
            });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.securityCommitment) {
            alert("Please agree to the Security & Performance Commitment.");
            return;
        }
        setIsSubmitting(true);
        
        const result = await submitContactForm({
            ...formData,
            attachment: fileData
        }, {
            source: 'Partnership Application'
        });

        if (result.success) {
            setIsSubmitted(true);
            window.scrollTo(0, 0);
        } else {
            alert(result.error || "Submission failed. Please try again later.");
        }
        setIsSubmitting(false);
    };

    if (isSubmitted) {
        return (
            <div style={{ background: 'var(--halo-bg)', color: 'var(--halo-on-surface)', minHeight: '100vh', fontFamily: "'Inter', sans-serif", transition: 'background-color 0.3s ease, color 0.3s ease' }}>
                <ProjectNavbar />
                <main style={{ paddingTop: '160px', paddingBottom: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="glass-panel animate-fade-in" style={{ maxWidth: '700px', width: '90%', padding: '80px 40px', textAlign: 'center', border: '1px solid var(--halo-border)' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
                            <CheckCircle size={48} color="#10b981" />
                        </div>
                        <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '16px', letterSpacing: '-2px', color: 'var(--halo-on-surface)' }}>Success.</h1>
                        <p style={{ color: 'var(--halo-muted)', fontSize: '1.15rem', marginBottom: '48px', lineHeight: 1.6 }}>
                            Thanks for reaching out to us, {formData.companyName}. We have received your request for {formData.collabType}. We'll get back to you shortly within 24-48 hours through your contact details.
                        </p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                            <a href="#" className="action-card" style={{ textDecoration: 'none' }}>
                                <FileText size={24} color="var(--halo-primary)" />
                                <div>
                                    <h4 style={{ color: 'var(--halo-on-surface)', fontSize: '1rem', fontWeight: '800', marginBottom: '4px' }}>Application Receipt</h4>
                                    <p style={{ color: 'var(--halo-muted)', fontSize: '0.85rem', margin: 0 }}>Archived securely in mesh registry</p>
                                </div>
                            </a>
                            <Link to="/consultation/book" className="action-card" style={{ textDecoration: 'none' }}>
                                <Calendar size={24} color="#ff4ef0" />
                                <div>
                                    <h4 style={{ color: 'var(--halo-on-surface)', fontSize: '1rem', fontWeight: '800', marginBottom: '4px' }}>Fast-Track Architecture</h4>
                                    <p style={{ color: 'var(--halo-muted)', fontSize: '0.85rem', margin: 0 }}>Schedule an immediate sync</p>
                                </div>
                            </Link>
                        </div>

                        <button 
                            onClick={() => navigate('/')} 
                            style={{ 
                                background: 'var(--halo-primary)', 
                                border: 'none', 
                                color: '#fff', 
                                padding: '16px 36px', 
                                borderRadius: '12px', 
                                fontWeight: '800', 
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: '0.3s'
                            }}
                        >
                            <ArrowLeft size={18} /> Return to Home
                        </button>
                    </div>
                </main>
                <Footer />
                <style>{`
                    .glass-panel {
                        background: var(--halo-surface);
                        border: 1px solid var(--halo-border);
                        border-radius: 24px;
                        box-shadow: var(--halo-shadow-md);
                    }
                    .action-card {
                        background: var(--halo-elevated);
                        border: 1px solid var(--halo-border);
                        padding: 24px;
                        border-radius: 16px;
                        display: flex;
                        align-items: center;
                        gap: 16px;
                        text-align: left;
                        transition: all 0.3s ease;
                        cursor: pointer;
                    }
                    .action-card:hover {
                        border-color: var(--halo-primary);
                        transform: translateY(-4px);
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in {
                        animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div style={{ background: 'var(--halo-bg)', color: 'var(--halo-on-surface)', minHeight: '100vh', fontFamily: "'Inter', sans-serif", transition: 'background-color 0.3s ease, color 0.3s ease' }}>
            <ProjectNavbar />
            
            <main style={{ paddingTop: '160px', paddingBottom: '100px' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 5%' }}>
                    
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900', marginBottom: '16px', letterSpacing: '-2px', color: 'var(--halo-on-surface)' }}>
                            Begin Your Engineering <span className="text-gradient">Collaboration.</span>
                        </h1>
                        <p style={{ color: 'var(--halo-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                            Join an enterprise network focused on high-performance ecosystems and total zero-trust security.
                        </p>
                    </div>

                    <div className="glass-panel" style={{ padding: '60px' }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            
                            {/* Business Details */}
                            <section>
                                <h3 className="section-title">Business & Candidate Details</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                                    <div className="form-group">
                                        <label>Company or Candidate Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="Tech Solutions Inc. or Full Name" 
                                            required 
                                            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Website / Portfolio / LinkedIn</label>
                                        <input 
                                            type="url" 
                                            placeholder="https://example.com" 
                                            required 
                                            onChange={(e) => setFormData({...formData, website: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Industry or Role Track</label>
                                        <input 
                                            type="text" 
                                            placeholder="Cybersecurity, AI/ML, Fullstack, etc." 
                                            required 
                                            onChange={(e) => setFormData({...formData, industry: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Collaboration & Scale */}
                            <section>
                                <h3 className="section-title">Strategic Alignment</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
                                    <div className="form-group">
                                        <label>Collaboration / Engagement Type</label>
                                        <select onChange={(e) => setFormData({...formData, collabType: e.target.value})}>
                                            <option>Strategic Partner</option>
                                            <option>Technology Partner</option>
                                            <option>Engineering Talent (Careers)</option>
                                            <option>Referral Partner</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Estimated Project / Engagement Scope</label>
                                        <div style={{ padding: '10px 0' }}>
                                            <input 
                                                type="range" 
                                                min="1" 
                                                max="50" 
                                                className="volume-slider"
                                                onChange={(e) => setFormData({...formData, projectVolume: e.target.value})}
                                            />
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--halo-primary)', marginTop: '8px', fontWeight: '800' }}>
                                                <span>1 UNIT</span>
                                                <span>{formData.projectVolume} UNITS</span>
                                                <span>50+ UNITS</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Technical Stack */}
                            <section>
                                <h3 className="section-title">Technical Infrastructure</h3>
                                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--halo-muted)', marginBottom: '16px', display: 'block' }}>Select Specializations (Multi-select)</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                    {['React / Next.js', 'Node.js', 'Python', 'Cloud / DevOps', 'Cybersecurity', 'AI / LLM', 'Custom ERP', 'E-Commerce'].map(tech => {
                                        const isSelected = formData.techStack.includes(tech);
                                        return (
                                            <div 
                                                key={tech}
                                                onClick={() => handleTechToggle(tech)}
                                                style={{ 
                                                    padding: '10px 20px', 
                                                    background: isSelected ? 'var(--halo-primary)' : 'var(--halo-elevated)', 
                                                    border: `1px solid ${isSelected ? 'var(--halo-primary)' : 'var(--halo-border)'}`,
                                                    borderRadius: '10px',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '700',
                                                    cursor: 'pointer',
                                                    color: isSelected ? '#ffffff' : 'var(--halo-on-surface)',
                                                    transition: '0.2s',
                                                    boxShadow: isSelected ? '0 4px 12px var(--halo-focus)' : 'none'
                                                }}
                                            >
                                                {tech}
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* File Upload Placeholder */}
                            <section>
                                <h3 className="section-title">Documentation & Resume</h3>
                                <div style={{ 
                                    border: '2px dashed var(--halo-border)', 
                                    padding: '40px', 
                                    borderRadius: '20px', 
                                    textAlign: 'center',
                                    background: 'var(--halo-elevated)',
                                    cursor: 'pointer',
                                    position: 'relative'
                                }}>
                                    <input 
                                        type="file" 
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileUpload}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            opacity: 0,
                                            cursor: 'pointer'
                                        }}
                                    />
                                    <Upload size={32} color="var(--halo-primary)" style={{ marginBottom: '16px' }} />
                                    <h4 style={{ marginBottom: '8px', color: 'var(--halo-on-surface)' }}>
                                        {fileData ? fileData.filename : "Upload Resume or Company Profile"}
                                    </h4>
                                    <p style={{ color: fileData ? '#10b981' : 'var(--halo-muted)', fontSize: '0.85rem', margin: 0 }}>
                                        {fileData ? 'File attached successfully ✓' : 'PDF, DOCX up to 10MB (Resume, CV, or Deck)'}
                                    </p>
                                </div>
                            </section>

                            {/* Vetting Commitment */}
                            <section style={{ background: 'var(--halo-elevated)', padding: '28px', borderRadius: '20px', border: '1px solid var(--halo-border)' }}>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    <div style={{ marginTop: '4px' }}>
                                        <input 
                                            type="checkbox" 
                                            id="vetting" 
                                            required 
                                            style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--halo-primary)' }}
                                            onChange={(e) => setFormData({...formData, securityCommitment: e.target.checked})}
                                        />
                                    </div>
                                    <label htmlFor="vetting" style={{ cursor: 'pointer' }}>
                                        <span style={{ display: 'block', fontSize: '1.05rem', fontWeight: '800', marginBottom: '4px', color: 'var(--halo-on-surface)' }}>Security & Performance Commitment</span>
                                        <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--halo-muted)', lineHeight: 1.6 }}>
                                            I agree to adhere to VP Group's absolute Zero-Trust Security Architecture protocols and high-performance engineering benchmarks during any active engagement.
                                        </span>
                                    </label>
                                </div>
                            </section>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                style={{ 
                                    padding: '20px', 
                                    background: 'linear-gradient(135deg, var(--halo-primary) 0%, #ff4ef0 100%)', 
                                    color: '#fff', 
                                    border: 'none', 
                                    borderRadius: '14px', 
                                    fontSize: '1.05rem', 
                                    fontWeight: '900', 
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    transition: '0.3s',
                                    opacity: isSubmitting ? 0.7 : 1
                                }}
                                className="submit-btn"
                            >
                                {isSubmitting ? (
                                    <>Processing Submission <Loader2 className="animate-spin" size={22} /></>
                                ) : (
                                    <>SUBMIT APPLICATION <Send size={20} /></>
                                )}
                            </button>

                        </form>
                    </div>
                </div>
            </main>

            <Footer />

            <style>{`
                .glass-panel {
                    background: var(--halo-surface);
                    border: 1px solid var(--halo-border);
                    border-radius: 28px;
                    box-shadow: var(--halo-shadow-md);
                }
                .section-title {
                    font-size: 1.2rem;
                    font-weight: 850;
                    margin-bottom: 24px;
                    color: var(--halo-on-surface);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .section-title::before {
                    content: '';
                    width: 10px;
                    height: 10px;
                    background: var(--halo-primary);
                    border-radius: 3px;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .form-group label {
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: var(--halo-muted);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .form-group input, .form-group select {
                    background: var(--halo-elevated);
                    border: 1px solid var(--halo-border);
                    padding: 16px;
                    border-radius: 12px;
                    color: var(--halo-on-surface);
                    outline: none;
                    transition: 0.3s;
                    appearance: none;
                    font-size: 0.95rem;
                }
                .form-group select {
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%235B6BFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 16px center;
                    background-size: 16px;
                    padding-right: 48px;
                }
                .form-group select option {
                    background: var(--halo-surface);
                    color: var(--halo-on-surface);
                }
                .form-group input:focus, .form-group select:focus {
                    border-color: var(--halo-primary);
                    background: var(--halo-surface);
                    box-shadow: 0 0 0 3px var(--halo-focus);
                }
                .text-gradient {
                    background: linear-gradient(to right, var(--halo-primary), #ff4ef0);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .submit-btn:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: 0 16px 36px var(--halo-focus);
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .volume-slider {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 8px;
                    background: var(--halo-border);
                    border-radius: 10px;
                    outline: none;
                    margin: 15px 0;
                }
                .volume-slider::-webkit-slider-runnable-track {
                    width: 100%;
                    height: 8px;
                    cursor: pointer;
                    background: linear-gradient(to right, var(--halo-primary), #ff4ef0);
                    border-radius: 10px;
                }
                .volume-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: 22px;
                    width: 22px;
                    border-radius: 50%;
                    background: #ffffff;
                    cursor: pointer;
                    margin-top: -7px; 
                    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                    border: 3px solid var(--halo-primary);
                }

                @media (max-width: 768px) {
                    .glass-panel { padding: 28px 18px !important; border-radius: 18px; }
                    .section-title { font-size: 1.1rem !important; }
                    .form-group input, .form-group select { padding: 12px !important; font-size: 0.9rem; }
                    .submit-btn { padding: 16px !important; font-size: 1rem !important; }
                    main { padding-top: 120px !important; padding-bottom: 60px !important; }
                    h1 { font-size: 2rem !important; letter-spacing: -1px !important; }
                }
            `}</style>
        </div>
    );
};

export default PartnershipApplyPage;
