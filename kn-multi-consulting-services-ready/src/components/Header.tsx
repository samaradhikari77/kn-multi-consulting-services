/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Menu, X, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "./Logo";
import { useLanguage } from "../context/LanguageContext";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", key: "nav-hero", label: language === "en" ? "Home" : "गृहपृष्ठ" },
    { id: "about", key: "nav-about", label: language === "en" ? "About Us" : "हाम्रो बारेमा" },
    { id: "services", key: "nav-services", label: language === "en" ? "Services" : "सेवाहरू" },
    { id: "lmis-lab", key: "nav-projects", label: language === "en" ? "Projects" : "परियोजनाहरू" },
    { id: "lmis-lab", key: "nav-training", label: language === "en" ? "Training" : "तालिम" },
    { id: "achievements", key: "nav-resources", label: language === "en" ? "Resources" : "स्रोतहरू" },
    { id: "achievements", key: "nav-gallery", label: language === "en" ? "Gallery" : "ग्यालेरी" },
    { id: "contact", key: "nav-contact", label: language === "en" ? "Contact Us" : "सम्पर्क" },
  ];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      id="header-nav"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-sm border-b border-gray-100 py-3"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick("hero")}
          >
            <Logo className="w-[60px] h-[60px] text-brand-600 flex-shrink-0" />
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 group-hover:text-brand-600 transition-colors block leading-tight">
                KN Multi Consulting
              </span>
              <span className="text-xs sm:text-sm font-semibold text-brand-600 tracking-wider uppercase block mt-0.5 leading-none">
                {t("nav", "m_license")}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isAbout = item.id === "about";
              if (isAbout) {
                return (
                  <div key={item.key} className="relative group">
                    <button
                      id={`nav-${item.key}`}
                      onClick={() => {
                        handleNavClick(item.id);
                        setTimeout(() => {
                          const customEvent = new CustomEvent("select-about-tab", { detail: "overview" });
                          window.dispatchEvent(customEvent);
                        }, 100);
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                        activeSection === item.id
                          ? "bg-brand-50 text-brand-700 font-semibold"
                          : "text-gray-600 hover:text-brand-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </button>
                    {/* Hover dropdown for About Us */}
                    <div className="absolute top-full left-0 mt-1 hidden group-hover:block bg-white border border-gray-100 shadow-lg rounded-xl py-1.5 min-w-[155px] z-50">
                      <button
                        id="nav-about-overview"
                        onClick={() => {
                          handleNavClick("about");
                          setTimeout(() => {
                            const customEvent = new CustomEvent("select-about-tab", { detail: "overview" });
                            window.dispatchEvent(customEvent);
                          }, 100);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors cursor-pointer"
                      >
                        {language === "en" ? "Company Overview" : "कम्पनी सिंहावलोकन"}
                      </button>
                      <button
                        id="nav-about-team"
                        onClick={() => {
                          handleNavClick("about");
                          setTimeout(() => {
                            const customEvent = new CustomEvent("select-about-tab", { detail: "team" });
                            window.dispatchEvent(customEvent);
                          }, 100);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <span className="text-brand-500 font-bold">↳</span> {t("nav", "team")}
                      </button>
                    </div>
                  </div>
                );
              }
              return (
                <button
                  key={item.key}
                  id={`nav-${item.key}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    activeSection === item.id
                      ? "bg-brand-50 text-brand-700 font-semibold"
                      : "text-gray-600 hover:text-brand-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Call to Action Button & Language Switcher */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Premium Language Switcher */}
            <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200/50 text-xs font-bold leading-none select-none">
              <button
                id="lang-en"
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1.5 rounded-md transition-all cursor-pointer text-[10px] sm:text-xs ${
                  language === "en"
                    ? "bg-white text-brand-700 shadow-2xs font-extrabold"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                EN
              </button>
              <button
                id="lang-ne"
                type="button"
                onClick={() => setLanguage("ne")}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer text-[10px] sm:text-xs ${
                  language === "ne"
                    ? "bg-white text-brand-700 shadow-2xs font-extrabold"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                नेपाली
              </button>
            </div>

            <button
              id="cta-contact"
              onClick={() => handleNavClick("contact")}
              className="flex items-center gap-2 bg-[#072d65] cursor-pointer hover:bg-[#0d4596] text-white font-semibold px-6 py-2.5 rounded-full active:scale-95 shadow-sm transition-all duration-200 text-sm"
            >
              <PhoneCall className="w-4 h-4" />
              {language === "en" ? "Contact Us" : "सम्पर्क गर्नुहाेस्"}
            </button>
          </div>

          {/* Mobile Menu Button & Mobile Switcher */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Mobile Language Switcher */}
            <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200/50 text-[10px] font-bold leading-none select-none">
              <button
                id="m-lang-en"
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                  language === "en"
                    ? "bg-white text-brand-700 shadow-2xs font-black"
                    : "text-gray-400 hover:text-gray-900"
                }`}
              >
                EN
              </button>
              <button
                id="m-lang-ne"
                type="button"
                onClick={() => setLanguage("ne")}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  language === "ne"
                    ? "bg-white text-brand-700 shadow-2xs font-black"
                    : "text-gray-400 hover:text-gray-900"
                }`}
              >
                नेपाली
              </button>
            </div>

            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-brand-600 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Toggle Navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-b border-brand-100 absolute top-full left-0 right-0 overflow-hidden shadow-lg"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
              {navItems.map((item) => {
                const isAbout = item.id === "about";
                return (
                  <React.Fragment key={item.key}>
                    <button
                      id={`m-nav-${item.key}`}
                      onClick={() => {
                        handleNavClick(item.id);
                        if (isAbout) {
                          setTimeout(() => {
                            const customEvent = new CustomEvent("select-about-tab", { detail: "overview" });
                            window.dispatchEvent(customEvent);
                          }, 100);
                        }
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all cursor-pointer ${
                        activeSection === item.id
                          ? "bg-brand-50 text-brand-700 font-semibold border-l-4 border-brand-600 pl-3"
                          : "text-gray-600 hover:text-brand-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </button>
                    {isAbout && (
                      <div className="pl-6 pr-4 py-1 flex flex-col gap-1 border-l-2 border-brand-100 ml-4">
                        <button
                          id="m-nav-about-sub-team"
                          onClick={() => {
                            handleNavClick("about");
                            setTimeout(() => {
                              const customEvent = new CustomEvent("select-about-tab", { detail: "team" });
                              window.dispatchEvent(customEvent);
                            }, 100);
                          }}
                          className="w-full text-left py-1.5 text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <span className="text-brand-400 font-bold">↳</span> {t("nav", "team")}
                        </button>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
              <div className="pt-4 px-4">
                <button
                  id="m-cta-contact"
                  onClick={() => handleNavClick("contact")}
                  className="w-full flex items-center justify-center gap-2 bg-brand-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:bg-brand-700 transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  9851142793 (Contact Upreti)
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
