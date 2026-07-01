/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ArrowUp, Mail, Phone, MapPin, ShieldAlert } from "lucide-react";
import Logo from "./Logo";
import { useLanguage } from "../context/LanguageContext";

interface FooterProps {
  setActiveSection: (section: string) => void;
  onAdminClick: () => void;
}

export default function Footer({ setActiveSection, onAdminClick }: FooterProps) {
  const { language } = useLanguage();

  const handleScrollToTop = () => {
    setActiveSection("hero");
    const heroEl = document.getElementById("hero");
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8 border-t border-gray-800 text-left-direction">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Footer section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-gray-800">
          
          {/* Brand block columns */}
          <div className="md:col-span-12 lg:col-span-5 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="bg-brand-600 text-white p-2 rounded-xl">
                <Logo className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-extrabold tracking-tight text-white block">
                  {language === "en" ? "KN Multi Consulting" : "के.एन. मल्टि कन्सल्टिङ"}
                </span>
                <span className="text-[9px] font-bold text-brand-400 tracking-wider uppercase block -mt-1">
                  {language === "en" ? "Services Pvt. Ltd." : "सर्भिसेज प्रा. लि."}
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-normal max-w-sm">
              {language === "en"
                ? "Dedicated SCM consulting in Nepal. Specialized in capacity building, digital logistics management training (LMIS PAMSV2), pharmaceutical compliance, and drug safe-disposal frameworks. Established in 2023."
                : "नेपालमा स्वास्थ्य आपूर्ति श्रृंखला (SCM) सुदृढीकरणका लागि प्रतिबद्ध परामर्शदाता संस्था। हामी स्थापित क्षमता विकास, डिजिटल स्वास्थ्य आपूर्ति तालिम (PAMSV2), कानुनी औषधि अनुपालन, र सुरक्षित वातावरणीय फोहोर विसर्जन पद्धतीहरूमा काम गर्दछौँ। स्थापित सन् २०२३।"}
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-6 lg:col-span-3 space-y-3 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === "en" ? "Legal Compliance" : "कानुनी अनुपालन तथा दर्ता"}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-gray-400">
                <ShieldAlert className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>
                  {language === "en"
                    ? "Officially registered with the Company Registration Office, Kathmandu, Nepal. Operating in strict alignment with DoHS guidelines."
                    : "नेपाल सरकार कम्पनी रजिष्ट्रारको कार्यालय, काठमाडौँमा आधिकारिक दर्ता भई स्वास्थ्य सेवा विभाग (DoHS) को नीति निर्देशन र कानुनी मापदण्ड बमोजिम संचालित।"}
                </span>
              </div>
            </div>
          </div>

          {/* Core Info links */}
          <div className="md:col-span-6 lg:col-span-4 space-y-3 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === "en" ? "Direct Contact" : "सम्पर्क विवरण"}
            </h4>
            <div className="space-y-2 text-xs font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                <span>
                  {language === "en" ? "Babar Mahal, Kathmandu, Nepal" : "बबरमहल, काठमाडौँ, नेपाल"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="tel:9851142793" className="hover:text-white transition-colors">
                  {language === "en" ? "9851142793" : "९८५११४२७९३"}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="mailto:Kedarupreti7182@gmail.com" className="hover:text-white transition-colors break-all">Kedarupreti7182@gmail.com</a>
              </div>
            </div>
          </div>

        </div>

        {/* Lower Footer section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-left">
          <div>
            <p className="font-normal">
              {language === "en"
                ? `© ${new Date().getFullYear()} KN Multi Consulting Services Pvt. Ltd. All rights reserved.`
                : `© २०२६ के. एन. मल्टि कन्सल्टिङ सर्भिसेज प्रा. लि. सर्वाधिकार सुरक्षित।`}
            </p>
            <p className="text-[10px] text-gray-500 mt-1 font-mono">
              {language === "en"
                ? "Kathmandu registration SCM-MOH-2023 • Technical Logistics Roster"
                : "काठमाण्डौ दर्ता नं. SCM-MOH-2023 • प्राविधिक स्वास्थ्य आपूर्ति सेवा रोष्टर"}
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={onAdminClick}
              className="flex items-center gap-1.5 bg-gray-800 hover:bg-[#072d65] border border-gray-700/50 hover:border-brand-500/20 text-gray-400 hover:text-white px-3.5 py-1.5 rounded-xl cursor-pointer transition-colors shadow-inner text-xs font-semibold"
              aria-label="Open Admin System Panel"
            >
              🔒 <span>{language === "en" ? "Admin Panel" : "प्रशासक प्यानल"}</span>
            </button>
            <button
              id="footer-back-to-top"
              onClick={handleScrollToTop}
              className="flex items-center gap-1.5 bg-gray-800 hover:bg-brand-600 text-gray-300 hover:text-white px-3.5 py-1.5 rounded-xl cursor-pointer transition-colors shadow-inner font-semibold"
              aria-label="Back to Top of Page"
            >
              <span>{language === "en" ? "Back to Top" : "माथि जानुहोस्"}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
