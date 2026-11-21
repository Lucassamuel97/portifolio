# 🚀 Portfólio Lucas Samuel Pereira

[![GitHub](https://img.shields.io/badge/GitHub-Lucassamuel97-181717?style=for-the-badge&logo=github)](https://github.com/Lucassamuel97)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-lucas--samuel--pereira--godoy-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/lucas-samuel-pereira-godoy)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

## 📋 Descrição

Este é meu portfólio pessoal desenvolvido para apresentar minha trajetória profissional, projetos e habilidades como Desenvolvedor Full-Stack. A aplicação oferece uma experiência interativa e moderna, destacando minha especialização em tecnologias web e sistemas de gestão para o setor público.

O projeto resolve o problema de apresentação profissional online, oferecendo uma plataforma centralizada onde potenciais empregadores, clientes e colaboradores podem conhecer meu trabalho, baixar meu currículo e entrar em contato diretamente.

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Framework:** Next.js 15.5 com App Router (seções como componentes de servidor)
- **Linguagem:** TypeScript 5.0
- **Bibliotecas React:**
  - React 19.1.0
  - React DOM 19.1.0
- **Estilização:** 
  - Tailwind CSS 3.4.17
  - Tailwind Merge 2.5.4
  - Tailwind Forms 0.5.9
- **Tipografia:** Archivo (eixo de largura variável) e Public Sans, via `next/font`
- **Temas:** Next Themes ("Papel" claro e "Blueprint" escuro)
- **Utilitários:** 
  - Class Variance Authority 0.7.1
  - clsx 2.1.1

### Backend & Serviços
- **Analytics:** Firebase 10.14.1
- **Banco de Dados:** Firebase Firestore (cópia de backup das mensagens)
- **E-mail do formulário:** Resend, pela rota `src/app/api/contact/route.ts`
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

Página única, com as seções:

- **Início (#inicio)** - Apresentação, diagrama de arquitetura dos sistemas em produção e ficha resumida
- **Projetos (#projetos)** - Estudos de caso com desafio, solução, papel, decisões técnicas e telas; tabela com os demais projetos
- **Sobre (#sobre)** - Texto, foto e números calculados a partir dos dados
- **Tecnologias (#tecnologias)** - Stack agrupada por área, com o tempo de uso
- **Trajetória (#trajetoria)** - Trabalho e formação na mesma linha do tempo
- **Formação contínua (#formacao)** - Cursos com filtro por instituição e link para o certificado
- **Contato (#contato)** - Canais diretos e formulário que envia e-mail

### Identidade visual: "Prancha técnica"

O visual vem da documentação de engenharia: diagramas, legenda de prancha e tabelas de especificação.
Tokens de cor ficam em `src/app/globals.css` (tema `papel` e tema `blueprint`, em canais RGB) e são expostos
ao Tailwind em `tailwind.config.js` (`bg-papel`, `text-tinta`, `text-tinta-2`, `border-revisao`...). O vermelho
de revisão é o único acento. Movimento só no carregamento do hero e em resposta a ações, respeitando
`prefers-reduced-motion`.

### Como editar o conteúdo

Todo o conteúdo fica em `src/lib/data.ts`:

| Exportação | O que controla |
|---|---|
| `personalInfo`, `socialLinks` | Nome, foto (`/foto.jpg`), contatos e currículo |
| `projects` | Todos os projetos; os que não estão em um estudo de caso vão para a tabela "Outros projetos" |
| `caseStudies` | Projetos em destaque: desafio, solução, papel, decisões técnicas, esquema e telas |
| `projectContexts` | Coluna "Contexto" da tabela de outros projetos |
| `systemArchitectures` | Abas do diagrama de arquitetura no início da página |
| `experiences`, `education` | Linha do tempo da trajetória |
| `skills` | Tecnologias; nível 85 ou mais aparece em destaque |
| `certifications` | Formação contínua |

As telas dos sistemas ficam em `public/telas/` (WebP). Use capturas com dados fictícios de demonstração e
confirme a autorização antes de publicar telas de clientes.

## 📁 Estrutura do Projeto

```
portifolio/
├── public/
│   ├── foto.jpg                  # Foto de perfil
│   ├── telas/                    # Telas dos sistemas (dados fictícios)
│   ├── documents/                # Currículo
│   └── projects/                 # Imagens de projetos
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts  # Envio de e-mail do formulário (Resend)
│   │   ├── globals.css           # Tokens dos temas e estilos que o Tailwind não expressa
│   │   ├── layout.tsx            # Fontes, tema, metadados e JSON-LD
│   │   ├── opengraph-image.tsx   # Imagem de compartilhamento gerada no build
│   │   ├── page.tsx              # Página inicial (componente de servidor)
│   │   ├── robots.ts / sitemap.ts
│   │   └── twitter-image.tsx
│   ├── assets/fonts/             # Archivo (WOFF) usada na imagem de compartilhamento
│   ├── components/
│   │   ├── layout/               # Container, Header, Footer, ThemeToggle, AnalyticsTracker
│   │   ├── sections/             # Seções, ArchitectureDiagram, CaseStudy, CaseSchematic, Timeline...
│   │   └── ui/                   # Button, Input, Textarea, Screenshots
│   ├── firebase/                 # Analytics e Firestore
│   ├── hooks/useScrollspy.ts     # Seção ativa no menu
│   ├── lib/                      # data.ts, site.ts, contact.ts, certificacoes.ts, utils.ts
│   └── types/index.ts            # Tipos, incluindo CaseStudy e SystemArchitecture
├── tailwind.config.js            # Tokens do design system
└── next.config.ts                # Redirect de samucadev.vercel.app para samuca.tec.br
```

## ✨ Funcionalidades

- **Diagrama de arquitetura interativo** - Uma aba por sistema, com ligações destacadas ao passar o cursor ou tocar
- **Estudos de caso** - Desafio, solução, papel, decisões técnicas, esquema e telas ampliáveis
- **Linha do tempo** - Trabalho e formação com detalhes por item
- **Temas Papel e Blueprint** - Seguem a preferência do sistema e ficam salvos
- **Responsivo de 320px em diante** - Sem rolagem horizontal; no celular, tudo em uma coluna
- **Acessibilidade** - Link para pular ao conteúdo, foco visível, abas e diálogos navegáveis por teclado
- **SEO** - Metadados, canonical, sitemap, robots, JSON-LD e imagem de compartilhamento
- **Contato** - Formulário com validação, anti-spam (honeypot e limite por IP) e envio por e-mail
- **Analytics** - Visualização, profundidade de rolagem e envio do formulário (Firebase)

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
