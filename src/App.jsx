import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Award, Code, Briefcase, User, ChevronDown, Download, Terminal, Sparkles, Rocket, Zap } from 'lucide-react';

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});
  const [activeTab, setActiveTab] = useState('all');
  const [typedText, setTypedText] = useState('');
  const canvasRef = useRef(null);

  const fullText = "Entry-Level Programmer — Passionate About Problem Solving";

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.substring(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Particle canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const skills = [
    { name: 'Python (Basic)', level: 75, icon: '🐍', color: 'from-yellow-500 to-orange-500' },
    { name: 'C Programming (Basic)', level: 70, icon: '💻', color: 'from-blue-600 to-blue-400' },
    { name: 'HTML & CSS (Basic)', level: 80, icon: '🎨', color: 'from-pink-500 to-purple-500' },
    { name: 'Problem Solving', level: 85, icon: '🧩', color: 'from-green-500 to-emerald-500' },
    { name: 'Data Structures (Basic)', level: 75, icon: '📊', color: 'from-cyan-500 to-blue-500' },
    { name: 'AI Tools for Code Assistance', level: 90, icon: '🤖', color: 'from-purple-500 to-pink-500' },
  ];

  const projects = [
    {
      title: '🛡️ Phishing Detection App',
      description: 'A dashboard-style static replica simulating URL and email phishing detection with example outputs.',
      tech: ['Python', 'Machine Learning', 'Streamlit'],
      link: 'https://phishing-detectorgit-mqtigead7ii9vm3ab9htq5.streamlit.app/',
      category: 'AI',
      image: '🛡️',
      gradient: 'from-orange-600 to-pink-600',
      external: true,
    },
    {
      title: '🚀 Crypto Wallet for Beginners',
      description: 'A fully functional Web3 crypto wallet built using React, Vite, Ethers.js, and Alchemy RPC. Supports wallet generation, encryption, sending/receiving crypto, and works on Sepolia Testnet.',
      tech: ['React', 'Vite', 'Ethers.js', 'Web3'],
      link: 'https://crypto-wallet-newbies.vercel.app/',
      category: 'Blockchain',
      image: '🚀',
      gradient: 'from-cyan-600 to-blue-600',
      external: true,
    },
  ];

  const certificates = [
    { name: '6-day Training Program on RPA', issuer: 'Robotic Process Automation', year: '2024', icon: '🤖' },
    { name: 'B.E. AI & Machine Learning', issuer: 'Navkis College of Engineering', year: '2027 (Expected)', icon: '🎓' },
  ];

  const experience = [
    { year: '2024', title: 'Student - AI & ML', company: 'Navkis College of Engineering' },
    { year: '2024', title: 'RPA Training Program', company: 'Robotic Process Automation' },
  ];

  const filteredProjects = activeTab === 'all'
    ? projects
    : projects.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-blue-900/20 pointer-events-none z-0" />

      {/* Cursor Glow Effect */}
      <div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-10 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Floating Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-full px-8 py-4 shadow-2xl shadow-cyan-500/20">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Portfolio
              </span>
            </div>
            {['About', 'Skills', 'Projects', 'Certificates'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm hover:text-cyan-400 transition-all duration-300 hover:scale-110"
              >
                {item}
              </a>
            ))}
            <a href="#contact" className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative px-6">
        <div className="max-w-6xl w-full relative z-20">
          <div className="text-center">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-8 animate-fade-in backdrop-blur-sm">
              <Sparkles className="text-cyan-400" size={16} />
              <span className="text-sm text-cyan-300">Available for internships</span>
            </div>

            {/* Main Heading with Gradient */}
            <h1 className="text-7xl md:text-9xl font-black mb-6 relative">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent animate-gradient bg-300%">
                Akash M D
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 blur-3xl -z-10" />
            </h1>

            {/* Typewriter Text */}
            <div className="h-12 mb-12">
              <p className="text-2xl md:text-3xl text-gray-300 font-light">
                {typedText}
                <span className="animate-pulse">|</span>
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
              {[
                { label: 'Expected Graduation', value: '2027' },
                { label: 'Projects Completed', value: '3+' },
                { label: 'Skills Learning', value: '6+' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="relative group"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105">
                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center mb-12">
              <a href="#projects" className="group px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <Rocket size={20} />
                View My Work
                <ChevronDown className="group-hover:translate-y-1 transition-transform" size={20} />
              </a>
              <a href="mailto:aakashdshetty@gmail.com" className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-cyan-500/30 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <Mail size={20} />
                Contact Me
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center">
              {[
                { Icon: Github, link: 'https://github.com/akashmdshetty' },
                { Icon: Mail, link: 'mailto:aakashdshetty@gmail.com' },
                { Icon: Terminal, link: '#projects' },
              ].map(({ Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  target={link.startsWith('http') ? '_blank' : '_self'}
                  rel={link.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="p-4 bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl hover:border-cyan-500/40 hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
                >
                  <Icon size={24} className="group-hover:text-cyan-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-cyan-400" size={32} />
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`min-h-screen flex items-center justify-center px-6 relative z-20 transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="max-w-6xl w-full">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center">
              <User size={24} />
            </div>
            <h2 className="text-6xl font-bold">About Me</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* About Text */}
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 hover:border-cyan-500/40 transition-all duration-300">
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Motivated entry-level programmer with strong problem-solving skills, a foundation in Python and C programming,
                  and a passion for web development. Eager to apply academic knowledge to real-world software projects.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Currently pursuing B.E. in Artificial Intelligence & Machine Learning at Navkis College of Engineering,
                  with expected graduation in 2027. I'm always learning and building new projects to enhance my skills.
                </p>
              </div>

              {/* Experience Timeline */}
              <div className="space-y-4">
                {experience.map((exp, i) => (
                  <div
                    key={i}
                    className="bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300 hover:translate-x-2"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center font-bold">
                        {exp.year.slice(-2)}
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{exp.title}</div>
                        <div className="text-cyan-400">{exp.company}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D Card Effect */}
            <div className="relative">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-8 h-full flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                    <Zap className="text-yellow-400" size={32} />
                    <h3 className="text-3xl font-bold">What I Bring</h3>
                  </div>

                  {[
                    '🎓 Strong Academic Foundation',
                    '💡 Creative Problem Solving',
                    '🎯 Eager to Learn & Grow',
                    '⚡ Quick Learner',
                    '🤝 Team Collaboration',
                    '📈 Continuous Improvement',
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-lg transform transition-all duration-300 hover:translate-x-2"
                    >
                      <div className="w-2 h-2 rounded-full bg-cyan-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className={`min-h-screen flex items-center justify-center px-6 py-20 relative z-20 transition-all duration-1000 ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="max-w-6xl w-full">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center">
              <Code size={24} />
            </div>
            <h2 className="text-6xl font-bold">Skills & Expertise</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 hover:border-cyan-500/40 transition-all duration-500 hover:scale-105">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{skill.icon}</div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xl font-bold">{skill.name}</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative h-4 bg-black/50 rounded-full overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{
                        width: isVisible.skills ? `${skill.level}%` : '0%',
                      }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Glow effect on hover */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${skill.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`min-h-screen flex items-center justify-center px-6 py-20 relative z-20 transition-all duration-1000 ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="max-w-7xl w-full">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center">
              <Briefcase size={24} />
            </div>
            <h2 className="text-6xl font-bold">Featured Projects</h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {['all', 'AI', 'Web', 'Blockchain'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === tab
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 shadow-lg shadow-cyan-500/50'
                  : 'bg-white/5 border border-cyan-500/20 hover:border-cyan-500/40'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.title}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-3xl overflow-hidden hover:border-cyan-500/40 transition-all duration-500 hover:scale-105 h-full flex flex-col">
                  {/* Project Image/Icon */}
                  <div className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center text-6xl overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
                    <div className="relative z-10 transform group-hover:scale-125 transition-transform duration-500">
                      {project.image}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-xs font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.link}
                      target={project.external ? '_blank' : '_self'}
                      rel={project.external ? 'noopener noreferrer' : ''}
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-blue-400 transition-colors font-semibold group"
                    >
                      <span>Explore Project</span>
                      <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Glow effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.gradient} rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section
        id="certificates"
        className={`min-h-screen flex items-center justify-center px-6 py-20 relative z-20 transition-all duration-1000 ${isVisible.certificates ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="max-w-5xl w-full">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center">
              <Award size={24} />
            </div>
            <h2 className="text-6xl font-bold">Education & Certifications</h2>
          </div>

          <div className="grid gap-6">
            {certificates.map((cert, index) => (
              <div
                key={cert.name}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 hover:border-cyan-500/40 transition-all duration-500 hover:scale-102">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center flex-shrink-0 text-4xl group-hover:scale-110 transition-transform duration-300">
                      {cert.icon}
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                        {cert.name}
                      </h3>
                      <p className="text-gray-400 text-lg">{cert.issuer}</p>
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        {cert.year}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20 relative z-20">
        <div className="max-w-4xl w-full text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 blur-3xl" />

            <div className="relative bg-white/5 backdrop-blur-xl border border-cyan-500/30 rounded-[3rem] p-16 hover:border-cyan-500/50 transition-all duration-500">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-8">
                <Sparkles className="text-cyan-400" size={16} />
                <span className="text-sm text-cyan-300">Let's connect</span>
              </div>

              <h2 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Ready to Collaborate?
                </span>
              </h2>

              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                I'm available for internships and entry-level roles. Let's build something amazing together!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a href="mailto:aakashdshetty@gmail.com" className="group px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                  <Mail size={24} />
                  Email Me
                  <ExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                </a>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-gray-300">
                <p className="text-lg">📧 <a href="mailto:aakashdshetty@gmail.com" className="text-cyan-400 hover:text-blue-400">aakashdshetty@gmail.com</a></p>
                <p className="text-lg">📱 <a href="tel:+919380344439" className="text-cyan-400 hover:text-blue-400">+91 93803 44439</a></p>
                <p className="text-lg">🔗 <a href="https://github.com/akashmdshetty" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-blue-400">github.com/akashmdshetty</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 border-t border-cyan-500/20 bg-black/40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
                Akash M D
              </h3>
              <p className="text-gray-400">
                Entry-level programmer passionate about AI, ML, and web development.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-cyan-400">Quick Links</h4>
              <div className="space-y-2">
                {['About', 'Skills', 'Projects', 'Certificates', 'Contact'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="block text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-cyan-400">Connect</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 aakashdshetty@gmail.com</p>
                <p>📱 +91 93803 44439</p>
                <p>🎓 Navkis College of Engineering</p>
              </div>
            </div>
          </div>

          <div className="border-t border-cyan-500/20 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Akash M D. Built with{' '}
              <span className="text-cyan-400">React</span> and{' '}
              <span className="text-blue-400">Tailwind CSS</span>
            </p>
            <p className="text-cyan-400 mt-2 text-sm">
              "Code is poetry written for machines, designed for humans."
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full shadow-2xl shadow-cyan-500/50 hover:scale-110 transition-all duration-300"
        aria-label="Scroll to top"
      >
        <ChevronDown className="rotate-180" size={24} />
      </button>
    </div>
  );
}
