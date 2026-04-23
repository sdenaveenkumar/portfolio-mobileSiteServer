import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Github, Linkedin, Twitter, ExternalLink, Code2, Cpu, Globe, Rocket, Mail, MapPin, Send, MessageSquare, Instagram, Heart, X, Sparkles, FileText } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);
  const pillRef = useRef(null);
  const navContainerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('Home');
  const [hoverTab, setHoverTab] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const skills = [
    { name: 'Frontend', items: ['React.js', 'Next.js', 'Tailwind CSS', 'GSAP', 'PWA'] },
    { name: 'Backend', items: ['Node.js', 'Express', 'Java', 'Spring Boot'] },
    { name: 'Mobile', items: ['Capacitor', 'Android APK Development'] },
    { name: 'Tools', items: ['Git', 'Docker', 'AWS', 'Vite'] }
  ];

  const projects = [
    {
      title: "Dolphin 🐬",
      role: "Lead Developer",
      desc: "A versatile, local-first LLM interface. Available as a dynamic web app, an installable PWA, and a native Android APK.",
      tags: ["LLM", "PWA", "Capacitor", "JavaScript"],
      link: "https://github.com/SdeNaveenKumar/dolphin"
    },
    {
      title: "Lofi Radio VS Code",
      role: "Creator",
      desc: "Stay in the flow with a lightweight lo-fi music player extension for VS Code.",
      tags: ["VS Code Extension", "JavaScript", "Audio API"],
      link: "https://github.com/SdeNaveenKumar/Lofi-Radio-VsCode"
    },
    {
      title: "RabbitFolio",
      role: "Architect",
      desc: "A high-performance cinematic portfolio system with dynamic template rendering.",
      tags: ["React", "GSAP", "Vite", "Tailwind"],
      link: "#"
    }
  ];

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Contact', href: '#contact' }
  ];

  // Logic for sliding navbar pill
  useEffect(() => {
    const targetTab = hoverTab || activeTab;
    const activeEl = navContainerRef.current?.querySelector(`[data-name="${targetTab}"]`);
    if (activeEl && pillRef.current) {
      const { offsetLeft, offsetWidth } = activeEl;
      pillRef.current.style.width = `${offsetWidth}px`;
      pillRef.current.style.left = `${offsetLeft}px`;
    }
  }, [activeTab, hoverTab]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      const tl = gsap.timeline();
      tl.from(".navbar-fixed", { y: -50, opacity: 0, duration: 1, ease: "power3.out" })
        .from(".logo-main", { x: -50, opacity: 0, duration: 1 }, "-=0.5")
        .from(".resume-btn-fixed", { x: 50, opacity: 0, duration: 1 }, "-=0.8")
        .from(".hero-left", { x: -30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.6")
        .from(".hero-right", { x: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
        .from(".hero-portrait", { scale: 0.9, opacity: 0, duration: 1.2, ease: "back.out(1.2)" }, "-=1");

      // Parallax Name
      gsap.to(".bg-name", {
        scrollTrigger: {
          trigger: ".hero-container",
          start: "top top",
          end: "bottom top",
          scrub: 1
        },
        y: 200,
        opacity: 0,
        ease: "none"
      });

      // Floating Animation for Badges
      gsap.to(".badge-node", {
        y: -15, duration: 2, repeat: -1, yoyo: true, ease: "power1.inOut"
      });
      gsap.to(".badge-react", {
        y: 15, duration: 2.5, repeat: -1, yoyo: true, ease: "power1.inOut", delay: 0.2
      });
      gsap.to(".badge-gsap", {
        y: -10, duration: 1.8, repeat: -1, yoyo: true, ease: "power1.inOut", delay: 0.5
      });

      // Floating for Hero Main Content
      gsap.to(".hero-left", {
        y: -10, duration: 3, repeat: -1, yoyo: true, ease: "power1.inOut"
      });
      gsap.to(".hero-right", {
        y: 10, duration: 3.5, repeat: -1, yoyo: true, ease: "power1.inOut", delay: 0.3
      });

      // Reveal Animations
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%" },
          y: 40, opacity: 0, duration: 1, ease: "power3.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white text-[#121212] selection:bg-[#ff5722] selection:text-white">
      {/* Brand Logo Corner - ALWAYS VISIBLE & REFINED SIZE */}
      <a
        href="#"
        onClick={() => setActiveTab('Home')}
        className="fixed top-6 left-6 md:top-8 md:left-8 z-[110] flex items-center logo-main cursor-pointer group"
      >
        <span className="font-black text-lg md:text-2xl uppercase tracking-tighter leading-none group-hover:scale-105 transition-transform origin-left">
          Rabbit<span className="text-[#ff5722]">Folio</span>
        </span>
      </a>

      {/* Resume Corner - TEXT ONLY */}
      <div className="fixed top-6 right-6 md:top-8 md:right-8 z-[110] block resume-btn-fixed">
        <button
          onClick={() => setShowPopup(true)}
          className="group relative flex items-center justify-center px-5 py-2 md:px-8 md:py-2.5 bg-[#121212] text-white rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-xl"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff5722] to-[#ff9800] opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative">Resume</span>
        </button>
      </div>

      {/* Modern Floating Navbar with Sliding Pill */}
      <nav className="navbar-fixed">
        <div ref={navContainerRef} className="nav-capsule">
          <div ref={pillRef} className="nav-pill-bg" />
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              data-name={link.name}
              className={`nav-item ${(hoverTab || activeTab) === link.name ? 'nav-item-active' : ''}`}
              onClick={() => setActiveTab(link.name)}
              onMouseEnter={() => setHoverTab(link.name)}
              onMouseLeave={() => setHoverTab(null)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-container">
        <main className="hero-main">
          <div className="hero-left">
            <div className="availability-pill">
              <span className="availability-dot" />
              Available for Work
            </div>
            <h2 className="hero-title-large">
              Fullstack Software Engineer
            </h2>
          </div>

          <div className="hero-center relative">
            <img
              src="/profile-cutout.png"
              alt="Naveen Kumar"
              className="hero-portrait"
            />

            {/* Floating Badges */}
            <div className="floating-badge badge-node top-[20%] -left-10 md:-left-20">
              <span className="badge-dot bg-[#ff5722]" />
              Node.js
            </div>
            <div className="floating-badge badge-react top-[40%] -right-10 md:-right-20">
              <span className="badge-dot bg-[#ff5722]" />
              React.js
            </div>
            <div className="floating-badge badge-gsap bottom-[30%] -left-5 md:-left-10">
              <span className="badge-dot bg-[#ff5722]" />
              GSAP
            </div>
          </div>

          <div className="hero-right">
            <p className="hero-bio">
              Hi, I'm Naveen — a Fullstack Engineer dedicated to building
              high-performance applications with clean code and bold design.
            </p>
            <a href="#work" className="cta-button group">
              See my works
              <div className="cta-icon">
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>
          </div>
        </main>

        {/* Scrolling Tech Ticker */}
        <div className="tech-ticker-container">
          <div className="tech-ticker-track">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="tech-ticker-group">
                <span className="ticker-item">React.js</span>
                <span className="ticker-dot" />
                <span className="ticker-item">Node.js</span>
                <span className="ticker-dot" />
                <span className="ticker-item">Next.js</span>
                <span className="ticker-dot" />
                <span className="ticker-item">Java</span>
                <span className="ticker-dot" />
                <span className="ticker-item">Spring Boot</span>
                <span className="ticker-dot" />
                <span className="ticker-item">AWS</span>
                <span className="ticker-dot" />
                <span className="ticker-item">Docker</span>
                <span className="ticker-dot" />
              </div>
            ))}
          </div>
        </div>

        <h1 className="bg-name">Naveen</h1>
      </div>
      <section id="about" className="bg-[#121212] text-white py-32 md:py-48 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="reveal">
              <p className="text-[#ff5722] font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-[#ff5722]" />
                About Me
              </p>
              <h3 className="text-5xl md:text-7xl font-black leading-none mb-10 tracking-tighter">
                Learning,<br />Building,<br />Evolving.
              </h3>
              <p className="text-xl text-white/60 leading-relaxed font-medium mb-8">
                I am a CS student at Manipal University Jaipur, specializing in Full Stack Development. 
                My journey is driven by a passion for creating real-world solutions that are both 
                technically robust and visually striking.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] rounded-xl border border-white/[0.05]">
                  <Globe className="w-4 h-4 text-[#ff5722]" />
                  <span className="text-xs font-bold uppercase tracking-widest">Web Focus</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] rounded-xl border border-white/[0.05]">
                  <Rocket className="w-4 h-4 text-[#ff5722]" />
                  <span className="text-xs font-bold uppercase tracking-widest">Aspiring SDE</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 reveal">
              {skills.map((group) => (
                <div key={group.name} className="p-8 bg-white/[0.02] rounded-[2.5rem] border border-white/[0.05] hover:border-[#ff5722]/30 transition-colors group">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {group.name === 'Frontend' && <Code2 className="w-5 h-5 text-[#ff5722]" />}
                    {group.name === 'Backend' && <Cpu className="w-5 h-5 text-[#ff5722]" />}
                    {group.name === 'Mobile' && <Globe className="w-5 h-5 text-[#ff5722]" />}
                    {group.name === 'Tools' && <Rocket className="w-5 h-5 text-[#ff5722]" />}
                  </div>
                  <h4 className="font-black text-white/30 uppercase text-[10px] mb-4 tracking-widest">{group.name}</h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {group.items.map(item => (
                      <div key={item} className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-[#ff5722]" />
                        <span className="text-xs font-bold text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Decorative background element for About section */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff5722]/[0.02] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />
      </section>

      {/* Projects Section */}
      <section id="work" className="px-6 py-32 bg-black/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="text-[#ff5722] font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-[#ff5722]" />
                Portfolio
              </p>
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">Featured Projects</h3>
            </div>
            <a href="https://github.com/sdenaveenkumar" target="_blank" className="text-sm font-black uppercase tracking-widest flex items-center gap-2 group border-b-2 border-[#ff5722] pb-1">
              View All on Github
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.title} className="reveal group">
                <div className="aspect-[4/5] bg-white border border-black/[0.03] rounded-[3rem] p-10 flex flex-col justify-between hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <span className="text-[10px] font-black uppercase tracking-widest text-black/30">{project.role}</span>
                      <a href={project.link} target="_blank" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-[#ff5722] hover:text-white transition-all">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <h4 className="text-3xl font-black mb-4 tracking-tight leading-tight">{project.title}</h4>
                    <p className="text-sm text-black/50 leading-relaxed font-medium">{project.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-black/[0.04] rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#ff5722]/[0.03] rounded-full blur-3xl group-hover:bg-[#ff5722]/[0.08] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="px-6 py-40 bg-black/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24">
            <div className="reveal">
              <p className="text-[#ff5722] font-black uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-[#ff5722]" />
                Get in Touch
              </p>
              <h3 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter leading-none">
                LET'S TALK<br />ABOUT YOU.
              </h3>

              <div className="space-y-10 mt-16">
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-black/5 flex items-center justify-center group-hover:bg-[#ff5722] group-hover:text-white transition-all shadow-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-1">Email Me</p>
                    <a href="mailto:sdenaveenkumar@gmail.com" className="text-lg font-bold tracking-tight">sdenaveenkumar@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-black/5 flex items-center justify-center group-hover:bg-[#ff5722] group-hover:text-white transition-all shadow-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-1">Location</p>
                    <p className="text-lg font-bold tracking-tight">Manipal University, Jaipur</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-black/5 flex items-center justify-center group-hover:bg-[#ff5722] group-hover:text-white transition-all shadow-sm">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-1">Social</p>
                    <div className="flex gap-4 mt-2">
                      <a href="https://github.com/sdenaveenkumar" target="_blank" className="text-sm font-black border-b border-black/10 hover:border-[#ff5722] transition-colors">Github</a>
                      <a href="https://linkedin.com/in/sde-naveen-kumar" target="_blank" className="text-sm font-black border-b border-black/10 hover:border-[#ff5722] transition-colors">LinkedIn</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal bg-white rounded-[3rem] p-10 md:p-16 border border-black/[0.05] shadow-2xl shadow-black/5">
              <form
                action="https://formspree.io/f/sdenaveenkumar@gmail.com"
                method="POST"
                className="space-y-8"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/30 ml-2">Your Name</label>
                    <input name="name" type="text" required placeholder="John Doe" className="w-full px-6 py-4 bg-black/[0.02] border border-black/5 rounded-2xl focus:outline-none focus:border-[#ff5722] transition-colors font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/30 ml-2">Your Email</label>
                    <input name="email" type="email" required placeholder="john@example.com" className="w-full px-6 py-4 bg-black/[0.02] border border-black/5 rounded-2xl focus:outline-none focus:border-[#ff5722] transition-colors font-bold" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/30 ml-2">Message</label>
                  <textarea name="message" required placeholder="Tell me about your project..." rows="4" className="w-full px-6 py-4 bg-black/[0.02] border border-black/5 rounded-2xl focus:outline-none focus:border-[#ff5722] transition-colors font-bold resize-none"></textarea>
                </div>
                <button type="submit" className="w-full py-5 bg-black text-white rounded-2xl font-black text-lg hover:bg-[#ff5722] transition-all flex items-center justify-center gap-3 shadow-xl shadow-black/10 group">
                  Send Message
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Modern High-End Footer */}
      <footer className="bg-[#121212] text-white pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 right-0 flex justify-center -translate-y-1/2 pointer-events-none">
          <h2 className="text-[8vw] md:text-[10vw] font-black text-white/[0.02] whitespace-nowrap leading-none uppercase tracking-[0.2em]">
            NAVEEN KUMAR
          </h2>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 rounded-full bg-[#ff5722]" />
                <span className="font-black text-xl tracking-tighter uppercase">RabbitFolio</span>
              </div>
              <p className="text-white/40 max-w-sm text-lg font-medium leading-relaxed">
                Building high-performance digital experiences with precision engineering
                and creative design. Always open for new opportunities and collaborations.
              </p>
            </div>

            <div>
              <h4 className="font-black uppercase text-xs tracking-widest text-white/30 mb-8">Navigation</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-white/60 hover:text-white transition-colors font-bold text-sm uppercase tracking-wide">Home</a></li>
                <li><a href="#about" className="text-white/60 hover:text-white transition-colors font-bold text-sm uppercase tracking-wide">About</a></li>
                <li><a href="#work" className="text-white/60 hover:text-white transition-colors font-bold text-sm uppercase tracking-wide">Work</a></li>
                <li><a href="#contact" className="text-white/60 hover:text-white transition-colors font-bold text-sm uppercase tracking-wide">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black uppercase text-xs tracking-widest text-white/30 mb-8">Socials</h4>
              <ul className="space-y-4">
                <li><a href="https://github.com/sdenaveenkumar" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-bold text-sm uppercase tracking-wide"><Github className="w-4 h-4" /> Github</a></li>
                <li><a href="https://linkedin.com/in/sde-naveen-kumar" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-bold text-sm uppercase tracking-wide"><Linkedin className="w-4 h-4" /> LinkedIn</a></li>
                <li><a href="#" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-bold text-sm uppercase tracking-wide"><Instagram className="w-4 h-4" /> Instagram</a></li>
                <li><a href="#" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-bold text-sm uppercase tracking-wide"><Twitter className="w-4 h-4" /> Twitter</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
              Made with <Heart className="w-3 h-3 text-[#ff5722] fill-[#ff5722]" /> by Naveen Kumar
            </div>
            <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-black">
              © 2025 · RABBITFOLIO · ALL RIGHTS RESERVED
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-[10px] font-black uppercase tracking-widest text-white/10 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-[10px] font-black uppercase tracking-widest text-white/10 hover:text-white transition-colors">Legal</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Coming Soon Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md">
          <div className="bg-white rounded-[3rem] p-12 max-w-md w-full shadow-2xl relative overflow-hidden text-center reveal-modal">
            <div className="absolute top-6 right-6">
              <button onClick={() => setShowPopup(false)} className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-[#ff5722] hover:text-white transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-20 h-20 bg-[#ff5722]/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Sparkles className="w-10 h-10 text-[#ff5722]" />
            </div>

            <h3 className="text-4xl font-black mb-4 tracking-tighter">COMING SOON</h3>
            <p className="text-black/50 font-medium leading-relaxed mb-10">
              I'm currently polishing my latest experiences. My full resume will be available here very soon. Stay tuned!
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="w-full py-5 bg-black text-white rounded-2xl font-black text-lg hover:bg-[#ff5722] transition-all shadow-xl shadow-black/10"
            >
              Got it
            </button>

            {/* Decorative circles */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#ff5722]/5 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
