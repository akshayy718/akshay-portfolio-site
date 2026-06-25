import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  SiPython,
  SiSap,
  SiLangchain,
  SiN8N,
  SiReact,
  SiFastapi,
  SiMysql,
  SiGit,
  SiAndroid,
} from "react-icons/si";
import {
  FaBrain,
  FaMicrochip,
  FaMagic,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaPhone,
} from "react-icons/fa";

const projects = [
  {
    title: "ERP Agentic AI Assistant",
    description:
      "An autonomous AI agent that takes real actions against a live SAP backend, not a mock API. A LangChain agent (Groq Llama 3.3 70B) calls a real SAP CAP service over OAuth2/XSUAA and OData v4 — with a deterministic confirmation gate so the LLM can propose changes but never executes writes on its own.",
    tech: ["LangChain", "Groq", "SAP CAP", "FastAPI", "OAuth2/XSUAA"],
    liveUrl: "https://erp-agentic-ai-assistant.onrender.com",
    githubUrl: "https://github.com/akshayy718/ERP-AGENTIC-AI-ASSISTANT-",
    demoLabel: "Live Demo",
    featured: true,
    number: "01",
  },
  {
    title: "Natural Language SQL Chatbot",
    description:
      "Ask questions in plain English, get real SQL results back. Uses a RAG-style retrieval pipeline built on LangChain and Groq (Llama 3.3 70B), connected to a Northwind MS SQL Server database with 91% semantic accuracy.",
    tech: ["LangChain", "Groq", "MS SQL Server", "Python"],
    githubUrl: "https://github.com/akshayy718/northwind-chatbot",
    demoType: "embedded",
    featured: true,
    number: "02",
  },
  {
    title: "AI CV Screening App",
    description:
      "An enterprise hiring tool built on SAP BTP with a Fiori frontend and Groq-powered resume scoring, deployed live on SAP BTP Cloud Foundry.",
    tech: ["SAP CAP", "Fiori", "BTP", "Groq"],
    liveUrl: "https://cv-screening-app.cfapps.us10-001.hana.ondemand.com/upload.html",
    githubUrl: "https://github.com/akshayy718/cv-screening-app",
    demoLabel: "Live Demo",
    number: "03",
  },
  {
    title: "AI-Powered Universal Data Dashboard",
    description:
      "Upload any spreadsheet, PDF, or document and get instant charts, summaries, and AI-generated insights. Built with Streamlit, Plotly, and Groq.",
    tech: ["Streamlit", "Plotly", "Groq", "pdfplumber"],
    liveUrl: "https://ai-universal-data-dashboard.streamlit.app/",
    githubUrl: "https://github.com/akshayy718/AI-Universal-Data-Dashboard",
    demoLabel: "Live Demo",
    number: "04",
  },
  {
    title: "Brewnova",
    description:
      "A full-stack Django cafe ordering site, rebuilt and deployed from the ground up with a polished UI and live hosting.",
    tech: ["Django", "Python", "HTML/CSS"],
    liveUrl: "https://akshay718.pythonanywhere.com/",
    githubUrl: "https://github.com/akshayy718/Brewnova",
    demoLabel: "Live Demo",
    number: "05",
  },
  {
    title: "GL Entry Approval Automation",
    description:
      "Enterprise approval workflow bridging SAP SuccessFactors and Sage X3. Approvers click approve or reject directly in an email, with full audit logging and OAuth 2.0 security.",
    tech: ["n8n Cloud", "Gmail API", "OAuth 2.0", "SAP"],
    demoUrl: "https://drive.google.com/file/d/1oscpLaeHALSRTYQPnyXWFAlQk9K1nxEc/view?usp=sharing",
    githubUrl: "https://github.com/akshayy718/gl-entry-approval-automation",
    demoLabel: "Watch Demo",
    number: "06",
  },
];

const tools = [
  { name: "Python", icon: SiPython },
  { name: "SAP BTP", icon: SiSap },
  { name: "LangChain", icon: SiLangchain },
  { name: "Groq", icon: FaMicrochip },
  { name: "RAG", icon: FaBrain },
  { name: "n8n", icon: SiN8N },
  { name: "React", icon: SiReact },
  { name: "FastAPI", icon: SiFastapi },
  { name: "LLMs", icon: FaMagic },
  { name: "MySQL", icon: SiMysql },
  { name: "Git", icon: SiGit },
  { name: "Android", icon: SiAndroid },
];

const experience = [
  {
    period: "04/2026 \u2014 Present",
    role: "IT Assistant",
    company: "Ramah General Contracting & Transport L.L.C",
    description:
      "Supporting IT operations for a 1,300+ employee UAE infrastructure contractor. Built a proof-of-concept NL-SQL chatbot for operational reporting, and administer Asite for site documentation across active construction projects.",
    current: true,
  },
  {
    period: "01/2024 \u2014 07/2024",
    role: "AI Intern",
    company: "Corizo",
    description:
      "Built a Cardiovascular Disease Prediction model using TensorFlow and Scikit-learn, gaining hands-on experience with ML frameworks and iterative model development.",
  },
  {
    period: "2023 \u2014 2025",
    role: "Full Stack Developer",
    company: "Freelance",
    description:
      "Developed responsive landing pages for multiple businesses, handling end-to-end client communication, design, and delivery.",
  },
];

const sampleQueries = [
  {
    q: "Which customers have placed the most orders?",
    sql: "SELECT CustomerName, COUNT(*) AS OrderCount\nFROM Orders\nGROUP BY CustomerName\nORDER BY OrderCount DESC\nLIMIT 5;",
    answer: "The top customer is Save-a-lot Markets with 31 orders, followed by Ernst Handel with 30 orders and QUICK-Stop with 28 orders.",
  },
  {
    q: "What's the total revenue from the Beverages category?",
    sql: "SELECT SUM(od.UnitPrice * od.Quantity) AS Revenue\nFROM OrderDetails od\nJOIN Products p ON od.ProductID = p.ProductID\nWHERE p.Category = 'Beverages';",
    answer: "Total revenue from the Beverages category is $267,868.18 across all recorded orders.",
  },
  {
    q: "Show me products that are low in stock",
    sql: "SELECT ProductName, UnitsInStock\nFROM Products\nWHERE UnitsInStock < 10\nORDER BY UnitsInStock ASC;",
    answer: "5 products are critically low: Mishi Kobe Niku (29 units), Alice Mutton (0 units), Thuringer Rostbratwurst (0 units), Gnocchi di nonna Alice (21 units), and Rossle Sauerkraut (26 units).",
  },
  {
    q: "Which employee has generated the highest sales?",
    sql: "SELECT e.FirstName, e.LastName, SUM(od.UnitPrice * od.Quantity) AS TotalSales\nFROM Employees e\nJOIN Orders o ON e.EmployeeID = o.EmployeeID\nJOIN OrderDetails od ON o.OrderID = od.OrderID\nGROUP BY e.EmployeeID\nORDER BY TotalSales DESC\nLIMIT 1;",
    answer: "Margaret Peacock has the highest sales, totaling $232,890.85 across her managed orders.",
  },
];

function GrainOverlay() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.04] mix-blend-soft-light z-50 hidden md:block"
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
      className="pointer-events-none absolute w-[400px] h-[400px] rounded-full opacity-25 blur-[100px] z-0 hidden md:block"
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

const socialLinks = [
  {
    label: "Call",
    href: "tel:+971568387747",
    icon: FaPhone,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/918547232697",
    icon: FaWhatsapp,
  },
  {
    label: "GitHub",
    href: "https://github.com/akshayy718",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/akshay-santhosh-435499208/",
    icon: FaLinkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/_.akshay718",
    icon: FaInstagram,
  },
];

function TiltCard({ children, className, intensity = 8 }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -intensity, y: px * intensity });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </div>
  );
}

function ChatDemo({ isDark, border, subtext }) {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Ask me anything about the Northwind database \u2014 try one of the suggestions below, or type your own question.",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [showSql, setShowSql] = useState(false);

  const handleAsk = (query) => {
    if (!query.trim() || thinking) return;

    const match = sampleQueries.find(
      (s) => s.q.toLowerCase() === query.trim().toLowerCase()
    );

    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      if (match) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: match.answer, sql: match.sql },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text:
              "This is a preview build with a fixed set of sample questions. Try one of the suggestions below to see a full response, including the generated SQL.",
          },
        ]);
      }
      setThinking(false);
    }, 1100);
  };

  return (
    <div
      className={`relative ${
        isDark ? "bg-white/[0.03] border-white/10" : "bg-black/[0.02] border-black/10"
      } backdrop-blur-xl border rounded-2xl p-6 md:p-8 mt-6`}
    >
      <p className="text-xs uppercase tracking-widest text-amber-500 mb-4">
        Interactive Preview &mdash; sample questions only
      </p>

      <div className="flex flex-col gap-3 mb-5 max-h-72 overflow-y-auto pr-1">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`text-sm leading-relaxed ${
              m.role === "user"
                ? "self-end bg-amber-400 text-black px-4 py-2 rounded-xl rounded-br-sm max-w-[85%]"
                : `self-start ${subtext} max-w-[95%]`
            }`}
          >
            {m.text}
            {m.sql && (
              <div className="mt-2">
                <button
                  onClick={() => setShowSql((prev) => !prev)}
                  className="text-[10px] uppercase tracking-widest text-amber-500/70 hover:text-amber-500 mb-1 flex items-center gap-1"
                >
                  {showSql ? "Hide" : "Show"} Generated SQL
                </button>
                {showSql && (
                  <pre
                    className={`text-xs p-3 rounded-lg overflow-x-auto ${
                      isDark ? "bg-black/40 text-gray-300" : "bg-black/5 text-gray-700"
                    }`}
                  >
                    {m.sql}
                  </pre>
                )}
              </div>
            )}
          </div>
        ))}
        {thinking && (
          <div className={`self-start text-sm ${subtext}`}>
            Generating SQL and querying database&hellip;
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {sampleQueries.map((s) => (
          <button
            key={s.q}
            onClick={() => handleAsk(s.q)}
            disabled={thinking}
            className={`text-xs px-3 py-2 rounded-full border ${border} hover:border-amber-400 hover:text-amber-500 transition disabled:opacity-40`}
          >
            {s.q}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk(input)}
          placeholder="Type a question..."
          disabled={thinking}
          className={`flex-1 text-sm px-4 py-3 rounded-full border ${border} bg-transparent outline-none focus:border-amber-400 transition disabled:opacity-50`}
        />
        <button
          onClick={() => handleAsk(input)}
          disabled={thinking}
          className="text-sm bg-amber-400 text-black px-5 py-3 rounded-full font-medium hover:bg-amber-300 transition disabled:opacity-50"
        >
          Ask
        </button>
      </div>
    </div>
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
          className="absolute top-1/4 left-1/3 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full opacity-15 blur-[60px] md:blur-[120px] pointer-events-none"
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
          {[...tools, ...tools, ...tools].map((tool, i) => {
            const Icon = tool.icon;
            return (
              <span
                key={i}
                className={`text-xl md:text-2xl font-semibold mx-8 flex items-center gap-3 ${
                  isDark ? "text-gray-700" : "text-gray-300"
                }`}
              >
                <Icon className="w-5 h-5 text-amber-500" strokeWidth={2} />
                {tool.name}
                <span className="text-amber-500 text-base ml-5">&#9670;</span>
              </span>
            );
          })}
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
              className={project.featured ? "md:col-span-2" : ""}
            >
            <TiltCard
              intensity={project.demoType === "embedded" ? 2 : 8}
              className={`relative ${cardBg} backdrop-blur-xl border rounded-2xl p-8 md:p-10 hover:border-amber-400/50 transition group`}
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
                  <>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-block text-sm border ${border} px-4 py-2 rounded-full font-medium hover:border-amber-400 hover:text-amber-500 transition mb-4`}
                      >
                        GitHub
                      </a>
                    )}
                    <ChatDemo isDark={isDark} border={border} subtext={subtext} />
                  </>
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
            </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE TIMELINE */}
      <section className={`border-t ${border} py-24 md:py-32 px-6 md:px-16 lg:px-24`}>
        <div className="flex items-start gap-6 mb-16">
          <span className="text-amber-500 text-sm font-mono mt-2">05</span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Career Path
          </motion.h2>
        </div>

        <div className="relative max-w-3xl">
          <div
            className={`absolute left-[7px] top-2 bottom-2 w-px ${
              isDark ? "bg-gray-800" : "bg-gray-300"
            }`}
          />
          <div className="flex flex-col gap-12">
            {experience.map((job, i) => (
              <motion.div
                key={job.role + job.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-10"
              >
                <div
                  className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                    job.current
                      ? "bg-amber-400 border-amber-400"
                      : `${isDark ? "bg-black" : "bg-white"} border-gray-500`
                  }`}
                />
                <p className="text-amber-500 text-sm font-mono mb-1">{job.period}</p>
                <h3 className="text-xl font-bold">{job.role}</h3>
                <p className={`${subtext} text-sm font-medium mb-2`}>{job.company}</p>
                <p className={`${subtext} text-sm leading-relaxed max-w-xl`}>
                  {job.description}
                </p>
              </motion.div>
            ))}
          </div>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex gap-3 mt-8 md:ml-16"
        >
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`w-12 h-12 rounded-full flex items-center justify-center border ${border} hover:border-amber-400 hover:text-amber-500 transition`}
              >
                <Icon className="w-5 h-5" strokeWidth={1.8} />
              </a>
            );
          })}
        </motion.div>
      </section>

      <footer className={`border-t ${border} py-8 px-6 text-center text-sm ${isDark ? "text-gray-600" : "text-gray-400"}`}>
        Built by Akshay Santhosh
      </footer>
    </div>
  );
}

export default App;
