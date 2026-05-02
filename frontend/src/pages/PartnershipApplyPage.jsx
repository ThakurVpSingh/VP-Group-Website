import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProjectNavbar from '../components/ProjectNavbar';
import Footer from '../components/Footer';
import { Shield, Send, CheckCircle, FileText, Calendar, ArrowLeft, Loader2, Upload, ExternalLink } from 'lucide-react';
import { getApiUrl } from '../config';

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
        document.title = "Apply for Partnership | VP Group";
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
        
        try {
            const response = await fetch(getApiUrl('/api/contact'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.companyName,
                    email: formData.website || 'no-email-provided@domain.com',
                    subject: `Partnership Application: ${formData.collabType}`,
                    attachment: fileData,
                    message: `
Company Name: ${formData.companyName}
Website: ${formData.website}
Industry: ${formData.industry}
Collaboration Type: ${formData.collabType}
Project Volume: ${formData.projectVolume}
Tech Stack: ${formData.techStack.join(', ')}
Security Commitment: Agreed
                    `
                })
            });
            
            if (response.ok) {
                setIsSubmitted(true);
                window.scrollTo(0, 0);
            } else {
                const data = await response.json();
                alert(`Error: ${data.error || 'Server rejected the submission.'}`);
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert("Failed to connect to VP Backend. Ensure the server is online.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div style={{ background: '#05070a', color: '#fff', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
                <ProjectNavbar />
                <main style={{ paddingTop: '160px', paddingBottom: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="glass-panel animate-fade-in" style={{ maxWidth: '700px', width: '90%', padding: '80px 40px', textAlign: 'center', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
                            <CheckCircle size={48} color="#10b981" />
                        </div>
                        <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '16px', letterSpacing: '-2px' }}>Thank You.</h1>
                        <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '48px', lineHeight: 1.6 }}>
                            Your application to join the VP Group Ecosystem has been received. Our lead engineers will review your technical alignment and respond within 72 hours.
                        </p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                            <a href="#" className="action-card" style={{ textDecoration: 'none' }}>
                                <FileText size={24} color="#8b5cf6" />
                                <div>
                                    <h4 style={{ color: '#fff', marginBottom: '4px' }}>Partnership Guide</h4>
                                    <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Download technical standards PDF</p>
                                </div>
                            </a>
                            <div className="action-card">
                                <Calendar size={24} color="#ff4ef0" />
                                <div>
                                    <h4 style={{ color: '#fff', marginBottom: '4px' }}>Introductory Call</h4>
                                    <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Schedule via calendar widget</p>
                                </div>
                            </div>
                        </div>

                        <Link to="/help/partners" style={{ color: '#8b5cf6', textDecoration: 'none', fontWeight: '800', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                            <ArrowLeft size={16} /> RETURN TO PARTNERS PAGE
                        </Link>
                    </div>
                </main>
                <Footer />
                <style>{`
                    .action-card {
                        background: rgba(255,255,255,0.02);
                        border: 1px solid rgba(255,255,255,0.05);
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
                        background: rgba(139, 92, 246, 0.05);
                        border-color: rgba(139, 92, 246, 0.2);
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
        <div style={{ background: '#05070a', color: '#fff', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <ProjectNavbar />
            
            <main style={{ paddingTop: '160px', paddingBottom: '100px' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 5%' }}>
                    
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900', marginBottom: '16px', letterSpacing: '-2px' }}>
                            Begin Your Engineering <span className="text-gradient">Collaboration.</span>
                        </h1>
                        <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                            Join a network focused on high-performance ecosystems and total security.
                        </p>
                    </div>

                    <div className="glass-panel" style={{ padding: '60px' }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            
                            {/* Business Details */}
                            <section>
                                <h3 className="section-title">Business Details</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                                    <div className="form-group">
                                        <label>Company Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="Tech Solutions Inc." 
                                            required 
                                            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Website URL</label>
                                        <input 
                                            type="url" 
                                            placeholder="https://example.com" 
                                            required 
                                            onChange={(e) => setFormData({...formData, website: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Industry</label>
                                        <input 
                                            type="text" 
                                            placeholder="Cybersecurity, E-Commerce, etc." 
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
                                        <label>Collaboration Type</label>
                                        <select onChange={(e) => setFormData({...formData, collabType: e.target.value})}>
                                            <option>Strategic Partner</option>
                                            <option>Technology Partner</option>
                                            <option>Referral Partner</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Estimated Project Volume (Annual)</label>
                                        <div style={{ padding: '10px 0' }}>
                                            <input 
                                                type="range" 
                                                min="1" 
                                                max="50" 
                                                className="volume-slider"
                                                onChange={(e) => setFormData({...formData, projectVolume: e.target.value})}
                                            />
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#8b5cf6', marginTop: '8px', fontWeight: '800' }}>
                                                <span>1 PROJECT</span>
                                                <span>{formData.projectVolume} PROJECTS</span>
                                                <span>50+ PROJECTS</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Technical Stack */}
                            <section>
                                <h3 className="section-title">Technical Infrastructure</h3>
                                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8', marginBottom: '16px', display: 'block' }}>Select Specializations (Multi-select)</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                    {['React', 'Node.js', 'Python', 'Cloud Infra', 'Cybersecurity', 'AI/ML', 'Blockchain', 'E-Commerce'].map(tech => (
                                        <div 
                                            key={tech}
                                            onClick={() => handleTechToggle(tech)}
                                            style={{ 
                                                padding: '10px 20px', 
                                                background: formData.techStack.includes(tech) ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.02)', 
                                                border: `1px solid ${formData.techStack.includes(tech) ? '#8b5cf6' : 'rgba(255,255,255,0.05)'}`,
                                                borderRadius: '10px',
                                                fontSize: '0.85rem',
                                                fontWeight: '700',
                                                cursor: 'pointer',
                                                color: formData.techStack.includes(tech) ? '#fff' : '#94a3b8',
                                                transition: '0.3s'
                                            }}
                                        >
                                            {tech}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* File Upload Placeholder */}
                            <section>
                                <h3 className="section-title">Documentation</h3>
                                <div style={{ 
                                    border: '2px dashed rgba(139, 92, 246, 0.2)', 
                                    padding: '40px', 
                                    borderRadius: '20px', 
                                    textAlign: 'center',
                                    background: 'rgba(139, 92, 246, 0.02)',
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
                                    <Upload size={32} color="#8b5cf6" style={{ marginBottom: '16px' }} />
                                    <h4 style={{ marginBottom: '8px' }}>
                                        {fileData ? fileData.filename : "Upload Company Profile"}
                                    </h4>
                                    <p style={{ color: fileData ? '#10b981' : '#64748b', fontSize: '0.85rem' }}>
                                        {fileData ? 'File attached successfully ✓' : 'PDF, DOCX up to 10MB (Technical Portfolio or Capabilities Deck)'}
                                    </p>
                                </div>
                            </section>

                            {/* Vetting Commitment */}
                            <section style={{ background: 'rgba(139, 92, 246, 0.05)', padding: '32px', borderRadius: '20px', border: '1px solid rgba(139, 92, 246, 0.1)' }}>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div style={{ marginTop: '4px' }}>
                                        <input 
                                            type="checkbox" 
                                            id="vetting" 
                                            required 
                                            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                            onChange={(e) => setFormData({...formData, securityCommitment: e.target.checked})}
                                        />
                                    </div>
                                    <label htmlFor="vetting" style={{ cursor: 'pointer' }}>
                                        <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: '800', marginBottom: '4px' }}>Security & Performance Commitment</span>
                                        <span style={{ display: 'block', fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>
                                            I agree to adhere to VP Group's absolute Zero-Trust Security Architecture protocols and high-performance engineering benchmarks during any active collaboration.
                                        </span>
                                    </label>
                                </div>
                            </section>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                style={{ 
                                    padding: '24px', 
                                    background: 'linear-gradient(135deg, #8b5cf6 0%, #ff4ef0 100%)', 
                                    color: '#fff', 
                                    border: 'none', 
                                    borderRadius: '16px', 
                                    fontSize: '1.1rem', 
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
                                    <>Processing Application <Loader2 className="animate-spin" size={24} /></>
                                ) : (
                                    <>SUBMIT PARTNERSHIP APPLICATION <Send size={20} /></>
                                )}
                            </button>

                        </form>
                    </div>
                </div>
            </main>

            <Footer />

            <style>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 30px;
                }
                .section-title {
                    font-size: 1.2rem;
                    font-weight: 800;
                    margin-bottom: 24px;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .section-title::before {
                    content: '';
                    width: 12px;
                    height: 12px;
                    background: #8b5cf6;
                    border-radius: 3px;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .form-group label {
                    font-size: 0.85rem;
                    fontWeight: 700;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .form-group input, .form-group select {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 16px;
                    border-radius: 12px;
                    color: #fff;
                    outline: none;
                    transition: 0.3s;
                    appearance: none;
                }
                .form-group select {
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%238b5cf6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 16px center;
                    background-size: 16px;
                    padding-right: 48px;
                }
                .form-group select option {
                    background: #0f172a;
                    color: #fff;
                }
                .form-group input:focus, .form-group select:focus {
                    border-color: #8b5cf6;
                    background: rgba(139, 92, 246, 0.05);
                    box-shadow: 0 0 20px rgba(139, 92, 246, 0.1);
                }
                .text-gradient {
                    background: linear-gradient(to right, #8b5cf6, #ff4ef0);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .submit-btn:hover:not(:disabled) {
                    transform: translateY(-4px);
                    box-shadow: 0 20px 40px rgba(139, 92, 246, 0.4);
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
                    background: rgba(255,255,255,0.05);
                    border-radius: 10px;
                    outline: none;
                    margin: 15px 0;
                }
                .volume-slider::-webkit-slider-runnable-track {
                    width: 100%;
                    height: 8px;
                    cursor: pointer;
                    background: linear-gradient(to right, #8b5cf6, #ff4ef0);
                    border-radius: 10px;
                }
                .volume-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: 24px;
                    width: 24px;
                    border-radius: 50%;
                    background: #fff;
                    cursor: pointer;
                    margin-top: -8px; 
                    box-shadow: 0 0 15px rgba(255, 78, 240, 0.5);
                    border: 3px solid #8b5cf6;
                }

                @media (max-width: 768px) {
                    .glass-panel { padding: 24px 16px !important; border-radius: 16px; }
                    .section-title { font-size: 1.2rem !important; }
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
