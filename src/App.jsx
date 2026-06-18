import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const projects = [
  {
    title: "Natural Language SQL Chatbot",
    description:
      "Ask questions in plain English, get real SQL results back. Uses a RAG-style retrieval pipeline built on LangChain and Groq (Llama 3.3 70B), connected to a Northwind MS SQL Server database with 91% semantic accuracy.",
    tech: ["LangChain", "Groq", "MS SQL Server", "Python"],
    demoType: "embedded",
    featured: true,
    number: "01",
  },
  {
    title: "AI CV Screening App",
    description:
      "An enterprise hiring tool built on SAP BTP with a Fiori frontend and Groq-powered resume scoring, deployed live on SAP BTP Cloud Foundry.",
    tech: ["SAP CAP", "Fiori", "BTP", "Groq"],
    liveUrl: "https://cv-screening-app.cfapps.us10-001.hana.ondemand.com/upload.html",
    githubUrl: "https://github.com/akshayy718/cv-screening-app",
    demoLabel: "Live Demo",
    number: "02",
  },
  {
    title: "AI-Powered Universal Data Dashboard",
    description:
      "Upload any spreadsheet, PDF, or document and get instant charts, summaries, and AI-generated insights. Built with Streamlit, Plotly, and Groq.",
    tech: ["Streamlit", "Plotly", "Groq", "pdfplumber"],
    liveUrl: "https://ai-universal-data-dashboard.streamlit.app/",
    githubUrl: "https://github.com/akshayy718/AI-Universal-Data-Dashboard",
    demoLabel: "Live Demo",
    number: "03",
  },
  {
    title: "Brewnova",
    description:
      "A full-stack Django cafe ordering site, rebuilt and deployed from the ground up with a polished UI and live hosting.",
    tech: ["Django", "Python", "HTML/CSS"],
    liveUrl: "https://akshay718.pythonanywhere.com/",
    githubUrl: "https://github.com/akshayy718/Brewnova",
    demoLabel: "Live Demo",
    number: "04",
  },
  {
    title: "GL Entry Approval Automation",
    description:
      "Enterprise approval workflow bridging SAP SuccessFactors and Sage X3. Approvers click approve or reject directly in an email, with full audit logging and OAuth 2.0 security.",
    tech: ["n8n Cloud", "Gmail API", "OAuth 2.0", "SAP"],
    demoUrl: "https://drive.google.com/file/d/1oscpLaeHALSRTYQPnyXWFAlQk9K1nxEc/view?usp=sharing",
    githubUrl: "https://github.com/akshayy718/gl-entry-approval-automation",
    demoLabel: "Watch Demo",
    number: "05",
  },
];

const tools = ["Python", "SAP BTP", "LangChain", "Groq", "RAG", "n8n", "React", "FastAPI", "LLMs"];

function GrainOverlay() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.04] mix-blend-soft-light z-50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}

function CursorGlow() {
  const [pos, setPos] = useState({ x: -300, y: -300 });
  const [target, setTarget] = useState({ x: -300, y: -300 });

  useEffect(() => {
    const handleMove = (e) => {
      setTarget({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    let frameId;
    const animate = () => {
      setPos((prev) => ({
        x: prev.x + (target.x - prev.x) * 0.08,
        y: prev.y + (target.y - prev.y) * 0.08,
      }));
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [target]);

  return (
    <div
      className="pointer-events-none absolute w-[400px] h-[400px] rounded-full opacity-25 blur-[100px] z-0"
      style={{
        background: "radial-gradient(circle, #fbbf24 0%, transparent 70%)",
        left: pos.x - 200,
        top: pos.y - 200,
      }}
    />
  );
}

function MoonIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-12 h-12 rounded-full flex items-center justify-center transition border"
      style={{
        background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
        borderColor: theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
      }}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <SunIcon className="w-5 h-5 text-amber-400" />
      ) : (
        <MoonIcon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
}

function TopNav({ theme, setTheme, border }) {
  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        download
        className={`flex items-center gap-2 pl-5 pr-4 py-3 rounded-full text-sm font-medium bg-amber-400 text-black hover:bg-amber-300 transition`}
      >
        Download CV
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
      <ThemeToggle theme={theme} setTheme={setTheme} />
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState("dark");
  const isDark = theme === "dark";

  const bg = isDark ? "bg-black" : "bg-[#fdfbf7]";
  const text = isDark ? "text-white" : "text-gray-900";
  const subtext = isDark ? "text-gray-400" : "text-gray-600";
  const border = isDark ? "border-gray-800" : "border-gray-200";
  const cardBg = isDark
    ? "bg-white/[0.04] border-white/10"
    : "bg-black/[0.03] border-black/10";

  return (
    <div className={`${bg} ${text} min-h-screen overflow-x-hidden relative transition-colors duration-500`}>
      <GrainOverlay />
      <TopNav theme={theme} setTheme={setTheme} border={border} />

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-24 pb-16 overflow-hidden">
        <CursorGlow />

        <div
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full opacity-15 blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #fbbf24 0%, transparent 70%)" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-amber-500 text-sm md:text-base uppercase tracking-[0.2em] mb-6 relative z-10"
        >
          Available for opportunities &mdash; India / UAE / Remote
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight relative z-10 -ml-1"
        >
          Akshay
          <br />
          Santhosh
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`${subtext} text-base md:text-xl mt-6 max-w-xl relative z-10 md:ml-2`}
        >
          I build AI systems, automate enterprise workflows, and ship full-stack products &mdash; and I'd love to bring that energy to wherever a CSE grad is needed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex gap-4 mt-10 relative z-10 md:ml-2"
        >
          <a
            href="#projects"
            className="bg-amber-400 text-black px-8 py-4 text-lg rounded-full font-medium hover:bg-amber-300 transition"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className={`border ${border} px-8 py-4 text-lg rounded-full font-medium hover:border-amber-400 hover:text-amber-500 transition`}
          >
            Contact Me
          </a>
        </motion.div>
      </section>

      {/* TOOLS MARQUEE */}
      <section className={`border-t ${border} py-8 overflow-hidden relative`}>
        <div className="flex whitespace-nowrap animate-marquee">
          {[...tools, ...tools, ...tools].map((tool, i) => (
            <span
              key={i}
              className={`text-2xl md:text-3xl font-semibold mx-8 flex items-center gap-8 ${
                isDark ? "text-gray-700" : "text-gray-300"
              }`}
            >
              {tool}
              <span className="text-amber-500 text-base">&#9670;</span>
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}</style>
      </section>

      {/* PROJECTS */}
      <section id="projects" className={`border-t ${border} py-24 md:py-32 px-6 md:px-16 lg:px-24`}>
        <div className="flex items-start gap-6 mb-16">
          <span className="text-amber-500 text-sm font-mono mt-2">00</span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Featured Work
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className={`relative ${cardBg} backdrop-blur-xl border rounded-2xl p-8 md:p-10 hover:border-amber-400/50 transition group ${
                project.featured ? "md:col-span-2" : ""
              }`}
            >
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500 pointer-events-none"
                style={{ background: "#fbbf24" }}
              />
              <div
                className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500 pointer-events-none"
                style={{ background: "#7c3aed" }}
              />

              <div className="flex justify-between items-start mb-4 relative z-10">
                <h3 className={`font-bold ${project.featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
                  {project.title}
                </h3>
                <span className={`text-sm font-mono ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                  {project.number}
                </span>
              </div>

              <p className={`${subtext} text-sm leading-relaxed mb-6 relative z-10 max-w-2xl`}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className={`text-xs px-3 py-1 rounded-full ${
                      isDark ? "bg-white/10 text-amber-400" : "bg-black/5 text-amber-600"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="relative z-10">
                {project.demoType === "embedded" ? (
                  <span className="text-sm text-amber-500 font-medium">
                    Live demo below &darr;
                  </span>
                ) : (
                  <div className="flex gap-3">
                    <a
                      href={project.demoUrl || project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm bg-amber-400 text-black px-4 py-2 rounded-full font-medium hover:bg-amber-300 transition"
                    >
                      {project.demoLabel}
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm border ${border} px-4 py-2 rounded-full font-medium hover:border-amber-400 hover:text-amber-500 transition`}
                    >
                      GitHub
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={`border-t ${border} py-24 md:py-32 px-6 md:px-16 lg:px-24`}>
        <div className="flex items-start gap-6 mb-10">
          <span className="text-amber-500 text-sm font-mono mt-2">06</span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Let's talk
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`${subtext} text-lg max-w-xl mb-10 md:ml-16`}
        >
          Whether it's AI, SAP integration, automation, or full-stack development &mdash; if you're building something real, I'd love to be part of it. Open to roles across India, UAE, and remote.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          href="mailto:akshaysanthosh718@gmail.com"
          className="inline-block bg-amber-400 text-black px-10 py-5 text-lg rounded-full font-medium hover:bg-amber-300 transition md:ml-16"
        >
          akshaysanthosh718@gmail.com
        </motion.a>
      </section>

      <footer className={`border-t ${border} py-8 px-6 text-center text-sm ${isDark ? "text-gray-600" : "text-gray-400"}`}>
        Built by Akshay Santhosh
      </footer>
    </div>
  );
}

export default App;
