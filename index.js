import React, { useMemo, useState, useEffect } from "react";

// efebulbul.com — Single-file React portfolio
// Notes:
// - Tailwind is available by default in this canvas preview.
// - Replace placeholder links (GitHub, App Store, LinkedIn, CV) with your real links.
// - Accent color comes from the CSS variable --accent (#602A80). You can tweak easily.
// - Turkish is default; there is a TR/EN toggle in the header.

export default function Portfolio() {
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("tr");

  // Respect system preference on first load
  useEffect(() => {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const t = useMemo(() => (lang === "tr" ? tr : en), [lang]);

  const projects = useMemo(
    () => [
      {
        title: "Taskly — To‑Do (iOS)",
        description: t.p_taskly,
        badges: ["Swift", "UIKit", "Local Notifications", "Dark/Light"],
        links: [
          { label: "GitHub", href: "https://github.com/your-user/taskly" },
          { label: "App Store", href: "https://apps.apple.com/" },
        ],
        preview: placeholderShot("Taskly")
      },
      {
        title: "MapKit Demo",
        description: t.p_mapkit,
        badges: ["Swift", "MapKit", "CoreLocation"],
        links: [
          { label: "GitHub", href: "https://github.com/your-user/mapkit-demo" },
        ],
        preview: placeholderShot("MapKit")
      },
      {
        title: "ItemsViewController",
        description: t.p_items,
        badges: ["UIKit", "MVC", "TableView"],
        links: [
          { label: "GitHub", href: "https://github.com/your-user/items-vc" },
        ],
        preview: placeholderShot("ItemsVC")
      },
    ], [t]
  );

  return (
    <div className="min-h-screen font-sans antialiased bg-white text-slate-900 dark:bg-black dark:text-slate-100" style={{
      // brand accent
      // You can use this variable inside inline styles if ever needed
      // Tailwind colors are used via classes below
      '--accent': '#602A80'
    }}>
      <Header
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        lang={lang}
        onToggleLang={() => setLang(lang === 'tr' ? 'en' : 'tr')}
        t={t}
      />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Hero t={t} />
        <QuickStats t={t} />
        <ProjectGrid title={t.projects} projects={projects} />
        <Skills title={t.skills} />
        <Contact t={t} />
        <Footer />
      </main>
    </div>
  );
}

function Header({$1}) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/50 border-b border-slate-200/60 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          <div className="hidden sm:flex flex-col">
            <span className="text-sm text-slate-500 dark:text-slate-400">{t.titleTop}</span>
            <span className="text-lg font-semibold tracking-tight">Efe Bülbül</span>
          </div>
        </div>
        <nav className="flex items-center gap-2">
          <a className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-sm" href="#projects">{t.nav_projects}</a>
          <a className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-sm" href="#skills">{t.nav_skills}</a>
          <a className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-sm" href="#contact">{t.nav_contact}</a>
          <button
            onClick={onToggleLang}
            className="ml-1 px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10"
            aria-label="Toggle language"
          >{lang === 'tr' ? 'TR' : 'EN'}</button>
          <button
            onClick={onToggleTheme}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10"
            aria-label="Toggle theme"
          >{theme === 'dark' ? '🌙' : '☀️'}</button>
        </nav>
      </div>
    </header>
  );
}

function Hero({$1}) {
  return (
    <section className="pt-12 pb-8">
      <div className="grid md:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            {t.hero_h1_line1} <span className="text-[color:var(--accent)]">iOS</span> {t.hero_h1_line2}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-prose">
            {t.hero_p}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#projects" className="px-5 py-2.5 rounded-2xl text-white font-medium shadow-sm" style={{ backgroundColor: "var(--accent)" }}>{t.cta_projects}</a>
            <a href="https://github.com/your-user" className="px-5 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 font-medium">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/your-profile" className="px-5 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 font-medium">LinkedIn ↗</a>
          </div>
        </div>
        <div className="relative">
          <ShowcasePhone />
        </div>
      </div>
    </section>
  );
}

function QuickStats({$1}) {
  const items = [
    { emoji: "📱", label: t.stat_apps, value: "6+" },
    { emoji: "💼", label: t.stat_intern, value: t.stat_intern_val },
    { emoji: "⚙️", label: "Swift / UIKit / SwiftUI", value: "2+ yıl" },
    { emoji: "🎯", label: t.stat_goal, value: t.stat_goal_val },
  ];
  return (
    <section className="py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((it, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 bg-slate-50/70 dark:bg-white/[0.03]">
            <div className="text-2xl mb-1">{it.emoji}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">{it.label}</div>
            <div className="text-lg font-semibold">{it.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectGrid({$1}) {
  return (
    <section id="projects" className="py-10">
      <div className="flex items-end justify-between mb-5">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
        <a href="https://github.com/your-user?tab=repositories" className="text-sm text-slate-600 dark:text-slate-300 hover:underline">GitHub’da tümü ↗</a>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={i} {...p} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({$1}) {
  return (
    <article className="group rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] shadow-sm">
      <div className="aspect-[4/3] bg-slate-100 dark:bg-white/[0.06] relative">
        {preview}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg tracking-tight mb-1">{title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {badges.map((b, i) => (
            <span key={i} className="px-2.5 py-1 rounded-xl text-xs bg-slate-50 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10">{b}</span>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          {links.map((l, i) => (
            <a key={i} href={l.href} className="text-sm font-medium hover:underline" style={{ color: "var(--accent)" }}>{l.label}</a>
          ))}
        </div>
      </div>
    </article>
  );
}

function Skills({$1}) {
  const skills = [
    { name: "Swift", level: 90 },
    { name: "UIKit", level: 85 },
    { name: "SwiftUI", level: 70 },
    { name: "MapKit", level: 75 },
    { name: "CoreData", level: 65 },
    { name: "Git / GitHub", level: 80 },
  ];
  return (
    <section id="skills" className="py-10">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">{title}</h2>
      <div className="grid md:grid-cols-2 gap-5">
        {skills.map((s, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 bg-slate-50/70 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{s.name}</span>
              <span className="text-sm text-slate-500 dark:text-slate-400">{s.level}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-white/10">
              <div className="h-2 rounded-full" style={{ width: `${s.level}%`, backgroundColor: "var(--accent)" }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact({$1}) {
  return (
    <section id="contact" className="py-12">
      <div className="rounded-3xl border border-slate-200 dark:border-white/10 p-6 md:p-8 bg-gradient-to-br from-slate-50 to-white dark:from-white/[0.03] dark:to-white/[0.02]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">{t.contact_title}</h3>
            <p className="text-slate-600 dark:text-slate-300 mt-1">{t.contact_desc}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:hello@efebulbul.com" className="px-5 py-2.5 rounded-2xl text-white font-medium shadow-sm" style={{ backgroundColor: "var(--accent)" }}>{t.contact_btn_email}</a>
            <a href="/CV_Efe_Bulbul.pdf" className="px-5 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 font-medium">{t.contact_btn_cv}</a>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-3">{t.footer_note}</p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">
      © {new Date().getFullYear()} Efe Bülbül — efebulbul.com
    </footer>
  );
}

function Logo() {
  return (
    <div className="w-10 h-10 rounded-2xl grid place-items-center shadow-sm border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5">
      {/* EB Monogram */}
      <svg width="22" height="22" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="56" height="56" rx="12" fill="url(#g)" />
        <path d="M18 20h18c5 0 9 4 9 9s-4 9-9 9H18V20zm0 22h20c4 0 8 3 8 8H18v-8z" fill="white"/>
        <defs>
          <linearGradient id="g" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#602A80"/>
            <stop offset="1" stopColor="#A46BD1"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function ShowcasePhone() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      {/* phone frame */}
      <div className="rounded-[2.5rem] border border-slate-200 dark:border-white/10 p-3 bg-slate-50 dark:bg-white/[0.03] shadow-lg">
        <div className="rounded-[2rem] overflow-hidden bg-black aspect-[9/19.5]">
          {/* Fake app preview */}
          <div className="h-full w-full flex flex-col">
            <div className="h-10 bg-[color:var(--accent)]/90" />
            <div className="flex-1 grid place-items-center text-white/90 text-sm">
              <div className="text-center">
                <div className="text-3xl font-bold">Taskly</div>
                <div className="mt-2 opacity-80">Demo Preview</div>
              </div>
            </div>
            <div className="h-16 bg-slate-900/90" />
          </div>
        </div>
      </div>
      {/* glow */}
      <div className="absolute inset-0 -z-10 blur-2xl opacity-30" style={{ background: "radial-gradient(600px circle at 50% 0, #602A80, transparent 40%)" }} />
    </div>
  );
}

function placeholderShot(label) {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <div className="w-[85%] h-[80%] rounded-2xl bg-gradient-to-br from-slate-200 to-slate-100 dark:from-white/10 dark:to-white/5 border border-slate-300/70 dark:border-white/10 flex items-center justify-center">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-200">{label} Screenshot</span>
        </div>
      </div>
    );
  }

// Types

// i18n
const tr = {
  titleTop: "iOS Geliştirici",
  nav_projects: "Projeler",
  nav_skills: "Yetenekler",
  nav_contact: "İletişim",
  hero_h1_line1: "Profesyonel",
  hero_h1_line2: "projelerle portföy",
  hero_p:
    "Swift, UIKit ve SwiftUI ile ürettiğim iOS uygulamalarımı burada sergiliyorum. Minimal, performanslı ve kullanıcı odaklı tasarım ilkeleriyle geliştiriyorum.",
  cta_projects: "Projeleri gör",
  projects: "Öne Çıkan Projeler",
  p_taskly:
    "Kategori/etiket desteği, bildirim planlama ve offline veri yönetimi olan günlük görev uygulaması.",
  p_mapkit:
    "Kullanıcının konumunu alan, pin ekleyen ve rota çizen MapKit demosu.",
  p_items:
    "TableView tabanlı liste, detay görünümü ve kalıcı depolama mantığını örnekleyen MVC proje.",
  skills: "Yetenekler",
  contact_title: "Projeleriniz için iletişime geçin",
  contact_desc:
    "Yeni uygulama fikirleri, freelance işler veya staj/iş fırsatları için mail atabilirsiniz.",
  contact_btn_email: "E-posta Gönder",
  contact_btn_cv: "CV’yi İndir",
  footer_note: "Arayüz Türkçe, açık/koyu mod ve marka moru (#602A80) desteklenir."
};

const en = {
  titleTop: "iOS Developer",
  nav_projects: "Projects",
  nav_skills: "Skills",
  nav_contact: "Contact",
  hero_h1_line1: "Professional",
  hero_h1_line2: "portfolio with projects",
  hero_p:
    "I showcase my iOS apps built with Swift, UIKit and SwiftUI. Minimal, performant, and user‑centric design.",
  cta_projects: "View projects",
  projects: "Featured Projects",
  p_taskly:
    "Daily tasks app with categories/tags, scheduled notifications, and offline persistence.",
  p_mapkit:
    "MapKit demo with user location, pins, and routing.",
  p_items:
    "MVC sample with TableView list, detail screen, and persistence.",
  skills: "Skills",
  contact_title: "Let’s work together",
  contact_desc:
    "For new app ideas, freelance work, or internship/job opportunities, drop me an email.",
  contact_btn_email: "Send Email",
  contact_btn_cv: "Download CV",
  footer_note: "Turkish/English UI, dark/light theme, and brand purple (#602A80) supported."
};
