/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ArrowRight, Activity, ShieldCheck, Database, Award, CheckCircle2, Calculator, Users, BarChart3, HelpCircle, HardDrive, Cpu, Laptop, PhoneCall, Check } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

interface HeroProps {
  setActiveSection: (section: string) => void;
}

export default function Hero({ setActiveSection }: HeroProps) {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"overview" | "adjusted">("overview");
  const [recordedConsumption, setRecordedConsumption] = useState<number>(3000);
  const [stockoutMonths, setStockoutMonths] = useState<number>(2);
  const [reportingPeriodMonths, setReportingPeriodMonths] = useState<number>(12);

  // SCM Math for Annual Adjusted Consumption with Stockouts (Standard USAID/WHO health logistics methodology)
  const usableMonths = Math.max(1, reportingPeriodMonths - stockoutMonths);
  const adjustedConsumption = Math.round(recordedConsumption * (reportingPeriodMonths / usableMonths));
  const adjustmentPercentage = recordedConsumption > 0 ? Math.round(((adjustedConsumption - recordedConsumption) / recordedConsumption) * 100) : 0;

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stats = language === "en" ? [
    { value: "22+", label: "LMIS Deployed Sites", desc: "Municipalities & health care sites fully operational on PAMSV2" },
    { value: "9+", label: "Districts Empowered", desc: "Forecasting workshops held in close coordination with Province Health Ministry" },
    { value: "25+", label: "Avg. Experience Years", desc: "Our core roster of veteran Health Logistics and SCM Experts" },
    { value: "100%", label: "Govt-Compliant Disposal", desc: "Strict compliance with Nepal government acts, rules, and official procedures" }
  ] : [
    { value: "२२+", label: "PAMSV2 सम्बन्धी तालिम सम्पन्न", desc: "PAMSV2 सफ्टवेयर सम्बन्धी तालिम २२ वटा जिल्ला तथा पालिकाहरूका स्वास्थ्यकर्मीहरूलाई प्रदान ।" },
    { value: "९+", label: "जिल्लाहरूमा सशक्तिकरण", desc: "औषधि तथा औषधिजन्य सामाग्रीहरूको प्रक्षेपण (Forecasting) तथा परिमाण निर्धारण (Quantification) कार्यशाला सम्पन्न" },
    { value: "२५+", label: "औसत अनुभव वर्ष", desc: "स्वास्थ्य आपूर्ति श्रृंखलाका कडा जानकार र अनुभवी विशेषज्ञहरूको टिम" },
    { value: "१००%", label: "सरकारी मापदण्ड अनुरूपता", desc: "नेपाल सरकारको ऐन, नियमावली तथा कार्यविधिको पालना" }
  ];

  return (
    <div className="w-full">
      {/* Primary Hero Area: ChatGPT Dark Navy Gradient Backdrop */}
      <section
        id="hero"
        className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-[#0a2044] via-[#04132b] to-[#01091a] text-white"
      >
        {/* Soft background glow details */}
        <div className="absolute top-0 right-0 -z-10 w-[700px] h-[500px] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 -z-10 w-[450px] h-[350px] rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Text Core Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-300 font-semibold text-xs tracking-wide uppercase">
                <Activity className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                {language === "en" ? "Established in 2023 | Kathmandu, Nepal" : "स्थापना २०२३ | काठमाडौं, नेपाल"}
              </div>

              {/* Company Logo Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight leading-tight md:leading-snug text-white">
                KN Multi <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-white">
                  Consulting Services
                </span>
              </h1>

              {/* Tagline Statement */}
              <h2 className="text-lg sm:text-xl font-bold text-blue-300 leading-snug max-w-xl">
                {language === "en" 
                  ? "“Your Trusted Partner for Health Supply Chain and Asset Management Solutions”"
                  : "“स्वास्थ्य आपूर्ति श्रृंखला र सार्वजनिक सम्पत्ति व्यवस्थापनका लागि विश्वसनीय साझेदार”"}
              </h2>

              {/* Description Body */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl text-justify font-normal">
                {language === "en"
                  ? "We provide expert consulting and technical support in Supply Chain Management, LMIS, PAMS, Forecasting & Quantification, Capacity Building, and Asset Disposal Management for a stronger, efficient, and accountable health system."
                  : "हामी स्वास्थ्य प्रणाली सबल बनाउन, औषधि म्याद नाघेर हुने नोक्सानी कम गर्न र लजिस्टिक सहयोग सुनिश्चित गर्न स्थानीय तहको PAMSV2 तालिम, माग प्रक्षेपण (Forecasting), क्षमता विकास र सुरक्षित लिलाम विसर्जनमा देशव्यापी प्राविधिक परामर्श उपलब्ध गराउँछौं।"}
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  id="hero-cta-services"
                  onClick={() => scrollTo("services")}
                  className="flex items-center justify-center gap-2 bg-[#1d63b8] hover:bg-[#1552a1] cursor-pointer text-white font-bold px-7 py-3.5 rounded-full shadow-lg transition-all duration-200 text-sm sm:text-base active:scale-95"
                >
                  <Users className="w-4.5 h-4.5" />
                  {language === "en" ? "Our Services" : "हाम्रा सेवाहरू"}
                </button>
                <button
                  id="hero-cta-contact"
                  onClick={() => scrollTo("contact")}
                  className="flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 cursor-pointer text-white border-2 border-white/40 hover:border-white font-semibold px-7 py-3.5 rounded-full transition-all duration-200 text-sm sm:text-base active:scale-95"
                >
                  <PhoneCall className="w-4.5 h-4.5 text-blue-400" />
                  {language === "en" ? "Contact Us" : "सम्पर्क गर्नुहोस्"}
                </button>
              </div>
            </div>

            {/* Right Column: High Fidelity Laptop Dashboard Representation */}
            <div className="lg:col-span-6 relative flex justify-center py-6">
              <div className="w-full max-w-[530px] relative">
                {/* Simulated Warehouse shadow blur/accent in background */}
                <div className="absolute inset-0 bg-blue-500/5 rounded-3xl -rotate-1 scale-105 pointer-events-none filter blur-xl border border-white/5" />
                
                {/* 3D angled laptop body */}
                <div className="relative mx-auto w-full rounded-2xl bg-[#030914] p-3 sm:p-4 border border-slate-700/60 shadow-2xl shadow-black/80">
                  
                  {/* Laptop screen interior border */}
                  <div className="relative rounded-lg bg-[#010610] p-1.5 border-2 border-slate-800">
                    
                    {/* Simulated OS View Header */}
                    <div className="flex items-center justify-between px-3 py-1.5 bg-[#081a38] rounded-t-lg border-b border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-300 tracking-wider uppercase font-mono">
                        LMIS Dashboard (PAMSV2)
                      </span>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                        <span className="text-[9px] font-mono">LIVE NETWORK</span>
                      </div>
                    </div>

                    {/* Dashboard Metrics UI Block inside Screen */}
                    <div className="p-3 bg-slate-950 rounded-b-lg space-y-3 font-sans">
                      
                      {/* 4 Block KPI Stats Dashboard Row */}
                      <div className="grid grid-cols-4 gap-1.5">
                        <div className="bg-[#0b1b36] p-1.5 rounded border border-blue-900/40 text-left">
                          <span className="text-[7.5px] font-semibold text-slate-400 block uppercase tracking-tight">Total Facilities</span>
                          <span className="text-xs sm:text-sm font-black text-white font-mono leading-none block mt-1">1,245</span>
                        </div>
                        <div className="bg-[#0b1b36] p-1.5 rounded border border-blue-900/40 text-left">
                          <span className="text-[7.5px] font-semibold text-slate-400 block uppercase tracking-tight">Total Products</span>
                          <span className="text-xs sm:text-sm font-black text-white font-mono leading-none block mt-1">2,350</span>
                        </div>
                        <div className="bg-[#0b1b36] p-1.5 rounded border border-blue-900/40 text-left">
                          <span className="text-[7.5px] font-semibold text-slate-400 block uppercase tracking-tight">Stock Value</span>
                          <span className="text-xs sm:text-sm font-black text-blue-300 font-mono leading-none block mt-1">$5.64M</span>
                        </div>
                        <div className="bg-[#0b1b36] p-1.5 rounded border border-blue-900/40 text-left">
                          <span className="text-[7.5px] font-semibold text-slate-400 block uppercase tracking-tight">Reports</span>
                          <span className="text-xs sm:text-sm font-black text-slate-200 font-mono leading-none block mt-1">128</span>
                        </div>
                      </div>

                      {/* Charts and Data Representation */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                        
                        {/* Box 1: Stock Status (Bar Chart) */}
                        <div className="bg-[#051024] p-2.5 rounded border border-blue-900/30">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[8.5px] font-bold text-slate-300 uppercase tracking-wider">Stock Status</span>
                            <span className="text-[8px] text-green-400 font-mono font-bold">● Healthy</span>
                          </div>
                          {/* Mini Bar Graph */}
                          <div className="flex items-end gap-1.5 h-12 pt-2.5 border-b border-blue-900/20 px-1">
                            <div className="w-full bg-blue-600/30 rounded-t h-[40%] hover:bg-blue-500 transition-all cursor-pointer" />
                            <div className="w-full bg-blue-500 rounded-t h-[75%] hover:bg-blue-400 transition-all cursor-pointer" />
                            <div className="w-full bg-[#1d63b8] rounded-t h-[90%] hover:bg-blue-400 transition-all cursor-pointer" />
                            <div className="w-full bg-blue-700 rounded-t h-[25%] hover:bg-red-500 transition-all cursor-pointer" />
                            <div className="w-full bg-blue-500/60 rounded-t h-[55%] hover:bg-blue-400 transition-all cursor-pointer" />
                          </div>
                          <span className="text-[7.5px] text-slate-400 mt-1 font-mono block">Vaccines • Antibiotics • PPEs • Surgical</span>
                        </div>

                        {/* Box 2: Consumption Trend (Line Chart) */}
                        <div className="bg-[#051024] p-2.5 rounded border border-blue-900/30">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[8.5px] font-bold text-slate-300 uppercase tracking-wider">Consumption Trend</span>
                            <span className="text-[8px] text-blue-300 font-mono font-bold">Monthly Rate</span>
                          </div>
                          {/* Simulated Line Graph with bars */}
                          <div className="flex items-end gap-2 h-12 pt-2.5 border-b border-blue-900/20 px-1">
                            <div className="w-full bg-sky-500/20 rounded-t h-[30%] border-t border-sky-400" />
                            <div className="w-full bg-sky-500/25 rounded-t h-[45%] border-t border-sky-300" />
                            <div className="w-full bg-blue-600/20 rounded-t h-[65%] border-t border-blue-400" />
                            <div className="w-full bg-blue-500/30 rounded-t h-[80%] border-t border-white" />
                            <div className="w-full bg-emerald-500/20 rounded-t h-[60%] border-t border-emerald-400" />
                          </div>
                          <span className="text-[7.5px] text-slate-400 mt-1 font-mono block">Jan • Feb • Mar • Apr • May</span>
                        </div>
                      </div>

                      {/* Nepal Supply Map indicator */}
                      <div className="p-2 bg-[#051024] rounded border border-blue-900/30 text-left flex items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">PIPELINE ADHESION MAP</span>
                          <span className="text-[10px] text-white font-extrabold block">Babar Mahal Hub → Municipalities Active</span>
                        </div>
                        <div className="flex gap-1.5 items-center bg-[#0d2a55] px-2 py-0.5 rounded border border-sky-900/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-[8.5px] font-mono text-slate-200">Active Node Synchronized</span>
                        </div>
                      </div>

                    </div>
                  </div>
                  
                  {/* Laptop keyboard slot base */}
                  <div className="mt-1 h-3.5 bg-slate-800 rounded-b-xl relative overflow-hidden flex items-center justify-center">
                    <div className="w-16 h-1 w-full max-w-[70px] bg-slate-900/80 rounded" />
                  </div>
                  <div className="mx-auto mt-0.5 w-[96%] h-1 bg-slate-950/60 filter blur-2xs rounded-full shadow-lg" />
                </div>

                {/* Simulated stacked pharmaceutical drug boxes in mockup right corner with absolute position */}
                <div className="absolute right-[-20px] bottom-[-25px] z-20 w-[115px] sm:w-[135px] bg-white rounded-xl border border-slate-200 shadow-xl p-2.5 text-left text-slate-900 font-sans transform rotate-1 hover:rotate-0 transition-transform hidden sm:block">
                  <div className="border-b border-gray-100 pb-1.5 mb-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block mr-1.5 align-middle" />
                    <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest">PHARMA UNIT</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 text-[8.5px] font-bold select-none text-slate-800 leading-none">Amoxicillin 500mg</div>
                    <div className="text-[7.5px] text-slate-400 font-mono">Lot: 382-EX1 | Qty: 50</div>
                    <div className="h-1 w-full bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[85%]" />
                    </div>
                    <div className="text-[7px] text-slate-500 mt-1">Status: Verified Buffer</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SCM HIGHLIGHT STATISTICS ROW (Clean crisp light surface) */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs relative overflow-hidden group hover:shadow-md transition-shadow duration-200 text-left"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0063db] group-hover:bg-[#0747a6] transition-all" />
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#0747a6] font-mono tracking-tight">
                  {stat.value}
                </h3>
                <h4 className="text-sm font-bold text-slate-800 mt-1 uppercase tracking-wide">
                  {stat.label}
                </h4>
                <p className="text-xs text-slate-500 mt-2 font-normal leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded SCM Calculator Simulator & PAMS Overview Desk */}
      <section className="pb-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          
          {/* Integrated PAMS (Public Assets Management System) explanatory block */}
          <div 
            className="mb-12 p-6 sm:p-8 bg-blue-50/50 border border-blue-200/60 rounded-3xl shadow-xs relative overflow-hidden w-full mx-auto"
            style={{ maxWidth: '750px' }}
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-[#072d65]" />
            <h3 className="text-xl sm:text-2xl font-bold text-[#072d65] mb-4 tracking-tight leading-tight text-center">
              {language === "en"
                ? "Public Assets Management System (PAMS)"
                : "सार्वजनिक सम्पत्ति व्यवस्थापन प्रणाली (Public Assets Management System - PAMS)"}
            </h3>
            <div className="space-y-4">
              <p className="text-sm sm:text-sm text-slate-700 leading-relaxed text-justify font-normal">
                {language === "en"
                  ? "The Public Assets Management System (PAMS) is a digital platform that records, manages, tracks, and monitors the use of fixed assets (land, buildings) and movable assets (vehicles, equipment, furniture, library books) as well as drugs and active materials under the ownership of government offices. This system facilitates the integrated collection, update, analysis, and compliant management of public assets data."
                  : "सरकारी निकायहरूको स्वामित्वमा रहेका अचल (जग्गा, भवन), चल सम्पत्तिहरू (सवारी साधन, उपकरण, फर्निचर आदि) र औषधि तथा सामाग्रीको अभिलेखिकरण, व्यवस्थापन, ट्रयाकिङ तथा प्रयोगको अनुगमन गर्ने डिजिटल प्रणाली नै सार्वजनिक सम्पत्ति व्यवस्थापन प्रणाली (Public Assets Management System- PAMS) हो। यस प्रणालीले सम्पत्ति सम्बन्धी तथ्यांक एकीकृत रूपमा संकलन, अध्यावधिक, विश्लेषण तथा व्यवस्थापन गर्न मद्दत गर्दछ।"}
              </p>
              <p className="text-sm sm:text-sm text-slate-700 leading-relaxed text-justify font-normal">
                {language === "en"
                  ? "PAMS systematically organizes aspects such as asset ownership, operational status, valuation, maintenance, and transfer. This digital framework supports the effective utilization of public resources, ensuring transparency and enhanced municipal stewardship."
                  : "PAMS ले सम्पत्तिको स्वामित्व, प्रयोगको अवस्था, मूल्याङ्कन, मर्मतसम्भार, हस्तान्तरण जस्ता स्थानीय तहका आवश्यक पक्षहरूलाई व्यवस्थित रूपमा राख्ने काम गर्छ। यो प्रणालीले सरकारी स्रोतहरूको प्रभावकारी उपयोग, पारदर्शिता र जवाफदेहीता सुनिश्चित गर्न महत्त्वपूर्ण सहयोग पुर्याउँछ ।"}
              </p>
            </div>
          </div>

          {/* Interactive Calculator Simulator Toggle Drawer */}
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 text-left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 mb-6 gap-2">
              <div>
                <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  {language === "en" ? "Interactive Forecasting Simulator" : "अन्तरक्रियात्मक पूर्वानुमान सिम्युलेटर"}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {language === "en" ? "Try our active calculation tool developed for Nepalese municipal storekeepers." : "भण्डारका लागि विकसित सक्रिय लजिस्टिक क्यालकुलेटर।" }
                </p>
              </div>
              <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200/50 text-[10px] sm:text-xs font-semibold select-none leading-none">
                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                    activeTab === "overview"
                      ? "bg-white text-[#0747a6] shadow-xs font-extrabold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {language === "en" ? "System Core Overview" : "प्रणाली आधारभूत"}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("adjusted")}
                  className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                    activeTab === "adjusted"
                      ? "bg-white text-[#0747a6] shadow-xs font-extrabold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {language === "en" ? "Stockout Adjuster" : "स्टकआउट समायोजक"}
                </button>
              </div>
            </div>

            {activeTab === "adjusted" ? (
              <div className="space-y-5 animate-fade-in">
                <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100">
                  <h5 className="text-[10px] font-extrabold text-[#072d65] uppercase tracking-widest mb-1.5 font-mono">
                    {language === "en" ? "USAID/WHO Standard SCM Annual Stockout Correction Formula" : "USAID/WHO मानक SCM वार्षिक स्टकआउट सुधार सुत्र"}
                  </h5>
                  <div className="font-mono text-xs font-bold text-slate-700 bg-white p-3 rounded-xl border border-slate-200 flex flex-col gap-1 shadow-2xs">
                    <div className="flex justify-between text-[#0747a6]">
                      <span>C_adjusted_annual = </span>
                      <span>C_recorded × [ Reporting Months / (Reporting Months - Stockout Months) ]</span>
                    </div>
                  </div>
                </div>

                {/* Range Sliders */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                        {language === "en" ? "Recorded Annual Consumption" : "अभिलेख गरिएको कुल वार्षिक खपत"}
                      </label>
                      <span className="text-xs font-extrabold text-blue-600 font-mono">{recordedConsumption} {language === "en" ? "units" : "इकाईहरू"}</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="10000"
                      step="100"
                      value={recordedConsumption}
                      onChange={(e) => setRecordedConsumption(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                        {language === "en" ? "Stockout Months" : "स्टकआउट भएका महिनाहरू"}
                      </label>
                      <span className="text-xs font-extrabold text-red-600 font-mono">{stockoutMonths} {language === "en" ? "months" : "महिनाहरू"}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={reportingPeriodMonths - 1}
                      step="1"
                      value={stockoutMonths}
                      onChange={(e) => setStockoutMonths(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                        {language === "en" ? "Annual Reporting Period" : "वार्षिक रिपोर्टिङ अवधि"}
                      </label>
                      <span className="text-xs font-extrabold text-slate-700 font-mono">{reportingPeriodMonths} {language === "en" ? "months" : "महिनाहरू"}</span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="12"
                      step="1"
                      value={reportingPeriodMonths}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setReportingPeriodMonths(val);
                        if (stockoutMonths >= val) {
                          setStockoutMonths(val - 1);
                        }
                      }}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-500"
                    />
                  </div>
                </div>

                {/* Output Report Card */}
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
                  <div>
                    <span className="text-[9px] font-extrabold text-[#166534] uppercase tracking-widest block font-mono">
                      {language === "en" ? "Annual Adjusted Consumption (Forecast Parameter)" : "समायोजित वार्षिक खपत सूचक"}
                    </span>
                    <h5 className="text-2xl font-black text-[#166534] font-mono tracking-tight mt-0.5">
                      {adjustedConsumption} <span className="text-xs font-semibold font-sans">{language === "en" ? "units" : "इकाईहरू"}</span>
                    </h5>
                    <span className="text-[10px] text-slate-500 leading-tight block mt-0.5">
                      {language === "en" ? "Usable operating months:" : "सक्रिय सञ्चालन महिनाहरू:"} {usableMonths}/{reportingPeriodMonths} | Correction: <span className="font-bold font-mono text-emerald-800">+{adjustmentPercentage}%</span>
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 py-1.5 px-3 rounded-full border border-emerald-200/60 shadow-2xs">
                    {language === "en" ? "Normalized" : "नर्मलाइज्ड"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-3">1</div>
                    <h5 className="text-sm font-bold text-slate-800">{language === "en" ? "Model SOH" : "मौज्दात विश्लेषण"}</h5>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{language === "en" ? "System validates real SOH metrics to estimate safety duration buffers." : "सुरक्षित भण्डारण अवधि बुझ्न वास्तविक मौज्दात प्रमाणीकरण।"}</p>
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full mt-4 self-start">Active Validation</span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-605 text-emerald-600 flex items-center justify-center font-bold mb-3">2</div>
                    <h5 className="text-sm font-bold text-slate-800">{language === "en" ? "Expiry Tracking" : "सुरक्षित म्याद विसर्जन"}</h5>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{language === "en" ? "DoHS and WHO legal procedures followed for medical destruction." : "नेपाल सरकारकाे ऐन, नियमावली तथा कार्यविधि पालना गर्दै  लिलाम तथा उपभाेग मिति समाप्त भएका औषधिकाे सुरक्षित विसर्जन।"}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full mt-4 self-start">100% Safety</span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold mb-3">3</div>
                    <h5 className="text-sm font-bold text-slate-800">{language === "en" ? "ToT Capacity" : "प्रशिक्षक प्रशिक्षण"}</h5>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{language === "en" ? "Curriculum led by logistics experts with decades of joint field work." : "दशकौँको अनुभव बोकेका विज्ञ टोलीद्वारा पाठ्यक्रम र क्षमता अभिवृद्धि।"}</p>
                  </div>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full mt-4 self-start">25+ Yr Exp</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
