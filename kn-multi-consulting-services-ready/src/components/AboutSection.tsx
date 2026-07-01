/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Compass, Sparkles, Target, Trophy, Users, ShieldAlert, Award, Star } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

type TabId = "overview" | "mission-goal" | "objectives" | "team";

export default function AboutSection() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  useEffect(() => {
    const handleSelectTab = (event: Event) => {
      const customEvent = event as CustomEvent<TabId>;
      if (customEvent.detail === "team" || customEvent.detail === "overview" || customEvent.detail === "mission-goal" || customEvent.detail === "objectives") {
        setActiveTab(customEvent.detail);
      }
    };
    window.addEventListener("select-about-tab", handleSelectTab);
    return () => window.removeEventListener("select-about-tab", handleSelectTab);
  }, []);

  const objectives = language === "en" ? [
    {
      title: "Enhance Human Capacity",
      description: "Deliver targeted, high-impact training to health personnel across District and Municipal levels on accurate forecasting, quantification, and inventory management.",
      icon: Users,
      badge: "Capacity Building"
    },
    {
      title: "Modernize Logistics Systems",
      description: "Drive the successful implementation and adoption of the PAMSV2 (LMIS) system across hospitals, Health Posts, and Community Health Units (CHUs) to digitize and streamline supply chain tracking.",
      icon: Target,
      badge: "LMIS Deployment"
    },
    {
      title: "Develop Standardized Educational Frameworks",
      description: "Leverage our team's 25+ years of combined field expertise to design, develop, and deploy highly effective, evidence-based training manuals and SCM curricula.",
      icon: Compass,
      badge: "Curriculum Design"
    },
    {
      title: "Ensure Regulatory Compliance & Safety",
      description: "Provide critical technical assistance to healthcare facilities for the legal, safe, and environmentally responsible disposal of expired drugs and the auctioning of unusable medical assets, strictly adhering to Nepalese government regulations.",
      icon: ShieldAlert,
      badge: "Compliance & Safety"
    },
    {
      title: "Minimize Wastage and Stockouts",
      description: "Improve overall supply chain efficiency to prevent critical shortages of essential medicines while minimizing the expiration of life-saving SCM health commodities in municipal stores.",
      icon: Trophy,
      badge: "Efficiency Optimization"
    }
  ] : [
    {
      title: "मानव क्षमता अभिवृद्धि",
      description: "जिल्ला र स्थानीय तहका स्वास्थ्यकर्मीहरूलाई सटिक पूर्वानुमान, परिमाणीकरण र सूची व्यवस्थापन सम्बन्धी उच्च-प्रभावकारी तालिम प्रदान गर्ने।",
      icon: Users,
      badge: "क्षमता अभिवृद्धि"
    },
    {
      title: "डिजिटल आपूर्ति प्रणालीको आधुनिकीकरण",
      description: "अस्पतालहरू, स्वास्थ्य चौकीहरू र सामुदायिक स्वास्थ्य एकाइहरू (CHUs) मा PAMSV2 (LMIS) सफ्टवेयर सफलतापूर्वक संचालनमा ल्याई प्रविधिमैत्री बनाउने।",
      icon: Target,
      badge: "LMIS व्यवस्थापन"
    },
    {
      title: "गुणस्तरीय शैक्षिक तालिम निर्देशिका विकास",
      description: "हाम्रो टिमको २५+ वर्ष लामो अनुभवलाई प्रयोग गरी उत्कृष्ट तालिम सहयोगी पुस्तिका र स्वास्थ्य आपूर्ति म्यानुअल विकास गर्ने।",
      icon: Compass,
      badge: "निर्देशिका डिजाइन"
    },
    {
      title: "नियमन अनुपालन तथा सुरक्षा",
      description: "म्याद सकिएका औषधिहरूको कानुनी र वातावरणीय रूपमा सुरक्षित विसर्जन तथा प्रयोग नभएका स्वास्थ्य सामग्रीहरूको लिलामी प्रक्रियालाई नेपाल सरकारको नियम अनुसार व्यवस्थापन गर्ने।",
      icon: ShieldAlert,
      badge: "अनुपालन र सुरक्षा"
    },
    {
      title: "नोक्सानी र स्टकआउट न्यूनीकरण",
      description: "पालिका स्तरका भण्डारहरूमा औषधिको अभाव र अनावश्यक म्याद गुज्रने नोक्सानी कम गर्दै समग्र आपूर्ति व्यवस्थापन सुधार्ने।",
      icon: Trophy,
      badge: "दक्षता अनुकूलन"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* LMIS Info Box */}
        <div 
          className="mb-12 p-6 sm:p-8 border border-blue-200/60 rounded-3xl shadow-xs relative overflow-hidden max-w-[700px] w-full mx-auto text-left bg-blue-50/50"
        >
          <div 
            className="absolute top-0 left-0 h-full bg-[#072d65]" 
            style={{ width: '8px' }}
          />
          <h3 className="text-xl sm:text-2xl font-bold text-[#072d65] mb-4 tracking-tight leading-tight text-center">
            {language === "en"
              ? "Logistics Management Information System (LMIS)"
              : "आपूर्ति व्यवस्थापन सूचना प्रणाली"}
          </h3>
          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
            <p>
              {language === "en"
                ? "In Nepal's health sector, the Logistics Management Information System (LMIS) is a digital and data-driven system that manages the demand, storage, and distribution of medicines, vaccines, and other health supplies. This system has been implemented since the fiscal year 2051/052 under the Department of Health Services. Starting from the fiscal year 2082/083, this has been integrated into the second version of the Public Assets Management System (PAMSV2) developed by the Office of the Auditor General to facilitate data retrieval. PAMSV2 is operated online across all 7 provinces, 77 districts, and all local bodies, as well as health facilities nationwide."
                : "नेपालको स्वास्थ्य क्षेत्रमा आपूर्ति व्यवस्थापन सूचना प्रणाली (Logistics Management Information System- LMIS) औषधि, खोप, र अन्य स्वास्थ्य सामग्रीहरूको माग, भण्डारण, र वितरणलाई व्यवस्थित गर्ने एक डिजिटल तथा तथ्याङ्कमा आधारित प्रणाली हो । नेपालमा स्वास्थ्य सेवा विभाग अन्तर्गत आर्थिक वर्ष २०५१/०५२ देखि यो प्रणाली लागू भएको हो । आर्थिक वर्ष २०८२/०८३ देखि यसलाई महालेखा परीक्षकको कायर्यालयबाट विकास गरिएको सार्वजनिक सम्पत्ति व्यवस्थापन प्रणाली (Public Assets Management Systems- PAMSV2) दोस्रो संस्करणमा समायोजन गरी तथ्याङ्क प्राप्त गर्ने व्यवस्था मिलाइएको छ । अनलाइनमा आधारित PAMSV2 को रूपमा देशभरका ७ वटै प्रदेश, ७७ जिल्ला र सम्पूर्ण स्थानीय तहका साथै स्वास्थ्य संस्थाहरूमा सञ्चालन गरिएको छ ।"}
            </p>
            <p>
              {language === "en"
                ? "LMIS is the heart of supply chain management, supplying informational blood throughout every organ of logistics. The data obtained from it is essential for forecasting, quantification, procurement, distribution, and re-supply of medicines and medical supplies. Its goal is to prevent stockouts of essential items at health facilities, and to avoid issues like overstock, understock, or expiration of commodities."
                : "LMIS आपूर्ति व्यवस्थापनको मुटु हो जसले आपूर्ति व्यवस्थापनका प्रत्येक अंगहरूमा सूचनारूपि रक्त प्रवाह गरिरहेको हुन्छ । यसबाट प्राप्त तथ्याङ्क औषधि तथा औषधिजन्य सामग्रीहरूको प्रक्षेपण (Forecasting), परिमाण निर्धारण (Quantification), खरिद (Procurement), वितरण, पुर्नवितरण (Supply and Re-supply) आवश्यक पर्दछ । स्वास्थ्य संस्थाहरूमा अत्यावश्यक औषधि तथा औषधिजन्य सामग्रीहरूको अभाव (Stockout) हुन नदिनु, अधिक मौज्दात (Over Stock), न्यून मौज्दात (Under Stock) र म्याद नाघेर जाने (Expiry) समस्यालाई रोक्नु हो ।"}
            </p>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {language === "en" ? "Who We Are" : "हाम्रो परिचय"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {language === "en" ? "Pioneering Health Logistics Excellence in Nepal" : "नेपालमा स्वास्थ्य आपूर्ति श्रृंखला र लजिस्टिक उत्कृष्टताको विकास"}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
            {language === "en" 
              ? "Established in 2023, KN Multi Consulting Services is a pioneering consulting firm committed to strengthening healthcare supply chains and strengthening human capacity."
              : "सन् २०२३ मा स्थापित, KN मल्टि कन्सल्टिङ सर्भिसेज एक अग्रणी परामर्शदाता संस्था हो जुन स्वास्थ्य आपूर्ति श्रृंखला सुदृढ बनाउन र मानव क्षमता अभिवृद्धि गर्न प्रतिबद्ध छ।"}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-gray-100 justify-center gap-2 sm:gap-6 mb-12 flex-wrap">
          {(["overview", "mission-goal", "objectives", "team"] as TabId[]).map((tab) => (
            <button
              key={tab}
              id={`tab-btn-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-4 text-base font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === tab
                  ? "border-brand-600 text-brand-700 font-bold"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab === "overview" && (language === "en" ? "Company Overview" : "कम्पनी सिंहावलोकन")}
              {tab === "mission-goal" && (language === "en" ? "Mission & Main Goal" : "मिशन र मुख्य उद्देश्य")}
              {tab === "objectives" && (language === "en" ? "Strategic Objectives" : "रणनीतिक उद्देश्यहरू")}
              {tab === "team" && (language === "en" ? "Our Team" : "हाम्रो टिम")}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="min-h-[300px]">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-left">
                <h3 className="text-2xl font-bold text-gray-900">
                  {language === "en" ? "Reliable Partners in Supply Chain Management" : "आपूर्ति श्रृंखला व्यवस्थापनमा भरपर्दो साझेदार"}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {language === "en"
                    ? "KN Multi Consulting Services Pvt. Ltd. is officially registered with the Nepal Company Registration Office and operates from its central office in Kathmandu. We specialize in public health logistics, training modules, and pharmaceutical legal safe-disposal frameworks."
                    : "KN मल्टि कन्सल्टिङ सर्भिसेज प्रा. लि. नेपाल कम्पनी रजिष्ट्रारको कार्यालयमा आधिकारिक रूपमा दर्ता भई काठमाडौंबाट सञ्चालित छ। हामी सार्वजनिक स्वास्थ्य आपूर्ति श्रृंखला, तालिम निर्देशिका विकास, र औषधिहरूको कानुनी एवं वातावरणीय सुरक्षित विसर्जन कार्यमा विशेषज्ञता राख्छौं।"}
                </p>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {language === "en"
                    ? "We maintain a dedicated, active roster of Health Logistics Experts and Curriculum Development Specialists. Individually and collectively, our team members bring more than 25 years of field operational experience in designing education manuals, conducting regional forecasting seminars, and managing drug clearances."
                    : "हामीसँग स्वास्थ्य आपूर्ति विज्ञहरू र पाठ्यक्रम विकास विशेषज्ञहरूको समर्पित र सक्रिय समूह छ। व्यक्तिगत र सामूहिक रूपमा, हाम्रा टोली सदस्यहरूसँग निर्देशिका निर्माण, देशव्यापी माग पूर्वानुमान सेमिनार सञ्चालन र परिपक्व औषधि विसर्जन तथा व्यवस्थापन कार्यमा २५ वर्ष भन्दा बढी लामो समयको व्यावहारिक अनुभव छ।"}
                </p>
                <div className="flex gap-4 p-4 rounded-2xl bg-brand-50 border border-brand-100">
                  <div className="text-brand-600 mt-1 flex-shrink-0">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">
                      {language === "en" ? "Rooted in Kathmandu, Serving Nationally" : "काठमाडौंमा मुख्य कार्यालय, राष्ट्रव्यापी सेवा"}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 font-medium">
                      {language === "en"
                        ? "From Babar Mahal, we synchronize programs with ministries, municipal stores, and community facilities across Nepal."
                        : "बबरमहल, काठमाडौंबाट हामी मन्त्रालयहरू, क्षेत्रीय स्वास्थ्य भण्डार गृहहरू र नेपालभरिका स्थानीय पालिका स्वास्थ्य संस्थाहरू सँग समन्वय गर्दछौं।"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-tr from-brand-600 to-brand-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg h-full flex flex-col justify-center min-h-[300px]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-xl" />
                <blockquote className="text-lg italic font-normal leading-relaxed relative z-10 text-justify">
                  {language === "en"
                    ? '"Sustainable public health relies on uninterrupted access to vital commodities. We bridge the gap between traditional store management and digital cloud-based LMIS accuracy, keeping Nepal resilient."'
                    : '"दिगो सार्वजनिक स्वास्थ्य औषधोपचार र महत्त्वपूर्ण सामानहरूको निरन्तर उपलब्धतामा निर्भर रहन्छ। हामी परम्परागत भण्डार व्यवस्थापन र क्लाउड-आधारित डिजिटल LMIS बीचको प्रविधिको खाडललाई पूरा गर्ने कार्यमा प्राविधिक सहयोग उपलब्ध गराउँदै आपूर्ति व्यवस्थापनलाई सबल बनाउन मद्दत पुर्याउँछौं।"'}
                </blockquote>
                <div className="mt-6 flex items-center gap-3 relative z-10 border-t border-white/10 pt-4">
                  <div className="bg-brand-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                    SK
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Kedar Nath Upreti</h4>
                    <p className="text-xs text-brand-200">
                      {language === "en" ? "Point of Contact / Lead Logistics Consultant" : "मुख्य सम्पर्क व्यक्ति/आपूर्ति विज्ञ"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "mission-goal" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="bg-brand-50/50 p-8 rounded-3xl border border-brand-100 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="bg-brand-100 text-brand-700 w-12 h-12 rounded-2xl flex items-center justify-center">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {language === "en" ? "Our Sacred Mission" : "हाम्रो मुख्य लक्ष्य"}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {language === "en"
                      ? "To strengthen Nepal’s public health infrastructure by delivering expert supply chain management solutions, comprehensive training, and precise technical assistance."
                      : "नेपालको सार्वजनिक स्वास्थ्य प्रणालीलाई सुदृढ बनाउन विशेषज्ञ आपूर्ति श्रृंखला व्यवस्थापन समाधान, व्यापक तालिम र सटिक प्राविधिक सहयोग प्रदान गर्नु हाम्रो मूल मिशन हो।"}
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {language === "en"
                      ? "We endeavor to empower healthcare facilities and personnel with the practical skills and systems necessary to ensure the efficient, compliant, and continuous availability of health commodities."
                      : "हाम्रो प्रयास स्वास्थ्य संस्थाहरु र कार्यरत कर्मचारीहरूलाई व्यवहारिक सीप र प्रणालीहरू मार्फत व्यावसायिक, उत्तरदायी र निरन्तर स्वास्थ्य सामग्रीहरूको चौबीसै घण्टा उपलब्धता सुनिश्चित गर्नु हो।"}
                  </p>
                </div>
              </div>
              <div className="bg-brand-50/50 p-8 rounded-3xl border border-brand-100 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="bg-brand-100 text-brand-700 w-12 h-12 rounded-2xl flex items-center justify-center">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {language === "en" ? "Our Ultimate Goal" : "हाम्रो अन्तिम लक्ष्य"}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {language === "en"
                      ? "To achieve zero stockouts of life-saving drugs and eliminate medical commodity wastage across Nepal's municipal stores."
                      : "नेपालका स्थानीय तहका स्वास्थ्य भण्डार गृहहरूमा औषधिको अभाव (stockout) शून्यमा झार्ने र म्याद नाघेर वा अन्य कारणले खेर जाने परिमाण न्यूनीकरण गर्ने।"}
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {language === "en"
                      ? "By implementing high-accuracy digital forecasting systems and modernizing supply tracking, we ensure care is never delayed."
                      : "सटिक डिजिटल पूर्वानुमान प्रणाली र आधुनिक आपूर्ति ट्र्याकिङ लागू गरेर, हामी सुनिश्चित गर्दछौं कि औषधोपचार सेवामा कहिल्यै अवरोध नआओस्।"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "objectives" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {objectives.map((obj, idx) => {
                const IconComponent = obj.icon;
                return (
                  <div key={idx} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left">
                    <div className="space-y-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold">
                        {obj.badge}
                      </span>
                      <IconComponent className="w-8 h-8 text-brand-600" />
                      <h4 className="text-xl font-bold text-gray-900">{obj.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed text-justify">{obj.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "team" && (
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900">
                  {language === "en" ? "Our Supply Experts & Advisors" : "हाम्रा आपूर्ति विज्ञ र सल्लाहकारहरू"}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {language === "en" 
                    ? "Meet our distinguished group of senior health logistics leaders and capacity specialists." 
                    : "हाम्रा वरिष्ठ health logistics leaders, capacity development र policy advisement experts को परिचय।"}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {/* 1. Dr. Bhim Singh Tinkari Card */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-200 text-center flex flex-col justify-between max-w-sm w-full">
                  <div>
                    <div className="mx-auto w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-4 font-bold text-3xl">
                      BT
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 mb-2">
                      <Star className="w-3.5 h-3.5" />
                      {language === "en" ? "Senior Policy Advisor" : "वरिष्ठ स्वास्थ्य नीति तथा आपूर्ति सल्लाहकार"}
                    </span>
                    <h4 className="text-xl font-bold text-gray-900">
                      {language === "en" ? "Dr. Bhim Singh Tinkari" : "डा. भीम सिं तिंकरी"}
                    </h4>
                    <p className="text-sm font-semibold text-emerald-600 mt-1">
                      {language === "en" ? "Former Chief Specialist, DoHS / SCM Expert" : "पूर्व प्रमुख विशेषज्ञ, स्वास्थ्य सेवा विभाग / आपूर्ति विज्ञ"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-3 leading-relaxed text-justify">
                      {language === "en"
                        ? "Brings over 30 years of distinguished leadership in Nepal's public health administration, strategic policy formulation, and healthcare supply chain coordination at the ministry level."
                        : "नेपाल सरकार, स्वास्थ्य मन्त्रालयको पूर्व विभाग प्रमुख तथा ३० वर्ष भन्दा लामो समय सार्वजनिक स्वास्थ्य प्रशासन, नीति निर्माण र राष्ट्रिय आपूर्ति श्रृंखला सुधारमा नेतृत्वदायी भूमिका र विज्ञता।"}
                    </p>
                  </div>
                  <div className="border-t border-gray-50 pt-4 mt-6 text-xs text-gray-400 font-medium">
                    {language === "en" ? "Advisory & National Strategy Council" : "राष्ट्रिय नीति तथा रणनीति विभाग"}
                  </div>
                </div>

                {/* 2. Krishna Bahadur Chand Box */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-200 text-center flex flex-col justify-between max-w-sm w-full">
                  <div>
                    <div className="mx-auto w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 mb-4 font-bold text-3xl">
                      KC
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 mb-2">
                      <Award className="w-3.5 h-3.5" />
                      {language === "en" ? "Senior SCM Advisor" : "वरिष्ठ आपूर्ति सल्लाहकार"}
                    </span>
                    <h4 className="text-xl font-bold text-gray-900">
                      {language === "en" ? "Krishna Bahadur Chand" : "कृष्ण बहादुर चन्द"}
                    </h4>
                    <p className="text-sm font-semibold text-rose-600 mt-1">
                      {language === "en" ? "Former Senior Public Health Administrator, DoHS / SCM Expert" : "पूर्व वरिष्ठ जनस्वास्थ्य प्रशासक, स्वासेवि/आपूर्ति विज्ञ"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-3 leading-relaxed text-justify">
                      {language === "en"
                        ? "A seasoned child health and immunization expert with over 40 years of extensive experience in Nepal's public health sector."
                        : "नेपालको जनस्वास्थ्य क्षेत्रमा ४० वर्षभन्दा बढी लामो अनुभव बोकेका परिपक्व बाल स्वास्थ्य तथा खोप विज्ञ ।"}
                    </p>
                  </div>
                  <div className="border-t border-gray-50 pt-4 mt-6 text-xs text-gray-400 font-medium">
                    {language === "en" ? "Liaison & Procurement Support" : "सजिलो खरिद समन्वय र सहकार्य"}
                  </div>
                </div>

                {/* 3. Shyam Sundar Sharma Card */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-200 text-center flex flex-col justify-between max-w-sm w-full">
                  <div>
                    <div className="mx-auto w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center text-sky-600 mb-4 font-bold text-3xl">
                      SS
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 mb-2">
                      <Compass className="w-3.5 h-3.5" />
                      {language === "en" ? "Policy, Planning, Capacity Development & Coordination Expert" : "नीति, योजना, क्षमता विकास एवं समन्वय विज्ञ"}
                    </span>
                    <h4 className="text-xl font-bold text-gray-900">
                      {language === "en" ? "Shyam Sundar Sharma" : "श्री श्याम सुन्दर शर्मा"}
                    </h4>
                    <p className="text-sm font-semibold text-sky-600 mt-1">
                      {language === "en" ? "Former Joint Secretary & Administration Expert" : "पूर्व सहसचिव एवं प्रशासन विद्"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-3 leading-relaxed text-justify">
                      {language === "en"
                        ? "Specializes in designing national public health SCM manuals, curriculum development, and leading municipal-level LMIS & software simulation workshop deployments."
                        : "प्रशासन क्षेत्रमा गहन अध्ययन र लामो व्यावहारिक अनुभव भएको निपुण प्रशासनविद् (Public Administration Expert) साथै नेपालका प्रशासनिक प्रशिक्षण प्रतिष्ठानहरूमा स्रोत व्यक्ति (Resource Person) को रूपमा संलग्न रहँदै आउनुभएका विज्ञ ।"}
                    </p>
                  </div>
                  <div className="border-t border-gray-50 pt-4 mt-6 text-xs text-gray-400 font-medium">
                    {language === "en" ? "Training & Capacity Specialist" : "क्षमता विकास तथा प्रशिक्षण सहयोग"}
                  </div>
                </div>

                {/* 4. Udev Man Maharjan Box */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-200 text-center flex flex-col justify-between max-w-sm w-full">
                  <div>
                    <div className="mx-auto w-20 h-20 bg-violet-50 rounded-full flex items-center justify-center text-violet-600 mb-4 font-bold text-3xl">
                      UM
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 mb-2">
                      <Users className="w-3.5 h-3.5" />
                      {language === "en" ? "Operations & Training" : "पाठ्यक्रम विकास शाखा"}
                    </span>
                    <h4 className="text-xl font-bold text-gray-900">
                      {language === "en" ? "Udev Man Maharjan" : "उदेव मान महर्जन"}
                    </h4>
                    <p className="text-sm font-semibold text-violet-600 mt-1">
                      {language === "en" ? "SCM & Capacity Development Expert" : "आपूर्ति श्रृंखला एवं क्षमता विकास विज्ञ"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-3 leading-relaxed text-justify">
                      {language === "en"
                        ? "Specializes in health supply chain management training, interactive workshops, training manuals, and operational guideline development."
                        : "स्वास्थ्य आपूर्ति व्यवस्थापन तालिम, अन्तर्क्रिया गोष्ठी, तालिम पुस्तिका तथा कार्यविधि निर्देशिका विकास विज्ञ"}
                    </p>
                  </div>
                  <div className="border-t border-gray-50 pt-4 mt-6 text-xs text-gray-400 font-medium">
                    {language === "en" ? "District Capacity Mobilization" : "कार्यक्रम समन्वय तथा क्षमता अभिवृद्धि"}
                  </div>
                </div>

                {/* 5. Kedar Nath Upreti Card */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-200 text-center flex flex-col justify-between max-w-sm w-full">
                  <div>
                    <div className="mx-auto w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 mb-4 font-bold text-3xl">
                      KU
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 mb-2">
                      <Award className="w-3.5 h-3.5" />
                      {language === "en" ? "Founder & Consultant" : "संस्थापक तथा परामर्शदाता"}
                    </span>
                    <h4 className="text-xl font-bold text-gray-900">Kedar Nath Upreti</h4>
                    <p className="text-sm font-semibold text-brand-600 mt-1">
                      {language === "en" ? "Health Logistics Specialist" : "स्वास्थ्य आपूर्ति श्रृंखला विज्ञ"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-3 leading-relaxed text-justify">
                      {language === "en"
                        ? "Over 25 years of experience. Providing nationwide training and guidance to healthcare professionals in supply chain management, PAMSv2, auctioning, and safe disposal of expired medicines."
                        : "२५ वर्षभन्दा लामो अनुभव। देशव्यापी रूपमा आपूर्ति व्यवस्थापन, PAMSv2, लिलाम बिक्री तथा उपभोग मिति समाप्त भएका औषधिहरु नष्ट गर्ने कार्यमा स्वास्थ्यकर्मीहरूलाई प्रशिक्षण र मार्गदर्शन।"}
                    </p>
                  </div>
                  <div className="border-t border-gray-50 pt-4 mt-6 text-xs text-gray-400 font-medium">
                    {language === "en" ? "Primary Contact: 9851142793" : "सम्पर्क नम्बर: ९८५११४२७९३"}
                  </div>
                </div>

                {/* 6. Prem Adhikari Box */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-200 text-center flex flex-col justify-between max-w-sm w-full">
                  <div>
                    <div className="mx-auto w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mb-4 font-bold text-3xl">
                      PA
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 mb-2">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      {language === "en" ? "Capacity Development & Training Consultant" : "क्षमता विकास तथा तालिम परामर्शदाता"}
                    </span>
                    <h4 className="text-xl font-bold text-gray-900">
                      {language === "en" ? "Prem Adhikari" : "श्री प्रेम अधिकारी"}
                    </h4>
                    <p className="text-sm font-semibold text-amber-600 mt-1">
                      {language === "en" ? "Health Supply Chain Consultant" : "स्वास्थ्य आपूर्ति श्रृंखला परामर्शदाता"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-3 leading-relaxed text-justify">
                      {language === "en"
                        ? "Decades of expertise in health supply chain management training, logistics information systems, forecasting and quantification of essential drugs & medical supplies, auction procedures, and warehouse management."
                        : "आपूर्ति व्यवस्थापन तालिम, आपूर्ति व्यवस्थापन सूचना प्रणाली, अत्यावश्यक औषधि तथा औषधिजन्य सामाग्रीहरुको प्रक्षेपण तथा परिमाण निर्धारण, लिलाम बिक्री, भण्डार व्यवस्थापनमा दशकौँको विशेषज्ञता।"}
                    </p>
                  </div>
                  <div className="border-t border-gray-50 pt-4 mt-6 text-xs text-gray-400 font-medium">
                    {language === "en" ? "Compliance & Quality Audit" : "नियमन तथा अनुपालन विश्लेषण"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
