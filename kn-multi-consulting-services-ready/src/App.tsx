/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import SCMSimulator from "./components/SCMSimulator";
import AchievementsSection from "./components/AchievementsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import AdminPortal from "./components/AdminPortal";
import { ShieldCheck, Award, GraduationCap } from "lucide-react";
import { useLanguage } from "./context/LanguageContext";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showAdminPortal, setShowAdminPortal] = useState(false);
  const { t } = useLanguage();

  // Synchronize navigation highlighted state on manual scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "services", "lmis-lab", "achievements", "contact"];
      const scrollPosition = window.scrollY + 180; // offset

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Dynamic Header */}
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Hero section */}
      <Hero setActiveSection={setActiveSection} />

      {/* Value Statement: 25+ Years Experience Expertise banner */}
      <section className="bg-[#072d65] py-10 text-white border-t border-b border-[#0f3a7c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
            
            {/* Value block 1 */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="bg-white/10 border border-white/20 p-3 rounded-full shrink-0">
                <GraduationCap className="w-6 h-6 text-[#7cc2fc]" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-white">
                  {t("banners", "expert_title")}
                </h4>
                <p className="text-xs text-slate-200 mt-1 font-medium">
                  {t("banners", "expert_desc")}
                </p>
              </div>
            </div>

            {/* Value block 2 */}
            <div className="flex flex-col sm:flex-row items-center gap-4 border-y border-white/10 md:border-y-0 py-6 md:py-0 md:border-x md:px-6">
              <div className="bg-white/10 border border-white/20 p-3 rounded-full shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#7cc2fc]" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-white">
                  {t("banners", "compliant_title")}
                </h4>
                <p className="text-xs text-slate-200 mt-1 font-medium">
                  {t("banners", "compliant_desc")}
                </p>
              </div>
            </div>

            {/* Value block 3 */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="bg-white/10 border border-white/20 p-3 rounded-full shrink-0">
                <Award className="w-6 h-6 text-[#7cc2fc]" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-white">
                  {t("banners", "national_title")}
                </h4>
                <p className="text-xs text-slate-200 mt-1 font-medium">
                  {t("banners", "national_desc")}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Sections */}
      <main className="flex-grow">
        
        {/* Company Overview, Mission, Objectives */}
        <AboutSection />

        {/* 4 Core Competence Services */}
        <ServicesSection setActiveSection={setActiveSection} />

        {/* Dynamic & Interactive SCM LMIS Lab */}
        <SCMSimulator />

        {/* Achievements Timeline (FY 81/82 and FY 82/83) */}
        <AchievementsSection />

        {/* Contact info desk & form submissions */}
        <ContactSection />
        
      </main>

      {/* Standardized professional Footer */}
      <Footer setActiveSection={setActiveSection} onAdminClick={() => setShowAdminPortal(true)} />

      {/* Conditional mount of AdminPortal */}
      {showAdminPortal && (
        <AdminPortal onClose={() => setShowAdminPortal(false)} />
      )}
    </div>
  );
}
