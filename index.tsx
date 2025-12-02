
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Brain, Utensils, GraduationCap, MessageSquare, ChevronRight, Menu, X, ExternalLink, Send, Smartphone, Mail, Code, Search, Rocket, Activity, Sparkles, Palette, Layout, Zap } from 'lucide-react';

const THEME = {
  primary: '#00FF99',
  primaryDark: '#00cc7a',
  bg: '#0a0a0f',
  bgAlt: '#111116',
  text: '#e0e0e0',
  textMuted: '#a0a0e0',
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
    width: 100%;
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
  .neon-box {
    transition: all 0.3s ease;
  }
  .neon-box:hover {
    box-shadow: 0 0 15px var(--primary);
    border-color: var(--primary) !important;
    transform: translateY(-5px);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    width: 100%;
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
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
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
    justify-content: center;
    gap: 10px;
    text-decoration: none;
    font-size: 0.9rem;
  }
  .btn-primary {
    background: var(--primary);
    color: var(--bg);
  }
  .btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 20px rgba(0, 255, 153, 0.4);
  }
  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
    pointer-events: none;
  }

  /* Portfolio Image Hover */
  .portfolio-card:hover .portfolio-img {
    transform: scale(1.1);
    opacity: 1 !important;
  }

  /* Process Steps */
  .step-number {
    font-family: 'Orbitron', sans-serif;
    font-size: 3rem;
    font-weight: 900;
    color: transparent;
    -webkit-text-stroke: 2px var(--primary);
    opacity: 0.5;
    line-height: 1;
    margin-bottom: 1rem;
  }
  
  /* Mobile adjustments */
  @media (max-width: 480px) {
    .container {
      padding: 0 15px;
    }
    h1.font-orbitron {
      font-size: 2.5rem !important;
    }
    section {
      padding: 60px 0;
    }
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
    { name: 'Processo', href: '#process' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Contato', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80;
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
      padding: scrolled ? '15px 0' : '20px 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, '#hero')}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 1001 }}
        >
          <Brain color={THEME.primary} size={28} />
          <span className="font-orbitron neon-text" style={{ fontSize: '1.3rem', fontWeight: 700, color: 'white' }}>
            RR SOLUTIONS<span style={{ color: THEME.primary }}>.IA</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div style={{ display: window.innerWidth > 960 ? 'flex' : 'none', gap: '25px' }} className="desktop-nav">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              style={{ 
                color: 'white', textDecoration: 'none', fontWeight: 500, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', transition: 'color 0.3s', cursor: 'pointer' 
              }}
              onMouseOver={(e) => e.currentTarget.style.color = THEME.primary}
              onMouseOut={(e) => e.currentTarget.style.color = 'white'}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Nav Toggle */}
        <div className="mobile-toggle" style={{ display: window.innerWidth <= 960 ? 'block' : 'none', zIndex: 1001 }}>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            style={{ background: 'none', border: 'none', color: THEME.primary, cursor: 'pointer', padding: '5px', display: 'flex' }}
            aria-label="Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: THEME.bgAlt,
          padding: '80px 0 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          overflowY: 'auto',
          zIndex: 1000
        }}>
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              style={{ 
                color: 'white', textDecoration: 'none', fontSize: '1.3rem', textTransform: 'uppercase', padding: '15px', width: '80%', textAlign: 'center', cursor: 'pointer', borderBottom: `1px solid ${THEME.primary}22`, fontWeight: 700, fontFamily: 'Orbitron, sans-serif'
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
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }

  return (
    <section id="hero" style={{ 
      minHeight: '90vh', 
      display: 'flex', 
      alignItems: 'center', 
      position: 'relative',
      paddingTop: '100px',
      paddingBottom: '50px',
      overflow: 'hidden'
    }}>
      <div className="tech-grid"></div>
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
        <div style={{ maxWidth: '850px' }} className="animate-fade-in">
          <h1 className="font-orbitron neon-text" style={{ 
            fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', 
            lineHeight: 1.1, 
            marginBottom: '25px',
            color: 'white'
          }}>
            INTELIGÊNCIA ARTIFICIAL APLICADA À <span style={{ color: THEME.primary }}>SUA REALIDADE</span>.
          </h1>
          <p style={{ 
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', 
            color: THEME.textMuted, 
            marginBottom: '40px',
            maxWidth: '700px'
          }}>
            Automatizamos processos, criamos experiências digitais e usamos IA para aumentar resultados em pequenos e médios negócios.
          </p>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')} className="btn btn-primary">
              Quero implementar IA <Rocket size={18} style={{marginLeft: '8px'}} />
            </a>
            <a href="#portfolio" onClick={(e) => handleScrollTo(e, '#portfolio')} className="btn">
              Ver projetos <ChevronRight size={18} style={{marginLeft: '8px'}} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustBanner = () => {
  return (
    <div style={{ 
      backgroundColor: THEME.primary, 
      padding: '30px 0', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p style={{ 
          color: THEME.bg, 
          fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', 
          fontWeight: 800,
          fontFamily: 'Montserrat, sans-serif',
          lineHeight: 1.4,
          margin: 0,
          maxWidth: '900px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Impulsionamos negócios com Inteligência Artificial, criando soluções personalizadas para cada desafio
        </p>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" style={{ backgroundColor: THEME.bgAlt }}>
      <div className="container">
        <div className="grid-responsive" style={{ alignItems: 'center', gap: '4rem' }}>
          <div>
            <h2 className="font-orbitron neon-text" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '1.5rem', color: 'white' }}>
              SOBRE A <span style={{ color: THEME.primary }}>RR SOLUTIONS IA</span>
            </h2>
            <div style={{ color: THEME.textMuted, fontSize: '1.1rem', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p>
                A <strong>RR Solutions IA</strong> é um estúdio tecnológico fundado em 2023, especializado em criar soluções de Inteligência Artificial para negócios reais.
              </p>
              <p>
                Começamos automatizando processos de hamburguerias e desenvolvendo ferramentas educacionais para professores, e hoje atuamos como uma <strong>squad de devs e criadores</strong> focada em transformar ideias em produtos digitais inteligentes – do primeiro protótipo ao sistema em produção.
              </p>
              <p>
                Nossa missão é democratizar o acesso à IA, falando a língua do empreendedor e entregando soluções que geram resultado, não apenas conceitos técnicos.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
             <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '350px',
              aspectRatio: '1/1',
              borderRadius: '20px',
              background: `linear-gradient(135deg, ${THEME.bgAlt}, ${THEME.bg})`,
              border: `1px solid ${THEME.primary}33`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              boxShadow: `0 20px 40px -20px rgba(0,255,153,0.2)`
            }}>
              <div className="tech-grid" style={{opacity: 0.5}}></div>
              <Brain size={120} color={THEME.primary} style={{ opacity: 0.9, filter: 'drop-shadow(0 0 30px rgba(0,255,153,0.3))' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Technologies = () => {
  const techs = [
    { name: "HTML5", icon: <Layout size={40} />, desc: "Estrutura Semântica" },
    { name: "CSS3", icon: <Palette size={40} />, desc: "Estilo Moderno" },
    { name: "JavaScript", icon: <Code size={40} />, desc: "Interatividade" }
  ];

  return (
    <section style={{ backgroundColor: THEME.bg, borderTop: `1px solid ${THEME.primary}22`, borderBottom: `1px solid ${THEME.primary}22` }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="font-orbitron" style={{ fontSize: '1.8rem', color: 'white' }}>
            TECNOLOGIAS <span className="neon-text" style={{ color: THEME.primary }}>UTILIZADAS</span>
          </h2>
          <p style={{ color: THEME.textMuted }}>Desenvolvimento robusto e otimizado</p>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px' }}>
          {techs.map((tech, index) => (
            <div key={index} className="neon-box" style={{
              width: '200px',
              padding: '25px',
              backgroundColor: THEME.bgAlt,
              borderRadius: '12px',
              border: `1px solid ${THEME.primary}22`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '15px'
            }}>
              <div style={{ color: THEME.primary }}>
                {tech.icon}
              </div>
              <div>
                <h3 className="font-orbitron" style={{ color: 'white', fontSize: '1.2rem' }}>{tech.name}</h3>
                <span style={{ fontSize: '0.85rem', color: THEME.textMuted }}>{tech.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Solutions = () => {
  const solutionsData = [
    {
      icon: <Utensils size={32} color={THEME.bg} />,
      title: "IA para Restaurantes",
      desc: "Automatização de pedidos, cardápios digitais, integração com WhatsApp e sites de delivery. Reduza erros e ganhe velocidade."
    },
    {
      icon: <GraduationCap size={32} color={THEME.bg} />,
      title: "IA na Educação",
      desc: "SaaS que cria e corrige avaliações, gera slides e adapta conteúdos para alunos com necessidades especiais."
    },
    {
      icon: <MessageSquare size={32} color={THEME.bg} />,
      title: "Chatbots Inteligentes",
      desc: "Atendimento 24/7, agendamentos e suporte integrados às ferramentas que você já utiliza."
    },
    {
      icon: <Code size={32} color={THEME.bg} />,
      title: "Soluções Sob Medida",
      desc: "Desenvolvemos aplicações personalizadas com IA, conectadas exatamente ao seu fluxo atual de trabalho."
    }
  ];

  return (
    <section id="solutions">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="font-orbitron" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', color: 'white', marginBottom: '10px' }}>
            SOLUÇÕES EM <span className="neon-text" style={{ color: THEME.primary }}>IA</span>
          </h2>
          <p style={{ color: THEME.textMuted, fontSize: '1.2rem' }}>Tecnologia que resolve problemas reais.</p>
        </div>

        <div className="grid-responsive">
          {solutionsData.map((sol, index) => (
            <div key={index} className="neon-box" style={{
              padding: '35px 30px',
              backgroundColor: THEME.bgAlt,
              border: `1px solid ${THEME.primary}22`,
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '20px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ 
                padding: '12px', 
                background: THEME.primary, 
                borderRadius: '12px',
                display: 'inline-flex'
              }}>
                {sol.icon}
              </div>
              <h3 className="font-orbitron" style={{ fontSize: '1.4rem', color: 'white' }}>{sol.title}</h3>
              <p style={{ color: THEME.textMuted, fontSize: '1rem' }}>{sol.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    {
      icon: <Search size={24} color={THEME.primary} />,
      title: "Diagnóstico",
      desc: "Entendemos o seu negócio, suas dores e seus objetivos com IA."
    },
    {
      icon: <Brain size={24} color={THEME.primary} />,
      title: "Proposta de solução",
      desc: "Desenhamos a melhor combinação entre app, automações e IA generativa para o seu contexto."
    },
    {
      icon: <Code size={24} color={THEME.primary} />,
      title: "Desenvolvimento",
      desc: "Construímos, testamos e conectamos a solução às ferramentas que você já usa."
    },
    {
      icon: <Activity size={24} color={THEME.primary} />,
      title: "Acompanhamento",
      desc: "Monitoramos o uso, ajustamos o que for necessário e sugerimos melhorias constantes."
    }
  ];

  return (
    <section id="process" style={{ backgroundColor: THEME.bgAlt, position: 'relative' }}>
      <div className="tech-grid" style={{ opacity: 0.1 }}></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="font-orbitron" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', color: 'white', marginBottom: '10px' }}>
            COMO <span className="neon-text" style={{ color: THEME.primary }}>TRABALHAMOS</span>
          </h2>
          <p style={{ color: THEME.textMuted, fontSize: '1.2rem' }}>Do entendimento à evolução contínua.</p>
        </div>

        <div className="grid-responsive" style={{ gap: '30px' }}>
          {steps.map((step, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              padding: '30px', 
              backgroundColor: THEME.bg,
              border: `1px solid ${THEME.primary}22`,
              borderRadius: '16px',
              position: 'relative'
            }}>
              <span className="step-number">0{index + 1}</span>
              <h3 className="font-orbitron" style={{ color: 'white', marginBottom: '15px', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                {step.title}
              </h3>
              <p style={{ color: THEME.textMuted }}>{step.desc}</p>
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
      title: "Dantas Imports",
      category: "E-commerce / Varejo",
      desc: "E-commerce de produtos importados com vitrine moderna e experiência de usuário otimizada.",
      url: "https://dantasimports.netlify.app/",
    },
    {
      title: "Dani Tarot Terapêutico",
      category: "Serviços / Bem-estar",
      desc: "Landing page imersiva para serviços de tarot e terapia, com design personalizado e foco em conversão.",
      url: "https://danitarotterapeutico.netlify.app/",
    },
    {
      title: "BarbAI",
      category: "Serviços / Agendamento com IA",
      desc: "Site de agendamento de barbearia com IA integrada que sugere horários de acordo com a agenda do cliente.",
      url: "https://barbai.netlify.app/",
    },
    {
      title: "Infinity Company",
      category: "E-commerce / Varejo",
      desc: "Loja online com sistema de pagamentos integrado (Stripe) e design focado em conversão.",
      url: "https://infinitycompanybr.netlify.app/",
    },
    {
      title: "AvaliaPro",
      category: "SaaS Educacional com IA",
      desc: "Plataforma que usa IA para criar/corrigir avaliações e gerar materiais didáticos.",
      url: "https://avaliapro.app/",
    },
    {
      title: "ClickInBurguer",
      category: "Food Service",
      desc: "Cardápio digital e experiência de pedido otimizada.",
      url: "https://clickinburger.netlify.app/",
    },
    {
      title: "Hamburgueria do Chefinho",
      category: "Food Service",
      desc: "Site de delivery com foco em conversão pelo WhatsApp.",
      url: "https://hamburgueriadochefinho.netlify.app/",
    },
    {
      title: "Asats Burguer",
      category: "Food Service",
      desc: "Presença digital com visual forte pronta para expansão.",
      url: "https://asatsburguer.netlify.app/",
    },
    {
      title: "Pato Rouco Burguer",
      category: "Food Service",
      desc: "Marca própria com fluxo de pedidos simplificado.",
      url: "https://patoroucoburguer.netlify.app/",
    }
  ];

  return (
    <section id="portfolio">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="font-orbitron neon-text" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', color: 'white', marginBottom: '15px' }}>
            NOSSO PORTFÓLIO
          </h2>
          <p style={{ color: THEME.textMuted, fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            Alguns projetos que já ajudamos a tirar do papel com tecnologia e IA:
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '30px' 
        }}>
          {projects.map((project, index) => {
            // Usando mshots do WordPress que é mais estável, com fallback para thum.io
            const imageUrl = `https://s0.wp.com/mshots/v1/${encodeURIComponent(project.url)}?w=800&h=600`;
            
            const imageStyle = {
              width: '100%',
              height: '100%',
              objectFit: 'cover' as const,
              objectPosition: 'top center'
            };

            return (
              <a key={index} href={project.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <div className="neon-box portfolio-card" style={{
                  backgroundColor: THEME.bgAlt,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  height: '100%',
                  border: `1px solid ${THEME.primary}22`,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{
                    height: '220px',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: THEME.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <img 
                      src={imageUrl}
                      alt={`Projeto ${project.title}`}
                      loading="lazy"
                      className="portfolio-img"
                      style={{
                        ...imageStyle,
                        transition: 'transform 0.5s ease, opacity 0.5s ease',
                        opacity: 0.85
                      }}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src.includes('s0.wp.com')) {
                           // Tenta o thum.io se o mshots falhar
                           target.src = `https://image.thum.io/get/width/800/crop/600/noanimate/${project.url}`;
                        } else {
                           // Se ambos falharem, mostra placeholder
                           target.style.display = 'none';
                           if (target.parentElement) {
                             target.parentElement.innerHTML = '<div style="color: #00FF99; text-align: center; padding: 20px;">Imagem indisponível<br/><small style="color: #a0a0e0">Visite o site para ver</small></div>';
                           }
                        }
                      }}
                    />
                     <div style={{ 
                       position: 'absolute', 
                       top: '15px', 
                       right: '15px', 
                       background: 'rgba(0,0,0,0.7)', 
                       padding: '6px 12px', 
                       borderRadius: '20px', 
                       fontSize: '0.75rem', 
                       color: 'white', 
                       display: 'flex', 
                       alignItems: 'center', 
                       gap: '6px',
                       backdropFilter: 'blur(4px)',
                       border: `1px solid ${THEME.primary}44`,
                       textTransform: 'uppercase',
                       fontWeight: 700
                     }}>
                       <ExternalLink size={12} color={THEME.primary} /> Ver projeto
                     </div>
                  </div>
                  
                  <div style={{ padding: '25px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ color: THEME.primary, fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                      {project.category}
                    </span>
                    <h3 className="font-orbitron" style={{ color: 'white', marginBottom: '10px', fontSize: '1.3rem' }}>
                      {project.title}
                    </h3>
                    <p style={{ color: THEME.textMuted, fontSize: '0.95rem' }}>
                      {project.desc}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const company = formData.get('company');
    const segment = formData.get('segment');
    const message = formData.get('message');

    const whatsappMessage = 
`*Novo Contato via Site RR Solutions IA* 🚀

👤 *Nome:* ${name}
🏢 *Empresa:* ${company}
🎯 *Segmento:* ${segment}

📝 *Mensagem / Desafio:*
${message}`;

    window.open(`https://wa.me/5511910950968?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    e.currentTarget.reset();
  };

  return (
    <section id="contact" style={{ backgroundColor: THEME.bg, position: 'relative' }}>
      <div className="tech-grid" style={{ opacity: 0.1 }}></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="grid-responsive" style={{ gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 className="font-orbitron" style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', color: 'white', marginBottom: '20px' }}>
              COMO A IA PODE AJUDAR O <span className="neon-text" style={{ color: THEME.primary }}>SEU NEGÓCIO</span> HOJE?
            </h2>
            <p style={{ fontSize: '1.2rem', color: THEME.textMuted, marginBottom: '30px' }}>
              Conte pra gente qual é o seu desafio atual. Em até 24 horas, nossa equipe retorna com ideias e caminhos possíveis usando IA.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: `${THEME.primary}22`, padding: '15px', borderRadius: '50%' }}>
                  <Smartphone color={THEME.primary} size={24} />
                </div>
                <div>
                  <p style={{ color: THEME.textMuted, fontSize: '0.9rem', marginBottom: '5px' }}>WhatsApp / Telefone</p>
                  <a href="https://wa.me/5511910950968" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: '1.2rem', fontWeight: 500, textDecoration: 'none' }}>
                    (11) 9 1095-0968
                  </a>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: `${THEME.primary}22`, padding: '15px', borderRadius: '50%' }}>
                  <Mail color={THEME.primary} size={24} />
                </div>
                <div>
                  <p style={{ color: THEME.textMuted, fontSize: '0.9rem', marginBottom: '5px' }}>E-mail</p>
                  <a href="mailto:contato@rrsolutions.app" style={{ color: 'white', fontSize: '1.2rem', fontWeight: 500, textDecoration: 'none' }}>
                    contato@rrsolutions.app
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div style={{ 
            backgroundColor: THEME.bgAlt, 
            padding: '30px', 
            borderRadius: '20px', 
            border: `1px solid ${THEME.primary}33`, 
            boxShadow: `0 20px 40px -10px rgba(0,0,0,0.5)`
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label htmlFor="name" style={labelStyle}>Nome Completo *</label>
                <input type="text" id="name" name="name" required style={inputStyle} placeholder="Seu nome" />
              </div>
              <div>
                <label htmlFor="company" style={labelStyle}>Empresa / Negócio *</label>
                <input type="text" id="company" name="company" required style={inputStyle} placeholder="Nome da sua empresa" />
              </div>
              <div>
                <label htmlFor="segment" style={labelStyle}>Segmento *</label>
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
                <label htmlFor="message" style={labelStyle}>Como você gostaria de usar IA? *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  required 
                  style={{...inputStyle, minHeight: '120px', resize: 'vertical'}} 
                  placeholder="Ex.: automatizar pedidos pelo WhatsApp, criar um app para meus alunos..." 
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', width: '100%', marginTop: '10px', fontSize: '1rem', padding: '15px' }}>
                Solicitar avaliação <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const labelStyle = {
  display: 'block', 
  color: 'white', 
  marginBottom: '8px', 
  fontSize: '0.9rem',
  fontWeight: 500
};

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
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
    <footer style={{ backgroundColor: '#050507', padding: '40px 0', borderTop: `1px solid ${THEME.primary}22` }}>
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '25px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Brain color={THEME.primary} size={36} />
            <span className="font-orbitron neon-text" style={{ fontSize: '1.6rem', fontWeight: 700, color: 'white' }}>
              RR SOLUTIONS<span style={{ color: THEME.primary }}>.IA</span>
            </span>
          </div>
          
          <div style={{ width: '100%', maxWidth: '300px', height: '1px', backgroundColor: `${THEME.primary}22` }}></div>
          
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

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <TrustBanner />
        <About />
        <Solutions />
        <Technologies />
        <Process />
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
