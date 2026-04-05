import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  ChevronRight,
  Code2,
  GraduationCap,
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

const LOFI_STREAM_URL = 'https://stream.zeno.fm/f3wvbbqmdg8uv';

const dsaPatterns = [
  'Sliding Window',
  'Two Pointers',
  'Fast & Slow Pointers',
  'Merge Intervals',
  'Cyclic Sort',
  'In-place Reversal',
  'Breadth-First Search',
  'Depth-First Search',
  'Topological Sort',
  "Top 'K' Elements",
  'Two Heaps',
  'K-way Merge',
  'Modified Binary Search',
  'Backtracking',
  '0/1 Knapsack',
];

const learningModules = [
  {
    title: 'DSA Pattern',
    summary: 'Structured Java prep roadmap with 15 reusable problem-solving patterns.',
    bullets: ['Array and LinkedList foundation', 'Interview-focused pattern recognition', 'Code templates + variations'],
  },
  {
    title: 'Frontend Depth',
    summary: 'Component architecture, accessibility, and motion systems in React.',
    bullets: ['Composable UI patterns', 'A11y-first interaction states', 'Animation timing with GSAP'],
  },
  {
    title: 'Backend Craft',
    summary: 'Designing APIs that are readable, fast, and easy to maintain.',
    bullets: ['Express route structure', 'MongoDB schema planning', 'Validation and error boundaries'],
  },
  {
    title: 'Product Thinking',
    summary: 'Turning fuzzy ideas into focused, testable interface decisions.',
    bullets: ['Prioritizing user flows', 'Clear information hierarchy', 'Iterative release mindset'],
  },
];

function formatCodeSnippet(rawCode) {
  const lines = rawCode
    .replace(/\r\n/g, '\n')
    .replace(/\t/g, '  ')
    .split('\n')
    .map((line) => line.replace(/\s+$/g, ''));

  const cleaned = [];
  let hasContentStarted = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!hasContentStarted && trimmed === '') {
      continue;
    }

    hasContentStarted = true;
    cleaned.push(trimmed === '' ? '' : trimmed);
  }

  while (cleaned.length > 0 && cleaned[cleaned.length - 1] === '') {
    cleaned.pop();
  }

  const compacted = [];
  let previousWasBlank = false;

  for (const line of cleaned) {
    const isBlank = line === '';

    if (isBlank && previousWasBlank) {
      continue;
    }

    compacted.push(line);
    previousWasBlank = isBlank;
  }

  let indentLevel = 0;
  const formatted = compacted.map((line) => {
    if (line === '') {
      return '';
    }

    const shouldOutdent = /^\}|^\);?$/.test(line) || /^(else|catch|finally)\b/.test(line);
    const currentIndent = Math.max(0, indentLevel - (shouldOutdent ? 1 : 0));
    const indented = `${'  '.repeat(currentIndent)}${line}`;

    const opens = (line.match(/\{/g) || []).length;
    const closes = (line.match(/\}/g) || []).length;
    indentLevel += opens - closes;
    indentLevel = Math.max(0, indentLevel);

    return indented;
  });

  return formatted.join('\n');
}

function formatCodeBlocksInHtml(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  doc.querySelectorAll('pre code').forEach((block) => {
    const formatted = formatCodeSnippet(block.textContent || '');
    block.textContent = formatted;
  });

  return doc.body.innerHTML;
}

function parseDsaSectionsFromHtml(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const parsed = [];

  for (let index = 1; index <= 15; index += 1) {
    const id = `pattern-${index}`;
    const section = doc.getElementById(id);

    if (!section) {
      continue;
    }

    const clone = section.cloneNode(true);
    clone.querySelectorAll('button').forEach((button) => button.remove());

    const heading = clone.querySelector('h2');
    const title = heading?.textContent?.replace(/\s+/g, ' ').trim() || `${index}. ${dsaPatterns[index - 1]}`;

    if (heading) {
      heading.remove();
    }

    parsed.push({
      id,
      index,
      title,
      contentHtml: formatCodeBlocksInHtml(clone.innerHTML.trim()),
    });
  }

  if (parsed.length > 0) {
    return parsed;
  }

  const contentRoot = doc.querySelector('.content') || doc.querySelector('main') || doc.body;
  const headingCandidates = Array.from(contentRoot.querySelectorAll('h2, h3, h4'));
  const numberedHeadings = headingCandidates.filter((heading) => /^\s*\d+\./.test(heading.textContent || ''));

  numberedHeadings.forEach((heading, headingIndex) => {
    const titleText = (heading.textContent || '').replace(/\s+/g, ' ').trim();
    const match = titleText.match(/^(\d+)\./);

    if (!match) {
      return;
    }

    const index = Number(match[1]);

    if (Number.isNaN(index) || index < 1 || index > 15) {
      return;
    }

    const wrapper = doc.createElement('div');
    let node = heading.nextElementSibling;
    const nextHeading = numberedHeadings[headingIndex + 1] || null;

    while (node && node !== nextHeading) {
      wrapper.appendChild(node.cloneNode(true));
      node = node.nextElementSibling;
    }

    parsed.push({
      id: `pattern-${index}`,
      index,
      title: titleText,
      contentHtml: formatCodeBlocksInHtml(wrapper.innerHTML.trim()),
    });
  });

  parsed.sort((a, b) => a.index - b.index);

  return parsed;
}

gsap.registerPlugin(ScrollTrigger);

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
      <span
        className={`tag-base tag-chevron gsap-tag ${toneClass}`}
        style={{ clipPath: 'polygon(0 0, 88% 0, 100% 50%, 88% 100%, 0 100%, 12% 50%)' }}
      >
        {label}
      </span>
    );
  }

  return (
    <span className={`tag-base gsap-tag ${toneClass}`}>
      {label}
    </span>
  );
}

function FactCard({ label, value, detail, icon }) {
  return (
    <article className="brutal-card fact-card gsap-card rounded-3xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-black/65">{label}</p>
        <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-black bg-white text-black shadow-[4px_4px_0_#111]">
          {icon}
        </span>
      </div>
      <p className="mt-4 text-2xl font-extrabold tracking-tight text-black">{value}</p>
      <p className="mt-2 text-sm leading-6 text-black/80">{detail}</p>
    </article>
  );
}

function App() {
  const [soundOn, setSoundOn] = useState(true);
  const [audioActive, setAudioActive] = useState(false);
  const [learningOpen, setLearningOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(0);
  const [dsaSections, setDsaSections] = useState([]);
  const [activeDsaId, setActiveDsaId] = useState('pattern-1');
  const [dsaSidebarCollapsed, setDsaSidebarCollapsed] = useState(false);
  const rootRef = useRef(null);
  const audioContextRef = useRef(null);
  const audioNodesRef = useRef(null);
  const streamAudioRef = useRef(null);
  const startAudioRef = useRef(async () => false);
  const stopAudioRef = useRef(() => {});

  const headerLabel = useMemo(() => {
    if (!soundOn) {
      return 'Sound: OFF';
    }

    return audioActive ? 'Sound: ON' : 'Sound: Tap to Start';
  }, [soundOn, audioActive]);
  const activeDsaSection = useMemo(
    () => dsaSections.find((section) => section.id === activeDsaId) || dsaSections[0],
    [dsaSections, activeDsaId],
  );

  useEffect(() => {
    let isMounted = true;

    const loadDsaData = async () => {
      const candidateUrls = [
        `${import.meta.env.BASE_URL}dsaPattern.html`,
        '/dsaPattern.html',
        'dsaPattern.html',
      ];

      try {
        for (const url of candidateUrls) {
          const response = await fetch(url);

          if (!response.ok) {
            continue;
          }

          const html = await response.text();
          const parsed = parseDsaSectionsFromHtml(html);

          if (!isMounted) {
            return;
          }

          if (parsed.length > 0) {
            setDsaSections(parsed);
            setActiveDsaId(parsed[0].id);
            return;
          }
        }
      } catch {
        // Falls back to lightweight local data when fetch or parsing fails.
      }

      if (!isMounted) {
        return;
      }

      const fallbackSections = dsaPatterns.map((pattern, index) => ({
        id: `pattern-${index + 1}`,
        index: index + 1,
        title: `${index + 1}. ${pattern}`,
        contentHtml: `<p><strong>${pattern}</strong> section is available in the full guide and can be opened using the button below.</p>`,
      }));

      setDsaSections(fallbackSections);
      setActiveDsaId('pattern-1');
    };

    loadDsaData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const startStreamAudio = async () => {
      if (streamAudioRef.current) {
        if (streamAudioRef.current.paused) {
          await streamAudioRef.current.play();
        }
        return true;
      }

      const stream = new Audio(LOFI_STREAM_URL);
      stream.preload = 'none';
      stream.volume = 0.35;
      stream.crossOrigin = 'anonymous';
      streamAudioRef.current = stream;

      try {
        await stream.play();
        return true;
      } catch {
        stream.pause();
        streamAudioRef.current = null;
        return false;
      }
    };

    const stopStreamAudio = () => {
      if (!streamAudioRef.current) {
        return;
      }

      streamAudioRef.current.pause();
      streamAudioRef.current.src = '';
      streamAudioRef.current.load();
      streamAudioRef.current = null;
    };

    const createNoiseBuffer = (audioContext) => {
      const length = audioContext.sampleRate * 2;
      const buffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < length; i += 1) {
        const white = Math.random() * 2 - 1;
        data[i] = i === 0 ? white : (data[i - 1] + 0.02 * white) / 1.02;
        data[i] *= 0.28;
      }

      return buffer;
    };

    const startLofi = async () => {
      const didStartStream = await startStreamAudio();

      if (didStartStream) {
        return true;
      }

      if (audioNodesRef.current && audioContextRef.current?.state === 'running') {
        return true;
      }

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;

      if (!AudioContextClass) {
        return false;
      }

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextClass();
      }

      const audioContext = audioContextRef.current;

      if (audioContext.state !== 'running') {
        try {
          await audioContext.resume();
        } catch {
          return false;
        }
      }

      if (audioContext.state !== 'running') {
        return false;
      }

      if (audioNodesRef.current) {
        return true;
      }

      const masterGain = audioContext.createGain();
      masterGain.gain.value = 0.12;
      masterGain.connect(audioContext.destination);

      const padRoot = audioContext.createOscillator();
      const padThird = audioContext.createOscillator();
      const padFifth = audioContext.createOscillator();
      padRoot.type = 'triangle';
      padThird.type = 'sine';
      padFifth.type = 'sine';
      padRoot.detune.value = -4;
      padThird.detune.value = 3;
      padFifth.detune.value = -2;

      const padFilter = audioContext.createBiquadFilter();
      padFilter.type = 'lowpass';
      padFilter.frequency.value = 780;
      padFilter.Q.value = 0.8;

      const padGain = audioContext.createGain();
      padGain.gain.value = 0.18;

      const wobble = audioContext.createOscillator();
      wobble.type = 'sine';
      wobble.frequency.value = 0.09;

      const wobbleDepth = audioContext.createGain();
      wobbleDepth.gain.value = 220;
      wobble.connect(wobbleDepth);
      wobbleDepth.connect(padFilter.frequency);

      padRoot.connect(padFilter);
      padThird.connect(padFilter);
      padFifth.connect(padFilter);
      padFilter.connect(padGain);
      padGain.connect(masterGain);

      const noise = audioContext.createBufferSource();
      noise.buffer = createNoiseBuffer(audioContext);
      noise.loop = true;

      const noiseFilter = audioContext.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.value = 1100;
      noiseFilter.Q.value = 0.25;

      const noiseGain = audioContext.createGain();
      noiseGain.gain.value = 0.03;

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);

      const chordProgression = [
        [130.81, 164.81, 196.0],
        [123.47, 155.56, 196.0],
        [146.83, 174.61, 220.0],
        [110.0, 138.59, 174.61],
      ];

      const applyChord = (chord, atTime) => {
        const [root, third, fifth] = chord;
        padRoot.frequency.cancelScheduledValues(atTime);
        padThird.frequency.cancelScheduledValues(atTime);
        padFifth.frequency.cancelScheduledValues(atTime);
        padRoot.frequency.linearRampToValueAtTime(root, atTime + 1.8);
        padThird.frequency.linearRampToValueAtTime(third, atTime + 1.8);
        padFifth.frequency.linearRampToValueAtTime(fifth, atTime + 1.8);
      };

      const now = audioContext.currentTime;
      applyChord(chordProgression[0], now);
      padGain.gain.setValueAtTime(0.0001, now);
      padGain.gain.exponentialRampToValueAtTime(0.16, now + 1.5);
      noiseGain.gain.setValueAtTime(0.0001, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.03, now + 1.2);

      let chordIndex = 0;
      const chordTimer = window.setInterval(() => {
        chordIndex = (chordIndex + 1) % chordProgression.length;
        applyChord(chordProgression[chordIndex], audioContext.currentTime);
      }, 8000);

      padRoot.start();
      padThird.start();
      padFifth.start();
      wobble.start();
      noise.start();

      audioNodesRef.current = {
        masterGain,
        padGain,
        noiseGain,
        sources: [padRoot, padThird, padFifth, wobble, noise],
        chordTimer,
      };

      return true;
    };

    const stopLofi = () => {
      stopStreamAudio();

      const audioContext = audioContextRef.current;
      const nodes = audioNodesRef.current;

      if (!audioContext || !nodes) {
        return;
      }

      const now = audioContext.currentTime;
      window.clearInterval(nodes.chordTimer);
      nodes.padGain.gain.cancelScheduledValues(now);
      nodes.noiseGain.gain.cancelScheduledValues(now);
      nodes.padGain.gain.setValueAtTime(nodes.padGain.gain.value || 0.2, now);
      nodes.noiseGain.gain.setValueAtTime(nodes.noiseGain.gain.value || 0.05, now);
      nodes.padGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      nodes.noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      nodes.sources.forEach((source) => {
        try {
          source.stop(now + 0.36);
        } catch {
          // Source may already be stopped.
        }
      });

      audioNodesRef.current = null;
      setAudioActive(false);
    };

    startAudioRef.current = startLofi;
    stopAudioRef.current = stopLofi;

    const tryStartAudio = async () => {
      try {
        const didStart = await startLofi();
        setAudioActive(didStart);
        return didStart;
      } catch {
        setAudioActive(false);
        return false;
      }
    };

    const handleInteraction = async () => {
      if (!soundOn) {
        return;
      }

      const didStart = await tryStartAudio();

      if (didStart) {
        window.removeEventListener('pointerdown', handleInteraction);
        window.removeEventListener('keydown', handleInteraction);
      }
    };

    if (soundOn) {
      tryStartAudio();
      window.addEventListener('pointerdown', handleInteraction);
      window.addEventListener('keydown', handleInteraction);
    } else {
      stopLofi();
      setAudioActive(false);
      window.removeEventListener('pointerdown', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    }

    return () => {
      window.removeEventListener('pointerdown', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      stopLofi();
    };
  }, [soundOn]);

  const handleSoundToggle = async () => {
    if (!soundOn) {
      setSoundOn(true);
      return;
    }

    if (audioActive) {
      stopAudioRef.current();
      setSoundOn(false);
      return;
    }

    const started = await startAudioRef.current();

    if (started) {
      setAudioActive(true);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const safeEase = 'power3.out';

      gsap.from('.header-shell', {
        y: -70,
        opacity: 0,
        duration: 0.75,
        ease: safeEase,
      });

      const heroTl = gsap.timeline({ defaults: { ease: safeEase } });
      heroTl
        .from('.hero-shell', { opacity: 0, y: 30, duration: 0.8 })
        .from('.hero-lead', { opacity: 0, y: 20, duration: 0.6, stagger: 0.08 }, '-=0.3')
        .from('.hero-cta', { opacity: 0, y: 16, duration: 0.55, stagger: 0.08 }, '-=0.25');

      gsap.to('.floating-chip', {
        y: -7,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.utils.toArray('.gsap-pill').forEach((el, index) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
          y: 24,
          opacity: 0,
          duration: 0.65,
          delay: index * 0.03,
          ease: safeEase,
        });
      });

      gsap.utils.toArray('.gsap-tag').forEach((el, index) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
          y: 18,
          scale: 0.95,
          opacity: 0,
          duration: 0.55,
          delay: index * 0.03,
          ease: safeEase,
        });
      });

      gsap.utils.toArray('.gsap-card').forEach((el, index) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
          y: 30,
          opacity: 0,
          scale: 0.97,
          duration: 0.7,
          delay: index * 0.02,
          ease: safeEase,
        });
      });

      gsap.from('.awwwards-ribbon', {
        x: 35,
        opacity: 0,
        duration: 0.8,
        ease: safeEase,
        delay: 0.35,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="neo-root min-h-screen overflow-hidden text-black">
      <header className="header-shell sticky top-0 z-40 border-b-2 border-black bg-mustard shadow-[0_8px_0_#111]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="inline-flex items-center gap-3 rounded-full border-2 border-black bg-white px-4 py-2 shadow-[6px_6px_0_#111] transition-transform duration-200 hover:-translate-y-0.5">
            <div className="floating-chip grid h-11 w-11 place-items-center rounded-full border-2 border-black bg-black text-sm font-black text-white">
              NK
            </div>
            <div className="leading-tight">
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-black/70">Portfolio</p>
              <h1 className="text-sm font-extrabold sm:text-base">Naveen Kumar</h1>
            </div>
          </a>

          <nav className="hidden items-center gap-3 md:flex">
            {['About', 'Facts', 'Work', 'Learning', 'Contact'].map((item) => (
              <a
                key={item}
                href={item === 'Learning' ? '#learning' : `#${item.toLowerCase()}`}
                className="gsap-pill rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-bold shadow-[5px_5px_0_#111] transition-transform duration-200 hover:-translate-y-0.5"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSoundToggle}
              className="gsap-pill inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-bold shadow-[5px_5px_0_#111] transition-transform duration-200 hover:-translate-y-0.5"
              aria-pressed={soundOn}
              aria-label="Toggle sound"
            >
              <Speaker className="h-4 w-4" />
              <span>{headerLabel}</span>
            </button>

            <button
              type="button"
              onClick={() => setLearningOpen((current) => !current)}
              className="gsap-pill hidden items-center gap-2 rounded-full border-2 border-black bg-black px-4 py-2 text-sm font-bold text-white shadow-[5px_5px_0_#111] transition-transform duration-200 hover:-translate-y-0.5 lg:inline-flex"
              aria-expanded={learningOpen}
              aria-controls="learning-sidebar"
            >
              <BookOpen className="h-4 w-4" />
              Learning
            </button>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-black bg-white shadow-[5px_5px_0_#111] md:hidden"
              onClick={() => setLearningOpen((current) => !current)}
              aria-label="Open learning sidebar"
              aria-expanded={learningOpen}
              aria-controls="learning-sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <aside className="awwwards-ribbon hidden xl:block">
        <div className="rounded-none border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.35em] shadow-[6px_6px_0_#111]">
          Awwwards nominee
        </div>
      </aside>

      <aside
        id="learning-sidebar"
        className={`learning-sidebar ${learningOpen ? 'learning-sidebar-open' : ''}`}
        aria-label="Learning sidebar"
      >
        <div className="learning-head">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-black/60">Learning Hub</p>
          <button
            type="button"
            className="rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.2em] shadow-[4px_4px_0_#111]"
            onClick={() => setLearningOpen(false)}
          >
            Close
          </button>
        </div>
        <h3 className="mt-4 text-2xl font-black leading-tight">What I am currently learning</h3>
        <p className="mt-3 text-sm leading-7 text-black/80">
          A compact section with active study tracks that influence current project work.
        </p>
        <div className="mt-5 space-y-3">
          {learningModules.map((module, index) => {
            const expanded = activeModule === index;

            return (
              <article key={module.title} className="learning-item">
                <button
                  type="button"
                  className="learning-trigger"
                  onClick={() => setActiveModule(expanded ? -1 : index)}
                  aria-expanded={expanded}
                >
                  <span className="inline-flex items-center gap-2 text-left">
                    {[<BookOpen className="h-4 w-4" />, <BrainCircuit className="h-4 w-4" />, <Code2 className="h-4 w-4" />, <GraduationCap className="h-4 w-4" />][index]}
                    {module.title}
                  </span>
                  <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`} />
                </button>
                <div className={`learning-content ${expanded ? 'learning-content-open' : ''}`}>
                  <p className="pt-2 text-sm leading-6 text-black/80">{module.summary}</p>
                  <ul className="mt-2 space-y-2 pb-2 text-sm text-black/85">
                    {module.bullets.map((point) => (
                      <li key={point} className="learning-bullet">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </aside>

      <main id="home" className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <section className="hero-shell brutal-card hero-card gsap-card grid gap-8 rounded-[2.25rem] p-5 sm:p-7 lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
          <div className="space-y-6">
            <div className="hero-lead gsap-pill inline-flex items-center gap-2 rounded-full border-2 border-black bg-lilac px-4 py-2 text-sm font-bold shadow-[5px_5px_0_#111]">
              <Sparkles className="h-4 w-4" />
              Product / Front-end / Strategy
            </div>

            <div className="space-y-5">
              <p className="hero-lead gsap-pill inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-bold shadow-[5px_5px_0_#111]">
                <Target className="h-4 w-4" />
                I design systems, organize products, and transform interfaces.
              </p>
              <h2 className="hero-lead max-w-3xl text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
                Bold interfaces for modern products, with a human edge.
              </h2>
              <p className="hero-lead max-w-2xl text-base leading-8 text-black/80 sm:text-lg">
                Hi, I’m Naveen Kumar, but you can call me Naveen :). I build responsive web experiences with React, JavaScript, Tailwind CSS, Node.js, Express.js, and MongoDB.
                The goal is simple: make the product easy to understand, easy to use, and hard to forget.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#work" className="hero-cta gsap-pill inline-flex items-center justify-center gap-2 rounded-full border-2 border-black bg-black px-6 py-3 font-bold text-white shadow-[6px_6px_0_#111] transition-transform duration-200 hover:-translate-y-0.5">
                View work
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="hero-cta gsap-pill inline-flex items-center justify-center gap-2 rounded-full border-2 border-black bg-white px-6 py-3 font-bold text-black shadow-[6px_6px_0_#111] transition-transform duration-200 hover:-translate-y-0.5">
                Contact me
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              {expertiseTags.map((tag) => (
                <Tag key={tag.label} label={tag.label} tone={tag.tone} chevron={tag.chevron} />
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="brutal-card gsap-card rounded-4xl p-4 sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-black/60">Hero card</p>
                  <h3 className="mt-2 text-2xl font-black">Pixel portrait + bio</h3>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-black/80">
                    A contained profile card that keeps the center of gravity on the content.
                  </p>
                </div>
                <span className="floating-chip rounded-full border-2 border-black bg-green-300 px-3 py-1 text-xs font-black uppercase shadow-[4px_4px_0_#111]">
                  Online
                </span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
                <div className="portrait-frame gsap-card">
                  <img src={profileImage} alt="Naveen Kumar" className="pixel-portrait h-full w-full object-cover object-center" />
                </div>

                <div className="space-y-3">
                  <div className="gsap-card rounded-3xl border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-black/60">Micro-copy</p>
                    <p className="mt-2 text-sm leading-7 text-black/85">
                      Estrategia, sistemas vivos e interfaces com personalidade. Minimal? No. Clear? Always.
                    </p>
                  </div>
                  <div className="gsap-card rounded-3xl border-2 border-black bg-lilac p-4 shadow-[6px_6px_0_#111]">
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-black/60">Profile note</p>
                    <p className="mt-2 text-sm leading-7 text-black/85">
                      Clean geometry, thick borders, and hard shadows keep the UI loud without losing readability.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="brutal-card gsap-card rounded-[1.75rem] p-5">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-black/60">Stack</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {stackHighlights.map((item) => (
                    <span key={item} className="tag-base gsap-tag tag-yellow">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="brutal-card gsap-card rounded-[1.75rem] p-5">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-black/60">Tone</p>
                <p className="mt-3 text-lg font-black leading-7">
                  Bold, confident, friendly. The interface should feel physical, not flat.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="brutal-card gsap-card rounded-4xl p-6 sm:p-7">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-black/60">About</p>
            <h3 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
              I care about systems that stay readable, even when they get busy.
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-8 text-black/80">
              This page is built around fast hierarchy, strong contrast, and cards that look like objects on a desk.
              The result is a portfolio that feels immediate, expressive, and practical for real client conversations.
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-3xl border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
              <Users className="h-5 w-5" />
              <p className="text-sm font-medium text-black/80">Friendly microcopy, bold structure, and accessible contrast work together.</p>
            </div>
          </div>

          <div className="brutal-card gsap-card rounded-4xl p-6 sm:p-7">
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
          </div>
        </section>

        <section id="work" className="mt-8">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.32em] text-black/60">Work</p>
              <h3 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Functional grouping that stays easy to scan.</h3>
            </div>
            <div className="gsap-pill rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-bold shadow-[5px_5px_0_#111]">
              Clear value prop first
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="brutal-card gsap-card rounded-[1.75rem] p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-black uppercase tracking-[0.28em] text-black/60">0{index + 1}</p>
                  <ChevronRight className="h-5 w-5" />
                </div>
                <h4 className="mt-5 text-2xl font-black tracking-tight">{project.title}</h4>
                <p className="mt-3 text-sm leading-7 text-black/80">{project.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="learning" className="mt-8">
          <article className="brutal-card gsap-card rounded-4xl p-6 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.32em] text-black/60">Learning</p>
                <h3 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                  Continuous study powering better product decisions.
                </h3>
              </div>
              <button
                type="button"
                className="gsap-pill inline-flex items-center gap-2 rounded-full border-2 border-black bg-black px-5 py-3 font-bold text-white shadow-[6px_6px_0_#111]"
                onClick={() => setLearningOpen((current) => !current)}
                aria-expanded={learningOpen}
                aria-controls="learning-sidebar"
              >
                <BookOpen className="h-4 w-4" />
                Open Sidebar
              </button>
            </div>
            <p className="mt-4 max-w-3xl leading-8 text-black/80">
              Explore the collapsible Learning Hub to see current tracks in frontend, backend, and product strategy.
            </p>

            <div className={`mt-6 dsa-viewer grid gap-4 ${dsaSidebarCollapsed ? 'dsa-viewer-collapsed' : ''}`}>
              <aside className={`gsap-card dsa-side rounded-3xl border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111] ${dsaSidebarCollapsed ? 'dsa-side-collapsed' : ''}`}>
                <div className="flex items-center justify-between gap-2">
                  <p className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-lilac px-3 py-1 text-xs font-black uppercase tracking-[0.2em] shadow-[4px_4px_0_#111]">
                    <BookOpen className="h-3.5 w-3.5" />
                    DSA Pattern
                  </p>
                  <button
                    type="button"
                    onClick={() => setDsaSidebarCollapsed((current) => !current)}
                    className="gsap-pill inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-mustard shadow-[4px_4px_0_#111]"
                    aria-label="Toggle DSA sidebar"
                    aria-expanded={!dsaSidebarCollapsed}
                  >
                    <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${dsaSidebarCollapsed ? '' : 'rotate-180'}`} />
                  </button>
                </div>

                <div className="dsa-side-body mt-4 space-y-2">
                  {dsaSections.map((section) => {
                    const isActive = section.id === activeDsaId;

                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => setActiveDsaId(section.id)}
                        className={`dsa-nav-item w-full rounded-2xl border-2 px-3 py-3 text-left text-sm font-bold shadow-[4px_4px_0_#111] transition ${
                          isActive
                            ? 'border-black bg-yellow-200 text-black'
                            : 'border-black/70 bg-white text-black/75 hover:bg-lilac-soft hover:text-black'
                        }`}
                        title={section.title}
                      >
                        <span className="mr-2 inline-flex min-w-7 justify-center rounded-full border border-black bg-white px-1 py-0.5 text-[11px] font-black">
                          {section.index}
                        </span>
                        <span className={`dsa-nav-label ${dsaSidebarCollapsed ? 'dsa-nav-label-hidden' : ''}`}>
                          {section.title.replace(/^\d+\.\s*/, '')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </aside>

              <div className="gsap-card dsa-content-shell rounded-3xl border-2 border-black bg-lilac-soft p-5 shadow-[6px_6px_0_#111]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h4 className="text-2xl font-black tracking-tight">
                    {activeDsaSection?.title || 'Loading DSA patterns...'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setLearningOpen(true)}
                      className="gsap-pill inline-flex items-center justify-center gap-2 rounded-full border-2 border-black bg-black px-4 py-2 text-sm font-bold text-white shadow-[6px_6px_0_#111]"
                    >
                      Open Learning Sidebar
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <a
                      href="/dsaPattern.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gsap-pill inline-flex items-center justify-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-bold text-black shadow-[6px_6px_0_#111]"
                    >
                      View Full DSA Guide
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                {activeDsaSection ? (
                  <div className="dsa-rich-content" dangerouslySetInnerHTML={{ __html: activeDsaSection.contentHtml }} />
                ) : (
                  <p className="mt-5 text-sm font-medium text-black/70">Loading section content...</p>
                )}
              </div>
            </div>
          </article>
        </section>

        <section id="contact" className="mt-8 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="brutal-card gsap-card rounded-4xl p-6 sm:p-7">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-black/60">Contact</p>
            <h3 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">If the brief is messy, the interface shouldn’t be.</h3>
            <p className="mt-4 leading-8 text-black/80">
              For portfolio updates, product pages, or a full MERN rebuild, I can turn the idea into a bold and structured experience.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="mailto:hello@naveenkumar.dev" className="gsap-pill inline-flex items-center gap-2 rounded-full border-2 border-black bg-black px-5 py-3 font-bold text-white shadow-[6px_6px_0_#111] transition-transform duration-200 hover:-translate-y-0.5">
                Email me
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="https://github.com/SdeNaveenKumar" className="gsap-pill inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-5 py-3 font-bold text-black shadow-[6px_6px_0_#111] transition-transform duration-200 hover:-translate-y-0.5">
                GitHub
              </a>
            </div>
          </div>

          <aside className="brutal-card gsap-card rounded-4xl p-6 sm:p-7">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-black/60">Summary</p>
            <div className="mt-4 space-y-4">
              <div className="gsap-card rounded-3xl border-2 border-black bg-yellow-200 p-4 shadow-[6px_6px_0_#111]">
                <p className="text-sm font-black uppercase tracking-[0.28em] text-black/60">Headline</p>
                <p className="mt-2 text-lg font-black leading-7">I design systems, organize products, and transform interfaces.</p>
              </div>
              <div className="gsap-card rounded-3xl border-2 border-black bg-green-200 p-4 shadow-[6px_6px_0_#111]">
                <p className="text-sm font-black uppercase tracking-[0.28em] text-black/60">UX impact</p>
                <p className="mt-2 text-base leading-7">Excellent contrast, clear grouping, and a confident tone make the page easy to trust.</p>
              </div>
              <div className="gsap-card rounded-3xl border-2 border-black bg-pink-200 p-4 shadow-[6px_6px_0_#111]">
                <p className="text-sm font-black uppercase tracking-[0.28em] text-black/60">Visual note</p>
                <p className="mt-2 text-base leading-7">Rounded cards, hard shadows, and thick outlines create the neo-brutalist look.</p>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default App;
