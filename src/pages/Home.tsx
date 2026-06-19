import React, { useState, useEffect } from "react";

import Hero from "../components/Hero";
import { useSEO } from "../hooks/useSEO";

import { ThemeProvider } from "../hooks/useTheme";
import { TooltipProvider } from "../components/ui/tooltip";
import Projects from "../components/Projects";
import DiagonalPattern from "../components/DiagonalPattern";
import Navbar from "../components/Navbar";
import TechStackMarquee from "../components/TechStackMarquee";
import ContributionsDisplay  from "../components/github/ContributionsDisplay";
import Reveal from "../components/Reveal";
import SectionBorder from "../components/SectionBorder";
import ExperienceContent from "../components/ExperienceContent";
import CTA from "../components/CTA";
import ReactLenis from 'lenis/react';
import Footer from "../components/Footer";
import { Certifications } from "@/components/Certifications";
import { certifications } from "@/config/certifications";
import Blogs from "@/components/Blog";
import Loader from "@/components/Loader";
// import { VisitorCount } from "./components/VisitorCount";

const LOADER_STORAGE_KEY = "portfolio-loader-last-shown-at";
const LOADER_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7; // 7 days
const LOADER_DURATION_MS = 800;

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const now = Date.now();
    const lastShownAtValue = localStorage.getItem(LOADER_STORAGE_KEY);
    const lastShownAt = lastShownAtValue ? Number(lastShownAtValue) : 0;
    const hasRecentLoader = Number.isFinite(lastShownAt) && now - lastShownAt < LOADER_MAX_AGE_MS;

    if (hasRecentLoader) {
      return;
    }

    setIsLoading(true);

    // Keep loader brief so it feels intentional without delaying repeat visitors.
    const timer = setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem(LOADER_STORAGE_KEY, String(Date.now()));
    }, LOADER_DURATION_MS);

    return () => clearTimeout(timer);
  }, []);

  useSEO({
    title: 'Kumar Nirupam - Full Stack Software Engineer | Portfolio',
    description: 'Explore Kumar Nirupam\'s portfolio - a skilled full stack software engineer specializing in web development, React, TypeScript, and modern web technologies. View projects, blogs, and professional experience.',
    keywords: 'Software Engineer, Full Stack Developer, React, TypeScript, Web Development, Portfolio, Kumar Nirupam',
    url: 'https://kumarnirupam.dev/',
    type: 'website'
  });

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <TooltipProvider>
        {isLoading ? (
          <Loader />
        ) : (

        <ReactLenis root>
          <div className="min-h-screen transition-colors duration-300 relative fade-in"
            style={{ fontFamily: "var(--font-hk-grotesk)" }}>
              {<Navbar />}
           <div className="relative mx-auto max-w-4xl">

            {/* Diagonal Patterns */}
            <DiagonalPattern side="left" />
            <DiagonalPattern side="right" />

              <Hero />

              <Reveal delay={0.05}>
                <SectionBorder className="mt-6" />
              </Reveal>

              <ExperienceContent />

              <Reveal delay={0.05}>
                <SectionBorder className="mt-6" />
              </Reveal>


              <TechStackMarquee />

              <Reveal delay={0.05}>
                <SectionBorder className="mt-6" />
              </Reveal>

              <Projects />

              <Reveal delay={0.05}>
                <SectionBorder className="mt-6" />
              </Reveal>

              <ContributionsDisplay username="KumarNirupam1" />

               <Reveal delay={0.05}>
                <SectionBorder className="mt-6" />
              </Reveal>
              
               <Blogs  />


              <Reveal delay={0.05}>
                <SectionBorder className="mt-6" />
              </Reveal>

              <Certifications items={certifications} />  

              <Reveal delay={0.05}>
                <SectionBorder className="mt-6" />
              </Reveal>

             <CTA />

             <Footer />
              

          
        </div>
         
        </div>
        </ReactLenis>
        )}
      </TooltipProvider>
    </ThemeProvider>

  );
};

export default Home;
