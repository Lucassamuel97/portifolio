import type { Metadata } from "next";
import { Archivo, Public_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { personalInfo, socialLinks } from "@/lib/data";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

// Archivo com eixo de largura (wdth): expandida nos títulos, estreita nos rótulos.
// Public Sans, criada para serviços digitais de governo, no texto corrido.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

const title = `${personalInfo.name} | ${personalInfo.title}`;
const description =
  "Portfólio de Lucas Samuel, desenvolvedor Full-Stack especialista em sistemas de gestão para o setor público. PHP (Laravel), Java (Spring Boot), React, Next.js e DevOps.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  applicationName: SITE_NAME,
  authors: [{ name: personalInfo.name, url: SITE_URL }],
  creator: personalInfo.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: SITE_NAME,
    // A imagem vem de src/app/opengraph-image.tsx (gerada no build)
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    // A imagem vem de src/app/twitter-image.tsx
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// Dados estruturados (schema.org) para o Google entender que o site é de uma pessoa/profissional
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  alternateName: [SITE_NAME, "Lucas Samuel"],
  jobTitle: personalInfo.title,
  description,
  url: SITE_URL,
  image: `${SITE_URL}${personalInfo.avatar}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Palmital",
    addressRegion: "PR",
    addressCountry: "BR",
  },
  sameAs: socialLinks
    .filter((link) => link.platform === "LinkedIn" || link.platform === "GitHub")
    .map((link) => link.url),
  knowsAbout: personalInfo.interests,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${publicSans.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider
          attribute="data-tema"
          value={{ light: "papel", dark: "blueprint" }}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="portfolio-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
