/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock, 
  User, 
  Building, 
  Sparkles, 
  CheckCircle,
  Copy,
  Check
} from "lucide-react";
import { ContactSubmission } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { supabase } from "../lib/supabase";

export default function ContactSection() {
  const { language } = useLanguage();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [org, setOrg] = useState("");
  const [subject, setSubject] = useState("SCM Technical Assistance Request");
  const [message, setMessage] = useState("");

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactSubmission | null>(null);
  const [supabaseError, setSupabaseError] = useState<string | null>(null);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSupabaseError(null);
    
    try {
      // Attempt to save to Supabase under the "inquiries" table
      const { error } = await supabase
        .from("inquiries")
        .insert([
          {
            name,
            email,
            phone,
            organization: org,
            subject,
            message,
            submitted_at: new Date().toISOString()
          }
        ]);

      if (error) {
        throw error;
      }

      const submission: ContactSubmission = {
        name,
        email,
        phone,
        organization: org,
        subject,
        message,
        submittedAt: new Date().toLocaleDateString() + " " + (language === "en" ? "at" : "बजे") + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setSubmittedData(submission);
      
      // Reset form variables
      setName("");
      setEmail("");
      setPhone("");
      setOrg("");
      setMessage("");
    } catch (err: any) {
      console.error("Supabase insert error:", err);
      setSupabaseError(err?.message || "Failed to submit inquiry to Supabase. Please ensure the 'inquiries' table is created with correct permissions in your backend.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white scroll-mt-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" />
            {language === "en" ? "Connect With Us" : "हामीसँग जोडिनुहोस्"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {language === "en" ? "Consultation & Partnerships" : "परामर्श तथा साझेदारी"}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
            {language === "en"
              ? "Reach out to establish SCM training programs, request certified drug disposal support, or book capacity-building workshops."
              : "स्वास्थ्य आपूर्ति श्रृंखला तालिम संचालन, प्रमाणित औषधि विसर्जन अडिट, वा सक्षमता अभिवृद्धि कार्यशालाहरू आयोजना गर्न हामीलाई सम्पर्क गर्नुहोस्।"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT COLUMN: Contact Cards & Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-extrabold text-gray-900">
                {language === "en" ? "Official Headquarters" : "केन्द्रिय कार्यालय"}
              </h3>
              <p className="text-sm sm:text-base text-gray-650 leading-relaxed font-normal">
                {language === "en"
                  ? "Based in the central administrative hub of Babar Mahal, Kathmandu, we maintain direct professional communication channels with public health bureaus and national logistics offices."
                  : "काठमाडौंको मुख्य प्रशासनिक केन्द्र बबरमहलमा अवस्थित भई हामी विभिन्न जिल्ला जनस्वास्थ्य कार्यालय, पालिका तथा केन्द्रिय आपूर्ति महाशाखाहरूसँग प्रत्यक्ष व्यावसायिक समन्वय राख्दछौं।"}
              </p>

              {/* Specific Metadata Cards */}
              <div className="space-y-4">
                
                {/* Contact: Kedar Nath Upreti */}
                <div className="p-4 bg-brand-50/50 rounded-2xl border border-brand-100 flex items-start gap-4">
                  <div className="bg-brand-600 text-white p-3 rounded-xl shadow-sm animate-pulse-slow">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-brand-600 uppercase tracking-widest block">
                      {language === "en" ? "Lead Representative" : "मुख्य परामर्शदाता"}
                    </span>
                    <h4 className="text-base font-bold text-gray-900 mt-1">
                      {language === "en" ? "Kedar Nath Upreti" : "केदार नाथ उप्रेती"}
                    </h4>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">
                      {language === "en" ? "Co-founder & Chief SCM Consultant" : "सह-संस्थापक तथा मुख्य SCM परामर्शदाता"}
                    </p>
                  </div>
                </div>

                {/* Info Card: Phone */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-150 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-white text-gray-700 border border-gray-200 p-2.5 rounded-xl">
                      <Phone className="w-4.5 h-4.5 text-brand-600" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                        {language === "en" ? "Direct Phone Line" : "प्रत्यक्ष फोन सेवा"}
                      </span>
                      <a 
                        href="tel:9851142793" 
                        className="text-sm font-extrabold text-gray-800 hover:text-brand-650 hover:underline animate-fade-in"
                      >
                        {language === "en" ? "9851142793" : "९८५११४२७९३"}
                      </a>
                    </div>
                  </div>
                  <button
                    id="copy-phone-btn"
                    onClick={() => handleCopyText("9851142793", "phone")}
                    className="p-2 text-gray-400 hover:text-brand-600 cursor-pointer transition-colors"
                    aria-label="Copy phone number"
                  >
                    {copiedField === "phone" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Info Card: Email */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-150 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-white text-gray-700 border border-gray-200 p-2.5 rounded-xl">
                      <Mail className="w-4.5 h-4.5 text-brand-600" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                        {language === "en" ? "Official SCM Inbox" : "आधिकारिक इमेल ठेगाना"}
                      </span>
                      <a 
                        href="mailto:Kedarupreti7182@gmail.com" 
                        className="text-xs sm:text-sm font-extrabold text-gray-800 hover:text-brand-650 hover:underline break-all"
                      >
                        Kedarupreti7182@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    id="copy-email-btn"
                    onClick={() => handleCopyText("Kedarupreti7182@gmail.com", "email")}
                    className="p-2 text-gray-400 hover:text-brand-600 cursor-pointer transition-colors"
                    aria-label="Copy email address"
                  >
                    {copiedField === "email" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Info Card: Location */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-150 flex items-start gap-4">
                  <div className="bg-white text-gray-700 border border-gray-200 p-2.5 rounded-xl">
                    <MapPin className="w-4.5 h-4.5 text-brand-600" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                      {language === "en" ? "Office Location" : "कार्यालयको ठेगाना"}
                    </span>
                    <span className="text-sm font-extrabold text-gray-800 block">
                      {language === "en" ? "Babar Mahal, Kathmandu" : "बबरमहल, काठमाडौं"}
                    </span>
                    <span className="text-xs text-gray-500 font-medium block mt-0.5">
                      {language === "en" ? "Bagmati Province, Nepal" : "बागमती प्रदेश, नेपाल"}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick response commitment footer */}
            <div className="bg-brand-50 p-5 rounded-2xl border border-brand-100 hidden lg:block">
              <span className="text-xs font-bold text-brand-700 block mb-1">
                ⏱️ {language === "en" ? "Quick Response Commitment" : "द्रुत जवाफ प्रतिबद्धता"}
              </span>
              <p className="text-xs text-gray-500 leading-normal font-medium">
                {language === "en"
                  ? "Our SCM response desk typically reviews and contacts municipal coordinators within 24 working hours."
                  : "हाम्रो प्रशासनिक डेस्कले आवेदनहरू समीक्षा गरी २४ घण्टा भित्र पालिका वा सम्बन्धित स्वास्थ्य इकाईलाई सम्पर्क गर्नेछ।"}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Submission Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm h-full">
              
              {submittedData ? (
                <div className="h-full flex flex-col justify-center items-center text-center p-6 space-y-6 animate-fade-in">
                  <div className="bg-emerald-100 text-emerald-800 p-4 rounded-full">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-extrabold text-gray-900">
                      {language === "en" ? "Inquiry Logged Successfully!" : "अनुरोध सफलतापूर्वक दर्ता भयो!"}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto">
                      {language === "en" 
                        ? <>Thank you, <strong>{submittedData.name}</strong>. Your SCM request has been officially recorded. Representative Upreti was notified.</>
                        : <>धन्यवाद <strong>{submittedData.name}</strong>। तपाईँको अनुरोध आधिकारिक रूपमा दर्ता भएको छ। मुख्य परामर्शदाता उप्रेतीज्यूलाई विवरण प्रेषित गरियो।</>}
                    </p>
                  </div>

                  {/* Submission Receipt Detail Box */}
                  <div className="bg-gray-50 rounded-2xl border border-gray-150 p-5 text-left w-full max-w-md font-mono text-xs space-y-2 text-gray-700">
                    <div>
                      <span className="text-[10px] text-gray-400 block font-sans">{language === "en" ? "SUBJECT" : "विषय"}</span>
                      <span className="font-bold">{submittedData.subject}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block font-sans">{language === "en" ? "ORGANIZATION" : "कार्यालय / संस्था"}</span>
                      <span className="font-bold">{submittedData.organization || (language === "en" ? "Private Capacity" : "व्यक्तिगत क्षमता")}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block font-sans">{language === "en" ? "COMMUNICATION PATHWAY" : "सम्पर्क माध्यम"}</span>
                      <span className="font-bold">{submittedData.phone} | {submittedData.email}</span>
                    </div>
                    <div className="border-t border-gray-100 pt-2 mt-2">
                      <span className="text-[10px] text-gray-400 block font-sans">{language === "en" ? "TIMESTAMP LOGGED" : "सफलतापूर्वक दर्ता समय"}</span>
                      <span className="font-bold text-brand-700">{submittedData.submittedAt}</span>
                    </div>
                  </div>

                  <button
                    id="submit-reset-btn"
                    onClick={() => setSubmittedData(null)}
                    className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm py-2.5 px-6 rounded-xl transition-all cursor-pointer shadow-sm"
                  >
                    {language === "en" ? "Send New Inquiry" : "नयाँ अनुरोध पठाउनुहोस्"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="border-b border-gray-50 pb-3 mb-4 text-left">
                    <h4 className="font-bold text-gray-900 text-base">
                      {language === "en" ? "Inquiry intake desk" : "सोधपुछ सेवा केन्द्र"}
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {language === "en"
                        ? "Please provide details regarding your SCM requirements."
                        : "कृपया तपाईँको स्वास्थ्य आपूर्ति व्यवस्थापन वा तालिम सम्बन्धी आवश्यकताहरूको विवरण उल्लेख गर्नुहोस्।"}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="form-name" className="text-xs font-bold text-gray-700 block mb-1">
                        {language === "en" ? "Full Name" : "पुरा नाम"} <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="form-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-sm bg-gray-50 border border-gray-200 focus:border-brand-500 focus:bg-white px-4 py-2.5 rounded-xl outline-none"
                        placeholder="e.g. Kedar Nath Upreti"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="form-org" className="text-xs font-bold text-gray-700 block mb-1">
                        {language === "en" ? "Organization" : "कार्यालय वा संस्थाको नाम"}
                      </label>
                      <input
                        id="form-org"
                        type="text"
                        value={org}
                        onChange={(e) => setOrg(e.target.value)}
                        className="w-full text-sm bg-gray-50 border border-gray-200 focus:border-brand-500 focus:bg-white px-4 py-2.5 rounded-xl outline-none"
                        placeholder={language === "en" ? "e.g. Municipal Health Post" : "उदा. नगर स्वास्थ्य शाखा"}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="form-email" className="text-xs font-bold text-gray-700 block mb-1">
                        {language === "en" ? "Official Email" : "आधिकारिक इमेल"} <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-sm bg-gray-50 border border-gray-200 focus:border-brand-500 focus:bg-white px-4 py-2.5 rounded-xl outline-none"
                        placeholder="e.g. contact@domain.gov"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="form-phone" className="text-xs font-bold text-gray-700 block mb-1">
                        {language === "en" ? "Phone Number" : "सम्पर्क नम्बर"} <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="form-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-sm bg-gray-50 border border-gray-200 focus:border-brand-500 focus:bg-white px-4 py-2.5 rounded-xl outline-none"
                        placeholder="e.g. 9851142793"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="form-subject" className="text-xs font-bold text-gray-700 block mb-1">
                      {language === "en" ? "Service Requirement" : "चाहिएको सेवा प्रकार"} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="form-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full text-sm bg-gray-50 border border-gray-200 focus:border-brand-500 focus:bg-white px-4 py-2.5 rounded-xl outline-none text-gray-700"
                      required
                    >
                      <option value="SCM Technical Assistance Request">
                        {language === "en" ? "SCM Technical Assistance" : "स्वास्थ्य आपूर्ति प्राविधिक सहयोग (SCM)"}
                      </option>
                      <option value="Curriculum & Training Module Design">
                        {language === "en" ? "Curriculum & Manual Design" : "तालिम निर्देशिका तथा कोर्ष निर्माण"}
                      </option>
                      <option value="PAMSV2 LMIS Deployed Rollout">
                        {language === "en" ? "PAMSV2 (LMIS) Software Rollout" : "PAMSV2 डिजिटल जिन्सी प्रणाली जडान"}
                      </option>
                      <option value="Legal Expiry Disposal Audit">
                        {language === "en" ? "Legal Drug Expiry & Asset disposal" : "काम नलाग्ने औषधिको कानुनी विसर्जन"}
                      </option>
                      <option value="General Corporate Partnership">
                        {language === "en" ? "General Partnership Query" : "सामान्य संस्थागत साझेदारी"}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="form-msg" className="text-xs font-bold text-gray-700 block mb-1">
                      {language === "en" ? "Inquiry Details / Scope" : "सोधपुछको विस्तृत क्षेत्र र विवरण"} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="form-msg"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full text-sm bg-gray-50 border border-gray-200 focus:border-brand-500 focus:bg-white px-4.5 py-3 rounded-xl outline-none resize-none"
                      placeholder={
                        language === "en"
                          ? "Please supply information concerning estimated quantities, target facilities (Hospitals, health posts), or disposal requirements..."
                          : "कृपया अनुमानित सामग्रीको मात्रा, लक्ष्य गरिएका स्वास्थ्य संस्थाहरू (अस्पताल, स्वास्थ्य चौकी) वा फोहोर विसर्जन सम्बन्धी आवश्यक विवरणहरू प्रदान गर्नुहोस्..."
                      }
                      required
                    />
                  </div>

                  {supabaseError && (
                    <div className="p-4 bg-rose-50 border border-rose-150 text-rose-800 text-xs rounded-xl space-y-2 leading-relaxed">
                      <p className="font-bold flex items-center gap-1.5 text-rose-900">
                        ⚠️ {language === "en" ? "Supabase Integration Action Needed" : "सुपाबेस सेटअप कार्य आवश्यक"}
                      </p>
                      <p>{supabaseError}</p>
                      <div className="border-t border-rose-100 pt-2 mt-2">
                        <p className="text-[10px] font-bold text-rose-700 uppercase mb-1">
                          {language === "en" ? "Run this SQL command in your Supabase SQL Editor:" : "आफ्नो सुपाबेस SQL Editor मा यो कमाण्ड चलाउनुहोस्:"}
                        </p>
                        <pre className="p-2.5 bg-rose-950 text-rose-150 rounded-lg text-[9.5px] font-mono overflow-x-auto select-all max-h-40 whitespace-pre">
{`CREATE TABLE inquiries (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  organization TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable select & insert permissions for anyone (public):
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select" ON inquiries FOR SELECT USING (true);`}
                        </pre>
                      </div>
                    </div>
                  )}

                  <button
                    id="form-submit-btn"
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-100 hover:shadow-brand-200/50 transition-colors cursor-pointer text-sm disabled:opacity-50 active:scale-95 animate-fade-in"
                  >
                    {submitting ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        {language === "en" ? "Logging To Administration desk..." : "विवरण दर्ता हुदैछ..."}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {language === "en" ? "Submit Request Intake" : "अनुरोध दर्ता गर्नुहोस्"}
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
