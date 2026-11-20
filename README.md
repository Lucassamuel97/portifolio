# 🚀 Portfólio Lucas Samuel Pereira

[![GitHub](https://img.shields.io/badge/GitHub-Lucassamuel97-181717?style=for-the-badge&logo=github)](https://github.com/Lucassamuel97)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-lucas--samuel--pereira--godoy-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/lucas-samuel-pereira-godoy)
[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

## 📋 Descrição

Este é meu portfólio pessoal desenvolvido para apresentar minha trajetória profissional, projetos e habilidades como Desenvolvedor Full-Stack. A aplicação oferece uma experiência interativa e moderna, destacando minha especialização em tecnologias web e sistemas de gestão para o setor público.

O projeto resolve o problema de apresentação profissional online, oferecendo uma plataforma centralizada onde potenciais empregadores, clientes e colaboradores podem conhecer meu trabalho, baixar meu currículo e entrar em contato diretamente.

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Framework:** Next.js 15.4.6 com App Router
- **Linguagem:** TypeScript 5.0
- **Bibliotecas React:**
  - React 19.1.0
  - React DOM 19.1.0
- **Estilização:** 
  - Tailwind CSS 3.4.17
  - Tailwind Merge 2.5.4
  - Tailwind Forms 0.5.9
- **Animações:** Framer Motion 11.11.17
- **Ícones:** Lucide React 0.460.0
- **Temas:** Next Themes 0.4.3
- **Utilitários:** 
  - Class Variance Authority 0.7.1
  - clsx 2.1.1

### Backend & Serviços
- **Analytics:** Firebase 10.14.1
- **Banco de Dados:** Firebase Firestore
- **Hospedagem:** Vercel

### Ferramentas de Desenvolvimento
- **Linter:** ESLint 9 com configuração Next.js
- **Build Tool:** Turbopack (desenvolvimento)
- **Processamento CSS:** 
  - PostCSS
  - Autoprefixer 10.4.21

## 🚀 Instalação

### Pré-requisitos
- Node.js 18.17 ou superior
- npm, yarn, pnpm ou bun

### Passo a passo

1. **Clone o repositório**
```bash
git clone https://github.com/Lucassamuel97/portifolio.git
cd portifolio
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas configurações do Firebase e do envio de email:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=seu_measurement_id

# Formulário de contato → email (https://resend.com)
RESEND_API_KEY=sua_api_key_do_resend
CONTACT_TO_EMAIL=email_que_recebe_as_mensagens
CONTACT_FROM_EMAIL="Portfólio SamucaDev <contato@samuca.tec.br>"
```

O formulário de contato envia um email pela rota `src/app/api/contact/route.ts` (Resend) e salva uma cópia no Firestore como backup. Na Vercel, cadastre as mesmas variáveis em **Settings → Environment Variables**.

4. **Execute o projeto em modo de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

5. **Acesse a aplicação**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 💻 Como Usar

### Comandos Disponíveis

```bash
# Desenvolvimento com Turbopack
npm run dev

# Build de produção
npm run build

# Iniciar em modo produção
npm run start

# Verificação de código
npm run lint
```

### Navegação

A aplicação possui navegação fluida entre as seções:

- **Home (#hero)** - Apresentação pessoal com efeitos visuais
- **Sobre (#about)** - Informações pessoais e formação
- **Experiência (#experience)** - Histórico profissional
- **Habilidades (#skills)** - Tecnologias e competências
- **Projetos (#projects)** - Portfólio de trabalhos realizados
- **Certificações (#certifications)** - Cursos e certificados
- **Contato (#contact)** - Formulário de contato e redes sociais

### Funcionalidades Interativas

- **Modo escuro/claro** - Alternância de tema
- **Animações suaves** - Transições com Framer Motion
- **Efeitos visuais** - Partículas, grade futurística e linhas neurais
- **Typewriter** - Animação de texto digitado
- **Formulário de contato** - Integrado com Firebase
- **Download de CV** - Link direto para o currículo

## 📁 Estrutura do Projeto

```
portifolio/
├── public/                     # Arquivos estáticos
│   ├── avatar.png             # Foto de perfil
│   ├── documents/             # Documentos (CV, etc.)
│   └── projects/              # Imagens dos projetos
├── src/
│   ├── app/                   # App Router do Next.js
│   │   ├── globals.css        # Estilos globais
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Página inicial
│   ├── components/            # Componentes React
│   │   ├── layout/            # Componentes de layout
│   │   │   ├── Header.tsx     # Cabeçalho com navegação
│   │   │   ├── Footer.tsx     # Rodapé
│   │   │   ├── ThemeProvider.tsx # Provedor de tema
│   │   │   └── ThemeToggle.tsx   # Alternador de tema
│   │   ├── sections/          # Seções da página
│   │   │   ├── HeroSection.tsx       # Seção principal
│   │   │   ├── AboutSection.tsx      # Sobre mim
│   │   │   ├── ExperienceSection.tsx # Experiência
│   │   │   ├── SkillsSection.tsx     # Habilidades
│   │   │   ├── ProjectsSection.tsx   # Projetos
│   │   │   ├── CertificationsSection.tsx # Certificações
│   │   │   └── ContactSection.tsx    # Contato
│   │   └── ui/                # Componentes de interface
│   │       ├── Button.tsx     # Botão reutilizável
│   │       ├── Card.tsx       # Card de conteúdo
│   │       ├── Input.tsx      # Campo de entrada
│   │       └── ...           # Outros componentes UI
│   ├── firebase/             # Configuração Firebase
│   │   ├── config.ts         # Configuração do Firebase
│   │   └── services.ts       # Serviços (Analytics, Firestore)
│   ├── hooks/                # Hooks personalizados
│   │   ├── useClientTheme.ts # Hook para tema
│   │   ├── useTypewriter.ts  # Hook para animação de texto
│   │   ├── useVisualEffects.ts # Hook para efeitos visuais
│   │   └── ...              # Outros hooks
│   ├── lib/                  # Utilitários e dados
│   │   ├── data.ts          # Dados pessoais e projetos
│   │   └── utils.ts         # Funções utilitárias
│   └── types/               # Definições TypeScript
│       └── index.ts         # Interfaces e tipos
├── eslint.config.mjs        # Configuração ESLint
├── next.config.ts           # Configuração Next.js
├── tailwind.config.js       # Configuração Tailwind
├── tsconfig.json           # Configuração TypeScript
└── package.json            # Dependências e scripts
```

## ✨ Funcionalidades

### 🎨 Interface e UX
- **Design Responsivo** - Adaptável a todos os dispositivos
- **Tema Escuro/Claro** - Alternância suave entre modos
- **Animações Fluidas** - Transições e efeitos com Framer Motion
- **Efeitos Visuais Futurísticos** - Partículas, gradientes e linhas neurais
- **Navegação Suave** - Scroll suave entre seções

### 🔧 Funcionalidades Técnicas
- **SSR/SSG** - Renderização do lado do servidor com Next.js
- **TypeScript** - Tipagem estática para maior confiabilidade
- **Otimização de Performance** - Lazy loading e otimização de imagens
- **SEO Otimizado** - Meta tags e estrutura semântica
- **PWA Ready** - Configuração para Progressive Web App

### 📊 Analytics e Tracking
- **Google Analytics** - Acompanhamento de visitantes
- **Event Tracking** - Rastreamento de interações
- **Performance Monitoring** - Monitoramento de desempenho

### 📧 Contato e Integração
- **Formulário de Contato** - Integrado com Firebase
- **Links Sociais** - Redirecionamento para redes sociais
- **Download de CV** - Acesso direto ao currículo
- **WhatsApp Integration** - Contato direto via WhatsApp

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Para contribuir:

1. **Fork o projeto**
2. **Crie uma branch para sua feature**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit suas mudanças**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push para a branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Abra um Pull Request**

### 📋 Guidelines de Contribuição
- Mantenha o código limpo e bem documentado
- Siga os padrões de TypeScript e ESLint
- Teste suas alterações em diferentes dispositivos
- Atualize a documentação se necessário

## 📞 Contato

**Lucas Samuel Pereira Godoy**
- 📧 Email: [lukassamuka88@gmail.com](mailto:lukassamuka88@gmail.com)
- 💼 LinkedIn: [lucas-samuel-pereira-godoy](https://linkedin.com/in/lucas-samuel-pereira-godoy)
- 🐙 GitHub: [@Lucassamuel97](https://github.com/Lucassamuel97)
- 📱 WhatsApp: [+55 42 99830-0659](https://wa.me/5542998300659)
- 📍 Localização: Palmital, Paraná, Brasil

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela no repositório!**

---

<div align="center">
  <p>Desenvolvido com ❤️ por SamucaDev</p>
  <p>© 2025 - Todos os direitos reservados</p>
</div>
