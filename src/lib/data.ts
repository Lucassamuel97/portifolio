import { PersonalInfo, NavigationItem, SocialLink, Education, Experience } from "@/types/index";

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

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Full-stack Developer',
    company: 'Boeing e Rocha',
    companyUrl: '',
    location: 'Paraná, Brasil',
    period: {
      start: new Date('2018-03-01'),
      end: null // Emprego atual
    },
    description: 'Desenvolvedor Full-stack com experiência no desenvolvimento de ponta a ponta de sistemas de gestão para o setor público. Especializado no ecossistema PHP (PHP puro, Laravel, CodeIgniter) e tecnologias front-end (JavaScript, jQuery, Bootstrap, Tailwind, Next.js) para criar soluções que modernizam e automatizam processos.',
    responsibilities: [
      'Responsável pelo levantamento de requisitos, desenvolvimento, manutenção de sistemas legados e suporte ao usuário final',
      'Desenvolvimento de sistemas de gestão para a Assistência Social que centralizam dados de múltiplas unidades',
      'Automação da geração de relatórios mensais (RMA) e implementação de visualização de dados com georreferenciamento',
      'Criação de aplicação para monitoramento de contratos públicos que automatizou o acompanhamento de prazos',
      'Integração com SIM-AM e implementação de notificações por e-mail para reduzir riscos de inconformidade',
      'Manutenção e evolução de sistema para postos de saúde, implementando novos módulos (agendamento, estoque)',
      'Garantia da escalabilidade do projeto ao seguir a arquitetura HMVC'
    ],
    technologies: [
      'PHP', 'Laravel', 'CodeIgniter', 'MySQL', 'JavaScript', 'jQuery', 
      'Bootstrap', 'Tailwind', 'Ajax', 'Git', 'Next.js', 'Trello'
    ],
    type: 'full-time',
    achievements: [
      'Desenvolveu sistema de gestão para Assistência Social que centralizou dados de múltiplas unidades',
      'Automatizou geração de relatórios mensais (RMA) e implementou visualização de dados com georreferenciamento',
      'Criou aplicação para monitoramento de contratos públicos com integração SIM-AM e notificações automáticas',
      'Manteve e evoluiu sistema para postos de saúde seguindo arquitetura HMVC'
    ]
  },
  {
    id: '2',
    title: 'Assistente Administrativo',
    company: 'Supermercado Oeste',
    companyUrl: '',
    location: 'Paraná, Brasil',
    period: {
      start: new Date('2014-01-01'),
      end: new Date('2018-01-31')
    },
    description: 'Atuei na gestão de dados essenciais para a operação do negócio, sendo responsável pelo ciclo de vida das informações de produtos, clientes e fornecedores no sistema.',
    responsibilities: [
      'Garantia da consistência e precisão dos dados através do cadastro e da precificação correta de mercadorias',
      'Controle de inventário por meio da contagem de estoque',
      'Gestão de dados de produtos, clientes e fornecedores no sistema',
      'Processos críticos que impactavam diretamente as áreas de compras e vendas da empresa'
    ],
    technologies: [
      'Sistemas de Gestão', 'Controle de Estoque', 'Gestão de Dados'
    ],
    type: 'full-time'
  }
];