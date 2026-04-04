import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronRight,
  Code2,
  Home,
  Menu,
  Palette,
  Sparkles,
  Speaker,
  Target,
  Users,
} from 'lucide-react';

const profileImage = '/IMG_20251115_190447.jpg';

const quickFacts = [
  { label: 'Experience', value: '1+ year', detail: 'Hands-on with interfaces, APIs, and product delivery.' },
  { label: 'Front-end', value: 'React + Tailwind', detail: 'Responsive UI systems with motion and structure.' },
  { label: 'Strategy', value: 'Product thinking', detail: 'Clear value props, clean flows, and scannable sections.' },
  { label: 'Homeoffice', value: 'Remote-ready', detail: 'Comfortable collaborating from anywhere.' },
];

const expertiseTags = [
  { label: 'Estratégia', tone: 'yellow' },
  { label: 'Sistemas vivos', tone: 'green' },
  { label: 'Front-end', tone: 'pink' },
  { label: 'Design systems', tone: 'purple' },
  { label: 'React', tone: 'blue', chevron: true },
  { label: 'MERN stack', tone: 'mint' },
];

const stackHighlights = [
  'Java',
  'JavaScript',
  'HTML',
  'CSS',
  'Tailwind CSS',
  'Node.js',
  'Express.js',
  'MongoDB',
];

const projects = [
  {
    title: 'System-first interface',
    description: 'A portfolio layout that balances bold presentation with clear product structure.',
  },
  {
    title: 'Scannable fact blocks',
    description: 'Distinct cards for experience, skill, and process so visitors can read it fast.',
  },
  {
    title: 'Retro portrait treatment',
    description: 'A pixelated profile frame that gives the page a lo-fi, crafted personality.',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  viewport: { once: true, amount: 0.2 },
};

const popIn = {
  initial: { opacity: 0, scale: 0.96, y: 10 },
  whileInView: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  viewport: { once: true, amount: 0.25 },
};

function Tag({ label, tone, chevron = false }) {
  const toneClass = {
    yellow: 'tag-yellow',
    green: 'tag-green',
    pink: 'tag-pink',
    purple: 'tag-purple',
    blue: 'tag-blue',
    mint: 'tag-mint',
  }[tone];

  if (chevron) {
    return (
      <motion.span
        className={`tag-base tag-chevron ${toneClass}`}
        style={{ clipPath: 'polygon(0 0, 88% 0, 100% 50%, 88% 100%, 0 100%, 12% 50%)' }}
        whileHover={{ y: -2, rotate: -1 }}
        whileTap={{ scale: 0.98 }}
        {...fadeUp}
      >
        {label}
      </motion.span>
    );
  }

  return (
    <motion.span className={`tag-base ${toneClass}`} whileHover={{ y: -2, rotate: 1 }} whileTap={{ scale: 0.98 }} {...fadeUp}>
      {label}
    </motion.span>
  );
}

function FactCard({ label, value, detail, icon }) {
  return (
    <motion.div className="brutal-card fact-card rounded-[1.5rem] p-5 sm:p-6" whileHover={{ y: -4, x: 2 }} whileTap={{ scale: 0.99 }} {...popIn}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-black/65">{label}</p>
        <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-black bg-white text-black shadow-[4px_4px_0_#111]">
          {icon}
        </span>
      </div>
      <p className="mt-4 text-2xl font-extrabold tracking-tight text-black">{value}</p>
      <p className="mt-2 text-sm leading-6 text-black/80">{detail}</p>
    </motion.div>
  );
}

function App() {
  const [soundOn, setSoundOn] = useState(true);

  const headerLabel = useMemo(() => (soundOn ? 'Som: ON' : 'Som: OFF'), [soundOn]);

  return (
    <div className="neo-root min-h-screen overflow-hidden text-black">
      <motion.header className="sticky top-0 z-40 border-b-2 border-black bg-mustard shadow-[0_8px_0_#111]" initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <motion.a href="#home" className="inline-flex items-center gap-3 rounded-full border-2 border-black bg-white px-4 py-2 shadow-[6px_6px_0_#111] transition-transform duration-200 hover:-translate-y-0.5" whileHover={{ y: -2, rotate: -1 }} whileTap={{ scale: 0.98 }}>
            <motion.div className="grid h-11 w-11 place-items-center rounded-full border-2 border-black bg-black text-sm font-black text-white" animate={{ rotate: [0, -2, 2, 0] }} transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}>
              NK
            </motion.div>
            <div className="leading-tight">
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-black/70">Portfolio</p>
              <h1 className="text-sm font-extrabold sm:text-base">Naveen Kumar</h1>
            </div>
          </motion.a>

          <nav className="hidden items-center gap-3 md:flex">
            {['About', 'Facts', 'Work', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-bold shadow-[5px_5px_0_#111] transition-transform duration-200 hover:-translate-y-0.5"
                whileHover={{ y: -2, rotate: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <motion.button
              type="button"
              onClick={() => setSoundOn((current) => !current)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-bold shadow-[5px_5px_0_#111] transition-transform duration-200 hover:-translate-y-0.5"
              aria-pressed={soundOn}
              aria-label="Toggle sound"
              whileHover={{ y: -2, rotate: 1 }}
              whileTap={{ scale: 0.97 }}
            >
              <Speaker className="h-4 w-4" />
              <span>{headerLabel}</span>
            </motion.button>

            <motion.button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-black bg-white shadow-[5px_5px_0_#111] md:hidden"
              aria-label="Open menu"
              whileHover={{ y: -2, rotate: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      <motion.aside className="awwwards-ribbon hidden xl:block" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.35 }}>
        <motion.div className="rounded-none border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.35em] shadow-[6px_6px_0_#111]" animate={{ y: [0, -3, 0] }} transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}>
          Awwwards nominee
        </motion.div>
      </motion.aside>

      <motion.main id="home" className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pt-12" initial="initial" animate="animate">
        <motion.section className="brutal-card hero-card grid gap-8 rounded-[2.25rem] p-5 sm:p-7 lg:grid-cols-[1.15fr_0.85fr] lg:p-8" {...popIn}>
          <motion.div {...fadeUp} className="space-y-6">
            <motion.div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-lilac px-4 py-2 text-sm font-bold shadow-[5px_5px_0_#111]" whileHover={{ y: -2, rotate: -1 }} whileTap={{ scale: 0.98 }}>
              <Sparkles className="h-4 w-4" />
              Product / Front-end / Strategy
            </motion.div>

            <div className="space-y-5">
              <motion.p className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-bold shadow-[5px_5px_0_#111]" whileHover={{ y: -2, x: 1 }}>
                <Target className="h-4 w-4" />
                I design systems, organize products, and transform interfaces.
              </motion.p>
              <h2 className="max-w-3xl text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
                Bold interfaces for modern products, with a human edge.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-black/80 sm:text-lg">
                Hi, I’m Naveen Kumar, but you can call me Naveen :). I build responsive web experiences with React, JavaScript, Tailwind CSS, Node.js, Express.js, and MongoDB.
                The goal is simple: make the product easy to understand, easy to use, and hard to forget.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <motion.a href="#work" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-black bg-black px-6 py-3 font-bold text-white shadow-[6px_6px_0_#111] transition-transform duration-200 hover:-translate-y-0.5" whileHover={{ y: -3, x: 1 }} whileTap={{ scale: 0.98 }}>
                View work
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
              <motion.a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-black bg-white px-6 py-3 font-bold text-black shadow-[6px_6px_0_#111] transition-transform duration-200 hover:-translate-y-0.5" whileHover={{ y: -3, rotate: -1 }} whileTap={{ scale: 0.98 }}>
                Contact me
              </motion.a>
            </div>

            <div className="flex flex-wrap gap-3">
              {expertiseTags.map((tag) => (
                <Tag key={tag.label} label={tag.label} tone={tag.tone} chevron={tag.chevron} />
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="space-y-5">
            <motion.div className="brutal-card rounded-[2rem] p-4 sm:p-5" whileHover={{ y: -3, rotate: -0.5 }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-black/60">Hero card</p>
                  <h3 className="mt-2 text-2xl font-black">Pixel portrait + bio</h3>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-black/80">
                    A contained profile card that keeps the center of gravity on the content.
                  </p>
                </div>
                <motion.span className="rounded-full border-2 border-black bg-green-300 px-3 py-1 text-xs font-black uppercase shadow-[4px_4px_0_#111]" animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 2.8, repeat: Infinity }}>
                  Online
                </motion.span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
                <motion.div className="portrait-frame" whileHover={{ scale: 1.01, rotate: -0.5 }}>
                  <img src={profileImage} alt="Naveen Kumar" className="pixel-portrait h-full w-full object-cover object-center" />
                </motion.div>

                <div className="space-y-3">
                  <motion.div className="rounded-[1.5rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]" whileHover={{ y: -3, x: 1 }}>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-black/60">Micro-copy</p>
                    <p className="mt-2 text-sm leading-7 text-black/85">
                      Estrategia, sistemas vivos e interfaces com personalidade. Minimal? No. Clear? Always.
                    </p>
                  </motion.div>
                  <motion.div className="rounded-[1.5rem] border-2 border-black bg-lilac p-4 shadow-[6px_6px_0_#111]" whileHover={{ y: -3, x: -1 }}>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-black/60">Profile note</p>
                    <p className="mt-2 text-sm leading-7 text-black/85">
                      Clean geometry, thick borders, and hard shadows keep the UI loud without losing readability.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              <motion.div className="brutal-card rounded-[1.75rem] p-5" whileHover={{ y: -3, rotate: 0.5 }}>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-black/60">Stack</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {stackHighlights.map((item) => (
                    <span key={item} className="tag-base tag-yellow">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
              <motion.div className="brutal-card rounded-[1.75rem] p-5" whileHover={{ y: -3, rotate: -0.5 }}>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-black/60">Tone</p>
                <p className="mt-3 text-lg font-black leading-7">
                  Bold, confident, friendly. The interface should feel physical, not flat.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section id="about" className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]" {...fadeUp}>
          <motion.div {...fadeUp} className="brutal-card rounded-[2rem] p-6 sm:p-7">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-black/60">About</p>
            <h3 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
              I care about systems that stay readable, even when they get busy.
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-8 text-black/80">
              This page is built around fast hierarchy, strong contrast, and cards that look like objects on a desk.
              The result is a portfolio that feels immediate, expressive, and practical for real client conversations.
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-[1.5rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
              <Users className="h-5 w-5" />
              <p className="text-sm font-medium text-black/80">Friendly microcopy, bold structure, and accessible contrast work together.</p>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="brutal-card rounded-[2rem] p-6 sm:p-7">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-black/60">Quick Facts</p>
            <div id="facts" className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {quickFacts.map((fact, index) => (
                <FactCard
                  key={fact.label}
                  label={fact.label}
                  value={fact.value}
                  detail={fact.detail}
                  icon={[<BriefcaseBusiness className="h-4 w-4" />, <Code2 className="h-4 w-4" />, <Palette className="h-4 w-4" />, <Home className="h-4 w-4" />][index]}
                />
              ))}
            </div>
          </motion.div>
        </motion.section>

        <motion.section id="work" className="mt-8" {...fadeUp}>
          <motion.div {...fadeUp} className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.32em] text-black/60">Work</p>
              <h3 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Functional grouping that stays easy to scan.</h3>
            </div>
            <div className="rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-bold shadow-[5px_5px_0_#111]">
              Clear value prop first
            </div>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.08 }}
                className="brutal-card rounded-[1.75rem] p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-black uppercase tracking-[0.28em] text-black/60">0{index + 1}</p>
                  <ChevronRight className="h-5 w-5" />
                </div>
                <h4 className="mt-5 text-2xl font-black tracking-tight">{project.title}</h4>
                <p className="mt-3 text-sm leading-7 text-black/80">{project.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section id="contact" className="mt-8 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]" {...fadeUp}>
          <motion.div {...fadeUp} className="brutal-card rounded-[2rem] p-6 sm:p-7">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-black/60">Contact</p>
            <h3 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">If the brief is messy, the interface shouldn’t be.</h3>
            <p className="mt-4 leading-8 text-black/80">
              For portfolio updates, product pages, or a full MERN rebuild, I can turn the idea into a bold and structured experience.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <motion.a href="mailto:hello@naveenkumar.dev" className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-black px-5 py-3 font-bold text-white shadow-[6px_6px_0_#111] transition-transform duration-200 hover:-translate-y-0.5" whileHover={{ y: -3, x: 1 }} whileTap={{ scale: 0.98 }}>
                Email me
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
              <motion.a href="https://github.com/SdeNaveenKumar" className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-5 py-3 font-bold text-black shadow-[6px_6px_0_#111] transition-transform duration-200 hover:-translate-y-0.5" whileHover={{ y: -3, rotate: -1 }} whileTap={{ scale: 0.98 }}>
                GitHub
              </motion.a>
            </div>
          </motion.div>

          <motion.aside {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="brutal-card rounded-[2rem] p-6 sm:p-7">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-black/60">Summary</p>
            <div className="mt-4 space-y-4">
              <motion.div className="rounded-[1.5rem] border-2 border-black bg-yellow-200 p-4 shadow-[6px_6px_0_#111]" whileHover={{ y: -2 }}>
                <p className="text-sm font-black uppercase tracking-[0.28em] text-black/60">Headline</p>
                <p className="mt-2 text-lg font-black leading-7">I design systems, organize products, and transform interfaces.</p>
              </motion.div>
              <motion.div className="rounded-[1.5rem] border-2 border-black bg-green-200 p-4 shadow-[6px_6px_0_#111]" whileHover={{ y: -2 }}>
                <p className="text-sm font-black uppercase tracking-[0.28em] text-black/60">UX impact</p>
                <p className="mt-2 text-base leading-7">Excellent contrast, clear grouping, and a confident tone make the page easy to trust.</p>
              </motion.div>
              <motion.div className="rounded-[1.5rem] border-2 border-black bg-pink-200 p-4 shadow-[6px_6px_0_#111]" whileHover={{ y: -2 }}>
                <p className="text-sm font-black uppercase tracking-[0.28em] text-black/60">Visual note</p>
                <p className="mt-2 text-base leading-7">Rounded cards, hard shadows, and thick outlines create the neo-brutalist look.</p>
              </motion.div>
            </div>
          </motion.aside>
        </motion.section>
      </motion.main>
    </div>
  );
}

export default App;
