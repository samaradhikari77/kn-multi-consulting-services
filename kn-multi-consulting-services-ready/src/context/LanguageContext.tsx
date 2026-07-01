/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ne";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: string, key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// Natural and high-quality translations for SCM and health logistics in Nepal
const translations: Record<Language, Record<string, Record<string, string>>> = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      team: "Our Team",
      services: "Services",
      lmisLab: "LMIS & SCM Lab",
      achievements: "Achievements",
      contact: "Contact",
      inquire: "Inquire Now",
      m_license: "Services Pvt. Ltd.",
    },
    hero: {
      tag: "Logistics Management Information System (PAMSV2)",
      title_part1: "Transforming Nepal's",
      title_part2: "Healthcare Supply Chains",
      desc: "KN Multi Consulting Services Pvt. Ltd. is a specialized consulting firm based in Kathmandu. We design elite SCM solutions, lead large-scale PAMSV2 training programs, and support safe regulatory disposal of health commodities.",
      explore: "Explore Services",
      sandboxBtn: "Try SCM Calculator",
      metric_site_num: "22+",
      metric_site_label: "LMIS Deployed Sites",
      metric_site_desc: "Municipalities & health care sites fully operational on PAMSV2",
      metric_train_num: "1,500+",
      metric_train_label: "Personnel Trained",
      metric_train_desc: "Healthcare leaders & storekeepers empowered nationwide",
      metric_years_num: "25+",
      metric_years_label: "Years of SCM Expertise",
      metric_years_desc: "Deep sector experience in logistics systems architecture",
      sub_pams_title: "Integrated PAMSV2 Health Logistics System",
      sub_pams_desc: "Adopted by leading municipalities like Jiri & remote health structures.",
    },
    banners: {
      expert_title: "Expert-Led Curriculum",
      expert_desc: "Designed by veteran specialists with 25+ years of extensive public SCM experience.",
      compliant_title: "Fully Compliant Disposal",
      compliant_desc: "Proven track record of safe clearing protocols under stringent Department of Health Services standards.",
      national_title: "National Footprint",
      national_desc: "Extending support to Central Hospital auctioning down to grassroots Community Units.",
    },
    about: {
      section_tag: "WHO WE ARE",
      title: "Pioneering Healthcare Supply Chains Across Nepal",
      subtitle: "Established in 2023, KN Multi Consulting Services stands as the premier hub for logistics technical assistance, capacity building workshops, and hazardous healthcare waste management standard systems.",
      mission_title: "Our Mission",
      mission_desc: "To drive the successful implementation and adoption of the PAMSV2 (LMIS) system across hospitals, Health Posts, and Community Health Units (CHUs), empowering local staff, promoting waste-disposal transparency, and raising standards.",
      vision_title: "Our Vision",
      vision_desc: "To build a resilient, fully digital health logistics network in Nepal where zero drugs go to waste, all critical vaccine stores are automatically accounted for, and inventory flows seamlessly across municipal boundaries.",
      objective_title: "Our Objectives",
      obj_1: "Establish robust PAMSV2 systems in all municipalities to ensure real-time reporting accuracy.",
      obj_2: "Strengthen personnel capacity through comprehensive simulation workshops and certification courses.",
      obj_3: "Conduct secure, law-abiding chemical and expired pharmaceutical disposal in cooperation with DoHS regulatory frameworks.",
      obj_4: "Provide tailored supply chain diagnostics & consultancy to optimize warehouse layouts.",
      stats_title: "Trusted Partners in Health Logistics",
    },
    services: {
      tag: "OUR SERVICE PORTFOLIO",
      title: "Targeted Solutions for Modern Health SCM",
      cta: "Request Consultation",
      s1_title: "PAMSV2 LMIS Software Rollout",
      s1_desc: "Comprehensive rollout and hands-on operational workshops on the standard PAMSV2 system for SCM digitizing.",
      s1_b1: "Full simulation environment training (PAMSV2 UI)",
      s1_b2: "Local server setups and network synchronization",
      s1_b3: "Post-deployment validation audits & certificates",
      s2_title: "SCM Capacity Building",
      s2_desc: "Interactive curriculum and training manuals developed specifically for community health workers and municipality coordinators.",
      s2_b1: "9-district master trainer modules",
      s2_b2: "Inventory logging best practices alignment",
      s2_b3: "Refresher courses & on-site mentoring",
      s3_title: "Pharmaceutical Expiry Disposal",
      s3_desc: "Rigorous sorting, documentation, and safe, environment-friendly destruction protocols for expired medical goods.",
      s3_b1: "DoHS approved legal compliance reporting",
      s3_b2: "Hazardous pharmaceutical incinerators oversight",
      s3_b3: "District-level secure transport & storage guidelines",
      s4_title: "Supply Chain Consulting",
      s4_desc: "Strategic warehouse design, pipeline forecasting, and procurement audit alignment with international standards.",
      s4_b1: "Dynamic pipeline inventory forecasting",
      s4_b2: "Logistics asset utilization audits",
      s4_b3: "Municipal cold chain gap analysis reports",
    },
    simulator: {
      tag: "PAMSV2 CORE REPLICATOR",
      title: "Interactive SCM Sandbox & Calculator",
      desc: "In our 9-district workshops, we train healthcare leaders using standard logistics models. Test our live forecasting calculator and simulate PAMSV2 inventory actions below.",
      tab1_title: "SCM Formula Lab",
      tab2_title: "PAMSV2 Node Sandbox",
      calc_header: "Average Monthly Consumption (AMC) & Stock-on-Hand Buffer Tool",
      calc_desc: "Calculate critical supply indicators. PAMSV2 computes standard stock duration buffers to prevent dangerous medical stockouts.",
      lbl_amc: "Average Monthly Consumption (AMC)",
      lbl_soh: "Current Stock on Hand (SOH)",
      lbl_lead: "Lead Time (Weeks)",
      col_indicator: "SCM INDICATOR REPORT",
      lbl_months_stock: "Months of Stock Available",
      lbl_reorder: "Reorder Point Trigger Status",
      lbl_recon: "Recommended Order Quantity",
      status_healthy: "Supply is healthy. Your stock represents months of utility. No immediate orders required. Continue monitoring via PAMSV2 dashboard protocols.",
      status_danger: "CRITICAL: Stock is below reorder limits! Immediate procurement order is required to avoid healthcare facility stockout.",
      sandbox_title: "PAMSV2 Live Facility Monitoring",
      send_stock: "Dispatch Stock",
      sync_now: "Sync with Central DoHS Server",
      current_nodes: "Active Municipal Nodes",
      facility: "Facility",
      stock_count: "Stock",
      amc_val: "AMC",
      moS: "MoS",
      buffer: "Buffer",
    },
    achievements: {
      tag: "TRACK RECORD & TIMELINES",
      title: "Milestones in Public SCM Empowerment",
      ach1_title: "Jiri Municipality PAMS V2 Training",
      ach1_desc: "Fully operational with PAMSV2 (LMIS) software, empowering local operators.",
      ach1_intro: "Scaled up critical municipal interventions through the rollout of the digital health sector PAMSV2 (LMIS) software, dramatically strengthening governance and reporting.",
      workshops: "Workshops Conducted",
      health_posts: "Health Posts Standardized",
      municipal_nodes: "Municipal Nodes Synchronized",
      ach2_title: "Pharping SCM Capacity Building",
      ach2_desc: "Delivered interactive inventory management courses for multi-facility heads.",
      ach2_intro: "Led intensive interactive simulation bootcamps on standard SOPs, drug ledger accounting, vaccine temperature tracking logs, and reporting templates.",
      ach3_title: "Dhulikhel Expired Drug Cleansing",
      ach3_desc: "Safely cataloged and incinerated past-expiry health commodities.",
      ach3_intro: "Executed complete clearing operations under formal supervision of DoHS experts and the Ministry of Health environmental compliance directors.",
      closing_quote_title: "SCM Professionalism Matters",
      closing_quote: "We close the loop on healthcare waste management and inventory transparency. By training personnel directly on forecasting and using real production systems like PAMSV2, we build scalable health log networks.",
    },
    contact: {
      tag: "GET IN TOUCH",
      title: "Collaborate with SCM Specialists",
      desc: "Whether you need to configure SCM software, organize a capacity workshop across multiple districts, or implement standard drug disposal, our team is equipped to assist you.",
      phone: "Primary Consultation Line",
      email: "Official Email Inquiry",
      office_ktm: "Kathmandu Main Office",
      office_ktm_addr: "Kathmandu, Nepal (Services Nationwide)",
      form_full_name: "Full Name",
      form_org: "Health Facility / Municipality / Organization",
      form_interest: "Primary Area of Interest",
      form_phone: "Phone Number",
      form_msg: "Describe your training or consultation needs",
      btn_send: "Send Callback Request",
      placeholder_msg: "Please mention the district, facilities, and the preferred dates or quantity metrics...",
      alert_success: "Thank you! Your request has been received. Our team will contact you shortly.",
    },
    footer: {
      desc: "Dedicated SCM consulting in Nepal. Specialized in capacity building, digital logistics management training (LMIS PAMSV2), pharmaceutical compliance, and drug safe-disposal frameworks. Established in 2023.",
      links_title: "Quick Links",
      legal_title: "Government Standards Co-alignment",
      legal_desc: "Operating with compliance to Ministry of Health & Population (MoHP), Department of Health Services (DoHS) Management Division SCM guidelines, and municipal governance manuals of Nepal.",
      rights: "All rights reserved.",
    },
  },
  ne: {
    nav: {
      home: "गृहपृष्ठ",
      about: "हाम्रो बारेमा",
      team: "हाम्रो टिम",
      services: "सेवाहरू",
      lmisLab: "LMIS र SCM ल्याब",
      achievements: "उपलब्धिहरू",
      contact: "सम्पर्क",
      inquire: "सम्पर्क गर्नुहोस्",
      m_license: "सर्भिसेज प्रा. लि.",
    },
    hero: {
      tag: "लजिस्टिक व्यवस्थापन सूचना प्रणाली (PAMSV2)",
      title_part1: "नेपालको स्वास्थ्य सेवा",
      title_part2: "आपूर्ति श्रृंखला रूपान्तरण",
      desc: "के.एन. मल्टी कन्सल्टिङ सर्भिसेज प्रा. लि. काठमाडौंमा आधारित एक विशिष्ट परामर्शदाता संस्था हो। हामी उत्कृष्ट स्वास्थ्य आपूर्ति श्रृंखला (SCM) सम्बन्धी विभिन्न क्षेत्रहरूमा प्राविधिक सहयोग उपलब्ध गराउँछौं । जसअन्तर्गत PAMSV2 सम्बन्धी तालिम कार्यक्रमहरू, औषधि तथा औषधिजन्य सामाग्रीहरुको प्रक्षेपण (Forecasting) तथा परिमाण निर्धारण (Quantification), विभिन्न तालिम पाठ्यक्रम तथा सहजीकरण पुस्तिकाको विकास र प्रयोग विहीन अवस्थामा रहेका औजार, उपकरण, सवारी साधनहरूको लिलाम बिक्री तथा उपभोग मिति समाप्त भएका औषधि तथा औषधिजन्य सामाग्रीहरू नेपाल सरकारको ऐन, नियमावली तथा कार्यविधिको अधीनमा रही सुरक्षित तरिकाले नष्ट गर्ने कार्य समेत गर्दछौं ।",
      explore: "सेवाहरू हेर्नुहोस्",
      sandboxBtn: "SCM क्यालकुलेटर चलाउनुहोस्",
      metric_site_num: "२२+",
      metric_site_label: "लागू गरिएका स्थानीय तहहरू",
      metric_site_desc: "PAMSV2 सफ्टवेयर पूर्ण रूपमा सञ्चालनमा रहेका पालिकाहरू र स्वास्थ्य संस्थाहरू",
      metric_train_num: "१,५००+",
      metric_train_label: "तालिम प्राप्त जनशक्ति",
      metric_train_desc: "देशभरका स्वास्थ्य संयोजकहरू र स्टोरकिपरहरूलाई प्रशिक्षित र सशक्त बनाइएको",
      metric_years_num: "२५+",
      metric_years_label: "SCM मा विशेषज्ञता",
      metric_years_desc: "स्वास्थ्य लजिस्टिक र सार्वजनिक व्यवस्थापन प्रणालीको लामो अनुभव",
      sub_pams_title: "एकीकृत PAMSV2 स्वास्थ्य लजिस्टिक प्रणाली",
      sub_pams_desc: "जिरी नगरपालिका जस्ता अग्रणी पालिकाहरू र दुर्गम स्वास्थ्य संरचनाहरूमा सफलतापूर्वक लागू गरिएको।",
    },
    banners: {
      expert_title: "विशेषज्ञ निर्देशित पाठ्यक्रम",
      expert_desc: "सार्वजनिक व्यवस्थापन (SCM) क्षेत्रमा २५ वर्षभन्दा बढी अनुभव भएका प्रतिष्ठित विशेषज्ञहरूद्वारा डिजाइन गरिएको तालिम।",
      compliant_title: "मापदण्ड अनुसार औषधी विसर्जन",
      compliant_desc: "नेपाल सरकारको ऐन, नियमावली तथा कार्यविधिको अधीनमा रही औषधि विसर्जन प्रक्रिया सञ्चालन र प्रमाणित पृष्ठभूमि।",
      national_title: "देशव्यापी पहुँच",
      national_desc: "केन्द्रीय अस्पतालहरू देखि ग्रामीण स्वास्थ्य चौकी र सामुदायिक एकाइहरू सम्म प्राविधिक सहयोग र पहुँच।",
    },
    about: {
      section_tag: "हाम्रो बारेमा",
      title: "नेपालभर स्वास्थ्य आपूर्ति श्रृंखलामा अग्रणी भूमिका",
      subtitle: "सन् २०२३ मा स्थापित, के.एन. मल्टी कन्सल्टिङ सर्भिसेज प्राविधिक सहायता, क्षमता अभिवृद्धि तालिम, र म्याद नाघेका स्वास्थ्यजन्य जोखिमयुक्त सामग्री व्यवस्थापनको क्षेत्रमा प्रमुख संस्थाको रूपमा स्थापित छ।",
      mission_title: "हाम्रो मिसन",
      mission_desc: "अस्पताल, स्वास्थ्य चौकी र सामुदायिक स्वास्थ्य एकाइहरू (CHUs) मा PAMSV2 (LMIS) प्रणालीलाई पूर्ण रूपमा लागू र अवलम्बन गराई स्थानीय कर्मचारीहरूलाई सशक्त बनाउनु र आपूर्ति श्रृंखलालाई पारदर्शी र व्यवस्थित पार्नु हाम्रो उद्देश्य हो।",
      vision_title: "हाम्रो भिजन",
      vision_desc: "नेपालमा यस्तो सवल र पूर्ण डिजिटल स्वास्थ्य आपूर्ति प्रणाली निर्माण गर्ने, जहाँ औषधीजन्य सामग्रीहरू खेर नजाउन, दुर्गम भण्डारण सहज होस् र सम्पूर्ण पालिकाहरू बीच आपूर्ति विना अवरोध प्रवाह हुन सकोस्।",
      objective_title: "हाम्रा मुख्य उद्देश्यहरू",
      obj_1: "सबै स्थानीय तहहरूमा सुदृढ PAMSV2 प्रणालीको स्थापना गरी वास्तविक समयको तथ्याङ्क सुनिश्चत गर्ने।",
      obj_2: "विशेषज्ञ सिम्युलेसन कार्यशाला र प्रमाणीकरण कोर्सहरू मार्फत जनशक्तिको क्षमता सुदृढ तुल्याउने।",
      obj_3: "स्वास्थ्य सेवा विभागको नियमन र कानुन बमोजिम म्याद नाघेका औषधी तथा केमिकलहरूको सुरक्षित विसर्जन प्रक्रिया सञ्चालन गर्ने।",
      obj_4: "औषधी गोदामहरूको क्षमता अभिवृद्धि तथा लेआउट सुधार गर्न कस्टमाइज आपूर्ति श्रृंखला अडिट सेवा प्रदान गर्ने।",
      stats_title: "स्वास्थ्य लजिस्टिकका विश्वसनीय साझेदारहरू",
    },
    services: {
      tag: "हाम्रा सेवाहरू",
      title: "स्वास्थ्य आपूर्ति श्रृंखलाका लागि लक्षित आधुनिक डिजिटल सेवाहरू",
      cta: "परामर्शको लागि अनुरोध",
      s1_title: "PAMSV2 LMIS सफ्टवेयर स्थापना",
      s1_desc: "डिजिटलीकरण कार्यका लागि नेपाल सरकारको मानक PAMSV2 सफ्टवेयर जडान र सञ्चालन सम्बन्धी प्रयोगात्मक कार्यशालाहरू।",
      s1_b1: "वास्तविक सिम्युलेसन वातावरणमा सफ्टवेयर अभ्यास र अभ्यास कार्यशाला",
      s1_b2: "स्थानीय सर्भर सेटअप तथा विभाग प्रणालीमा डेटा सिङ्क्रोनाइजेसन",
      s1_b3: "स्थापनापछिको डेटा अडिट तथा सहभागिता प्रमाणपत्र वितरण",
      s2_title: "SCM क्षमता अभिवृद्धि",
      s2_desc: "स्वास्थ्यकर्मीहरू र पालिका स्तरका स्वास्थ्य संयोजकहरूका लागि तयार पारिएको विशेष पाठ्यक्रम र तालिम पुस्तिकाहरू।",
      s2_b1: "९-जिल्लाका प्रशिक्षक प्रशिक्षण (ToT) मोड्युलहरू",
      s2_b2: "भण्डारण र जिन्सी खाता सम्बन्धी उत्कृष्ट अभ्यासहरूको अभिमुखीकरण",
      s2_b3: "तुरुन्तै अन-साइट मेन्टरिङ र फलो-अप मार्गदर्शन",
      s3_title: "म्याद नाघेका औषधी विसर्जन",
      s3_desc: "म्याद सकिएका औषधीहरूको वर्गीकरण, अभिलेखीकरण र वातावरण अनुकूल विसर्जन तथा सुरक्षित नष्ट गर्ने कार्यविधि।",
      s3_b1: "स्वास्थ्य सेवा विभाग (DoHS) द्वारा स्वीकृत कानुनी सम्झौता र प्रतिवेदन लेखन",
      s3_b2: "औषधी विसर्जनका लागि सुरक्षित मेसिन र प्रविधिहरूको प्रयोग",
      s3_b3: "जिल्ला स्तरको सुरक्षित ढुवानी तथा भण्डारण निर्देशिका निर्माण",
      s4_title: "आपूर्ति श्रृंखला परामर्श",
      s4_desc: "अन्तर्राष्ट्रिय मापदण्ड बमोजिम आधुनिक गोदाम डिजाइन, मागको पूर्वानुमान, र खरिद प्रणाली सुधार परामर्श।",
      s4_b1: "भविष्यको परिमाण माग र खपतको स्वचालित पूर्वानुमान मोडेल",
      s4_b2: "लजिस्टिक स्रोत साधन उपयोगको कार्यसम्पादन अडिट",
      s4_b3: "पालिकाहरूको कोल्ड चेन (Cold Chain) भण्डारण र क्षमता सुधार विश्लेषण",
    },
    simulator: {
      tag: "PAMSV2 मुख्य सिम्युलेटर",
      title: "अन्तरक्रियात्मक SCM परीक्षण ल्याब र क्यालकुलेटर",
      desc: "हाम्रो ९-जिल्ला कार्यशालाहरूमा हामीले यस क्यालकुलेटर मार्फत स्वास्थ्यकर्मीहरूलाई प्रशिक्षण दिन्छौं। माग पूर्वानुमान क्यालकुलेटर र PAMSV2 भण्डारको लाइभ नक्कल तल परीक्षण गर्नुहोस्।",
      tab1_title: "SCM सुत्र प्रयोगाशाला",
      tab2_title: "PAMSV2 नोड स्यान्डबक्स",
      calc_header: "औसत मासिक खपत (AMC) र मौज्दात विश्लेषण क्यालकुलेटर",
      calc_desc: "औषधी आपूर्ति सूचकहरू गणना गर्नुहोस्। PAMSV2 ले उपभोग्य मौज्दात सुरक्षित राख्न र अचानक रोकिने अवस्था रोक्न उपयुक्त गणना सूचक निश्चित गर्दछ।",
      lbl_amc: "औसत मासिक खपत (AMC)",
      lbl_soh: "हालको मौज्दात मौजुदा (SOH)",
      lbl_lead: "सामग्री आइपुग्न लाग्ने समय (हप्ताहरूमा)",
      col_indicator: "SCM सूचक प्रतिवेदन",
      lbl_months_stock: "मौज्दात पुग्ने अवधि (महिनाहरूमा)",
      lbl_reorder: "पुन: अर्डर गर्नुपर्ने सतर्कता तह",
      lbl_recon: "थप अर्डर गर्न सिफारिस गरिएको मात्रा",
      status_healthy: "मौज्दात सुरक्षित छ। यो मौज्दातले धेरै महिनाको स्वास्थ्य माग सुरक्षित राख्छ। तत्काल नयाँ अर्डर आवश्यकता पर्दैन। अनुगमन गरिरहनुहोस्।",
      status_danger: "खतरा: मौज्दात न्यूनतम सतर्कता तह भन्दा तल पुगेको छ! स्वास्थ्य चौकीहरूमा अभाव हुन नदिन तत्काल खरिद आदेश अगाडि बढाउनुहोस्।",
      sandbox_title: "PAMSV2 लाइभ स्वास्थ्य संस्था अनुगमन",
      send_stock: "स्टक पठाउनुहोस्",
      sync_now: "केन्द्र प्रणालीसँग सिङ्क्रोनाइज गर्नुहोस्",
      current_nodes: "सक्रिय नगरपालिका नोडहरू",
      facility: "संस्था",
      stock_count: "मौज्दात संख्या",
      amc_val: "खपत दर (AMC)",
      moS: "अवधि महिना",
      buffer: "अवस्था",
    },
    achievements: {
      tag: "हाम्रो प्रगति र इतिहास",
      title: "सार्वजनिक स्वास्थ्य आपूर्ति क्षेत्रमा भएका सफलताहरू",
      ach1_title: "जिरी नगरपालिका PAMS V2 तालिम र प्रविधि",
      ach1_desc: "डिजिटल लजिस्टिक प्रणाली लागू भई स्थानीय सञ्चालकहरू पूर्ण रूपमा आत्मनिर्भर।",
      ach1_intro: "जिरी नगरपालिकाका स्वास्थ्यकर्मी तथा सञ्चालकहरूमा कडा अनुगमन, तालिम र सफ्टवेयर जडान गरी पालिकाको रिपोर्टिङ दरमा १००% सुधार हासिल गरिएको।",
      workshops: "कार्यशाला तालिम सङ्ख्या",
      health_posts: "डिजिटलाइज्ड स्वास्थ्य संस्थाहरू",
      municipal_nodes: "केन्द्र प्रणालीमा जोडिएका निकाय",
      ach2_title: "फर्पिङ स्वास्थ्य क्षेत्र क्षमता अभिवृद्धि",
      ach2_desc: "विभिन्न स्वास्थ्य चौकीका इन्चार्जहरूका लागि गहन तालिम सञ्चालन।",
      ach2_intro: "जिन्सी ढड्डा भर्ने तरिकाहरू, खोप तापक्रम अनुगमन विधी, तथा आधुनिक सफ्टवेयर प्रयोगको प्रयोगात्मक बुटक्याम्प सम्पन्न भयो।",
      ach3_title: "धुलिखेल म्याद नाघेका औषधी विसर्जन",
      ach3_desc: "म्याद सकिएका औषधीहरूको सुरक्षित र व्यवस्थित रुपमा विसर्जन सम्पन्न।",
      ach3_intro: "स्वास्थ्य सेवा विभागका वरिष्ठ प्रतिनिधिहरू र संघीय मन्त्रालयका वातावरण अधिकृतहरूको प्रत्यक्ष रोहबरमा औषधी विसर्जन।",
      closing_quote_title: "स्वास्थ्य आपूर्ति श्रृंखलामा व्यावसायिकता",
      closing_quote: "हामी स्वास्थ्य फोहोरको जोखिम हटाउँछौं र जिन्सी मौज्दातलाई व्यवस्थित राख्छौं। सही तथ्याङ्क र PAMSV2 सफ्टवेयरको ज्ञानले नै स्थानीय स्तरमा स्वास्थ्य सेवा सबल बनाउँछ।",
    },
    contact: {
      tag: "सम्पर्क क्षेत्र",
      title: "SCM विशेषज्ञहरूसँग सहकार्य गर्नुहोस्",
      desc: "यदि तपाईंलाई PAMSV2 सफ्टवेयर स्थापना गर्नुपर्ने, पालिकाहरूमा क्षमता अभिवृद्धि तालिम सञ्चालन गर्नुपर्ने, वा औषधी विसर्जन गराउनुपर्ने भएमा हाम्रो टिम तपाईंको सेवासमा तयार छ।",
      phone: "प्राथमिक टेलिफोन सोधपुछ",
      email: "आधिकारिक इमेल सम्पर्क",
      office_ktm: "काठमाडौं मुख्य कार्यालय",
      office_ktm_addr: "काठमाडौं, नेपाल (नेपालभर सेवा उपलब्ध)",
      form_full_name: "पूरा नाम",
      form_org: "स्वास्थ्य संस्था / नगरपालिका / कार्यालयको नाम",
      form_interest: "प्राथमिक आवश्यकता",
      form_phone: "सम्पर्क नम्बर / फोन",
      form_msg: "तपाईंको आवश्यकता तथा विवरणहरू उल्लेख गर्नुहोस्",
      btn_send: "सम्पर्कको लागि अनुरोध पठाउनुहोस्",
      placeholder_msg: "कृपया जिल्ला, पालिका, स्वास्थ्य संस्थाहरू वा औषधीको परिमाण र विवरणहरू खुलाउनुहोस्...",
      alert_success: "धन्यवाद! तपाईंको विवरण प्राप्त भयो। हाम्रो विशेषज्ञ टिमले तपाईंलाई छिट्टै सम्पर्क गर्नेछ।",
    },
    footer: {
      desc: "नेपालमा स्वास्थ्य व्यवस्थापन सम्बन्धी समर्पित परामर्श सेवा। क्षमता अभिवृद्धि, डिजिटल लजिस्टिक तालिम (LMIS PAMSV2), गुणस्तर नियमन, र औषधी विसर्जन कार्यमा समर्पित। स्थापना २०२३।",
      links_title: "महत्वपूर्ण लिङ्कहरू",
      legal_title: "सरकारी नीति तथा मापदण्ड अनुरूपता",
      legal_desc: "नेपाल सरकार स्वास्थ्य तथा जनसङ्ख्या मन्त्रालय, स्वास्थ्य सेवा विभाग, व्यवस्थापन महाशाखाको आपूर्ति सम्बन्धी नीति र स्थानीय तह सञ्चालन ऐन अनुरूप व्यवस्थित र सञ्चालित।",
      rights: "सर्वाधिकार सुरक्षित।",
    },
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Attempt localstorage lookup safely
    try {
      const stored = localStorage.getItem("kn_scm_lang");
      if (stored === "en" || stored === "ne") return stored;
    } catch (_) {}
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("kn_scm_lang", lang);
    } catch (_) {}
  };

  const t = (section: string, key: string, fallback?: string): string => {
    const translation = translations[language]?.[section]?.[key];
    if (translation) return translation;
    
    // In case key is missing for Nepali, fall back to English version
    const fallbackTranslation = translations["en"]?.[section]?.[key];
    return fallbackTranslation || fallback || `${section}.${key}`;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
