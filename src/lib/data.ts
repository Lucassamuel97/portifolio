import { PersonalInfo, NavigationItem, SocialLink } from "@/types/index";

export const personalInfo: PersonalInfo = {
  name: "Lucas Samuel Pereira Godoy",
  title: "Desenvolvedor Full-Stack",
  bio: "Desenvolvedor Full-stack com experiência no desenvolvimento de ponta a ponta de sistemas de gestão para o setor público. Especializado no ecossistema PHP (PHP puro, Laravel, CodeIgniter) e tecnologias front-end (JavaScript, jQuery, Bootstrap, Tailwind, Next.js) para criar soluções que modernizam e automatizam processos.",
  location:
    "Vila São Paulo, Palmital, Paraná, Brasil, Palmital/PR - CEP: 85270-000",
  email: "lukassamuka88@gmail.com",
  phone: "+5542998300659",
  avatar: "/avatar.png",
  resume: "/documents/lucas-samuel-pereira-curriculo.pdf",
  timezone: "America/Sao_Paulo",
  languages: [
    { language: "Português", level: "Nativo/Fluente" },
    { language: "Inglês", level: "Intermediário" },
  ],
  interests: [
    "Desenvolvimento Web",
    "Sistemas de Gestão",
    "Automação de Processos",
    "Full-Stack Development",
    "Arquitetura de Software",
    "Clean Code",
    "Domain Driven Design",
  ],
  availability: "available",
};

export const navigationItems: NavigationItem[] = [
  { label: "Início", href: "#hero" },
  { label: "Sobre", href: "#about" },
  { label: "Experiência", href: "#experience" },
  { label: "Habilidades", href: "#skills" },
  { label: "Projetos", href: "#projects" },
  { label: "Contato", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/lucas-samuel-pereira-godoy',
    icon: 'Linkedin',
    username: 'lucas-samuel-pereira-godoy'
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/lucassamuel97',
    icon: 'Github',
    username: 'lucassamuel97'
  }
];
