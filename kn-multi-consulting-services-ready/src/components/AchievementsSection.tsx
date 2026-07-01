/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Award, CheckCircle2, ChevronRight, Sparkles, TrendingUp, Compass, Trash2, Database, ShieldCheck, Camera, Pause, Play } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
// @ts-ignore
import unusableTravellingImg from "./unusable travelling to Chimny.jpg";
// @ts-ignore
import pamsTrainingImg from "./PAMSV2 training at Jiri.jpg";
// @ts-ignore
import safelyDisposingImg from "./Safely disposing.jpg";
// @ts-ignore
import junkForAuctionImg from "./Junk for auction.jpg";
// @ts-ignore
import forecastingWorkshopImg from "./Forecasting workshop.jpg";
// @ts-ignore
import shortingUnusablesImg from "./Shorting unusables.jpg";

type FiscalYear = "all" | "fy2081_2082" | "fy2082_2083";

interface GalleryItem {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
}

export default function AchievementsSection() {
  const { language } = useLanguage();
  const [selectedYear, setSelectedYear] = useState<FiscalYear>("all");
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  const galleryItems: GalleryItem[] = language === "en" ? [
    {
      id: "01",
      category: "Capacity Building",
      title: "Medicine Quantification & Forecasting",
      description: "Multi-day capacity development workshop conducted for Municipality Health Department Heads, standardizing forecasting and quantification strategies.",
      image: forecastingWorkshopImg
    },
    {
      id: "02",
      category: "Digital LMIS",
      title: "PAMS V2 Software Training",
      description: "Standardizing digital Health Logistics (LMIS) across local centers, health posts, and community units via hands-on operator enablement.",
      image: pamsTrainingImg
    },
    {
      id: "04",
      category: "Materials Classification",
      title: "Classification for Disposal",
      description: "Audit and security inspection of expired pharmaceuticals and liquid disinfectants prepared for procedural, safe disposal under environmental regulations.",
      image: shortingUnusablesImg
    },
    {
      id: "05",
      category: "Sub-System Setup",
      title: "Medical Waste Infrastructure Development",
      description: "Establishing ground containment, biological filters, concrete bases, and iron grids for safe medical waste destruction.",
      image: "/assets/input_file_4.png"
    },


    {
      id: "08",
      category: "Space Cleansing",
      title: "Damaged Wheelchair & Frame Segregation",
      description: "Strict separation and logging of metal hardware and obsolete health devices to expand valid floor storage in dense clinical spaces.",
      image: junkForAuctionImg
    },
    {
      id: "09",
      category: "Logistics Dispatch",
      title: "Certified Environmental Safe Transport",
      description: "Dispatching cleared hazardous medical containers and waste sacks on heavy cargo trucks under Department of Health Services compliance mandates.",
      image: unusableTravellingImg
    }
  ] : [
    {
      id: "01",
      category: "क्षमता अभिवृद्धि",
      title: "औषधि परिमाण र माग पूर्वानुमान",
      description: "पालिका स्वास्थ्य शाखा प्रमुखहरूका लागि परिमाण र माग पूर्वानुमान रणनीतिहरूको स्तरीकरण तथा बहु-दिवसीय क्षमता विकास कार्यशाला।",
      image: forecastingWorkshopImg
    },
    {
      id: "02",
      category: "डिजिटल LMIS",
      title: "PAMS V2 सफ्टवेयर तालिम",
      description: "सिमित साधनस्रोत भएका स्थानीय स्वास्थ्य चौकीहरू र सामुदायिक स्वास्थ्य एकाइहरूमा व्यावहारिक अपरेटर प्रशिक्षण मार्फत डिजिटल आपूर्ति प्रणाली सुदृढीकरण।",
      image: pamsTrainingImg
    },
    {
      id: "04",
      category: "सामाग्रीहरूको वर्गिकरण",
      title: "विसर्जनको लागि वर्गिकरण",
      description: "वातावरणीय कानुनी मापदण्ड बमोजिम सुरक्षित विसर्जनका लागि तयार गरिएका म्याद गुज्रेका औषधि र कीटाणुनाशक रसायनहरूको निरीक्षण तथा प्रमाणीकरण।",
      image: shortingUnusablesImg
    },
    {
      id: "05",
      category: "पूर्वाधार निर्माण",
      title: "ईनक्याप्सुलेसन विधि मार्फत विसर्जनको तयारी",
      description: "स्वास्थ्यजन्य फोहोर मैलाको सुरक्षित व्यवस्थापन र वातावरणीय संरक्षणका लागि सिमेन्ट संरचना, जैविक फिल्टर र फलामको सुरक्षात्मक जाली निर्माण।",
      image: safelyDisposingImg
    },


    {
      id: "08",
      category: "भण्डार व्यवस्थापन",
      title: "बिग्रिएका सामाग्रीहरूको वर्गीकरण",
      description: "सघन सेवा प्रवाह हुने स्वास्थ्य संस्थाको अमूल्य ठाउँ उपयोगका लागि पुराना बिग्रिएका उपकरण र थुप्रिएका धातुहरूलाई अलग्ग्याई आधिकारिक दर्ता कार्य।",
      image: junkForAuctionImg
    },
    {
      id: "09",
      category: "सुरक्षित ढुवानी",
      title: "प्रमाणित सुरक्षित वातावरणीय ढुवानी",
      description: "उपभोग मिति समाप्त भएका औषधि तथा औषधिजन्य ठोस सामाग्रीहरूको उचित प्याकिङका साथ सुरक्षित विसर्जन क्षेत्र (सिमेन्ट कारखाना) तर्फ प्रस्थानको तयारी । सिमेन्ट कारखानामा ८५० डिग्री सेल्सियस भन्दा बढी तापक्रममा चल्ने भट्टीहरूमा जलाउने प्रक्रिया पनि सुरक्षित र भरपर्दो मानिन्छ ।",
      image: unusableTravellingImg
    }
  ];

  const highlights = language === "en" ? [
    {
      metric: "22+",
      label: "Sites Configured",
      desc: "Fully operational with PAMSV2 (LMIS) software, empowering local operators."
    },
    {
      metric: "9",
      label: "Districts Primed",
      desc: "Intensive forecasting and quantification workshops delivered with province support."
    },
    {
      metric: "100%",
      label: "Adherence Record",
      desc: "End-to-End Governance from Central DoHS departments to grassroots Community Health Units."
    }
  ] : [
    {
      metric: "२२+",
      label: "तालिम कार्यक्रम सम्पन्न",
      desc: "जिन्सी सफ्टवेयर (PAMSV2) सुचारुपूर्वक सञ्चालनका लागि स्थानीय स्वास्थ्य संस्थाहरू तथा पालिका कर्मचारीहरूको क्षमता अभिबृद्धि ।"
    },
    {
      metric: "९",
      label: "कार्यशाला सम्पन्न",
      desc: "प्रदेश स्वास्थ्य मन्त्रालयको समन्वयमा सघन माग पूर्वानुमान तथा खरिद सम्बन्धी सक्षमता तालिम सम्पन्न।"
    },
    {
      metric: "१००%",
      label: "नीति निर्देशन पालना",
      desc: "केन्द्रिय मन्त्रालय र स्वास्थ्य सेवा विभागका नीतिहरू तल्लो स्तरको स्वास्थ्य चौकीसम्म सफल कार्यान्वयन।"
    }
  ];

  const blocks = [
    {
      id: "b1",
      fy: "fy2081_2082",
      title: language === "en" ? "Streamlining Supply Chains & Waste Management" : "आपूर्ति शृङ्खलाको सुदृढीकरण तथा तथा उपभोग मिति समाप्त भएका औषधि तथा औषधिजन्य सामाग्रीहरूकाे सुरक्षित व्यवस्थापन",
      subtitle: language === "en" ? "Fiscal Year 2081 / 082" : "आर्थिक वर्ष २०८१ / ०८२",
      tag: language === "en" ? "Disposal & Clearing" : "विसर्जन र लिलाम",
      icon: Trash2,
      color: "border-teal-100 bg-teal-50/10 text-teal-700",
      intro: language === "en" 
        ? "Focused on optimizing physical hospital warehouse space and ensuring supreme environmental safety by executing professional disposal protocols for unusable commodities & obsolete hardware."
        : "काम नलाग्ने पुराना स्वास्थ्य उपकरण र उपभाेग मिति समाप्त भएका औषधि तथा औषधिजन्य समाग्रीहरू कानुनी र सुरक्षित वातावरणीय विसर्जन प्रक्रिया सम्पन्न गरी भण्डार कोठा सुदृढीकरण गरिएको।",
      initiatives: [
        {
          name: language === "en" ? "Central Level Equipment Auctioning" : "केन्द्रिय स्तरका उपकरणहरूको लिलाम प्रक्रिया",
          details: language === "en"
            ? "Successfully engineered and executed the procedural auctioning and clearance of vital unusable medical and health assets at the Central Level Hospital, freeing up premium institutional resources & floor space."
            : "काम नलाग्ने पुराना स्वास्थ्य उपकरण र मालसामानहरू पहिचान गरी सरकारी ऐन, नियम र कार्यविधि बमोजिम वैधानिक रूपमा लिलाम प्रक्रिया पूरा गरी बहुमूल्य ठाउँ खाली गरिएको।"
        },
        {
          name: language === "en" ? "Safe Disposal of Unusable Commodities" : "उपभाेग मिति समाप्त भएका औषधिको सुरक्षित वातावरणीय विसर्जन",
          details: language === "en"
            ? "Safely and successfully destroyed expired/unusable drugs and chemical consumables across key central institutions and district bodies under safe protocols:"
            : "वातावरणीय मापदण्ड अनुसार स्वास्थ्य संस्था र औषधि भण्डारमा कयौँ वर्षदेखि उपभाेग मिति समाप्त भएका औषधि र रसायनहरूलाई सुरक्षित र व्यवस्थित तवरले विसर्जन गरिएको।"
        }
      ],
      subLocations: language === "en" ? [
        "Department of Health Services (DoHS) HQ",
        "Metropolitan City Health Divisions",
        "4 Strategic District Health Centers",
        "Partner Social Marketing Organizations"
      ] : [
        "स्वास्थ्य सेवा विभाग (DoHS)",
        "महानगरपालिकाका स्वास्थ्य प्रभागहरू",
        "४ वटा रणनीतिक जिल्ला स्वास्थ्य कार्यालयहरू",
        "साझेदार सामाजिक बजारीकरण संस्थाहरू"
      ]
    },
    {
      id: "b2",
      fy: "fy2082_2083",
      title: language === "en" ? "Transforming Health Logistics & Capacity Building" : "स्वास्थ्य आपूर्ति प्रणालीको रूपान्तरण र स्थानीय क्षमता विकास",
      subtitle: language === "en" ? "Fiscal Year 2082 / 083" : "आर्थिक वर्ष २०८२ / ०८३",
      tag: language === "en" ? "PAMSV2 LMIS Rollout" : "PAMSV2 अनलाइन प्रणाली सुचारु",
      icon: Database,
      color: "border-brand-100 bg-brand-50/10 text-brand-700",
      intro: language === "en"
        ? "Scaled up critical municipal interventions through the rollout of the digital health sector PAMSV2 (LMIS) software, dramatically strengthening governance and reporting."
        : "महानगर, अस्पताल र ग्रामीण स्वास्थ्य चौकीसम्म डिजिटल प्रणाली (PAMSV2) को प्रयोग बढाई पारदर्शी रिपोर्टिङ र सुशासन सुनिश्चित गरिएको।",
      initiatives: [
        {
          name: language === "en" ? "PAMSV2 (LMIS) Deployments & Training" : "PAMSV2 सफ्टवेयर सञ्चालन तालिम",
          details: language === "en"
            ? "Successfully trained health workers across 22 strategic sites including District Public Health Offices and municipalities, empowering healthcare and store administrative staff at Municipality, Rural Municipality, Hospital, Health Post, and Grassroots Community Health Unit (CHU) levels."
            : "हालसम्म २२ स्थानीय तह, अस्पताल र स्वास्थ्य चौकी,  ग्रामीण संस्था तथा सामुदायिक स्वास्थ्य एकाई (CHU) स्तरका कर्मचारीलाई सफ्टवेयर चलाउने व्यवहारिक तालिम प्रदान।"
        },
        {
          name: language === "en" ? "Forecasting & Quantification Workshops" : "माग पूर्वानुमान तथा परिमाण निर्धारण कार्यशालाहरू",
          details: language === "en"
            ? "Organized 9 specialized workshops in close coordination with the provincial Health Ministry across 9 District Public Health Offices, equipping Municipal and Store Focal Persons with quantification competencies to optimize drug procurements and prevent expirations."
            : "९ जिल्ला स्वास्थ्य कार्यालयहरूमा प्रादेशिक मन्त्रालयसँगकाे समन्वयमा सघन कार्यशाला सञ्चालन गरी स्वास्थ्य सामाग्री अभाव तथा म्याद समाप्त हुने जोखिम रोक्न साथै  तथ्याङमा आधारित खरिद कार्यलाई  व्यवहारिक बनाउन स्थानीय निकायका फाेकल पर्सनहरूको माग पूर्वानुमान क्षमता अभिवृद्धि गरियो।"
        }
      ],
      subLocations: language === "en" ? [
        "9 District Public Health Offices",
        "Municipal Health Care Focal Teams",
        "Hospital Store Keepers",
        "Grassroots health post staff"
      ] : [
        "९ वटा जिल्ला जनस्वास्थ्य कार्यालयहरू",
        "नगरपालिका तथा गाउँपालिका स्वास्थ्य टोली",
        "अस्पतालका स्टोरकिपर तथा प्रमुखहरू",
        "स्वास्थ्य चौकी तथा स्थानीय स्वास्थ्य स्वयंसेवकहरू"
      ]
    }
  ];

  const filteredBlocks = selectedYear === "all" ? blocks : blocks.filter(b => b.fy === selectedYear);

  return (
    <section id="achievements" className="py-20 bg-white scroll-mt-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            {language === "en" ? "Empirical Track Record" : "अनुभव र उत्कृष्ट उपलब्धीहरू"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {language === "en" ? "Key Institutional Achievements" : "प्रमुख संस्थागत उपलब्धिहरू"}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
            {language === "en" 
              ? "Delivering measurable capacity advancements and optimized resource management at every level of Nepalese healthcare administration."
              : "नेपालको स्वास्थ्य क्षेत्रको प्रत्येक तहमा मापनयोग्य क्षमता अभिवृद्धि र उत्कृष्ट स्रोत व्यवस्थापन प्रदान गर्दै।"}
          </p>
        </div>

        {/* Year Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            id="achieve-filter-all"
            onClick={() => setSelectedYear("all")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              selectedYear === "all"
                ? "bg-brand-600 text-white shadow-md shadow-brand-100"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {language === "en" ? "Show All Milestones" : "सबै उपलब्धी सूचीहरू"}
          </button>
          <button
            id="achieve-filter-fy81"
            onClick={() => setSelectedYear("fy2081_2082")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              selectedYear === "fy2081_2082"
                ? "bg-brand-600 text-white shadow-md shadow-brand-100"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {language === "en" ? "FY 2081 / 082 (Waste & Disposal)" : "आ.व. २०८१/०८२ (सुरक्षित विसर्जन)"}
          </button>
          <button
            id="achieve-filter-fy82"
            onClick={() => setSelectedYear("fy2082_2083")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              selectedYear === "fy2082_2083"
                ? "bg-brand-600 text-white shadow-md shadow-brand-100"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {language === "en" ? "FY 2082 / 083 (LMIS Rollout)" : "आ.व. २०८२/०८३ (डिजिटल प्रणाली)"}
          </button>
        </div>

        {/* High-level highlights grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {highlights.map((h, idx) => (
            <div key={idx} className="bg-brand-50/50 rounded-2xl border border-brand-100 p-6 flex items-center gap-5">
              <div className="bg-white text-brand-600 p-3 rounded-xl shadow-sm text-2xl font-bold font-mono">
                {h.metric}
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-gray-900">{h.label}</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* On-the-Ground Action Photo Gallery (Infinite Scrolling Ticker) */}
        <div className="mb-24 mt-8">
          <div className="text-center md:text-left mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider mb-2">
                <Camera className="w-3.5 h-3.5" />
                {language === "en" ? "On-The-Ground Proof" : "कार्यगत प्रमाणहरू"}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {language === "en" ? "Operational Field Gallery" : "स्थलगत गतिविधि फोटो ग्यालरी"}
              </h3>
              <p className="text-sm sm:text-base text-gray-500 mt-2">
                {language === "en"
                  ? "Real workshop deployments, digital training sessions, and health facility warehouse clearances executed across Nepal."
                  : "नेपालभर गरिएका वास्तविक कार्यशाला गोष्ठी, डिजिटल तालिम र स्वास्थ्य गोदाम व्यवस्थापनका स्थलगत दृश्य रेकर्डहरू।"}
              </p>
            </div>
            <div className="flex justify-center md:justify-end shrink-0">
              <button
                onClick={() => setIsMarqueePaused(!isMarqueePaused)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm border transition-all cursor-pointer ${
                  isMarqueePaused
                    ? "bg-amber-500 border-amber-600 text-white hover:bg-amber-600"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {isMarqueePaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                {isMarqueePaused 
                  ? (language === "en" ? "Play Gallery Scrolling" : "तस्विरहरू घुमाउनुहोस्")
                  : (language === "en" ? "Pause Gallery Scrolling" : "तस्विरहरू रोक्नुहोस्")}
              </button>
            </div>
          </div>

          {/* Marquee Container with smooth fading gradients at edges */}
          <div className="relative w-full overflow-hidden py-4 -mx-4 sm:-mx-8 lg:-mx-12 px-4 sm:px-8 lg:px-12">
            {/* Left fade gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            
            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            {/* Marquee Track: Moving from right to left */}
            <div 
              className={`flex w-max gap-6 animate-marquee hover:[animation-play-state:paused] transition-all ${
                isMarqueePaused ? "[animation-play-state:paused]" : ""
              }`}
              style={{ animationPlayState: isMarqueePaused ? 'paused' : 'running' }}
            >
              {/* Duplicate set to enable infinite seamless looping */}
              {[...galleryItems, ...galleryItems].map((item, index) => (
                <div 
                  key={`${item.id}-${index}`}
                  className="w-[300px] sm:w-[360px] shrink-0 bg-white rounded-2xl border border-gray-150/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col"
                >
                  {/* Image container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-brand-600/90 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-xs backdrop-blur-xs">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Caption & detail pane */}
                  <div className="p-5 flex-grow flex flex-col justify-between text-left">
                    <div>
                      <h4 className="font-extrabold text-gray-900 group-hover:text-brand-600 transition-colors text-sm sm:text-base leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed text-justify">
                        {item.description}
                      </p>
                    </div>
                    {/* Tiny decorative footer indicator */}
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">
                      <span>{language === "en" ? "Deployment Record" : "ढुवानी तथा ढुवानी रेकर्ड"}</span>
                      <span>{language === "en" ? "Item" : "आईटम"} #{item.id}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center items-center gap-1.5 text-xs text-gray-400 mt-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
            <span>{language === "en" ? "Hover over any photo card to pause scrolling and view caption descriptions." : "कुनै पनि फोटोमा माउस वा टच राखी घुम्ने गति रोकी विस्तृत विवरण हेर्न सक्नुहुन्छ।"}</span>
          </div>
        </div>

        {/* Timeline Grid layout */}
        <div className="relative border-l border-brand-100 ml-4 md:ml-12 pl-6 md:pl-10 space-y-16">
          <AnimatePresence mode="popLayout">
            {filteredBlocks.map((block) => {
              const Icon = block.icon;
              return (
                <motion.div
                  key={block.id}
                  id={`achievement-block-${block.fy}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  {/* Floating Left Circle Icon representing timeline anchor */}
                  <div className="absolute -left-[39px] md:-left-[55px] top-1.5 bg-brand-600 text-white p-2 rounded-full border-4 border-white shadow-sm ring-4 ring-brand-50 transition-transform group-hover:scale-110">
                    <Icon className="w-4.5 h-4.5" />
                  </div>

                  <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                    
                    {/* Header elements */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div>
                        <span className="text-xs font-bold text-brand-600 tracking-wider uppercase font-mono bg-brand-50 px-3 py-1 rounded-md">
                          {block.subtitle}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-2">
                          {block.title}
                        </h3>
                      </div>
                      <span className="self-start md:self-auto px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-extrabold uppercase tracking-wide">
                        {block.tag}
                      </span>
                    </div>

                    <p className="text-gray-650 leading-relaxed text-sm sm:text-base font-normal mb-8 border-b border-gray-50 pb-6">
                      {block.intro}
                    </p>

                    {/* Initiatives */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {block.initiatives.map((item, idx) => (
                        <div key={idx} className="space-y-3 bg-gray-50/40 p-5 rounded-2xl border border-gray-100">
                          <h4 className="font-bold text-gray-900 flex items-start gap-2.5">
                            <span className="bg-brand-100 text-brand-700 w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold font-mono">
                              {idx + 1}
                            </span>
                            <span className="text-sm sm:text-base">{item.name}</span>
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-8">
                            {item.details}
                          </p>

                          {/* Sublocations listing under certain initiative */}
                          {idx === 1 && block.subLocations && (
                            <div className="mt-4 pl-8 pt-3 border-t border-gray-100/60">
                              <span className="text-[10px] font-bold text-brand-600 uppercase tracking-widest block mb-2">
                                {language === "en" ? "Operational coverage:" : "कार्यक्षेत्र तथा मुख्य क्षेत्रहरू:"}
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {block.subLocations.map((loc, lIdx) => (
                                  <div key={lIdx} className="flex items-center gap-2">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                    <span className="text-[11px] font-semibold text-gray-700">{loc}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Closing summary footer */}
        <div className="mt-16 bg-gradient-to-r from-brand-600 to-brand-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <h3 className="text-2xl font-bold flex items-center gap-2 text-red-500">
              <Sparkles className="w-6 h-6 text-brand-200" />
              {language === "en" ? "Strengthening Supply Chains across Federal, Provincial, and Local Bodies" : "संघ, प्रदेश र स्थानीय निकायसम्मको आपूर्ति व्यवस्थापन सुदृढिकरण"}
            </h3>
            <p className="text-brand-100 mt-2 text-sm sm:text-base leading-relaxed">
              {language === "en"
                ? "We close the loop on healthcare waste management and inventory transparency. By training personnel directly on forecasting and using real production systems like PAMSV2, we build scalable health log networks."
                : "हामी स्वास्थ्य फोहोर विसर्जन र जिन्सी पारदर्शिताको सम्बन्ध सुदृढ बनाउँछौँ। पूर्वानुमान र PAMSV2 जस्ता प्रणालीको प्रत्यक्ष स्थानीय प्रयोग मार्फत नेपालको स्वास्थ्य आपूर्ति च्यानललाई थप बलियो र आधुनिक बनाउन प्रतिबद्ध छौँ।"}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
