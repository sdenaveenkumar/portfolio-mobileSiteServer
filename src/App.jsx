import { motion } from 'framer-motion';
import { ArrowRight, Code2, Github, Globe, Mail, Menu, Server, Sparkles, Workflow } from 'lucide-react';

const skills = [
  'Java',
  'JavaScript',
  'HTML',
  'CSS',
  'Tailwind CSS',
  'Node.js',
  'Express.js',
  'React',
  'MongoDB',
  'MERN Stack',
];

const projects = [
  {
    title: 'Full Stack Learning Platform',
    description: 'A responsive MERN application for course discovery, enrollment, and admin content management.',
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB'],
  },
  {
    title: 'Business Dashboard',
    description: 'A polished analytics dashboard with real-time cards, charts, and clean data workflows.',
    stack: ['JavaScript', 'Tailwind CSS', 'REST APIs'],
  },
  {
    title: 'Portfolio System',
    description: 'A modern personal site structure designed for fast presentation, contact, and credibility.',
    stack: ['React', 'Framer Motion', 'Responsive UI'],
  },
];

const highlights = [
  {
    icon: <Code2 className="h-5 w-5" />,
    title: 'Clean Frontend',
    text: 'Responsive layouts, strong visual hierarchy, and polished interactions for all device sizes.',
  },
  {
    icon: <Server className="h-5 w-5" />,
    title: 'Backend Ready',
    text: 'Node.js and Express.js foundations for scalable APIs, authentication, and data handling.',
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: 'MERN Workflow',
    text: 'A practical stack built around React, Express.js, MongoDB, and Node.js for production apps.',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  viewport: { once: true, amount: 0.25 },
};

function App() {
  return (
    <div className="section-shell min-h-screen overflow-hidden">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 text-sm font-bold text-white shadow-lg shadow-violet-500/20">
              NK
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Portfolio</p>
              <h1 className="text-base font-semibold text-white">Naveen Kumar</h1>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#about" className="transition hover:text-white">About</a>
            <a href="#skills" className="transition hover:text-white">Skills</a>
            <a href="#projects" className="transition hover:text-white">Projects</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </nav>

          <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10 md:hidden">
            <Menu className="h-4 w-4" />
            Menu
          </button>
        </div>
      </header>

      <main id="home" className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8 lg:pt-16">
        <section className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div {...fadeUp} className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              <Sparkles className="h-4 w-4" />
              MERN Stack Developer
            </div>

            <div className="space-y-5">
              <h2 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
                Hi, I’m <span className="gradient-text">Naveen Kumar</span>.
                <span className="block">I build beautiful web experiences.</span>
              </h2>
              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                I design and develop responsive portfolio-style web interfaces with Java, JavaScript, HTML, CSS, Tailwind CSS, Node.js, and Express.js.
                My focus is on clean visuals, smooth interactions, and production-ready MERN stack solutions.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="#projects" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-slate-950 transition hover:scale-[1.02] hover:bg-slate-100">
                View Projects <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10">
                Contact Me
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['Frontend', 'Responsive UI'],
                ['Backend', 'Express + Node'],
                ['Database', 'MongoDB + APIs'],
              ].map(([label, value]) => (
                <div key={label} className="glass-panel rounded-3xl p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{label}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="relative"
          >
            <div className="float-slow glass-panel relative mx-auto max-w-md rounded-[2rem] p-4 sm:p-6">
              <div className="absolute right-5 top-5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                Available for freelance
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Profile</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">Naveen Kumar</h3>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-slate-300">
                      Full stack developer crafting fast, elegant, and responsive digital products.
                    </p>
                  </div>
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-xl font-semibold text-white">
                    NK
                  </div>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    ['Java', 'Problem solving'],
                    ['JavaScript', 'Interactive UI'],
                    ['Node.js', 'Server logic'],
                    ['Tailwind CSS', 'Visual systems'],
                  ].map(([skill, detail]) => (
                    <div key={skill} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm font-semibold text-white">{skill}</p>
                      <p className="mt-1 text-sm text-slate-400">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="about" className="mt-20 grid gap-6 lg:grid-cols-3">
          {highlights.map((item) => (
            <motion.article key={item.title} {...fadeUp} className="grid-card glass-panel rounded-[1.75rem] p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 text-cyan-200">
                {item.icon}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
            </motion.article>
          ))}
        </section>

        <section id="skills" className="mt-20 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div {...fadeUp} className="glass-panel rounded-[1.75rem] p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Skills</p>
            <h3 className="mt-3 text-3xl font-semibold text-white">Tools I use to build and ship.</h3>
            <p className="mt-4 text-slate-300 leading-7">
              I work across the full stack with a practical focus on user experience, maintainable code, and reliable APIs.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span key={skill} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="grid gap-4 sm:grid-cols-2">
            {[
              ['01', 'Responsive layouts that adapt smoothly across desktop, tablet, and mobile.'],
              ['02', 'Modern MERN stack patterns with clean component-driven architecture.'],
              ['03', 'Performance-conscious UI built for fast loading and easy maintenance.'],
              ['04', 'Elegant visuals with gradients, glass cards, and subtle motion.'],
            ].map(([num, text]) => (
              <div key={num} className="grid-card glass-panel rounded-[1.5rem] p-5">
                <p className="text-sm font-semibold text-cyan-300">{num}</p>
                <p className="mt-3 leading-7 text-slate-300">{text}</p>
              </div>
            ))}
          </motion.div>
        </section>

        <section id="projects" className="mt-20">
          <motion.div {...fadeUp} className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Projects</p>
              <h3 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Selected work and product ideas.</h3>
            </div>
            <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 md:block">
              Replace with your real project list later
            </div>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.08 }}
                className="grid-card glass-panel rounded-[1.75rem] p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm uppercase tracking-[0.3em] text-slate-400">0{index + 1}</span>
                  <Globe className="h-5 w-5 text-cyan-300" />
                </div>
                <h4 className="mt-5 text-2xl font-semibold text-white">{project.title}</h4>
                <p className="mt-3 leading-7 text-slate-300">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-20 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <motion.div {...fadeUp} className="glass-panel rounded-[1.75rem] p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Contact</p>
            <h3 className="mt-3 text-3xl font-semibold text-white">Let’s build something useful.</h3>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              If you want a website, a MERN stack app, or a polished portfolio refresh, this is the section to connect.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <a href="mailto:hello@naveenkumar.dev" className="grid-card rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
                <Mail className="h-5 w-5 text-cyan-300" />
                <p className="mt-4 text-sm uppercase tracking-[0.25em] text-slate-400">Email</p>
                <p className="mt-2 text-lg font-medium text-white">hello@naveenkumar.dev</p>
              </a>
              <a href="https://github.com" className="grid-card rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
                <Github className="h-5 w-5 text-cyan-300" />
                <p className="mt-4 text-sm uppercase tracking-[0.25em] text-slate-400">GitHub</p>
                <p className="mt-2 text-lg font-medium text-white">Add your profile link</p>
              </a>
            </div>
          </motion.div>

          <motion.aside {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="glass-panel rounded-[1.75rem] p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Stack</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">MERN focused workflow</h3>
            <div className="mt-6 space-y-4">
              {[
                ['MongoDB', 'Data storage and schema flexibility'],
                ['Express.js', 'APIs and server routes'],
                ['React', 'Interactive frontend interfaces'],
                ['Node.js', 'Server-side execution and tooling'],
              ].map(([name, detail]) => (
                <div key={name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-white">{name}</p>
                    <Sparkles className="h-4 w-4 text-cyan-300" />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{detail}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </section>
      </main>
    </div>
  );
}

export default App;
