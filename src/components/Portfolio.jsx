import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";

/* ---------------------------------------------------------
   DATA — edit this block to update the portfolio content
--------------------------------------------------------- */

const PROFILE = {
  name: "Sharmitha",
  tagline1: "Computer Science Undergraduate",
  tagline2: "Aspiring Software Developer",
  email: "sharmitha@example.com",
  phone: "+91 98765 43210",
  github: "https://github.com/sharmitha",
  linkedin: "https://linkedin.com/in/sharmitha",
};

const ABOUT =
  "Motivated Computer Science undergraduate with experience in Python, C, JavaScript and IoT-based systems. Passionate about building creative solutions while continuously learning new technologies.";

const EDUCATION = [
  {
    degree: "Bachelor of Engineering",
    field: "Computer Science and Engineering",
    place: "Arunachala College of Engineering",
    affiliation: "Anna University",
    note: "Expected Graduation: 2027",
  },
];

const SKILLS = {
  Programming: ["Python", "C", "Java", "JavaScript"],
  Web: ["HTML", "CSS"],
  Tools: ["GitHub", "VS Code", "Arduino", "Tableau"],
};

const PROJECTS = [
  {
    title: "IoT Based Teacher Absence Detection System",
    bits: ["ESP8266", "Sensors", "Real-time monitoring", "Automation"],
    rotate: -3,
  },
];

const CERTIFICATIONS = {
  NPTEL: [
    "Programming in C",
    "Programming in Python",
    "Foundation in Data Science",
    "Introduction to Machine Learning",
  ],
  SCALAR: ["Fundamentals of JavaScript"],
};

const WORKSHOPS = [
  "IoT & Embedded Systems Workshop",
  "Web Development Bootcamp",
  "UI/UX Design Sprint",
  "Data Science Foundations Seminar",
];

const INDUSTRIAL_VISITS = [
  {
    place: "Software Technology Park",
    location: "Chennai, Tamil Nadu",
    note: "Explored enterprise software development and agile workflows in practice.",
  },
];

const SYMPOSIA = [
  {
    title: "Paper Presentation — Emerging Trends in IoT",
    venue: "National Level Technical Symposium",
    note: "Presented research on low-cost embedded monitoring systems.",
  },
];

/* ---------------------------------------------------------
   DECORATIVE SVG ELEMENTS
--------------------------------------------------------- */

const Flower = ({ className = "", color = "#F8D9E0" }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <g>
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="20"
          cy="11"
          rx="6"
          ry="9"
          fill={color}
          opacity="0.85"
          transform={`rotate(${deg} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="4.5" fill="#F4C95D" />
    </g>
  </svg>
);

const Leaf = ({ className = "", color = "#A9C3A0" }) => (
  <svg viewBox="0 0 30 50" className={className} fill="none">
    <path
      d="M15 2C24 12 26 30 15 48C4 30 6 12 15 2Z"
      fill={color}
      opacity="0.8"
    />
    <path d="M15 6V44" stroke="#7C9A72" strokeWidth="1" opacity="0.5" />
  </svg>
);

const Butterfly = ({ className = "", color = "#E8E3FF" }) => (
  <svg viewBox="0 0 44 36" className={className} fill="none">
    <path
      d="M22 18C18 6 6 2 2 8C-2 14 8 22 22 18Z"
      fill={color}
      opacity="0.9"
    />
    <path
      d="M22 18C26 6 38 2 42 8C46 14 36 22 22 18Z"
      fill={color}
      opacity="0.9"
    />
    <path
      d="M22 18C19 24 12 28 10 32C9 33.5 11 34 13 32C17 28 20 24 22 18Z"
      fill={color}
      opacity="0.7"
    />
    <path
      d="M22 18C25 24 32 28 34 32C35 33.5 33 34 31 32C27 28 24 24 22 18Z"
      fill={color}
      opacity="0.7"
    />
    <line x1="22" y1="10" x2="22" y2="22" stroke="#B9AEE8" strokeWidth="1.5" />
  </svg>
);

const Sparkle = ({ className = "", color = "#F4C95D" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path
      d="M12 0C12.5 7 13 11.5 17 12C13 12.5 12.5 17 12 24C11.5 17 11 12.5 7 12C11 11.5 11.5 7 12 0Z"
      fill={color}
    />
  </svg>
);

const Star = ({ className = "", color = "#F4C95D" }) => (
  <svg viewBox="0 0 20 20" className={className} fill="none">
    <path
      d="M10 0L12 7L19 7L13.5 11.5L15.5 19L10 14.5L4.5 19L6.5 11.5L1 7L8 7Z"
      fill={color}
    />
  </svg>
);

const Cloud = ({ className = "", color = "#FFFFFF" }) => (
  <svg viewBox="0 0 100 50" className={className} fill="none">
    <ellipse cx="30" cy="32" rx="22" ry="14" fill={color} opacity="0.7" />
    <ellipse cx="55" cy="24" rx="26" ry="18" fill={color} opacity="0.7" />
    <ellipse cx="78" cy="32" rx="18" ry="12" fill={color} opacity="0.7" />
  </svg>
);

const MoonIllustration = ({ className = "" }) => (
  <svg viewBox="0 0 60 60" className={className} fill="none">
    <path
      d="M40 4C25 4 13 16 13 31C13 46 25 58 40 58C28 56 19 45 19 31C19 17 28 6 40 4Z"
      fill="#F4E5C2"
    />
    <circle cx="22" cy="20" r="1.6" fill="#F4C95D" />
    <circle cx="33" cy="12" r="1" fill="#F4C95D" />
    <circle cx="44" cy="18" r="1.3" fill="#F4C95D" />
  </svg>
);

const WashiTape = ({ className = "", color = "#F8D9E0", angle = -4 }) => (
  <div
    className={`absolute pointer-events-none ${className}`}
    style={{
      width: 70,
      height: 22,
      background: `repeating-linear-gradient(45deg, ${color}, ${color} 6px, ${color}cc 6px, ${color}cc 12px)`,
      opacity: 0.85,
      transform: `rotate(${angle}deg)`,
      boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
    }}
  />
);

const Paperclip = ({ className = "" }) => (
  <svg viewBox="0 0 24 50" className={className} fill="none">
    <path
      d="M7 6C7 3 9.5 1 12.5 1C15.5 1 18 3.5 18 7V34C18 36.2 16.2 38 14 38C11.8 38 10 36.2 10 34V12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12V30"
      stroke="#B7B0A6"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const RibbonBookmark = ({ color = "#D9E8D5" }) => (
  <svg width="22" height="34" viewBox="0 0 22 34" className="inline-block -mt-1 mr-2">
    <path d="M0 0H22V34L11 25L0 34V0Z" fill={color} />
  </svg>
);

const FloatingPetals = () => {
  const petals = Array.from({ length: 7 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${(i * 13.7) % 100}%`, top: -30 }}
          initial={{ y: -30, opacity: 0, rotate: 0 }}
          animate={{
            y: ["0%", "650%"],
            opacity: [0, 0.8, 0.8, 0],
            rotate: [0, 180, 360],
            x: [0, 20, -10, 0],
          }}
          transition={{
            duration: 14 + (i % 4) * 3,
            repeat: Infinity,
            delay: i * 2.2,
            ease: "linear",
          }}
        >
          <Flower
            className="w-4 h-4"
            color={["#F8D9E0", "#E8E3FF", "#D9E8D5"][i % 3]}
          />
        </motion.div>
      ))}
    </div>
  );
};

const SparkleField = ({ count = 5 }) => {
  const sparkles = Array.from({ length: count });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${(i * 19 + 8) % 95}%`,
            top: `${(i * 31 + 10) % 90}%`,
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4] }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut",
          }}
        >
          <Sparkle className="w-3 h-3" />
        </motion.div>
      ))}
    </div>
  );
};

/* ---------------------------------------------------------
   PAPER TEXTURE BACKGROUND
--------------------------------------------------------- */

const PaperBackground = ({ variant = "cream" }) => {
  const bg =
    variant === "dark"
      ? "#2B2440"
      : variant === "lavender"
      ? "#E8E3FF"
      : variant === "sage"
      ? "#D9E8D5"
      : variant === "beige"
      ? "#F2E7D5"
      : "#FFF9F4";
  return (
    <div className="absolute inset-0 -z-10" style={{ backgroundColor: bg }}>
      <svg className="absolute inset-0 w-full h-full opacity-[0.25]">
        <defs>
          <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1.2" cy="1.2" r="1.2" fill={variant === "dark" ? "#ffffff" : "#C9BFAE"} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 38px, rgba(0,0,0,0.5) 39px)",
        }}
      />
    </div>
  );
};

/* ---------------------------------------------------------
   SHARED UI PRIMITIVES
--------------------------------------------------------- */

const FadeIn = ({ children, delay = 0, y = 28, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const SectionHeading = ({ children, ribbon = "#D9E8D5", dark }) => (
  <FadeIn>
    <h2
      className={`flex items-center text-3xl md:text-4xl mb-10 ${
        dark ? "text-[#F3EEFF]" : "text-[#4A3F55]"
      }`}
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      <RibbonBookmark color={ribbon} />
      {children}
    </h2>
  </FadeIn>
);

const StickyNote = ({ children, color, rotate = 0, className = "" }) => (
  <motion.div
    whileHover={{ y: -6, rotate: rotate * 0.4, boxShadow: "0 14px 24px rgba(80,60,50,0.16)" }}
    initial={{ rotate }}
    className={`px-4 py-3 text-sm md:text-base shadow-[0_4px_10px_rgba(80,60,50,0.10)] ${className}`}
    style={{
      backgroundColor: color,
      fontFamily: "'Nunito', sans-serif",
      color: "#544A3E",
    }}
  >
    {children}
  </motion.div>
);

/* ---------------------------------------------------------
   NAVBAR
--------------------------------------------------------- */

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certificates" },
  { id: "workshops", label: "Workshops" },
  { id: "visits", label: "Visits" },
  { id: "symposium", label: "Symposium" },
  { id: "contact", label: "Contact" },
];

const Navbar = ({ dark, setDark }) => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 pt-3">
      <nav
        className="w-full max-w-5xl rounded-2xl px-4 md:px-6 py-2.5 flex items-center justify-between backdrop-blur-md"
        style={{
          backgroundColor: dark ? "rgba(43,36,64,0.55)" : "rgba(255,249,244,0.55)",
          border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(180,150,120,0.18)"}`,
          boxShadow: "0 4px 18px rgba(80,60,50,0.08)",
        }}
      >
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-1.5 shrink-0"
          aria-label="Go to top"
        >
          <Flower className="w-5 h-5" color={dark ? "#C9B8F5" : "#F8D9E0"} />
          <span
            className={`text-sm md:text-base ${dark ? "text-[#F3EEFF]" : "text-[#5A4A63]"}`}
            style={{ fontFamily: "'Caveat', cursive", fontWeight: 700, fontSize: "20px" }}
          >
            {PROFILE.name}'s journal
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-xs px-2.5 py-1.5 rounded-full transition-colors ${
                dark
                  ? "text-[#E3DBFA] hover:bg-white/10"
                  : "text-[#6B5D5A] hover:bg-[#F8D9E0]/50"
              }`}
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDark(!dark)}
            aria-label="Toggle dark mode"
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${
              dark ? "bg-white/10 text-[#E3DBFA]" : "bg-[#F2E7D5] text-[#8A6D55]"
            }`}
          >
            {dark ? "🌙" : "☀️"}
          </button>
          <button
            className={`lg:hidden w-8 h-8 rounded-full flex items-center justify-center ${
              dark ? "text-[#E3DBFA]" : "text-[#6B5D5A]"
            }`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 w-[92%] max-w-sm rounded-2xl p-3 grid grid-cols-2 gap-1.5 lg:hidden"
            style={{
              backgroundColor: dark ? "#2B2440" : "#FFF9F4",
              border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(180,150,120,0.18)"}`,
              boxShadow: "0 12px 28px rgba(0,0,0,0.18)",
            }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-xs py-2 rounded-lg text-left px-2 ${
                  dark ? "text-[#E3DBFA] hover:bg-white/10" : "text-[#6B5D5A] hover:bg-[#F8D9E0]/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---------------------------------------------------------
   SCROLL PROGRESS — flower vine
--------------------------------------------------------- */

const ScrollVine = ({ dark }) => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <div className="fixed left-2 md:left-4 top-0 bottom-0 w-6 z-40 hidden md:flex flex-col items-center pointer-events-none">
      <div
        className="relative w-[2px] h-full rounded-full overflow-hidden"
        style={{ backgroundColor: dark ? "rgba(255,255,255,0.12)" : "rgba(180,150,120,0.18)" }}
      >
        <motion.div
          className="absolute top-0 left-0 w-full origin-top rounded-full"
          style={{
            scaleY,
            height: "100%",
            background: dark
              ? "linear-gradient(180deg,#C9B8F5,#8E7BD4)"
              : "linear-gradient(180deg,#F8D9E0,#D9E8D5)",
          }}
        />
      </div>
      <motion.div className="absolute" style={{ top: useTransform(scaleY, (v) => `calc(${v * 100}% - 8px)`) }}>
        <Flower className="w-4 h-4" color={dark ? "#C9B8F5" : "#F4C95D"} />
      </motion.div>
    </div>
  );
};

/* ---------------------------------------------------------
   1. HERO
--------------------------------------------------------- */

const Hero = ({ dark }) => (
  <section
    id="hero"
    className="relative min-h-[100svh] flex items-center justify-center px-6 pt-28 pb-16 overflow-hidden"
  >
    <PaperBackground variant={dark ? "dark" : "cream"} />
    <FloatingPetals />
    <SparkleField count={6} />

    <Cloud className="absolute top-24 left-[6%] w-32 opacity-70 hidden md:block" color={dark ? "#3D335A" : "#FFFFFF"} />
    <Cloud className="absolute top-40 right-[8%] w-24 opacity-60 hidden md:block" color={dark ? "#3D335A" : "#FFFFFF"} />
    <Butterfly className="absolute top-[22%] right-[14%] w-10 h-8 hidden md:block" />
    <Leaf className="absolute bottom-10 left-[10%] w-8 h-14 rotate-12 hidden md:block" />
    <Star className="absolute top-[18%] left-[18%] w-4 h-4" color={dark ? "#C9B8F5" : "#F4C95D"} />

    <div className="relative max-w-4xl w-full grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
      <FadeIn delay={0.1}>
        <p
          className={`text-lg md:text-xl mb-2 ${dark ? "text-[#C9B8F5]" : "text-[#B98AA0]"}`}
          style={{ fontFamily: "'Caveat', cursive", fontWeight: 700 }}
        >
          Hello,
        </p>
        <h1
          className={`text-4xl md:text-6xl leading-tight mb-4 ${dark ? "text-[#F3EEFF]" : "text-[#4A3F55]"}`}
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          I'm {PROFILE.name} <span className="inline-block">🌸</span>
        </h1>
        <p
          className={`text-base md:text-lg mb-1 ${dark ? "text-[#D8CFF0]" : "text-[#6B5D5A]"}`}
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          {PROFILE.tagline1}
        </p>
        <p
          className={`text-base md:text-lg mb-8 ${dark ? "text-[#D8CFF0]" : "text-[#6B5D5A]"}`}
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          {PROFILE.tagline2}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <motion.a
            href="#"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2.5 rounded-full text-sm shadow-md"
            style={{
              backgroundColor: dark ? "#8E7BD4" : "#F4C95D",
              color: dark ? "#F3EEFF" : "#5A4326",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
            }}
          >
            Download Resume
          </motion.a>
          {[
            { label: "GitHub", href: PROFILE.github },
            { label: "LinkedIn", href: PROFILE.linkedin },
            { label: "Email", href: `mailto:${PROFILE.email}` },
          ].map((l) => (
            <motion.a
              key={l.label}
              href={l.href}
              whileHover={{ y: -3 }}
              className={`px-4 py-2.5 rounded-full text-sm border ${
                dark
                  ? "border-white/20 text-[#E3DBFA] hover:bg-white/10"
                  : "border-[#D9C9B8] text-[#6B5D5A] hover:bg-white/60"
              }`}
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {l.label}
            </motion.a>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative mx-auto w-56 h-56 md:w-72 md:h-72"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="92" fill={dark ? "#3D335A" : "#F8D9E0"} opacity="0.5" />
            <circle cx="100" cy="78" r="34" fill={dark ? "#5A4D7A" : "#F2E2D0"} />
            <path d="M68 78C68 60 130 60 132 78C134 100 120 120 100 120C80 120 66 100 68 78Z" fill={dark ? "#5A4D7A" : "#F2E2D0"} />
            <path d="M66 70C70 48 130 48 134 70C120 58 80 58 66 70Z" fill={dark ? "#2B2440" : "#6B4A38"} />
            <circle cx="88" cy="82" r="3" fill={dark ? "#2B2440" : "#6B4A38"} />
            <circle cx="112" cy="82" r="3" fill={dark ? "#2B2440" : "#6B4A38"} />
            <path d="M92 94Q100 100 108 94" stroke={dark ? "#2B2440" : "#6B4A38"} strokeWidth="2" fill="none" strokeLinecap="round" />
            <rect x="74" y="118" width="52" height="48" rx="14" fill={dark ? "#8E7BD4" : "#D9E8D5"} />
            <circle cx="60" cy="50" r="3" fill="#F4C95D" />
            <circle cx="140" cy="56" r="2.4" fill="#F4C95D" />
            <circle cx="146" cy="130" r="2.6" fill="#F4C95D" />
          </svg>
        </motion.div>
      </FadeIn>
    </div>

    <motion.div
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-xs ${dark ? "text-[#C9B8F5]" : "text-[#B98AA0]"}`}
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.8, repeat: Infinity }}
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      scroll the pages ↓
    </motion.div>
  </section>
);

/* ---------------------------------------------------------
   2. ABOUT — open diary page
--------------------------------------------------------- */

const About = ({ dark }) => (
  <section id="about" className="relative py-24 px-6 overflow-hidden">
    <PaperBackground variant={dark ? "dark" : "lavender"} />
    <Leaf className="absolute top-10 right-[8%] w-10 h-16 -rotate-12 opacity-70 hidden md:block" />
    <Paperclip className="absolute -top-2 left-[18%] w-6 h-12 rotate-[18deg] hidden md:block" />

    <div className="max-w-3xl mx-auto">
      <SectionHeading ribbon="#E8E3FF" dark={dark}>
        About me
      </SectionHeading>

      <FadeIn delay={0.15}>
        <div
          className="relative rounded-2xl p-8 md:p-12"
          style={{
            backgroundColor: dark ? "#352B52" : "#FFFDF9",
            boxShadow: "0 18px 40px rgba(80,60,50,0.10)",
            border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(200,180,160,0.25)"}`,
          }}
        >
          <div
            className="absolute left-8 top-8 bottom-8 w-px hidden md:block"
            style={{ backgroundColor: dark ? "rgba(255,255,255,0.12)" : "#EADFD2" }}
          />
          <p
            className={`text-lg md:text-xl leading-relaxed md:pl-10 ${
              dark ? "text-[#E3DBFA]" : "text-[#5A4A3E]"
            }`}
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {ABOUT}
          </p>

          <div className="mt-10 flex items-center justify-between flex-wrap gap-4">
            <motion.div
              whileHover={{ rotate: -2, y: -3 }}
              className="px-4 py-2.5 rounded-md shadow-md text-sm relative"
              style={{
                backgroundColor: "#F4C95D",
                color: "#5A4326",
                fontFamily: "'Caveat', cursive",
                fontWeight: 700,
                fontSize: 18,
                transform: "rotate(-3deg)",
              }}
            >
              Always Learning ✦
            </motion.div>
            <div className="flex gap-2">
              <Flower className="w-7 h-7" color="#F8D9E0" />
              <Flower className="w-7 h-7" color="#D9E8D5" />
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

/* ---------------------------------------------------------
   3. EDUCATION — timeline journal entries
--------------------------------------------------------- */

const Education = ({ dark }) => (
  <section id="education" className="relative py-24 px-6 overflow-hidden">
    <PaperBackground variant={dark ? "dark" : "beige"} />
    <Star className="absolute top-16 right-[12%] w-4 h-4" color={dark ? "#C9B8F5" : "#F4C95D"} />

    <div className="max-w-3xl mx-auto">
      <SectionHeading ribbon="#F2E7D5" dark={dark}>
        Education
      </SectionHeading>

      <div className="relative pl-8 md:pl-12">
        <div
          className="absolute left-2 md:left-4 top-2 bottom-2 w-[2px] rounded-full"
          style={{
            background: dark
              ? "repeating-linear-gradient(180deg,#8E7BD4,#8E7BD4 6px,transparent 6px,transparent 12px)"
              : "repeating-linear-gradient(180deg,#D9C9B0,#D9C9B0 6px,transparent 6px,transparent 12px)",
          }}
        />
        {EDUCATION.map((e, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="relative mb-6">
              <div
                className="absolute -left-[34px] md:-left-[42px] top-6 w-3.5 h-3.5 rounded-full"
                style={{
                  backgroundColor: dark ? "#C9B8F5" : "#F4C95D",
                  boxShadow: `0 0 0 4px ${dark ? "#2B2440" : "#F2E7D5"}`,
                }}
              />
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 16px 32px rgba(80,60,50,0.14)" }}
                className="rounded-xl p-6 relative"
                style={{
                  backgroundColor: dark ? "#352B52" : "#FFFDF9",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "#EADFD2"}`,
                  boxShadow: "0 6px 16px rgba(80,60,50,0.07)",
                }}
              >
                <div
                  className="absolute inset-0 rounded-xl opacity-[0.05] pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 22px, currentColor 23px)",
                    color: dark ? "#fff" : "#000",
                  }}
                />
                <p
                  className={`text-xs uppercase tracking-wide mb-1 ${
                    dark ? "text-[#C9B8F5]" : "text-[#B98AA0]"
                  }`}
                  style={{ fontFamily: "'Nunito', sans-serif", letterSpacing: "0.08em" }}
                >
                  {e.note}
                </p>
                <h3
                  className={`text-xl md:text-2xl mb-1 ${dark ? "text-[#F3EEFF]" : "text-[#4A3F55]"}`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {e.degree}
                </h3>
                <p
                  className={`mb-2 ${dark ? "text-[#D8CFF0]" : "text-[#6B5D5A]"}`}
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {e.field}
                </p>
                <p
                  className={`text-sm ${dark ? "text-[#B7A9DE]" : "text-[#8A7A6E]"}`}
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {e.place} &middot; {e.affiliation}
                </p>
              </motion.div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------------------------------------------------
   4. SKILLS — sticky notes
--------------------------------------------------------- */

const SKILL_COLORS = ["#F8D9E0", "#E8E3FF", "#D9E8D5", "#F2E7D5", "#FCEFE0"];

const Skills = ({ dark }) => {
  let colorIdx = 0;
  return (
    <section id="skills" className="relative py-24 px-6 overflow-hidden">
      <PaperBackground variant={dark ? "dark" : "cream"} />
      <Butterfly className="absolute top-12 left-[10%] w-9 h-7 opacity-70 hidden md:block" />

      <div className="max-w-4xl mx-auto">
        <SectionHeading ribbon="#D9E8D5" dark={dark}>
          Skills
        </SectionHeading>

        <div className="space-y-12">
          {Object.entries(SKILLS).map(([category, items], ci) => (
            <FadeIn key={category} delay={ci * 0.1}>
              <h3
                className={`text-sm uppercase tracking-wide mb-4 ${
                  dark ? "text-[#C9B8F5]" : "text-[#B98AA0]"
                }`}
                style={{ fontFamily: "'Nunito', sans-serif", letterSpacing: "0.1em" }}
              >
                {category}
              </h3>
              <div className="flex flex-wrap gap-4">
                {items.map((skill) => {
                  const color = SKILL_COLORS[colorIdx % SKILL_COLORS.length];
                  colorIdx++;
                  const rotate = (colorIdx % 5) - 2;
                  return (
                    <StickyNote
                      key={skill}
                      color={dark ? "#3D335A" : color}
                      rotate={rotate}
                      className={`rounded-sm min-w-[110px] text-center ${dark ? "text-[#F3EEFF]" : ""}`}
                    >
                      {skill}
                    </StickyNote>
                  );
                })}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------
   5. PROJECTS — polaroid photographs
--------------------------------------------------------- */

const ProjectIllustration = () => (
  <svg viewBox="0 0 220 160" className="w-full h-full">
    <rect width="220" height="160" fill="#EFEAFB" />
    <circle cx="40" cy="36" r="18" fill="#D9E8D5" />
    <rect x="60" y="70" width="100" height="60" rx="6" fill="#F8D9E0" />
    <rect x="75" y="84" width="70" height="6" rx="3" fill="#fff" opacity="0.7" />
    <rect x="75" y="96" width="50" height="6" rx="3" fill="#fff" opacity="0.7" />
    <circle cx="170" cy="40" r="6" fill="#F4C95D" />
    <circle cx="184" cy="56" r="3" fill="#F4C95D" />
    <path d="M30 130L50 110L70 130" stroke="#A9C3A0" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

const Projects = ({ dark }) => (
  <section id="projects" className="relative py-24 px-6 overflow-hidden">
    <PaperBackground variant={dark ? "dark" : "sage"} />
    <Sparkle className="absolute top-16 right-[16%] w-4 h-4" />

    <div className="max-w-4xl mx-auto">
      <SectionHeading ribbon="#F8D9E0" dark={dark}>
        Projects
      </SectionHeading>

      <div className="flex flex-wrap gap-10 justify-center md:justify-start">
        {PROJECTS.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.1}>
            <motion.div
              initial={{ rotate: p.rotate }}
              whileHover={{ y: -8, rotate: 0, boxShadow: "0 24px 40px rgba(80,60,50,0.2)" }}
              className="relative w-64 p-3 pb-5 bg-white rounded-sm"
              style={{ boxShadow: "0 10px 22px rgba(80,60,50,0.14)" }}
            >
              <WashiTape className="-top-3 left-1/2 -translate-x-1/2" color="#E8E3FF" angle={-3} />
              <div className="w-full aspect-[4/3] overflow-hidden mb-3 bg-[#EFEAFB]">
                <ProjectIllustration />
              </div>
              <p
                className="text-[#4A3F55] text-base mb-2 leading-snug"
                style={{ fontFamily: "'Caveat', cursive", fontWeight: 700, fontSize: 20 }}
              >
                {p.title}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.bits.map((b) => (
                  <span
                    key={b}
                    className="text-[10px] px-2 py-1 rounded-full bg-[#F2E7D5] text-[#7A6B52]"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------------------------------------------------
   6. CERTIFICATIONS — hanging paper tags
--------------------------------------------------------- */

const CertTag = ({ label, color, delay }) => (
  <FadeIn delay={delay}>
    <motion.div
      animate={{ rotate: [0, 2.5, 0, -2.5, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
      className="relative flex flex-col items-center"
      style={{ transformOrigin: "top center" }}
    >
      <div className="w-px h-6" style={{ backgroundColor: "#C9B89E" }} />
      <div
        className="px-4 py-3 text-center text-sm rounded-md relative"
        style={{
          backgroundColor: color,
          color: "#5A4A3E",
          fontFamily: "'Nunito', sans-serif",
          minWidth: 150,
          boxShadow: "0 8px 16px rgba(80,60,50,0.12)",
          clipPath: "polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%)",
        }}
      >
        <svg width="22" height="14" viewBox="0 0 22 14" className="mx-auto mb-1">
          <path d="M0 7H22" stroke="#D9C9B0" strokeWidth="1" />
          <path d="M3 4L7 10M19 4L15 10" stroke="#D9C9B0" strokeWidth="1" />
        </svg>
        {label}
      </div>
    </motion.div>
  </FadeIn>
);

const Certifications = ({ dark }) => (
  <section id="certifications" className="relative py-24 px-6 overflow-hidden">
    <PaperBackground variant={dark ? "dark" : "lavender"} />

    <div className="max-w-4xl mx-auto">
      <SectionHeading ribbon="#E8E3FF" dark={dark}>
        Certifications
      </SectionHeading>

      <div className="space-y-12">
        <div>
          <h3
            className={`text-sm uppercase tracking-wide mb-6 ${dark ? "text-[#C9B8F5]" : "text-[#B98AA0]"}`}
            style={{ fontFamily: "'Nunito', sans-serif", letterSpacing: "0.1em" }}
          >
            NPTEL
          </h3>
          <div className="flex flex-wrap gap-x-10 gap-y-10">
            {CERTIFICATIONS.NPTEL.map((c, i) => (
              <CertTag key={c} label={c} color="#F8D9E0" delay={i * 0.08} />
            ))}
          </div>
        </div>
        <div>
          <h3
            className={`text-sm uppercase tracking-wide mb-6 ${dark ? "text-[#C9B8F5]" : "text-[#B98AA0]"}`}
            style={{ fontFamily: "'Nunito', sans-serif", letterSpacing: "0.1em" }}
          >
            Scalar
          </h3>
          <div className="flex flex-wrap gap-x-10 gap-y-10">
            {CERTIFICATIONS.SCALAR.map((c, i) => (
              <CertTag key={c} label={c} color="#D9E8D5" delay={i * 0.08} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------------------------------------------------------
   7. WORKSHOPS & SEMINARS — notebook checklist
--------------------------------------------------------- */

const Workshops = ({ dark }) => (
  <section id="workshops" className="relative py-24 px-6 overflow-hidden">
    <PaperBackground variant={dark ? "dark" : "beige"} />

    <div className="max-w-2xl mx-auto">
      <SectionHeading ribbon="#F2E7D5" dark={dark}>
        Workshops &amp; seminars
      </SectionHeading>

      <FadeIn delay={0.1}>
        <div
          className="rounded-2xl p-8 md:p-10"
          style={{
            backgroundColor: dark ? "#352B52" : "#FFFDF9",
            border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "#EADFD2"}`,
            boxShadow: "0 14px 30px rgba(80,60,50,0.10)",
          }}
        >
          <ul className="space-y-4">
            {WORKSHOPS.map((w, i) => (
              <motion.li
                key={w}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <Flower className="w-5 h-5 shrink-0" color={SKILL_COLORS[i % SKILL_COLORS.length]} />
                <span
                  className={dark ? "text-[#E3DBFA]" : "text-[#5A4A3E]"}
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {w}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </div>
  </section>
);

/* ---------------------------------------------------------
   8. INDUSTRIAL VISIT — travel postcard
--------------------------------------------------------- */

const IndustrialVisit = ({ dark }) => (
  <section id="visits" className="relative py-24 px-6 overflow-hidden">
    <PaperBackground variant={dark ? "dark" : "sage"} />
    <Cloud className="absolute top-10 right-[10%] w-20 opacity-60 hidden md:block" />

    <div className="max-w-3xl mx-auto">
      <SectionHeading ribbon="#D9E8D5" dark={dark}>
        Industrial visit
      </SectionHeading>

      {INDUSTRIAL_VISITS.map((v, i) => (
        <FadeIn key={v.place} delay={i * 0.1}>
          <motion.div
            whileHover={{ y: -4 }}
            className="relative rounded-md overflow-hidden grid md:grid-cols-[1fr_1.2fr]"
            style={{
              backgroundColor: dark ? "#352B52" : "#FFFDF9",
              boxShadow: "0 16px 32px rgba(80,60,50,0.14)",
              border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "#EADFD2"}`,
            }}
          >
            <div className="relative aspect-[4/3] md:aspect-auto bg-[#EFEAFB] overflow-hidden">
              <svg viewBox="0 0 240 180" className="w-full h-full">
                <rect width="240" height="180" fill="#E8E3FF" />
                <rect x="20" y="90" width="50" height="70" fill="#D9E8D5" />
                <rect x="80" y="60" width="60" height="100" fill="#F8D9E0" />
                <rect x="150" y="80" width="55" height="80" fill="#F2E7D5" />
                <circle cx="200" cy="30" r="16" fill="#F4C95D" />
              </svg>
              <div
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full text-[11px] rotate-[-6deg]"
                style={{
                  backgroundColor: "rgba(255,255,255,0.92)",
                  color: "#A35C3A",
                  fontFamily: "'Caveat', cursive",
                  fontWeight: 700,
                  fontSize: 14,
                  border: "1.5px dashed #D98F6A",
                }}
              >
                📍 {v.location}
              </div>
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <h3
                className={`text-xl md:text-2xl mb-2 ${dark ? "text-[#F3EEFF]" : "text-[#4A3F55]"}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {v.place}
              </h3>
              <p
                className={dark ? "text-[#D8CFF0]" : "text-[#6B5D5A]"}
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {v.note}
              </p>
            </div>
          </motion.div>
        </FadeIn>
      ))}
    </div>
  </section>
);

/* ---------------------------------------------------------
   9. SYMPOSIUM & PAPER PRESENTATION — newspaper clipping
--------------------------------------------------------- */

const Symposium = ({ dark }) => (
  <section id="symposium" className="relative py-24 px-6 overflow-hidden">
    <PaperBackground variant={dark ? "dark" : "cream"} />

    <div className="max-w-3xl mx-auto">
      <SectionHeading ribbon="#F2E7D5" dark={dark}>
        Symposium &amp; paper presentation
      </SectionHeading>

      {SYMPOSIA.map((s, i) => (
        <FadeIn key={s.title} delay={i * 0.1}>
          <motion.div
            whileHover={{ y: -4, rotate: 0 }}
            initial={{ rotate: -1.5 }}
            className="relative p-7 md:p-9"
            style={{
              backgroundColor: dark ? "#3A3050" : "#F6F1E7",
              boxShadow: "0 14px 28px rgba(80,60,50,0.14)",
              border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "#D9CBB0"}`,
            }}
          >
            <WashiTape className="-top-3 left-8" color="#F8D9E0" angle={-8} />
            <Paperclip className="absolute -top-3 right-8 w-5 h-10 rotate-[12deg]" />

            <p
              className={`text-[11px] uppercase tracking-[0.2em] mb-2 ${
                dark ? "text-[#B7A9DE]" : "text-[#8A7A6E]"
              }`}
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {s.venue}
            </p>
            <h3
              className={`text-2xl md:text-3xl mb-3 leading-snug ${dark ? "text-[#F3EEFF]" : "text-[#3A3030]"}`}
              style={{ fontFamily: "'Playfair Display', serif", borderBottom: `2px solid ${dark ? "#5A4D7A" : "#3A3030"}`, paddingBottom: 10 }}
            >
              {s.title}
            </h3>
            <p
              className={`text-sm md:text-base leading-relaxed columns-1 ${dark ? "text-[#D8CFF0]" : "text-[#5A4A3E]"}`}
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {s.note}
            </p>
          </motion.div>
        </FadeIn>
      ))}
    </div>
  </section>
);

/* ---------------------------------------------------------
   10. CONTACT — postcard
--------------------------------------------------------- */

const Contact = ({ dark }) => (
  <section id="contact" className="relative py-24 px-6 overflow-hidden">
    <PaperBackground variant={dark ? "dark" : "lavender"} />
    <FloatingPetals />

    <div className="max-w-3xl mx-auto">
      <SectionHeading ribbon="#F8D9E0" dark={dark}>
        Contact
      </SectionHeading>

      <FadeIn delay={0.1}>
        <div
          className="relative rounded-md p-8 md:p-12 grid md:grid-cols-2 gap-8"
          style={{
            backgroundColor: dark ? "#352B52" : "#FFFDF9",
            boxShadow: "0 20px 44px rgba(80,60,50,0.14)",
            border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "#EADFD2"}`,
          }}
        >
          <div
            className="hidden md:block absolute left-1/2 top-8 bottom-8 w-px"
            style={{ backgroundColor: dark ? "rgba(255,255,255,0.1)" : "#EADFD2" }}
          />
          <div>
            <p
              className={`text-xl md:text-2xl mb-6 ${dark ? "text-[#F3EEFF]" : "text-[#4A3F55]"}`}
              style={{ fontFamily: "'Caveat', cursive", fontWeight: 700, fontSize: 26 }}
            >
              Thank you for visiting my little corner of the internet! 🌷
            </p>
            <div className="space-y-3 text-sm">
              {[
                ["Email", PROFILE.email, `mailto:${PROFILE.email}`],
                ["Phone", PROFILE.phone, `tel:${PROFILE.phone}`],
                ["GitHub", "github.com/sharmitha", PROFILE.github],
                ["LinkedIn", "linkedin.com/in/sharmitha", PROFILE.linkedin],
              ].map(([label, value, href]) => (
                <a
                  key={label}
                  href={href}
                  className={`flex items-center justify-between gap-4 py-2 border-b ${
                    dark ? "border-white/10 text-[#D8CFF0]" : "border-[#EADFD2] text-[#5A4A3E]"
                  }`}
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  <span className={dark ? "text-[#B7A9DE]" : "text-[#B98AA0]"}>{label}</span>
                  <span>{value}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <div
              className="w-40 h-40 rounded-full flex items-center justify-center"
              style={{ backgroundColor: dark ? "#3D335A" : "#F8D9E0" }}
            >
              <svg viewBox="0 0 100 100" className="w-24 h-24">
                <rect x="15" y="30" width="70" height="50" rx="6" fill="#fff" opacity="0.85" />
                <path d="M15 34L50 60L85 34" stroke="#D98F6A" strokeWidth="2.5" fill="none" />
              </svg>
            </div>
            <div className="flex gap-3">
              <Flower className="w-6 h-6" color="#D9E8D5" />
              <Star className="w-6 h-6" color="#F4C95D" />
              <Flower className="w-6 h-6" color="#F8D9E0" />
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

/* ---------------------------------------------------------
   FOOTER
--------------------------------------------------------- */

const Footer = ({ dark }) => (
  <footer className="relative py-14 px-6 text-center overflow-hidden">
    <PaperBackground variant={dark ? "dark" : "cream"} />
    <div className="relative max-w-xl mx-auto flex flex-col items-center gap-4">
      <MoonIllustration className="w-12 h-12" />
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <Star key={i} className="w-3 h-3" color={dark ? "#C9B8F5" : "#F4C95D"} />
        ))}
      </div>
      <p
        className={`text-base ${dark ? "text-[#D8CFF0]" : "text-[#8A7A6E]"}`}
        style={{ fontFamily: "'Caveat', cursive", fontWeight: 700, fontSize: 20 }}
      >
        Learning one page at a time.
      </p>
      <p
        className={`text-xs ${dark ? "text-[#897AA8]" : "text-[#B8AA9E]"}`}
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        © {new Date().getFullYear()} {PROFILE.name}. Handmade with care.
      </p>
    </div>
  </footer>
);

/* ---------------------------------------------------------
   CURSOR SPARKLE TRAIL
--------------------------------------------------------- */

const CursorTrail = ({ dark }) => {
  const [trail, setTrail] = useState([]);
  const idRef = useRef(0);
  const lastRef = useRef(0);

  useEffect(() => {
    const handleMove = (e) => {
      const now = Date.now();
      if (now - lastRef.current < 60) return;
      lastRef.current = now;
      idRef.current += 1;
      const id = idRef.current;
      setTrail((t) => [...t.slice(-10), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setTrail((t) => t.filter((p) => p.id !== id));
      }, 700);
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] hidden md:block">
      <AnimatePresence>
        {trail.map((p) => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ left: p.x - 6, top: p.y - 6 }}
            initial={{ opacity: 0.9, scale: 1 }}
            animate={{ opacity: 0, scale: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Sparkle className="w-3 h-3" color={dark ? "#C9B8F5" : "#F4C95D"} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

/* ---------------------------------------------------------
   ROOT APP
--------------------------------------------------------- */

export default function Portfolio() {
  const [dark, setDark] = useState(false);

  return (
    <div
      className={`relative w-full min-h-screen ${dark ? "dark" : ""}`}
      style={{
        backgroundColor: dark ? "#2B2440" : "#FFF9F4",
        transition: "background-color 0.5s ease",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Caveat:wght@600;700&family=Nunito:wght@400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        ::selection { background: #F8D9E0; }
      `}</style>

      <Navbar dark={dark} setDark={setDark} />
      <ScrollVine dark={dark} />
      <CursorTrail dark={dark} />

      <Hero dark={dark} />
      <About dark={dark} />
      <Education dark={dark} />
      <Skills dark={dark} />
      <Projects dark={dark} />
      <Certifications dark={dark} />
      <Workshops dark={dark} />
      <IndustrialVisit dark={dark} />
      <Symposium dark={dark} />
      <Contact dark={dark} />
      <Footer dark={dark} />
    </div>
  );
}
