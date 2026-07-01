/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Headset, Laptop, GraduationCap, TrendingUp, Recycle, BookOpen, Search, CheckCircle, ArrowRight, ShieldCheck, Heart, Landmark, LandmarkIcon, Building, Users } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface ServicesSectionProps {
  setActiveSection: (section: string) => void;
}

export default function ServicesSection({ setActiveSection }: ServicesSectionProps) {
  const { language } = useLanguage();

  const services = [
    {
      id: "pams",
      num: "1",
      icon: Headset,
      title: language === "en" ? "PAMS Support Services" : "PAMS सहयोग सेवाहरू",
      bullets: language === "en" ? [
        "PAMS implementation and rollout",
        "User management and configuration",
        "Data migration and validation",
        "Troubleshooting and helpdesk support",
        "Dashboard and reporting support"
      ] : [
        "PAMS प्रणाली सम्बन्धी तालिम तथा कार्यन्वयन",
        "प्रयोगकर्ता दर्ता र प्रणाली व्यवस्थापन",
        "डेटा माइग्रेसन र प्रमाणीकरण",
        "हेल्पडेस्क र २४/७ प्राविधिक समाधान",
        "ड्यासबोर्ड र रिपोर्टिङ सहजीकरण"
      ]
    },
    {
      id: "lmis",
      num: "2",
      icon: Laptop,
      title: language === "en" ? "LMIS Support Services" : "LMIS सहयोग सेवाहरू",
      bullets: language === "en" ? [
        "Inventory management support",
        "Data quality assessment",
        "Reporting and analytics",
        "Supply chain performance monitoring"
      ] : [
        "भण्डार जिन्सी व्यवस्थापन परामर्श",
        "डेटा गुणस्तर लेखाजोखा र अडिट",
        "प्रतिवेदन र विश्लेषणात्मक विवरण",
        "आपूर्ति श्रृंखला कार्यसम्पादन अनुगमन"
      ]
    },
    {
      id: "training",
      num: "3",
      icon: GraduationCap,
      title: language === "en" ? "Training & Capacity Building" : "तालिम तथा क्षमता अभिवृद्धि",
      bullets: language === "en" ? [
        "Training of Trainers (TOT)",
        "User orientation and refresher training",
        "Training materials development",
        "On-site and virtual training"
      ] : [
        "प्रशिक्षक प्रशिक्षण (TOT) कार्यक्रम",
        "प्रयोगकर्ता अभिमुखीकरण र रिफ्रेसर तालिम",
        "प्रशिक्षण सामग्री र पुस्तिका विकास",
        "स्थलगत तथा भर्चुअल डिजिटल कक्षाहरू"
      ]
    },
    {
      id: "forecasting",
      num: "4",
      icon: TrendingUp,
      title: language === "en" ? "Forecasting & Quantification" : "प्रक्षेपण तथा परिमाण निर्धारण",
      bullets: language === "en" ? [
        "Consumption analysis",
        "Demand forecasting",
        "Supply planning",
        "Procurement planning",
        "Stock status monitoring"
      ] : [
        "औषधी खपत विश्लेषण (Consumption analysis)",
        "मागको सही पूर्वानुमान (Demand forecasting)",
        "आपूर्ति तथा माग योजना निर्माण",
        "खरिद योजना र लागत इस्टिमेट",
        "स्टक अवस्थाको दैनिक ट्र्याकिङ"
      ]
    },
    {
      id: "disposal",
      num: "5",
      icon: Recycle,
      title: language === "en" ? "Commodities Disposal Services" : "मालसामान तथा औषधि विसर्जन सेवा",
      bullets: language === "en" ? [
        "Expired commodity assessment",
        "Disposal planning and documentation",
        "Auction and disposal coordination",
        "Regulatory compliance support"
      ] : [
        "म्याद सकिएका औषधि पहिचान र वर्गीकरण",
        "विसर्जन योजना निर्माण र कानूनी कागजात",
        "लिलामी तथा नष्ट गर्ने प्रक्रिया समन्वय",
        "सरकारी नीति तथा वातावरणीय नियम अनुपालना"
      ]
    },
    {
      id: "documentation",
      num: "6",
      icon: BookOpen,
      title: language === "en" ? "Documentation & Manual Development" : "म्यानुअल तथा दस्तावेज विकास",
      bullets: language === "en" ? [
        "User manuals",
        "SOP development",
        "Training guides",
        "Business process documentation"
      ] : [
        "सफ्टवेयर प्रयोगकर्ता हाते निर्देशिकाहरू",
        "स्ट्यान्डर्ड सञ्चालन कार्यविधि (SOP)",
        "तालिम सहयोगी सामग्री तथा मार्गदर्शक",
        "व्यापारिक प्रक्रिया र भण्डार कार्यविधि"
      ]
    },
    {
      id: "evaluation",
      num: "7",
      icon: Search,
      title: language === "en" ? "Monitoring & Evaluation" : "अनुगमन तथा मूल्याङ्कन",
      bullets: language === "en" ? [
        "Dashboard development",
        "Power BI reporting",
        "Data analysis",
        "Performance monitoring"
      ] : [
        "लजिस्टिक ड्यासबोर्ड विकास परामर्श",
        "Power BI मार्फत विश्लेषणात्मक प्रतिवेदन",
        "प्रणालीगत डेटा सङ्कलन र विश्लेषण",
        "कार्यसम्पादन सूचक विश्लेषण र अनुगमन"
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-50 border-t border-slate-100 scroll-mt-12 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* OUR SERVICES - Bold Mockup Centered Title */}
        <div className="mb-12">
          <span className="text-xs font-extrabold text-blue-600 tracking-widest uppercase block mb-2">
            KN MULTI CONSULTING SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#072d65] uppercase tracking-tight">
            Our Services
          </h2>
          <div className="w-16 h-1.5 bg-[#0063db] mx-auto mt-3 rounded-full" />
        </div>

        {/* 7 Columns Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md hover:border-blue-200 transition-all duration-300 relative text-left"
              >
                <div>
                  {/* Soft circular blue icon at head of card */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#f0f7ff] text-[#0063db] border border-blue-100/60 flex items-center justify-center shrink-0">
                      <Icon className="w-5.5 h-5.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 font-mono tracking-wider">
                      Service {service.num}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-extrabold text-slate-800 text-[16px] xl:text-[17.5px] leading-snug mb-4">
                    {service.num}. {service.title}
                  </h3>

                  {/* Bullets List */}
                  <ul className="space-y-2 mb-6 text-left">
                    {service.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-600 font-normal leading-relaxed">
                        <span className="min-w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Micro Action Trigger */}
                <div className="pt-4 border-t border-slate-100 mt-auto">
                  <button
                    onClick={() => {
                      const calculatorNode = document.getElementById("lmis-lab");
                      if (calculatorNode) {
                        calculatorNode.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-xs font-bold text-[#0063db] hover:text-[#0747a6] flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    {language === "en" ? "Interactive Simulation" : "अनुकूल सिम्युलेसन"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic lower bar matching the mockup (WHY CHOOSE US? & OUR CLIENTS) */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* WHY CHOOSE US? Segment */}
          <div className="lg:col-span-7 bg-[#f0f7ff] border border-blue-100/60 rounded-2xl p-8 text-left flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-[#072d65] uppercase tracking-wider mb-6 border-b border-blue-105 pb-3">
                {language === "en" ? "Why Choose Us?" : "हामीलाई किन रोज्ने?"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 leading-normal">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0063db] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-[13.5px] text-slate-700 font-medium">
                    {language === "en" ? "Experienced LMIS and PAMS professionals" : "अनुभवी विज्ञहरू"}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0063db] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-[13.5px] text-slate-700 font-medium">
                    {language === "en" ? "Government and development partner experience" : "नेपाल सरकार र विकास साझेदार निकायसँगको गहिरो सहकार्य अनुभव"}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0063db] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-[13.5px] text-slate-700 font-medium">
                    {language === "en" ? "Practical field implementation expertise" : "पालिका र स्थानीय स्तरमा वास्तविक व्यावहारिक कार्यान्वयन अनुभव"}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0063db] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-[13.5px] text-slate-700 font-medium">
                    {language === "en" ? "Cost-effective solutions" : "आर्थिक रूपमा मितव्ययी र व्यावहारिक सेवाहरू"}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0063db] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-[13.5px] text-slate-700 font-medium">
                    {language === "en" ? "Reliable technical support" : "भरपर्दो र लगातार प्राविधिक समस्या समाधान सहयोग"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* OUR CLIENTS Segment */}
          <div className="lg:col-span-5 bg-[#f0f7ff] border border-blue-100/60 rounded-2xl p-8 text-left flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-[#072d65] uppercase tracking-wider mb-6 border-b border-blue-105 pb-3">
                {language === "en" ? "Our Clients" : "हाम्रा ग्राहक वर्ग"}
              </h3>
              <ul className="space-y-4 font-sans text-xs sm:text-[13.5px] text-slate-700 font-medium">
                <li className="flex items-center gap-3">
                  <Landmark className="w-5 h-5 text-[#0063db] shrink-0" />
                  <span>{language === "en" ? "Government Agencies" : "नेपाल सरकारका विभिन्न निकाय तथा मन्त्रालय"}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-[#0063db] shrink-0" />
                  <span>{language === "en" ? "Hospitals and Health Facilities" : "अस्पताल, स्वास्थ्य चौकी र प्राथमिक उपचार केन्द्र"}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#0063db] shrink-0" />
                  <span>{language === "en" ? "Development Partners" : "अन्तर्राष्ट्रिय विकास साझेदार र सङ्घसंस्था"}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-[#0063db] shrink-0" />
                  <span>{language === "en" ? "NGOs and INGOs" : "गैसस र अन्तर्राष्ट्रिय गैरसरकारी संस्थाहरू"}</span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#0063db] shrink-0" />
                  <span>{language === "en" ? "Private Organizations" : "निजी स्वास्थ्य संस्थाहरू तथा व्यावसायिक प्रतिष्ठान"}</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

// Simple internal helper icon checklist
function Check({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
