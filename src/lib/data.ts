import { PersonalInfo, NavigationItem, SocialLink, Education } from "@/types/index";

export const personalInfo: PersonalInfo = {
  name: "Lucas Samuel Pereira Godoy",
  title: "Desenvolvedor Full-Stack",
  bio: "Desenvolvedor Full-stack | Especialista em sistemas de gestão para o setor público. Domínio de PHP (Laravel, CodeIgniter), Java (Spring Boot) e front-end moderno (React.js, Next.js, Tailwind, Bootstrap, JavaScript/TypeScript). Experiência em DDD, Clean Architecture, Microsserviços, bancos de dados MySQL/PostgreSQL e DevOps (Docker, CI/CD, GitHub Actions). Apaixonado por criar soluções que modernizam e automatizam processos.",
  location:"Palmital, Paraná, Brasil - CEP: 85270-000",
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

export const education: Education[] = [
  {
    id: '1',
    degree: 'Tecnólogo em Sistemas para Internet',
    institution: 'Universidade Tecnológica Federal do Paraná',
    institutionUrl: 'https://utfpr.edu.br',
    location: 'Guarapuava, Paraná, Brasil',
    period: {
      start: new Date('2017-07-05'),
      end: new Date('2022-12-31')
    },
    description: 'Curso superior voltado ao desenvolvimento web, abrangendo programação, arquitetura de software, bancos de dados, redes e sistemas distribuídos. Ênfase em práticas modernas e projetos aplicados ao setor de tecnologia.',
    relevantCourses: [
      'Algoritmos e Lógica de Programação',
      'Estruturas de Dados',
      'Programação Orientada a Objetos',
      'Desenvolvimento de Sistemas',
      'Banco de Dados',
      'Programação Web',
      'Arquitetura de Software',
      'Engenharia de Software',
      'Redes de Computadores',
      'Sistemas Distribuídos',
      'Redes de Computadores e Internet',
      'Estágio Curricular Obrigatório'
    ]
  },
  {
    id: '2',
    degree: 'Tecnólogo em Gestão da Tecnologia da Informação',
    institution: 'UCP - Faculdades do Centro do Paraná',
    location: 'Pitanga, Paraná, Brasil',
    period: {
      start: new Date('2015-02-01'),
      end: new Date('2017-06-31')
    },
    description: 'Formação superior focada em administração de sistemas, infraestrutura de TI, segurança da informação e gestão de projetos. Preparação para atuação em ambientes corporativos e públicos.',
    relevantCourses: [
      'Gestão de Projetos',
      'Infraestrutura de TI',
      'Segurança da Informação',
      'Redes de Computadores',
      'Sistemas Operacionais',
      'Desenvolvimento Web',
      'Banco de Dados',
      'Análise de Sistemas'
    ]
  }
];