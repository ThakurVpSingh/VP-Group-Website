import { Layout, Terminal, Shield, Zap, Palette, Code2, Database, Server, Smartphone, Search, PenTool, CheckCircle2, Activity, ShieldCheck, Layers, Globe } from 'lucide-react';

export const servicesData = {
    'web-development': {
        title: "Web Development",
        subtitle: "High-Performance Digital Ecosystems",
        description: "We engineer fluid, scalable, and conversion-optimized web applications using the MERN stack and Next.js. Our focus is on atomic design principles and relentless performance optimization.",
        icon: Layout,
        accentColor: "#ff4ef0",
        visualizerData: {
            1: { title: "Semantic DOM Engine", desc: "We engineer semantic HTML5 architectures that provide the structural skeleton for high-performance web applications, optimized for both humans and search engines.", icon: Smartphone },
            2: { title: "Reactive Shell", desc: "Utilizing advanced CSS methodologies and fluid grid systems to ensure your interface responds with surgical precision across every device.", icon: Code2 },
            3: { title: "Kernel Logic Layer", desc: "The engine room where real-time data orchestration happens. We manage complex state, API integrations, and sub-millisecond server responses.", icon: Database }
        },
        meshSteps: [
            { icon: Search, title: "01. Semantic DOM Mapping", desc: "Performing a forensic analysis of content hierarchy to engineer a semantic HTML skeleton that maximizes SEO and accessibility." },
            { icon: PenTool, title: "02. Responsive Grid Engineering", desc: "Architecting fluid, sub-pixel precise layout systems that ensure your platform retains architectural integrity on all screen dimensions." },
            { icon: Code2, title: "03. JS Engine Optimization", desc: "Fine-tuning application logic and state management to ensure sub-millisecond execution times and smooth interactivity." },
            { icon: CheckCircle2, title: "04. Edge Deployment QA", desc: "Final stress testing on global edge networks to guarantee that your web ecosystem is ready for massive simultaneous traffic." }
        ],
        techDetails: [
            "MERN Stack Specialization: Scalable architectures using MongoDB, Express, React, and Node.js.",
            "Next.js Integration: Server-side rendering (SSR) and static site generation (SSG) for elite SEO.",
            "Atomic Design: Modular component architecture ensuring consistency across your entire platform.",
            "Performance Tuning: Sub-1s load times through advanced caching and asset optimization.",
            "Real-time Logic: Socket.io integration for instant data synchronization and live updates."
        ],
        procedures: [
            "Performance Audit: Identifying bottlenecks in existing infrastructure.",
            "Component Mapping: Designing a modular UI kit tailored to your brand.",
            "Data Architecture: Designing secure, non-relational database schemas.",
            "Deployment Pipeline: Automated CI/CD workflows for seamless updates.",
            "Growth Scaling: Monitoring and optimizing for increasing traffic loads."
        ],
        suitability: [
            "E-commerce Brands: Requiring high-speed catalogs and secure checkouts.",
            "SaaS Startups: Needing a robust, scalable foundation for their core product.",
            "Corporate Hubs: Looking for a premium, professional digital presence.",
            "Content Platforms: Optimized for high traffic and dynamic media delivery.",
            "Internal Dashboards: Streamlining operations with real-time data visibility."
        ],
        processSteps: [
            { phase: "Phase 1: Discovery", title: "Requirement Synthesis", desc: "We analyze your business goals, target audience, and technical constraints to define a precise development roadmap." },
            { phase: "Phase 2: Architecture", title: "Full-Stack Blueprint", desc: "Designing the database schemas, API structures, and component hierarchies before a single line of code is written." },
            { phase: "Phase 3: Execution", title: "Rapid Sprints", desc: "Implementing features in iterative cycles with continuous feedback loops and daily technical verification." },
            { phase: "Phase 4: Security Audit", title: "Stress Testing", desc: "Conducting rigorous penetration tests and performance stress tests to ensure the platform is production-hardened." }
        ]
    },
    'software-engineering': {
        title: "Software Engineering",
        subtitle: "The intersection of enterprise-grade stability and modern performance.",
        description: "Designing robust, secure, and highly available software solutions for complex business challenges. We specialize in custom ERPs, IAM platforms, and secure gateway systems.",
        icon: Terminal,
        accentColor: "#a78bfa",
        visualizerData: {
            1: { title: "SYSTEM KERNEL", desc: "Building low-latency core engines in Go and Rust that process millions of requests with absolute precision.", icon: Terminal },
            2: { title: "SECURITY GATEWAY", desc: "Implementing Zero-Trust protocols and multi-layered encryption to protect mission-critical enterprise data.", icon: Shield },
            3: { title: "CLOUD ORCHESTRATION", desc: "Scalable infrastructure management using Docker and Kubernetes for 99.99% system availability.", icon: Server }
        },
        meshSteps: [
            { icon: Search, title: "01. Forensic Audit", desc: "Deep-dive into existing legacy codebases or new requirements to identify potential architectural bottlenecks." },
            { icon: PenTool, title: "02. Logic Synthesis", desc: "Designing complex algorithm pathways and microservices logic before any implementation begins." },
            { icon: Code2, title: "03. Core Engineering", desc: "Developing production-hardened code with strict adherence to SOLID principles and enterprise standards." },
            { icon: CheckCircle2, title: "04. Security Stress", desc: "Rigorous penetration testing and load simulations to ensure absolute resilience under extreme conditions." }
        ],
        techDetails: [
            "Custom Enterprise Solutions: Building robust backends with low latency and absolute data integrity.",
            "Legacy Modernization: Refactoring old systems into modern, cloud-native microservices architectures.",
            "API & Integration Ecosystems: Developing secure, scalable APIs for seamless business tool communication.",
            "Security-First Engineering: Implementing DevSecOps and Zero-Trust Security Models.",
            "Scalability & Performance: Engineering systems that grow from 1,000 to 1,000,000+ users."
        ],
        procedures: [
            "Microservices Orchestration: Breaking down monoliths into manageable, independent service nodes.",
            "Security Hardening: Implementing MFA, end-to-end encryption, and Zero-Trust Protocols.",
            "API Orchestration: Building robust communication layers between disparate systems.",
            "Automated CI/CD: Establishing continuous integration and deployment pipelines.",
            "Scalability Planning: Ensuring horizontal scaling strategies for 100x growth."
        ],
        suitability: [
            "Large Scale Institutions: Requiring high-availability systems with sub-millisecond response.",
            "Fintech & Banking: Needing absolute transaction integrity and forensic-grade auditing.",
            "Global E-Commerce: Requiring localized, high-performance catalogs across multi-regions.",
            "IAM & Security Firms: Looking for custom identity orchestration and gateway provisioning.",
            "Tech Companies: Outsourcing mission-critical backend engineering to specialists."
        ],
        processSteps: [
            { phase: "Step 1", title: "Discovery & Requirements", desc: "Deep-dive into business logic, identifying technical bottlenecks and defining the 'Ecosystem Blueprint'." },
            { phase: "Step 2", title: "Architecture Design", desc: "Creating the technical foundation, including database schema optimization and microservices logic." },
            { phase: "Step 3", title: "Agile Development", desc: "High-velocity sprints with constant CI/CD feedback loops, focusing on modular code." },
            { phase: "Step 4", title: "Testing & QA", desc: "Rigorous stress testing and penetration testing to ensure 'Total Security' and resilience." }
        ],
        specsTable: [
            { label: "Languages", value: "Go, Rust, TypeScript, Python" },
            { label: "Database", value: "PostgreSQL, MongoDB, Redis" },
            { label: "Infrastructure", value: "Docker, Kubernetes, Terraform" },
            { label: "Security", value: "Zero-Trust, OAuth2, AES-256" }
        ]
    },
    'technical-support': {
        title: "Technical Support",
        subtitle: "24/7 Resilience & Infrastructure Monitoring",
        description: "We provide a dedicated technical mesh to ensure your platforms stay online, secure, and optimized. Our support is predictive and relentless.",
        icon: Shield,
        accentColor: "#10b981",
        visualizerData: {
            1: { title: "UPTIME MONITOR", desc: "AI-driven surveillance layers that detect anomalies and fix infrastructure issues before they impact users.", icon: Activity },
            2: { title: "SECURITY SHIELD", desc: "Real-time threat detection and immediate patching of zero-day vulnerabilities across your digital mesh.", icon: ShieldCheck },
            3: { title: "DISASTER RECOVERY", desc: "Automated, encrypted backup protocols ensuring your data is always restorable in minutes, not hours.", icon: Database }
        },
        meshSteps: [
            { icon: Search, title: "01. System Mapping", desc: "Creating a complete forensic map of every server, database, and API endpoint in your ecosystem." },
            { icon: PenTool, title: "02. Shield Protocol", desc: "Implementing automated surveillance and rapid-response protocols for potential failures." },
            { icon: Zap, title: "03. Active Oversight", desc: "Round-the-clock rotations by elite engineers managing updates and responding to alerts in real-time." },
            { icon: CheckCircle2, title: "04. Resilience Drill", desc: "Monthly disaster simulation drills to verify recovery speeds and system hardening protocols." }
        ],
        techDetails: [
            "Uptime Assurance: 99.9% availability guarantees through redundant monitoring nodes.",
            "Predictive Maintenance: AI-driven anomaly detection to fix issues before they occur.",
            "Security Patches: Immediate deployment of zero-day vulnerability fixes.",
            "Backups & Recovery: Automated, encrypted data snapshots for total disaster resilience.",
            "Global Coverage: Round-the-clock engineer availability across multiple time zones."
        ],
        procedures: [
            "Infrastructure Mapping: Documenting every node and endpoint in your digital ecosystem.",
            "Monitoring Setup: Installing real-time health dashboards and alert systems.",
            "Incident Protocols: Defining clear steps for rapid resolution of technical failures.",
            "Weekly Audits: Regular performance and security reviews of all active systems.",
            "Scaling Response: Adjusting server resources dynamically based on traffic spikes."
        ],
        suitability: [
            "High-Traffic Apps: Where every minute of downtime costs thousands in revenue.",
            "Financial Systems: Requiring continuous security monitoring and regulatory compliance.",
            "E-commerce Hubs: Especially during high-load sales events and product launches.",
            "Mission-Critical Ops: For businesses whose core operations are fully digital.",
            "Growing Startups: Who need enterprise-grade support without hiring a full in-house team."
        ],
        processSteps: [
            { phase: "Phase 1", title: "Infrastructure Audit", desc: "We map out your current servers and databases to identify potential single points of failure." },
            { phase: "Phase 2", title: "Monitoring Mesh", desc: "Deploying our surveillance layer that tracks uptime and security attempts 24/7." },
            { phase: "Phase 3", title: "Active Oversight", desc: "Our engineers begin round-the-clock rotations, managing updates in real-time." },
            { phase: "Phase 4", title: "Disaster Drill", desc: "We simulate system failures to test our backup and recovery speeds." }
        ]
    },
    'it-consultation': {
        title: "IT Consultation",
        subtitle: "Strategic Digital Transformation",
        description: "We help you navigate the complex tech landscape, choosing the right stacks and architectures to future-proof your business.",
        icon: Zap,
        accentColor: "#f59e0b",
        visualizerData: {
            1: { title: "STRATEGY BLUEPRINT", desc: "Analyzing ROI and business growth potential to select the most efficient technical roadmap.", icon: Search },
            2: { title: "STACK EVOLUTION", desc: "Evaluating current tools and implementing modern frameworks that scale with your institutional goals.", icon: Zap },
            3: { title: "TRANSFORMATION MESH", desc: "Guiding the human and technical transition from legacy systems to elite digital-first operations.", icon: Globe }
        },
        meshSteps: [
            { icon: Search, title: "01. Business Audit", desc: "Forensic analysis of your current technical workflows to identify inefficiencies and ROI gaps." },
            { icon: PenTool, title: "02. Strategic Roadmap", desc: "Designing a multi-year technical plan that aligns with your company's long-term scale goals." },
            { icon: Layers, title: "03. Pilot Testing", desc: "Implementing small-scale technical changes to verify performance before full-scale organizational rollout." },
            { icon: CheckCircle2, title: "04. Governance QA", desc: "Establishing strict technical habits and security protocols for your internal teams." }
        ],
        techDetails: [
            "Tech Stack Selection: Choosing the most efficient languages for your specific ROI.",
            "Cloud Strategy: Optimizing server costs and performance across AWS, GCP, and Azure.",
            "Digital Transformation: Moving traditional models into the modern digital realm.",
            "Security Consulting: Defining the protocols and habits that will protect your organization.",
            "Resource Auditing: Reviewing your existing tech team and tools for maximum efficiency."
        ],
        procedures: [
            "Business Analysis: Understanding the core drivers of your company's success.",
            "Gap Identification: Finding where manual processes are slowing down growth.",
            "Roadmap Creation: Building a multi-year technical plan with clear milestones.",
            "Vendor Vetting: Helping you choose and manage third-party software providers.",
            "Compliance Reviews: Ensuring your tech strategy meets all industry standards."
        ],
        suitability: [
            "Traditional Firms: Looking to digitize their operations for the modern economy.",
            "Scaling Startups: Who need expert guidance on how to build for the long term.",
            "Enterprise Leaders: Looking for an external, objective audit of their tech assets.",
            "Investment Groups: Performing technical due diligence on potential acquisitions.",
            "Niche Innovators: Needing a specialized partner to help architect a unique idea."
        ],
        processSteps: [
            { phase: "Phase 1", title: "Business Mapping", desc: "We analyze your entire organization to understand the human and technical flows." },
            { phase: "Phase 2", title: "Strategic Blueprint", desc: "Developing the multi-phased plan that will guide your digital transformation." },
            { phase: "Phase 3", title: "Pilot Implementation", desc: "Launching small-scale tests of new tech stacks to verify results before rollout." },
            { phase: "Phase 4", title: "Protocol Verification", desc: "Ensuring the new strategy incorporates robust security habits from day one." }
        ]
    },
    'custom-ui-ux': {
        title: "Custom UI/UX",
        subtitle: "The Science of Visual Engagement & User Logic",
        description: "We don't just 'draw' interfaces; we engineer emotional and cognitive experiences. Our philosophy is rooted in behavioral psychology and high-fidelity standards.",
        icon: Palette,
        accentColor: "#22d3ee",
        visualizerData: {
            1: { title: "INTERACTION LAYER", desc: "Engineering micro-interactions, gesture controls, and fluid transitions that make the software feel alive.", icon: Smartphone },
            2: { title: "VISUAL LAYER", desc: "Balancing color theory and spatial hierarchy for maximum cognitive efficiency and brand trust.", icon: Palette },
            3: { title: "ARCHITECTURAL LAYER", desc: "Mapping complex data flows and information hierarchies to ensure the system is intuitive.", icon: Layers }
        },
        meshSteps: [
            { icon: Search, title: "01. Forensic Research", desc: "Analyzing demographic behavior to identify and eliminate digital friction points before design begins." },
            { icon: PenTool, title: "02. Skeleton Mapping", desc: "Building the 'Logic Foundation' where functionality and user flow are prioritized over visuals." },
            { icon: Layers, title: "03. High-Fidelity Rendering", desc: "Applying proprietary aesthetic standards to create immersive, high-conversion UI components." },
            { icon: CheckCircle2, title: "04. Interaction QA", desc: "Engineering the 'Interaction Mesh' to ensure sub-millisecond precision for every user action." }
        ],
        techDetails: [
            "Cognitive Load Management: Engineering interfaces that guide attention without sensory overload.",
            "High-Fidelity Emotional Design: Using color theory to evoke trust and engagement.",
            "Advanced Micro-Interaction Mesh: Designing subtle, high-performance animations for instant feedback.",
            "Atomic Design Systems: Building scalable, consistent UI libraries for long-term growth.",
            "Accessibility & Inclusivity: Ensuring strict WCAG compliance for vision and motor accessibility."
        ],
        procedures: [
            "Forensic User Research: Analyzing target demographics to understand digital habits.",
            "Logical Wireframing: Designing the 'Skeleton' of the app where flow is prioritized.",
            "High-Fidelity Prototyping: Creating interactive models indistinguishable from final code.",
            "Iterative Usability QA: Stress-testing designs with real users to identify bottlenecks.",
            "Design-to-Code Pipeline: Transitioning assets to developers using precise tokens."
        ],
        suitability: [
            "Premium Enterprise Platforms: Needing a world-class aesthetic that matches their authority.",
            "High-Growth Startups: Looking for a 'VC-ready' look that communicates professional scale.",
            "Complex SaaS Ecosystems: Simplifying dense data into an intuitive dashboard.",
            "Luxury E-commerce: Requiring an immersive, high-conversion shopping experience.",
            "Creative Visionaries: Translating unique concepts into functional digital reality."
        ],
        processSteps: [
            { phase: "Phase 1", title: "Persona Analysis", desc: "We define exactly who your users are and what problems they are trying to solve." },
            { phase: "Phase 2", title: "Flow Engineering", desc: "Mapping out user journeys and information architecture to minimize friction." },
            { phase: "Phase 3", title: "Visual Synthesis", desc: "Building the high-fidelity UI components and interactive prototypes." },
            { phase: "Phase 4", title: "Compliance Check", desc: "Reviewing the design for accessibility standards (WCAG)." }
        ]
    },
    'seo-analytics-setup': {
        title: "SEO & Analytics Setup",
        subtitle: "3-Tool Site Discovery & Traffic Intelligence Mesh",
        description: "Google Search Console, Analytics (GA4), and Tag Manager setup. We configure, connect, and verify Google's premier measurement suite to index your pages immediately and log active user events.",
        icon: Search,
        accentColor: "#a855f7",
        visualizerData: {
            1: { title: "01. GOOGLE SEARCH CONSOLE", desc: "Submit sitemaps, verify domain ownership, request indexing, and monitor search impressions and keywords.", icon: Search },
            2: { title: "02. GOOGLE ANALYTICS (GA4)", desc: "Configure web data streams to trace user demographics, traffic channels, session times, and user paths.", icon: Activity },
            3: { title: "03. GOOGLE TAG MANAGER", desc: "Set up click events, form submissions, and custom triggers without modifying code in the future.", icon: Layers }
        },
        meshSteps: [
            { icon: Search, title: "01. Search Console Setup", desc: "Registering GSC properties, submitting sitemap.xml, and requesting rapid Google crawling/indexing." },
            { icon: Activity, title: "02. GA4 Property Configuration", desc: "Configuring the web data stream, session parameters, time-zone settings, and measurement IDs." },
            { icon: Layers, title: "03. Tag Manager Integration", desc: "Deploying the GTM container code, connecting GA4 web streams, and setting up click trackers." },
            { icon: CheckCircle2, title: "04. Real-time Audit & Publish", desc: "Verifying live triggers and active user counters in GA4 before publishing the final container." }
        ],
        techDetails: [
            "Google Search Console: Direct Google indexing submission and search term tracking.",
            "Google Analytics 4: Demographic profiling, user acquisition channels, and custom event streams.",
            "Google Tag Manager: Code-free tag injection, custom click/scroll triggers, and variable configurations.",
            "Sitemap Submission: Assuring all current and future sub-pages are crawled and indexed by Google.",
            "Real-time Debugging: Using GTM Preview Mode to test event firing before publishing."
        ],
        procedures: [
            "Domain Ownership Verification: Meta tag injection or HTML file upload to the public folder.",
            "Data Stream Initialization: Configuring stream pipelines for web traffic analytics.",
            "GA4 and GTM Handshake: Linking tag triggers directly to the GA4 measurement ID.",
            "Event Trigger Creation: Tracking main CTA clicks, form submissions, and scroll depths.",
            "Container Submission: Publishing clean, named versions of the GTM container."
        ],
        suitability: [
            "Newly Launched Sites: Needing fast indexing and search discovery.",
            "Marketing Campaigns: Tracing ROI, user acquisition, and conversion funnels.",
            "Corporate Websites: Measuring traffic growth, page popularity, and organic keyword reach.",
            "Product Landing Pages: Optimizing conversion rates by identifying where users drop off.",
            "E-commerce Catalogs: Monitoring customer journeys and checkout button click engagement."
        ],
        processSteps: [
            { phase: "Step 1: Search Console", title: "Index & Sitemap Submission", desc: "Verify domain ownership, submit sitemap.xml, and request immediate crawling to show up on Google." },
            { phase: "Step 2: Analytics Setup", title: "GA4 Stream Configuration", desc: "Set up the GA4 property, configure correct time zones, and extract the measurement ID." },
            { phase: "Step 3: Tag Manager", title: "Container & Script Injection", desc: "Deploy the GTM header and body snippets, and link GA4 pageview triggers." },
            { phase: "Step 4: Real-time Audit", title: "Event Verification & Publish", desc: "Verify clicks and visits in the GTM debug panel and GA4 Realtime dashboard, then publish the container." }
        ]
    }
};
