/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Calculator, 
  RefreshCcw, 
  AlertTriangle, 
  CheckCircle, 
  Database,
  Truck,
  Plus,
  Activity
} from "lucide-react";
import { SCMCalculation, LMISCommodity, ActivityLog } from "../types";
import { useLanguage } from "../context/LanguageContext";

export default function SCMSimulator() {
  const { language } = useLanguage();
  const [labTab, setLabTab] = useState<"forecasting" | "lmis">("forecasting");

  // Forecaster state
  const [commodityName, setCommodityName] = useState(
    language === "en" ? "Amoxicillin 250mg Cap" : "अमोक्सिसिलिन २५० एमजी क्याप्सुल"
  );
  const [amc, setAmc] = useState<number>(1200); // Average Monthly Consumption
  const [leadTime, setLeadTime] = useState<number>(2.5); // Months
  const [safetyStock, setSafetyStock] = useState<number>(2); // Months
  const [soh, setSoh] = useState<number>(1500); // Stock on hand

  const [savedCalcs, setSavedCalcs] = useState<SCMCalculation[]>(
    language === "en" ? [
      {
        id: "calc-1",
        commodityName: "Oxytocin 10 IU Injection",
        avgMonthlyConsumption: 800,
        leadTimeMonths: 1.5,
        safetyStockMonths: 1,
        stockOnHand: 400,
        reorderPoint: 2000,
        forecastedNeeded: 1600,
        calculatedAt: "Recent Session"
      },
      {
        id: "calc-2",
        commodityName: "Oral Rehydration Salts (ORS)",
        avgMonthlyConsumption: 2500,
        leadTimeMonths: 3,
        safetyStockMonths: 2,
        stockOnHand: 14500,
        reorderPoint: 12500,
        forecastedNeeded: 0,
        calculatedAt: "Recent Session"
      }
    ] : [
      {
        id: "calc-1",
        commodityName: "अक्सिटोसिन १० IU इन्जेक्सन",
        avgMonthlyConsumption: 800,
        leadTimeMonths: 1.5,
        safetyStockMonths: 1,
        stockOnHand: 400,
        reorderPoint: 2000,
        forecastedNeeded: 1600,
        calculatedAt: "प्रयोगशाला रेकर्ड"
      },
      {
        id: "calc-2",
        commodityName: "जीवनजल (ORS पैकेट)",
        avgMonthlyConsumption: 2500,
        leadTimeMonths: 3,
        safetyStockMonths: 2,
        stockOnHand: 14500,
        reorderPoint: 12500,
        forecastedNeeded: 0,
        calculatedAt: "प्रयोगशाला रेकर्ड"
      }
    ]
  );

  // Calculations
  const reorderPoint = Math.round(amc * (leadTime + safetyStock));
  const forecastedNeeded = Math.max(0, reorderPoint - soh);

  let stockStatus: "danger" | "warning" | "optimal" | "surplus" = "optimal";
  const monthsOfStock = soh > 0 && amc > 0 ? Number((soh / amc).toFixed(1)) : 0;

  if (monthsOfStock < safetyStock) {
    stockStatus = "danger"; // Stockout risk
  } else if (monthsOfStock < (leadTime + safetyStock)) {
    stockStatus = "warning"; // Reorder point warning
  } else if (monthsOfStock > 7) {
    stockStatus = "surplus"; // Expiry warning
  } else {
    stockStatus = "optimal";
  }

  const handleSaveCalculation = (e: React.FormEvent) => {
    e.preventDefault();
    const newCalc: SCMCalculation = {
      id: `calc-${Date.now()}`,
      commodityName,
      avgMonthlyConsumption: amc,
      leadTimeMonths: leadTime,
      safetyStockMonths: safetyStock,
      stockOnHand: soh,
      reorderPoint,
      forecastedNeeded,
      calculatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setSavedCalcs([newCalc, ...savedCalcs]);
  };

  const handleApplyPreset = (name: string, pAmc: number, pLt: number, pSs: number, pSoh: number) => {
    setCommodityName(name);
    setAmc(pAmc);
    setLeadTime(pLt);
    setSafetyStock(pSs);
    setSoh(pSoh);
  };

  // LMIS State
  const [lmisCommodities, setLmisCommodities] = useState<LMISCommodity[]>([
    {
      id: "c1",
      name: language === "en" ? "Amoxicillin 250mg" : "अमोक्सिसिलिन २५० एमजी",
      category: language === "en" ? "Essential Drug" : "अति आवश्यक औषधी",
      stockOnHand: 4500,
      avgMonthlyConsumption: 1200,
      monthsOfStock: 3.75,
      status: "Normal",
      facilityName: language === "en" ? "Babar Mahal District Hub" : "बबरमहल केन्द्रिय भण्डार",
      facilityType: language === "en" ? "Central Hospital" : "केन्द्रीय अस्पताल"
    },
    {
      id: "c2",
      name: language === "en" ? "Neo-Natal Resuscitator Kit" : "शिशु श्वासप्रश्वास उपकरण सेट",
      category: language === "en" ? "Medical Consumable" : "स्वास्थ्य औजार",
      stockOnHand: 5,
      avgMonthlyConsumption: 8,
      monthsOfStock: 0.625,
      status: "Understock",
      facilityName: language === "en" ? "Metropolitan Birth Clinic" : "महानगर प्रसूति केन्द्र",
      facilityType: language === "en" ? "District Hospital" : "जिल्ला अस्पताल"
    },
    {
      id: "c3",
      name: language === "en" ? "Pentavalent Vaccine" : "पेन्टाभ्यालेन्ट खोप",
      category: language === "en" ? "Vaccine" : "बाल खोप",
      stockOnHand: 800,
      avgMonthlyConsumption: 150,
      monthsOfStock: 5.33,
      status: "Normal",
      facilityName: language === "en" ? "Rural Health Post Alpha" : "ग्रामीण स्वास्थ्य चौकी क्षेत्र क",
      facilityType: language === "en" ? "Health Post" : "स्वास्थ्य चौकी"
    },
    {
      id: "c4",
      name: language === "en" ? "Oxytocin Injectables" : "अक्सिटोसिन इन्जेक्सन",
      category: language === "en" ? "Maternal Health" : "मातृ स्वास्थ्य",
      stockOnHand: 4800,
      avgMonthlyConsumption: 500,
      monthsOfStock: 9.6,
      status: "Risk of Expiry",
      facilityName: language === "en" ? "Bishnumati Community Unit" : "विष्णुमती स्वास्थ्य इकाई",
      facilityType: language === "en" ? "Community Health Unit" : "सामुदायिक स्वास्थ्य एकाइ"
    }
  ]);

  const [lmisLogs, setLmisLogs] = useState<ActivityLog[]>(
    language === "en" ? [
      {
        id: "log-1",
        timestamp: "10:15 AM",
        action: "PAMSV2 Sync",
        details: "Successfully pushed real-time monthly logistics report from Rural Health Post Alpha to Kathmandu Hub.",
        tag: "LMIS-Training"
      },
      {
        id: "log-2",
        timestamp: "09:42 AM",
        action: "Quantification Lock",
        details: "Municipal Store Focal Person locked forecasting parameters for Amoxicillin.",
        tag: "Forecasting"
      }
    ] : [
      {
        id: "log-1",
        timestamp: "१०:१५ बजे",
        action: "PAMSV2Sync सिङ्क",
        details: "ग्रामीण स्वास्थ्य चौकी क्षेत्र क बाट काठमाडौँ केन्द्रिय हबमा मासिक स्वास्थ्य आपूर्ति विवरण सफलतापुर्वक प्रविष्ट भयो।",
        tag: "LMIS-Training"
      },
      {
        id: "log-2",
        timestamp: "०९:४२ बजे",
        action: "Quantification लक",
        details: "पालिका भण्डार प्रमुखले अमोक्सिसिलिनको माग पूर्वानुमान तथा सुत्रहरू सुरक्षित गरी लक गर्नुभयो।",
        tag: "Forecasting"
      }
    ]
  );

  const handleSimulateDelivery = (id: string, qty: number) => {
    setLmisCommodities(prev => prev.map(item => {
      if (item.id === id) {
        const newSoh = item.stockOnHand + qty;
        const newMonths = Number((newSoh / item.avgMonthlyConsumption).toFixed(2));
        let newStatus: LMISCommodity["status"] = "Normal";
        if (newMonths < 2) newStatus = "Understock";
        else if (newMonths > 8) newStatus = "Risk of Expiry";
        return {
          ...item,
          stockOnHand: newSoh,
          monthsOfStock: newMonths,
          status: newStatus
        };
      }
      return item;
    }));

    const target = lmisCommodities.find(c => c.id === id);
    if (target) {
      const logObj: ActivityLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: language === "en" ? "PAMSV2 Stock In" : "स्टक आवक दर्ता",
        details: language === "en" 
          ? `Dispatched +${qty} units of ${target.name} to ${target.facilityName}. Recomputed stock buffer to ${((target.stockOnHand + qty) / target.avgMonthlyConsumption).toFixed(1)} months.`
          : `${target.facilityName} मा ${target.name} को +${qty} इकाइ ढुवानी प्राप्त भयो। प्रणालीमा मौज्दात बफर पुन: गणना गरी ${((target.stockOnHand + qty) / target.avgMonthlyConsumption).toFixed(1)} महिना कायम गरियो।`,
        tag: "LMIS-Training"
      };
      setLmisLogs([logObj, ...lmisLogs]);
    }
  };

  const handleTriggerWastageDisposal = (id: string) => {
    setLmisCommodities(prev => prev.map(item => {
      if (item.id === id) {
        const disposalQty = Math.round(item.stockOnHand * 0.4); // dispose 40%
        const newSoh = item.stockOnHand - disposalQty;
        const newMonths = Number((newSoh / item.avgMonthlyConsumption).toFixed(2));
        let newStatus: LMISCommodity["status"] = "Normal";
        if (newMonths < 2) newStatus = "Understock";
        return {
          ...item,
          stockOnHand: newSoh,
          monthsOfStock: newMonths,
          status: newStatus
        };
      }
      return item;
    }));

    const target = lmisCommodities.find(c => c.id === id);
    if (target) {
      const expiredQty = Math.round(target.stockOnHand * 0.4);
      const logObj: ActivityLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: language === "en" ? "Disposal Compliance" : "कानुनी सुरक्षित विसर्जन",
        details: language === "en" 
          ? `Disposed of ${expiredQty} units of expired ${target.name} in complete adherence with Government guidelines. Legal clearance certificate filed.`
          : `नेपाल सरकारको वातावरणीय तथा कानुनी निर्देशिका बमोजिम ${target.name} को म्याद नाघेको ${expiredQty} इकाइ सुरक्षित विसर्जन गरियो। विसर्जन प्रमाणपत्र दर्ता भयो।`,
        tag: "Disposal"
      };
      setLmisLogs([logObj, ...lmisLogs]);
    }
  };

  return (
    <section id="lmis-lab" className="py-20 bg-gray-50 scroll-mt-12 text-left select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Activity className="w-3.5 h-3.5" />
            {language === "en" ? "Interactive Learning Center" : "व्यावहारिक सिकाइ केन्द्र"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {language === "en" ? "KN SCM & LMIS Training Lab" : "KN स्वास्थ्य आपूर्ति र सफ्टवेयर तालिम ल्याब"}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-600 font-normal leading-relaxed">
            {language === "en" 
              ? "In our 9-district workshops, we train healthcare leaders using standard logistics models. Test our live forecasting calculator and simulate PAMSV2 inventory actions below."
              : "हाम्रा ९-जिल्ला कार्यशालाहरूमा, हामी स्वास्थ्य क्षेत्रका नेतृत्वहरूलाई आपूर्ति सम्बन्धी उत्कृष्ट अभ्यासहरूको व्यावहारिक तालिम दिन्छौं। माग पूर्वानुमान क्यालकुलेटर र PAMSV2 जिन्सी गतिविधिहरू परिक्षण गर्नुहोस्।"}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 max-w-lg mx-auto mb-10 shadow-sm">
          <button
            id="lab-tab-forecasting"
            onClick={() => setLabTab("forecasting")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              labTab === "forecasting"
                ? "bg-brand-600 text-white shadow-sm"
                : "text-gray-600 hover:text-brand-600 hover:bg-gray-50"
            }`}
          >
            <Calculator className="w-4 h-4" />
            {language === "en" ? "Quantification Calculator" : "माग पूर्वानुमान क्यालकुलेटर"}
          </button>
          <button
            id="lab-tab-lmis"
            onClick={() => setLabTab("lmis")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              labTab === "lmis"
                ? "bg-brand-600 text-white shadow-sm"
                : "text-gray-600 hover:text-brand-600 hover:bg-gray-50"
            }`}
          >
            <Database className="w-4 h-4" />
            {language === "en" ? "PAMSV2 Node Sandbox" : "PAMSV2 नोड सैंडबॉक्स"}
          </button>
        </div>

        {/* Lab Content */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* TAB 1: SCM FORECASTING CALCULATOR */}
          {labTab === "forecasting" && (
            <>
              {/* Form and Controls */}
              <div className="xl:col-span-5 space-y-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                    <Calculator className="w-5 h-5 text-brand-600" />
                    {language === "en" ? "SCM Consumption Formula" : "SCM खपत सुत्र तथा मान"}
                  </h3>

                  {/* Presets */}
                  <div className="mb-6">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                      {language === "en" ? "Load Standard SCM Presets:" : "मानक स्वास्थ्य सामग्री लोड गर्नुहोस्:"}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        id="preset-amox"
                        type="button"
                        onClick={() => handleApplyPreset(
                          language === "en" ? "Amoxicillin 250mg Cap" : "अमोक्सिसिलिन २५० एमजी क्याप्सुल", 
                          1200, 2.5, 2, 1200
                        )}
                        className="text-xs bg-gray-100 hover:bg-brand-50 hover:text-brand-700 text-gray-700 font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        {language === "en" ? "Essential Drug (Severe Shortage)" : "जीवनरक्षक औषधी (अत्याधिक अभाव)"}
                      </button>
                      <button
                        id="preset-oxy"
                        type="button"
                        onClick={() => handleApplyPreset(
                          language === "en" ? "Oxytocin 10 IU Inj" : "अक्सिटोसिन १० IU इन्जेक्सन", 
                          400, 1.5, 1, 2000
                        )}
                        className="text-xs bg-gray-100 hover:bg-brand-50 hover:text-brand-700 text-gray-700 font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        {language === "en" ? "Maternal Health (Overstocked)" : "मातृ स्वास्थ्य सामाग्री (अधिक मौज्दात)"}
                      </button>
                      <button
                        id="preset-mal"
                        type="button"
                        onClick={() => handleApplyPreset(
                          language === "en" ? "Malaria RDT Kits" : "मलेरिया RDT जाँच किट", 
                          150, 4, 3, 400
                        )}
                        className="text-xs bg-gray-100 hover:bg-brand-50 hover:text-brand-700 text-gray-700 font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        {language === "en" ? "Seasonal Kit (Reorder State)" : "सिजनल किट (पुनःअर्डर अवस्था)"}
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSaveCalculation} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        {language === "en" ? "Commodity Name" : "स्वास्थ्य सामग्रीको नाम"}
                      </label>
                      <input
                        id="calc-input-name"
                        type="text"
                        value={commodityName}
                        onChange={(e) => setCommodityName(e.target.value)}
                        className="w-full text-sm bg-gray-50 border border-gray-200 focus:border-brand-500 focus:bg-white px-4.5 py-2.5 rounded-xl outline-none transition-all text-gray-800"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">
                          {language === "en" ? "Monthly Use (AMC)" : "मासिक खपत (AMC)"}
                        </label>
                        <input
                          id="calc-input-amc"
                          type="number"
                          value={amc}
                          onChange={(e) => setAmc(Math.max(1, parseInt(e.target.value) || 0))}
                          className="w-full text-sm bg-gray-50 border border-gray-200 focus:border-brand-500 focus:bg-white px-4 py-2.5 rounded-xl outline-none text-gray-800"
                          min="1"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">
                          {language === "en" ? "Stock on Hand (SOH)" : "हालको मौज्दात (SOH)"}
                        </label>
                        <input
                          id="calc-input-soh"
                          type="number"
                          value={soh}
                          onChange={(e) => setSoh(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full text-sm bg-gray-50 border border-gray-200 focus:border-brand-500 focus:bg-white px-4 py-2.5 rounded-xl outline-none text-gray-800"
                          min="0"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">
                          {language === "en" ? "Lead Time (Months)" : "ढुवानी अवधि (महिनामा)"}
                        </label>
                        <input
                          id="calc-input-lead"
                          type="number"
                          step="0.5"
                          value={leadTime}
                          onChange={(e) => setLeadTime(Math.max(0.1, parseFloat(e.target.value) || 0))}
                          className="w-full text-sm bg-gray-50 border border-gray-200 focus:border-brand-500 focus:bg-white px-4 py-2.5 rounded-xl outline-none text-gray-800"
                          min="0.1"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">
                          {language === "en" ? "Safety Stock Buffer" : "सुरक्षित मौज्दात बफर"} ({language === "en" ? "Months" : "महिनामा"})
                        </label>
                        <input
                          id="calc-input-safety"
                          type="number"
                          step="0.5"
                          value={safetyStock}
                          onChange={(e) => setSafetyStock(Math.max(0.5, parseFloat(e.target.value) || 0))}
                          className="w-full text-sm bg-gray-50 border border-gray-200 focus:border-brand-500 focus:bg-white px-4 py-2.5 rounded-xl outline-none text-gray-800"
                          min="0.5"
                          required
                        />
                      </div>
                    </div>

                    <button
                      id="calc-btn-save"
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 cursor-pointer text-white font-bold py-3 rounded-xl transition-colors mt-2 text-sm shadow-sm active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                      {language === "en" ? "Save Log Entry" : "अभिलेख सुरक्षित गर्नुहोस्"}
                    </button>
                  </form>
                </div>
              </div>

              {/* Real-time Math Output Visualizer */}
              <div className="xl:col-span-7 space-y-6">
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-full text-left">
                  <div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-6">
                      <h4 className="font-extrabold text-gray-900 text-base">
                        {language === "en" ? "Real-time Pipeline Assessment" : "वास्तविक समय आपूर्ति समीक्षा"}
                      </h4>
                      <span className="font-mono text-xs font-bold text-gray-400">
                        {language === "en" ? "Methodology: AMC SCM" : "विधि: AMC SCM ढाँचा"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                      <div className="p-4 bg-brand-50 rounded-2xl border border-brand-100 text-center">
                        <span className="text-[10px] font-extrabold text-brand-600 uppercase tracking-widest block mb-1">
                          {language === "en" ? "Reorder Point (ROP)" : "पुनःअर्डर विन्दु (ROP)"}
                        </span>
                        <div className="text-2xl font-extrabold text-brand-900 font-mono">
                          {reorderPoint}
                        </div>
                        <p className="text-[10px] text-gray-500 mt-2">
                          {language === "en" ? "Min stocking level with safety buffer" : "सुरक्षित बफर सहित आवश्यक न्यूनतम मौज्दात"}
                        </p>
                      </div>

                      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                        <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest block mb-1">
                          {language === "en" ? "Months Of Stock" : "मौज्दात रहने अवधि"}
                        </span>
                        <div className="text-2xl font-extrabold text-emerald-800 font-mono">
                          {monthsOfStock}
                        </div>
                        <p className="text-[10px] text-gray-500 mt-2">
                          {language === "en" ? "Calculated inventory life expectancy" : "जिन्सी मौज्दातले धान्ने महिना"}
                        </p>
                      </div>

                      <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 text-center">
                        <span className="text-[10px] font-extrabold text-orange-700 uppercase tracking-widest block mb-1">
                          {language === "en" ? "Procurement Forecast" : "खरिद वा अर्डर पूर्वानुमान"}
                        </span>
                        <div className="text-2xl font-extrabold text-orange-900 font-mono">
                          {forecastedNeeded}
                        </div>
                        <p className="text-[10px] text-gray-500 mt-2">
                          {language === "en" ? "Commodity quantity to order in units" : "अर्डर गर्नुपर्ने कुल इकाईहरू"}
                        </p>
                      </div>
                    </div>

                    {/* Status Advice Cards */}
                    <div className="p-5 rounded-2xl border mb-6">
                      {stockStatus === "danger" && (
                        <div className="flex items-start gap-4">
                          <div className="bg-red-105 text-red-700 p-2 bg-red-50 rounded-xl shrink-0">
                            <AlertTriangle className="w-5 h-5 animate-bounce" />
                          </div>
                          <div>
                            <h5 className="font-extrabold text-red-900 text-sm">
                              {language === "en" ? "Critical Stockout Warning!" : "अत्याधिक अभावको खतरा!"}
                            </h5>
                            <p className="text-xs text-red-700 mt-1 leading-relaxed">
                              {language === "en" 
                                ? `Your stock level (${monthsOfStock} months) falls below the safety stock threshold of ${safetyStock} months. You must instantly order ${forecastedNeeded} units to secure health deliveries.`
                                : `तपाईँको मौज्दात स्तर (${monthsOfStock} महिना) न्यूनतम आवश्यक बफर (${safetyStock} महिना) भन्दा कम छ। स्वास्थ्य सेवा निरन्तर राख्न तत्काल थप ${forecastedNeeded} इकाइ खरिद वा अर्डर प्रक्रिया अगाडि बढाउनुहोस्।`}
                            </p>
                          </div>
                        </div>
                      )}
                      {stockStatus === "warning" && (
                        <div className="flex items-start gap-4">
                          <div className="bg-amber-105 text-amber-750 p-2 bg-amber-50 rounded-xl shrink-0 animate-pulse">
                            <RefreshCcw className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="font-extrabold text-amber-900 text-sm">
                              {language === "en" ? "Approaching Reorder Trigger" : "पुनःअर्डर बिन्दु नजिक"}
                            </h5>
                            <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                              {language === "en" 
                                ? `Stocks are stable but have slipped support margins. Procuring ${forecastedNeeded} units is recommended to support lead times of ${leadTime} months without relying on safety reserves.`
                                : `जिन्सी मौज्दात सन्तुलित छ तर जोखिम बिन्दु माथि छ। ढुवानी समय मिट गर्न थप ${forecastedNeeded} इकाइ प्राप्तिको लागि अर्डर प्रक्रिया सुरु गर्न सिफारिस गरिन्छ।`}
                            </p>
                          </div>
                        </div>
                      )}
                      {stockStatus === "optimal" && (
                        <div className="flex items-start gap-4">
                          <div className="bg-emerald-105 text-emerald-850 p-2 bg-emerald-50 rounded-xl shrink-0">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <h5 className="font-extrabold text-emerald-950 text-sm">
                              {language === "en" ? "Optimal Supply Balance" : "उत्कृष्ट मौज्दात सन्तुलन"}
                            </h5>
                            <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                              {language === "en"
                                ? `Supply is healthy. Your stock represents ${monthsOfStock} months of utility. No immediate orders required. Continue monitoring via PAMSV2 dashboard protocols.`
                                : `आपूर्ति अवस्था सकारात्मक छ। मौज्दातले लगभग ${monthsOfStock} महिना पुग्छ। तत्काल थप खरिद चाहिदैन। PAMSV2 अनलाइन प्रणाली मार्फत निरीक्षण जारी राख्नुहोस्।`}
                            </p>
                          </div>
                        </div>
                      )}
                      {stockStatus === "surplus" && (
                        <div className="flex items-start gap-4">
                          <div className="bg-indigo-105 text-indigo-805 p-2 bg-indigo-50 rounded-xl shrink-0">
                            <AlertTriangle className="w-5 h-5 text-indigo-500" />
                          </div>
                          <div>
                            <h5 className="font-extrabold text-indigo-900 text-sm">
                              {language === "en" ? "Excessive Surplus (Expiry/Wastage Risk)" : "अधिक मौज्दात (औषधि खेर जाने जोखिम)"}
                            </h5>
                            <p className="text-xs text-indigo-700 mt-1 leading-relaxed">
                              {language === "en"
                                ? `You hold ${monthsOfStock} months of stock, which vastly exceeds the optimal limit. Expiration may occur. If commodities expire, contact KN Multi Consulting for certified environmental drug disposal procedures.`
                                : `तपाईँसँग ${monthsOfStock} महिना पुग्ने अधिक सामग्री छ, जुन सीमा भन्दा बढी हो। औषधि म्याद सकिने सम्भावना रहन्छ। म्याद सकिएमा वातावरणीय रूपमा औषधि सुरक्षित विसर्जनका लागि KN मल्टि कन्सल्टिङलाई सम्पर्क गर्नुहोस्।`}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Calculations Log List */}
                  <div className="border-t border-gray-100 pt-6">
                    <span className="text-xs font-bold text-gray-400 block mb-3 uppercase tracking-wider">
                      {language === "en" ? "Quantification Workshop Session Log:" : "कार्यशाला सत्रको विवरण अभिलेख:"}
                    </span>
                    <div className="space-y-2.5 max-h-[140px] overflow-y-auto pr-1">
                      {savedCalcs.map((calc) => (
                        <div key={calc.id} className="flex justify-between items-center text-xs p-3 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 transition-colors">
                          <div>
                            <span className="font-bold text-gray-800 block">{calc.commodityName}</span>
                            <span className="text-[10px] text-gray-400 font-mono">
                              AMC: {calc.avgMonthlyConsumption} | SOH: {calc.stockOnHand} | {calc.calculatedAt}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-bold text-brand-600 block">ROP: {calc.reorderPoint}</span>
                            <span className="font-mono text-xs font-bold text-gray-800">
                              {language === "en" ? "Order:" : "अर्डर मात्रा:"} {calc.forecastedNeeded}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: PAMSV2 DIGITAL NODE SANDBOX */}
          {labTab === "lmis" && (
            <div className="xl:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Virtual inventory dashboard nodes */}
              <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 mb-6 gap-3">
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-base">
                      {language === "en" ? "PAMSV2 Live Facility Monitoring" : "PAMSV2 अनलाइन स्वास्थ्य चौकी अनुगमन"}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {language === "en" 
                        ? "Visualizing active supply hubs configured under 22 rolling programs."
                        : "देशभरका २२ पालिका कार्यक्रम अन्तर्गत जोडिएका स्वास्थ्य संस्थाहरूको लाइभ अनुगमन।"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-805 px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0 select-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                      {language === "en" ? "1 Expiry Warning" : "१ म्याद नाघ्ने चेतावनी"}
                    </span>
                    <span className="text-[10px] font-bold bg-red-100 text-red-805 px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0 select-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                      {language === "en" ? "1 Stockout Risk" : "१ अभाव जोखिम विन्दु"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lmisCommodities.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-5 rounded-2xl border border-gray-100 bg-gray-50/50 flex flex-col justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        {/* Upper Info */}
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <div>
                            <span className="text-[9px] font-bold text-brand-650 tracking-wider uppercase font-mono block">
                              {item.facilityType} • {item.category}
                            </span>
                            <h4 className="text-sm font-bold text-gray-900 mt-0.5">{item.name}</h4>
                            <p className="text-[11px] text-gray-500 font-medium">{item.facilityName}</p>
                          </div>

                          {/* Status pill color */}
                          <span className={`text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full shrink-0 ${
                            item.status === "Understock" 
                              ? "bg-red-100 text-red-800 border border-red-200" 
                              : item.status === "Risk of Expiry" 
                              ? "bg-amber-100 text-amber-800 border border-amber-200" 
                              : "bg-emerald-100 text-emerald-850 border border-emerald-250"
                          }`}>
                            {item.status === "Normal" && (language === "en" ? "Normal" : "सन्तुलित")}
                            {item.status === "Understock" && (language === "en" ? "Understock" : "न्यून मौज्दात")}
                            {item.status === "Risk of Expiry" && (language === "en" ? "Risk of Expiry" : "म्याद समाप्ति जोखिम")}
                          </span>
                        </div>

                        {/* Numeric Metrics */}
                        <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-gray-100/60 my-3 text-center">
                          <div>
                            <span className="text-[9px] font-bold text-gray-400 block">{language === "en" ? "SOH UNITS" : "SOH इकाईहरू"}</span>
                            <span className="text-xs font-mono font-bold text-gray-800">{item.stockOnHand}</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-gray-400 block">{language === "en" ? "AMC" : "मासिक खपत"}</span>
                            <span className="text-xs font-mono font-bold text-gray-800">{item.avgMonthlyConsumption}</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-gray-400 block">{language === "en" ? "MOS LIFE" : "पुग्ने अवधि"}</span>
                            <span className={`text-xs font-mono font-bold ${
                              item.monthsOfStock < 2 ? "text-red-600 font-extrabold" : "text-gray-800"
                            }`}>{item.monthsOfStock} {language === "en" ? "mo" : "महिना"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Simulation Triggers */}
                      <div className="flex gap-2">
                        <button
                          id={`node-btn-deliver-${item.id}`}
                          type="button"
                          onClick={() => handleSimulateDelivery(item.id, 1000)}
                          className="flex-1 flex items-center justify-center gap-1 bg-white hover:bg-brand-50 hover:text-brand-700 text-gray-700 border border-gray-250 font-bold py-2 rounded-lg text-[10px] tracking-tight transition-all cursor-pointer"
                        >
                          <Truck className="w-3 h-3 text-brand-500 shrink-0" />
                          {language === "en" ? "Simulate +1k Dispatch" : "+१००० इकाइ ढुवानी"}
                        </button>
                        {item.status === "Risk of Expiry" && (
                          <button
                            id={`node-btn-dispose-${item.id}`}
                            type="button"
                            onClick={() => handleTriggerWastageDisposal(item.id)}
                            className="flex-1 flex items-center justify-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 border border-red-200 font-bold py-2 rounded-lg text-[10px] tracking-tight transition-all cursor-pointer"
                          >
                            <RefreshCcw className="w-3 h-3 text-red-500 shrink-0" />
                            {language === "en" ? "Dispose Expired" : "सुरक्षित विसर्जन"}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-time System Log outputs on the right */}
              <div className="lg:col-span-4 bg-gray-900 rounded-3xl p-6 text-white min-h-[300px] flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
                    <span className="text-[11px] font-mono text-brand-400 font-semibold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse inline-block" />
                      {language === "en" ? "PAMSV2_SIMULATOR_LOGS" : "PAMSV2_प्रणाली_रेकर्ड_विवरण"}
                    </span>
                    <button
                      id="lmis-logs-clear"
                      onClick={() => setLmisLogs([])}
                      className="text-[10px] text-gray-400 hover:text-white font-semibold transition-colors cursor-pointer"
                    >
                      {language === "en" ? "Clear" : "मेट्नुहोस्"}
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1 font-mono text-xs text-gray-300">
                    {lmisLogs.length === 0 ? (
                      <p className="text-xs text-gray-500 italic py-6 text-center font-sans">
                        {language === "en" 
                          ? "No transactions logged yet. Dispatch cargo or trigger SCM certifications to populate data feed."
                          : "अझै सम्म कुनै गतिविधि पाइदैन। विवरण हेर्न ढुवानी बटन वा विसर्जन बटन दबाउनुहोस्।"}
                      </p>
                    ) : (
                      lmisLogs.map((log) => (
                        <div key={log.id} className="text-xs border-l-2 border-brand-500 pl-3 py-1 space-y-1">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="font-bold text-gray-300 uppercase">{log.action}</span>
                            <span className="text-gray-500 font-mono">{log.timestamp}</span>
                          </div>
                          <p className="text-gray-400 text-[11.5px] leading-relaxed font-sans">
                            {log.details}
                          </p>
                          <span className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                            log.tag === "Disposal" 
                              ? "bg-emerald-900/60 text-emerald-200 border border-emerald-800/40" 
                              : log.tag === "Forecasting"
                              ? "bg-amber-900/50 text-amber-205 border border-amber-800/30"
                              : "bg-brand-900/40 text-brand-200 border border-brand-800/20"
                          }`}>
                            #{log.tag === "Disposal" && (language === "en" ? "Disposal" : "सुरक्षित विसर्जन")}
                            {log.tag === "Forecasting" && (language === "en" ? "Forecasting" : "माग पूर्वानुमान")}
                            {log.tag === "LMIS-Training" && (language === "en" ? "LMIS-Training" : "PAMSV2 तालिम")}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-4 mt-4 text-[11px] text-gray-500 leading-normal font-sans">
                  <span className="font-bold text-gray-400 uppercase tracking-widest block mb-1">
                    {language === "en" ? "Certified LMIS Training:" : "प्रमाणित LMIS तालिम विवरण:"}
                  </span>
                  {language === "en"
                    ? "PAMSV2 supports central sync so that the Department of Health Services (DoHS) tracks active supply levels from remote municipal store chains."
                    : "PAMSV2 ले केन्द्रिय सिङ्कलाई सघाउँछ जसले स्वास्थ्य सेवा विभाग (DoHS) लाई दुरदराजका पालिका भण्डार गृहको मौज्दात लाइभ अनुगमन गर्न सजिलो पार्दछ।"}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
}
