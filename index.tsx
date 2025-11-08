import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Brain, Cpu, Utensils, GraduationCap, MessageSquare, BarChart, ChevronRight, Menu, X, ExternalLink, Send, Smartphone, Mail } from 'lucide-react';

const THEME = {
  primary: '#00FF99',
  primaryDark: '#00cc7a',
  bg: '#0a0a0f',
  bgAlt: '#111116',
  text: '#e0e0e0',
  textMuted: '#a0a0a0',
};

// --- CSS Styles ---
const styles = `
  :root {
    --primary: ${THEME.primary};
    --bg: ${THEME.bg};
    --bg-alt: ${THEME.bgAlt};
    --text: ${THEME.text};
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { 
    scroll-behavior: smooth; 
  }
  body {
    font-family: 'Montserrat', sans-serif;
    background-color: var(--bg);
    color: var(--text);
    overflow-x: hidden;
    line-height: 1.6;
  }
  h1, h2, h3, h4, h5, h6, .font-orbitron {
    font-family: 'Orbitron', sans-serif;
    letter-spacing: 1px;
  }
  .text-primary { color: var(--primary); }
  .bg-primary { background-color: var(--primary); color: var(--bg); }
  .neon-text {
    text-shadow: 0 0 10px rgba(0, 255, 153, 0.5), 0 0 20px rgba(0, 255, 153, 0.3);
  }
  .neon-border {
    box-shadow: 0 0 5px var(--primary), inset 0 0 5px var(--primary);
  }
  .neon-box:hover {
    box-shadow: 0 0 15px var(--primary);
    border-color: var(--primary);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  section {
    padding: 80px 0;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--primary); border-radius: 4px; }

  /* Utility */
  .flex-center { display: flex; align-items: center; justify-content: center; }
  .grid-responsive {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  .btn {
    padding: 12px 30px;
    border: 2px solid var(--primary);
    background: transparent;
    color: var(--primary);
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }
  .btn-primary {
    background: var(--primary);
    color: var(--bg);
  }
  .btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 20px rgba(0, 255, 153, 0.4);
  }

  /* Animations */
  @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .animate-fade-in { animation: fadeIn 0.8s ease forwards; }
  
  /* Tech Grid Background */
  .tech-grid {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background-image: 
      linear-gradient(rgba(0, 255, 153, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 153, 0.05) 1px, transparent 1px);
    background-size: 30px 30px;
    z-index: 0;
    opacity: 0.3;
  }

  /* Portfolio Image Hover */
  .portfolio-card:hover .portfolio-img {
    transform: scale(1.1);
    opacity: 1 !important;
  }
`;

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#hero' },
    { name: 'Sobre', href: '#about' },
    { name: 'Soluções', href: '#solutions' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Contato', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      transition: 'all 0.3s ease',
      backgroundColor: scrolled ? 'rgba(10, 10, 15, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? `1px solid ${THEME.primary}33` : 'none',
      padding: scrolled ? '15px 0' : '25px 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, '#hero')}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <Brain color={THEME.primary} size={32} />
          <span className="font-orbitron neon-text" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>
            RR SOLUTIONS<span style={{ color: THEME.primary }}>.IA</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div style={{ display: window.innerWidth > 768 ? 'flex' : 'none', gap: '30px' }} className="desktop-nav">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              style={{ 
                color: 'white', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', transition: 'color 0.3s', cursor: 'pointer' 
              }}
              onMouseOver={(e) => e.currentTarget.style.color = THEME.primary}
              onMouseOut={(e) => e.currentTarget.style.color = 'white'}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Nav Toggle */}
        <div className="mobile-toggle" style={{ display: window.innerWidth <= 768 ? 'block' : 'none' }}>
          <button onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: THEME.primary, cursor: 'pointer' }}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          width: '100%',
          backgroundColor: THEME.bgAlt,
          padding: '20px 0',
          borderBottom: `2px solid ${THEME.primary}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
        }}>
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              style={{ 
                color: 'white', textDecoration: 'none', fontSize: '1.1rem', textTransform: 'uppercase', padding: '10px', width: '100%', textAlign: 'center', cursor: 'pointer'
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }

  return (
    <section id="hero" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      position: 'relative',
      paddingTop: '120px',
      overflow: 'hidden'
    }}>
      <div className="tech-grid"></div>
      {/* Radial gradient overlay for depth */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: '150%', height: '150%',
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle at center, ${THEME.primary}15 0%, transparent 70%)`,
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '800px' }} className="animate-fade-in">
          <h1 className="font-orbitron neon-text" style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
            lineHeight: 1.1, 
            marginBottom: '20px',
            color: 'white'
          }}>
            TRANSFORME SEU NEGÓCIO COM <span style={{ color: THEME.primary }}>INTELIGÊNCIA ARTIFICIAL</span>
          </h1>
          <p style={{ 
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', 
            color: THEME.textMuted, 
            marginBottom: '40px',
            maxWidth: '600px'
          }}>
            Automatizamos cardápios, atendimentos e rotinas educacionais com Inteligência Artificial.
            Da hamburgueria de bairro ao professor em sala de aula, a RR Solutions IA transforma processos
            manuais em experiências inteligentes.
          </p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <a href="https://wa.me/5511947077276?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20as%20soluções%20da%20RR%20Solutions%20IA." target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Fale com a equipe <MessageSquare size={18} />
            </a>
            <a href="#portfolio" onClick={(e) => handleScrollTo(e, '#portfolio')} className="btn">
              Ver Portfólio <ChevronRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" style={{ backgroundColor: THEME.bgAlt }}>
      <div className="container">
        <div className="grid-responsive" style={{ alignItems: 'center', gap: '4rem' }}>
          <div>
            <h2 className="font-orbitron neon-text" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'white' }}>
              NOSSA MISSÃO
            </h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: THEME.textMuted }}>
              Fundada em 2023, a <strong>RR Solutions IA</strong> nasceu com a missão de levar Inteligência
              Artificial para a realidade de pequenos e médios negócios. Começamos desenvolvendo soluções para
              hamburguerias e escolas, e hoje atuamos como um <strong>estúdio tecnológico</strong> com
              <strong> squad de devs especializados em IA aplicada</strong>, criando produtos sob medida
              que geram resultado de verdade.
            </p>
            <div style={{ 
              display: 'inline-block', 
              padding: '15px 25px', 
              borderLeft: `4px solid ${THEME.primary}`,
              backgroundColor: `${THEME.primary}10`,
              marginTop: '20px'
             }}>
              <p className="font-orbitron" style={{ color: 'white', fontWeight: 700, fontSize: '1.2rem' }}>
                "Inteligência Artificial aplicada à sua realidade."
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '400px',
              aspectRatio: '1/1',
              borderRadius: '20px',
              background: `linear-gradient(45deg, ${THEME.bg}, ${THEME.bgAlt})`,
              border: `1px solid ${THEME.primary}33`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <div className="tech-grid" style={{opacity: 0.5}}></div>
              <Cpu size={120} color={THEME.primary} style={{ opacity: 0.8, filter: 'drop-shadow(0 0 20px rgba(0,255,153,0.4))' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Solutions = () => {
  const solutions = [
    {
      icon: <Utensils size={40} color={THEME.primary} />,
      title: "IA para Alimentação",
      desc: "Cardápios digitais inteligentes, automação de pedidos e previsão de demanda para restaurantes e deliveries."
    },
    {
      icon: <GraduationCap size={40} color={THEME.primary} />,
      title: "IA na Educação",
      desc: "Ferramentas que auxiliam professores na criação de avaliações, planos de aula adaptativos e inclusão escolar."
    },
    {
      icon: <MessageSquare size={40} color={THEME.primary} />,
      title: "Chatbots & Automação",
      desc: "Atendimento ao cliente 24/7 e automação de processos comerciais repetitivos para liberar sua equipe."
    },
    {
      icon: <BarChart size={40} color={THEME.primary} />,
      title: "Análise de Dados",
      desc: "Transforme dados brutos em insights estratégicos com relatórios inteligentes gerados por IA."
    }
  ];

  return (
    <section id="solutions">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="font-orbitron" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '10px' }}>
            SOLUÇÕES <span className="neon-text" style={{ color: THEME.primary }}>INTELIGENTES</span>
          </h2>
          <p style={{ color: THEME.textMuted, fontSize: '1.2rem' }}>Otimize seu tempo. Transforme dados em decisões.</p>
        </div>

        <div className="grid-responsive">
          {solutions.map((sol, index) => (
            <div key={index} className="neon-box" style={{
              padding: '40px 30px',
              backgroundColor: THEME.bgAlt,
              border: `1px solid ${THEME.primary}22`,
              borderRadius: '16px',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '20px'
            }}>
              <div style={{ 
                padding: '15px', 
                background: `${THEME.primary}15`, 
                borderRadius: '12px',
                marginBottom: '10px'
              }}>
                {sol.icon}
              </div>
              <h3 className="font-orbitron" style={{ fontSize: '1.5rem', color: 'white' }}>{sol.title}</h3>
              <p style={{ color: THEME.textMuted }}>{sol.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    {
      title: "AvaliaPro",
      category: "SaaS Educacional com IA",
      desc: "Plataforma que usa IA para criar/corrigir avaliações e gerar materiais didáticos.",
      url: "https://avaliapro.app/",
    },
    {
      title: "ClickInBurguer",
      category: "Food Service",
      desc: "Site moderno e responsivo para hamburgueria digital.",
      url: "https://clickinburger.netlify.app/",
    },
    {
      title: "Hamburgueria do Chefinho",
      category: "Food Service",
      desc: "Presença digital completa para delivery e retirada.",
      url: "https://hamburgueriadochefinho.netlify.app/",
    },
    {
      title: "Asats Burguer",
      category: "Food Service",
      desc: "Design arrojado focado na conversão de pedidos.",
      url: "https://asatsburguer.netlify.app/",
    },
    {
      title: "Pato Rouco Burguer",
      category: "Food Service",
      desc: "Identidade visual marcante e navegação intuitiva.",
      url: "https://patoroucoburguer.netlify.app/",
    }
  ];

  return (
    <section id="portfolio" style={{ backgroundColor: THEME.bgAlt, position: 'relative' }}>
      <div className="tech-grid" style={{ opacity: 0.1 }}></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="font-orbitron neon-text" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '10px' }}>
            NOSSO PORTFÓLIO
          </h2>
          <p style={{ color: THEME.textMuted, fontSize: '1.2rem' }}>Projetos reais que geram resultados reais.</p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '30px' 
        }}>
          {projects.map((project, index) => (
            <a key={index} href={project.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <div className="neon-box portfolio-card" style={{
                backgroundColor: THEME.bg,
                borderRadius: '16px',
                overflow: 'hidden',
                height: '100%',
                border: `1px solid ${THEME.primary}33`,
                transition: 'all 0.4s ease',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Optimized Image Area with Lazy Loading */}
                <div style={{
                  height: '200px',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: THEME.bgAlt // Placeholder background while loading
                }}>
                  <img 
                    src={`https://image.thum.io/get/width/800/crop/600/noanimate/${project.url}`}
                    alt={`Miniatura do site ${project.title}`}
                    loading="lazy"     // Optimization: Defers loading of off-screen images
                    decoding="async"   // Optimization: Allows page rendering to continue while image decodes
                    width="800"        // Optimization: Prevents Cumulative Layout Shift (CLS)
                    height="600"       // Optimization: Prevents Cumulative Layout Shift (CLS)
                    className="portfolio-img"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      transition: 'transform 0.5s ease, opacity 0.5s ease',
                      opacity: 0.9
                    }}
                  />
                   <div style={{ 
                     position: 'absolute', 
                     top: '15px', 
                     right: '15px', 
                     background: 'rgba(0,0,0,0.7)', 
                     padding: '6px 12px', 
                     borderRadius: '20px', 
                     fontSize: '0.8rem', 
                     color: 'white', 
                     display: 'flex', 
                     alignItems: 'center', 
                     gap: '6px',
                     backdropFilter: 'blur(4px)',
                     border: `1px solid ${THEME.primary}33`
                   }}>
                     <ExternalLink size={14} color={THEME.primary} /> Visitar
                   </div>
                </div>
                
                <div style={{ padding: '25px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: THEME.primary, fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                    {project.category}
                  </span>
                  <h3 className="font-orbitron" style={{ color: 'white', marginBottom: '10px', fontSize: '1.4rem' }}>
                    {project.title}
                  </h3>
                  <p style={{ color: THEME.textMuted, fontSize: '0.95rem' }}>
                    {project.desc}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, ""); // Remove non-digits
    value = value.substring(0, 11); // Limit to 11 digits

    // Progressive masking: (DD) 9XXXX-XXXX
    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else if (value.length > 0) {
       value = value.replace(/^(\d*)/, "($1");
    }
    
    setPhone(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const company = formData.get('company');
    const phoneValue = formData.get('phone');
    const segment = formData.get('segment');
    const message = formData.get('message');

    const whatsappMessage = `*Novo Lead via Site RR Solutions IA*%0A%0A*Nome:* ${name}%0A*Empresa:* ${company}%0A*WhatsApp:* ${phoneValue}%0A*Segmento:* ${segment}%0A*Mensagem:* ${message}`;

    window.open(`https://wa.me/5511947077276?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    
    e.currentTarget.reset();
    setPhone(''); // Clear the controlled phone input state
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="grid-responsive" style={{ gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 className="font-orbitron" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '20px' }}>
              VAMOS <span className="neon-text" style={{ color: THEME.primary }}>INOVAR</span> JUNTOS?
            </h2>
            <p style={{ fontSize: '1.2rem', color: THEME.textMuted, marginBottom: '40px' }}>
              Descubra como nossas soluções de IA podem ser aplicadas especificamente para o seu modelo de negócio. Preencha o formulário e aguarde nosso contato.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: `${THEME.primary}22`, padding: '12px', borderRadius: '50%' }}>
                  <Smartphone color={THEME.primary} />
                </div>
                <div>
                  <p style={{ color: THEME.textMuted, fontSize: '0.9rem' }}>WhatsApp / Telefone</p>
                  <p style={{ color: 'white', fontSize: '1.1rem', fontWeight: 500 }}>(11) 9 4707-7276</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: `${THEME.primary}22`, padding: '12px', borderRadius: '50%' }}>
                  <Mail color={THEME.primary} />
                </div>
                <div>
                  <p style={{ color: THEME.textMuted, fontSize: '0.9rem' }}>E-mail</p>
                  <p style={{ color: 'white', fontSize: '1.1rem', fontWeight: 500 }}>risso_rafa@hotmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ 
            backgroundColor: THEME.bgAlt, 
            padding: '40px', 
            borderRadius: '20px', 
            border: `1px solid ${THEME.primary}33`,
            boxShadow: `0 10px 40px -10px rgba(0,0,0,0.5)`
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', color: 'white', marginBottom: '8px', fontSize: '0.9rem' }}>Nome Completo</label>
                <input type="text" id="name" name="name" required style={inputStyle} placeholder="Seu nome" />
              </div>
              <div>
                <label htmlFor="company" style={{ display: 'block', color: 'white', marginBottom: '8px', fontSize: '0.9rem' }}>Empresa</label>
                <input type="text" id="company" name="company" style={inputStyle} placeholder="Nome da sua empresa" />
              </div>
              <div>
                <label htmlFor="phone" style={{ display: 'block', color: 'white', marginBottom: '8px', fontSize: '0.9rem' }}>WhatsApp</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  required 
                  style={inputStyle} 
                  placeholder="(11) 90000-0000" 
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </div>
              <div>
                <label htmlFor="segment" style={{ display: 'block', color: 'white', marginBottom: '8px', fontSize: '0.9rem' }}>Segmento do Negócio</label>
                <select id="segment" name="segment" required style={inputStyle}>
                  <option value="">Selecione...</option>
                  <option value="Alimentação / Restaurante">Alimentação / Restaurante</option>
                  <option value="Educação">Educação</option>
                  <option value="Varejo / E-commerce">Varejo / E-commerce</option>
                  <option value="Serviços">Serviços</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" style={{ display: 'block', color: 'white', marginBottom: '8px', fontSize: '0.9rem' }}>Como a IA pode te ajudar?</label>
                <textarea id="message" name="message" required style={{...inputStyle, minHeight: '100px', resize: 'vertical'}} placeholder="Descreva brevemente seu desafio..." ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', width: '100%', marginTop: '10px' }}>
                Enviar via WhatsApp <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const inputStyle = {
  width: '100%',
  padding: '12px 15px',
  backgroundColor: THEME.bg,
  border: `1px solid ${THEME.primary}44`,
  borderRadius: '8px',
  color: 'white',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.3s'
};

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#050507', padding: '50px 0 30px', borderTop: `1px solid ${THEME.primary}22` }}>
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Brain color={THEME.primary} size={40} />
            <span className="font-orbitron neon-text" style={{ fontSize: '1.8rem', fontWeight: 700, color: 'white' }}>
              RR SOLUTIONS<span style={{ color: THEME.primary }}>.IA</span>
            </span>
          </div>
          <p style={{ color: THEME.textMuted, maxWidth: '500px' }}>
            Democratizando a inteligência artificial para impulsionar o seu sucesso.
          </p>
          <div style={{ width: '100%', height: '1px', backgroundColor: `${THEME.primary}22`, margin: '30px 0' }}></div>
          <p style={{ color: THEME.textMuted, fontSize: '0.9rem' }}>
            © 2025 RR Solutions IA – Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---
const App = () => {
  // Inject styles
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Simple responsive handler for JS-based styles if needed, though largely handled by CSS
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Solutions />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);