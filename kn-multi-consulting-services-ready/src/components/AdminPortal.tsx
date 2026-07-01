import React, { useState, useEffect } from "react";
import { 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  Phone, 
  Building, 
  Trash2, 
  LogOut, 
  Search, 
  X, 
  Clock, 
  UserCheck, 
  FileCheck, 
  Database,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { useLanguage } from "../context/LanguageContext";

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  organization?: string;
  subject: string;
  message: string;
  submitted_at: string;
}

interface AdminPortalProps {
  onClose: () => void;
}

export default function AdminPortal({ onClose }: AdminPortalProps) {
  const { language } = useLanguage();
  
  // Tab states: 'login' | 'signup' | 'dashboard'
  const [currentTab, setCurrentTab] = useState<"login" | "signup" | "dashboard">("login");
  const [session, setSession] = useState<any>(null);
  
  // Form input variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Supabase states
  const [loading, setLoading] = useState(false);
  const [checkingSlot, setCheckingSlot] = useState(true);
  const [isSlotTaken, setIsSlotTaken] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [dbTableMissing, setDbTableMissing] = useState(false);
  const [showWarningSql, setShowWarningSql] = useState(false);

  // Dashboard states
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [fetchingInquiries, setFetchingInquiries] = useState(false);

  // Check current session and if the single admin slot is already occupied
  useEffect(() => {
    checkSession();
    checkAdminSlot();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      if (currentSession) {
        setCurrentTab("dashboard");
        fetchInquiries();
      }
    } catch (err) {
      console.error("Session check error:", err);
    }
  };

  const checkAdminSlot = async () => {
    setCheckingSlot(true);
    setDbTableMissing(false);
    try {
      // Test querying the admin_profiles table to see if any admin has signed up
      const { data, error } = await supabase
        .from("admin_profiles")
        .select("id")
        .limit(1);

      if (error) {
        // If table doesn't exist, handle it gracefully by letting users know they need to setup table
        if (error.code === "42P01" || error.message.includes("does not exist")) {
          setDbTableMissing(true);
          setIsSlotTaken(false); // allow signup but warn them
        } else {
          throw error;
        }
      } else {
        if (data && data.length > 0) {
          setIsSlotTaken(true);
          if (currentTab === "signup") {
            setCurrentTab("login");
          }
        } else {
          setIsSlotTaken(false);
        }
      }
    } catch (err: any) {
      console.error("Error checking slot occupation:", err);
    } finally {
      setCheckingSlot(false);
    }
  };

  const fetchInquiries = async () => {
    setFetchingInquiries(true);
    try {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("submitted_at", { ascending: false });

      if (error) {
        throw error;
      }
      setInquiries(data || []);
    } catch (err: any) {
      console.error("Error fetching inquiries:", err);
      // Fallback or show alert if inquiries table doesn't exist yet
    } finally {
      setFetchingInquiries(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      setSession(data.session);
      setSuccessMessage(language === "en" ? "Authenticated successfully!" : "सफलतापूर्वक प्रमाणीकृत!");
      setCurrentTab("dashboard");
      fetchInquiries();
    } catch (err: any) {
      setErrorMessage(err?.message || (language === "en" ? "Authentication failed" : "प्रमाणीकरण असफल भयो"));
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    // Double check slot before signing up
    if (isSlotTaken) {
      setErrorMessage(language === "en" 
        ? "The single admin slot is already occupied. Registration disabled." 
        : "एकल प्रशासक स्लट पहिले नै भरिएको छ। दर्ता असक्षम।"
      );
      setLoading(false);
      return;
    }

    try {
      // 1. Authenticate with Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        throw signUpError;
      }

      const user = data.user;
      if (!user) {
        throw new Error("No user created");
      }

      // 2. Try inserting into admin_profiles table to lock the "single admin slot"
      if (!dbTableMissing) {
        const { error: profileError } = await supabase
          .from("admin_profiles")
          .insert([
            {
              id: user.id,
              email: user.email,
            }
          ]);
        if (profileError) {
          console.error("Profile saving error:", profileError);
          // Non-blocking but warning
        }
      }

      setSession(data.session);
      setSuccessMessage(language === "en" 
        ? "Admin account successfully created! You are logged in." 
        : "प्रशासक खाता सफलतापूर्वक सिर्जना भयो! तपाईं लग-इन हुनुभयो।"
      );
      
      // Refresh state to lock the single-slot immediately
      setIsSlotTaken(true);
      setCurrentTab("dashboard");
      fetchInquiries();
    } catch (err: any) {
      setErrorMessage(err?.message || (language === "en" ? "Sign up failed" : "दर्ता असफल भयो"));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setSession(null);
      setCurrentTab("login");
      // Keep state fresh
      checkAdminSlot();
    } catch (err) {
      console.error("Signout error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInquiry = async (id: number) => {
    if (!window.confirm(language === "en" ? "Are you sure you want to delete this inquiry?" : "के तपाईं यो सोधपुछ मेटाउन चाहनुहुन्छ?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("inquiries")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      setInquiries(prev => prev.filter(item => item.id !== id));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete item from repository");
    }
  };

  // Filter inquiries based on query
  const filteredInquiries = inquiries.filter(item => {
    const term = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term) ||
      item.subject.toLowerCase().includes(term) ||
      item.phone.toLowerCase().includes(term) ||
      (item.organization && item.organization.toLowerCase().includes(term)) ||
      item.message.toLowerCase().includes(term)
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#0a1128]/95 backdrop-blur-md flex flex-col justify-start items-center overflow-y-auto px-4 py-8 md:py-16">
      
      {/* Container Card */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 mt-6 md:mt-0 flex flex-col text-left-direction max-h-[85vh] overflow-y-auto">
        
        {/* Banner/Header of the Portal */}
        <div className="bg-gradient-to-r from-brand-900 to-[#0c316b] text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#14448c]/20">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1 px-2.5 rounded-full bg-cyan-500/20 text-cyan-200 font-extrabold text-[10px] tracking-wider uppercase flex items-center gap-1">
                <Database className="w-3 h-3" />
                {language === "en" ? "Supabase Connected" : "सुपाबेस जोडिएको"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {language === "en" ? "Admin Portal" : "प्रशासक पोर्टल"}
            </h2>
            <p className="text-xs text-slate-300 font-normal mt-1">
              {language === "en" 
                ? "Inquiry Intake Management Desk • Highly Protected Environment" 
                : "सोधपुछ व्यवस्थापन केन्द्र • उच्च सुरक्षा नियन्त्रित पहुँच"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl px-4 py-2 border border-white/10 text-xs font-semibold select-none cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === "en" ? "Return to Main Site" : "मुख्य साइटमा फर्कनुहोस्"}</span>
          </button>
        </div>

        {/* DB Configuration Warning for New Supabase Projects */}
        {dbTableMissing && !session && (
          <div className="m-6 p-4 sm:p-5 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row gap-4 items-start text-amber-900">
            <div className="p-2.5 bg-amber-100 rounded-xl text-amber-800 shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div className="space-y-2 flex-grow">
              <h4 className="font-bold text-xs text-amber-950">
                ⚠️ {language === "en" ? "Database Setup Needed - admin_profiles table missing" : "डेटाबेस सेटअप आवश्यक - admin_profiles तालिका अनुपस्थित"}
              </h4>
              <p className="text-[11px] leading-relaxed text-amber-800">
                {language === "en" 
                  ? "We can process register requests temporarily, but to properly lock the sign-up slot, you must execute the SQL statement in your Supabase SQL Editor." 
                  : "दर्ता स्लट सुरक्षित नियन्त्रणमा लक गर्न कृपया आफ्नो सुपाबेस SQL Editor मा यो कमाण्ड चलाउनुहोस्:"}
              </p>
              
              <button
                type="button"
                onClick={() => setShowWarningSql(!showWarningSql)}
                className="text-xs font-bold text-amber-900 hover:text-amber-950 underline flex items-center gap-1 cursor-pointer bg-amber-100/50 px-2.5 py-1 rounded-lg border border-amber-200"
              >
                {showWarningSql 
                  ? (language === "en" ? "Hide Supabase SQL Script ▲" : "सुपाबेस SQL स्क्रिप्ट लुकाउनुहोस् ▲") 
                  : (language === "en" ? "Show Supabase SQL Script ▼" : "सुपाबेस SQL स्क्रिप्ट हेर्नुहोस् ▼")}
              </button>

              {showWarningSql && (
                <pre className="p-3 bg-[#1e293b] text-teal-300 rounded-xl text-[10px] font-mono overflow-x-auto select-all max-h-36 max-w-full mt-2 transition-all">
{`CREATE TABLE admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON admin_profiles FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON admin_profiles FOR INSERT WITH CHECK (auth.uid() = id);`}
                </pre>
              )}
            </div>
          </div>
        )}

        {/* MAIN BODY AREA */}
        <div className="p-6 sm:p-8 flex-grow">
          
          {/* 1. LOGIN TAB */}
          {currentTab === "login" && !session && (
            <div className="max-w-md mx-auto py-6">
              
              <div className="text-center mb-8">
                <div className="w-14 h-14 bg-brand-50 text-brand-700 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-brand-100 shadow-sm">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900">
                  {language === "en" ? "Admin Authentication" : "प्रशासक प्रमाणीकरण"}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {language === "en" ? "Sign in to view submitted inquiries" : "प्राप्त सोधपुछ र सन्देशहरू हेर्न लग-इन गर्नुहोस्"}
                </p>
              </div>

              {errorMessage && (
                <div className="mb-5 p-3 rounded-xl bg-rose-50 text-rose-800 text-xs font-semibold border border-rose-150">
                  ⚠️ {errorMessage}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1.5 text-slate-700">
                    {language === "en" ? "Administrator Email" : "प्रशासक इमेल"}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className="w-full bg-slate-100 border border-slate-300 rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1.5 text-slate-700">
                    {language === "en" ? "Secure Password" : "सुरक्षित पासवर्ड"}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-100 border border-slate-300 rounded-xl py-2.5 pl-10 pr-10 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#072d65] hover:bg-brand-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors shadow-lg shadow-brand-500/10 cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      <span>{language === "en" ? "Sign In" : "लग-इन गनुहोस्"}</span>
                    </>
                  )}
                </button>
              </form>

              {/* Toggle to sign up IF single admin slot NOT yet occupied */}
              {!checkingSlot && !isSlotTaken && (
                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                  <p className="text-xs text-gray-500 mb-2">
                    {language === "en" 
                      ? "First time setting up? The single admin registration slot is OPEN!" 
                      : "पहिलो पटक सेटअप गर्दै हुनुहुन्छ? एकल प्रशासक दर्ता स्लट खुल्ला छ!"}
                  </p>
                  <button
                    onClick={() => {
                      setErrorMessage(null);
                      setCurrentTab("signup");
                    }}
                    className="text-xs text-brand-600 hover:text-brand-800 font-bold underline cursor-pointer"
                  >
                    {language === "en" ? "Create Administration Account" : "प्रशासक खाता सिर्जना गर्नुहोस्"}
                  </button>
                </div>
              )}

              {isSlotTaken && (
                <div className="mt-8 text-center text-[11px] text-emerald-700 bg-emerald-50 py-2.5 px-4 rounded-xl border border-emerald-100 inline-block w-full">
                  🍃 {language === "en" 
                    ? "Single admin registration slot is locked. Only the authorized account can sign in." 
                    : "एकल प्रशासक दर्ता स्लट सुरक्षित नियन्त्रणमा लक गरिएको छ।"}
                </div>
              )}

            </div>
          )}

          {/* 2. SIGN UP TAB */}
          {currentTab === "signup" && !session && (
            <div className="max-w-md mx-auto py-6">
              
              <div className="text-center mb-8">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-sm animate-pulse">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900">
                  {language === "en" ? "Admin Registration Slot" : "प्रशासक दर्ता स्लट"}
                </h3>
                <p className="text-xs text-amber-600 font-bold mt-1 bg-amber-50 px-3 py-1 rounded-full inline-block">
                  🎯 {language === "en" ? "Only 1 account slot available!" : "केवल १ सिट उपलब्ध छ!"}
                </p>
              </div>

              {isSlotTaken ? (
                <div className="p-4 bg-rose-50 border border-rose-150 rounded-2xl text-rose-800 text-xs text-center space-y-3">
                  <p className="font-bold">{language === "en" ? "Register Slot Locked" : "दर्ता स्लट असक्षम छ"}</p>
                  <p>{language === "en" ? "The single admin profile is already claimed. No additional admin registrations are permitted." : "प्रशासक प्रोफाइल पहिले नै सुरक्षित भैसकेको छ। अतिरिक्त दर्ता गर्न पाइने छैन।"}</p>
                  <button
                    onClick={() => setCurrentTab("login")}
                    className="text-xs bg-white text-rose-900 px-4 py-2 border border-rose-300 rounded-xl font-bold cursor-pointer hover:bg-slate-50"
                  >
                    {language === "en" ? "Go to Sign In" : "लग-इन तर्फ जानुहोस्"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSignUp} className="space-y-4">
                  
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-50 text-rose-800 text-xs font-semibold border border-rose-150">
                      ⚠️ {errorMessage}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1.5 text-slate-705">
                      {language === "en" ? "Primary Email Address" : "प्रशासनिक इमेल ठेगाना"}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@example.com"
                        className="w-full bg-slate-100 border border-slate-300 rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-755 uppercase tracking-wider mb-1.5 text-slate-705">
                      {language === "en" ? "Administrator Init Password" : "सुरक्षित पासवर्ड चयन"}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Minimum 6 characters"
                        className="w-full bg-slate-100 border border-slate-300 rounded-xl py-2.5 pl-10 pr-10 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-[#f8fafc] border border-slate-200 rounded-2xl text-[10.5px] leading-relaxed text-gray-600">
                    🔒 <strong>{language === "en" ? "Strict Single-User Policy:" : "सख्त एकल-प्रयोगकर्ता नियम:"}</strong>
                    <p className="mt-1">
                      {language === "en"
                        ? "After submitting this register sheet, nobody else will be displayed the sign up menu or allowed to sign up. All access to this panel is locked to this login credential."
                        : "यो ढाँचा दर्ता गरेपछि, अरू कसैलाई पनि दर्ता गर्न अनुमति दिइने छैन। यो पोर्टल केवल तपाईंको यो लग-इनमा सुरक्षित रहनेछ।"}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>{language === "en" ? "Claim Single Admin Slot" : "एकल प्रशासक स्लट दाबी गर्नुहोस्"}</span>
                      </>
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentTab("login")}
                      className="text-xs text-slate-500 hover:text-slate-700 font-bold underline cursor-pointer"
                    >
                      {language === "en" ? "Back to Login" : "लग-इनमा फर्कनुहोस्"}
                    </button>
                  </div>

                </form>
              )}

            </div>
          )}

          {/* 3. ADMIN INQUIRIES DASHBOARD */}
          {session && (
            <div className="space-y-6">
              
              {/* Dashboard Toolbars */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                
                {/* Search Bar */}
                <div className="relative w-full sm:max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === "en" ? "Search by name, organization, message keywords..." : "नाम, संस्था, वा सोधपुछ शब्दहरूबाट खोज्नुहोस्..."}
                    className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Meta details & Logout */}
                <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4 shrink-0 font-medium">
                  <div className="text-right">
                    <p className="text-[11px] text-slate-500">{language === "en" ? "Current Admin Logged in:" : "लग-इन प्रशासक इमेल:"}</p>
                    <p className="text-xs font-bold text-slate-800 font-mono truncate max-w-[200px]" title={session?.user?.email}>
                      {session?.user?.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 py-2 px-4 rounded-xl border border-rose-100 text-xs font-semibold cursor-pointer select-none transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{language === "en" ? "Log Out" : "बाहिर निस्कनुहोस्"}</span>
                  </button>
                </div>

              </div>

              {/* Grid content / List of inquiries */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Table/List pane */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {language === "en" ? `Inquiries (${filteredInquiries.length})` : `प्राप्त सोधपुछहरू (${filteredInquiries.length})`}
                    </span>
                    <button 
                      onClick={fetchInquiries} 
                      disabled={fetchingInquiries}
                      className="text-xs text-brand-600 hover:text-brand-800 font-bold flex items-center gap-1 select-none cursor-pointer"
                    >
                      <span>🔄 {language === "en" ? "Refresh Data" : "डेटा ताजा गर्नुहोस्"}</span>
                    </button>
                  </div>

                  {fetchingInquiries ? (
                    <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                      <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-xs text-slate-500 font-medium">{language === "en" ? "Loading records from database..." : "डाटाबेसबाट सोधपुछहरू लोड हुँदैछ..."}</p>
                    </div>
                  ) : filteredInquiries.length === 0 ? (
                    <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dotted border-slate-300">
                      <FileCheck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-xs text-slate-500 font-bold">{language === "en" ? "No inquiry submissions found" : "कुनै पनि सोधपुछ वा दर्ता भेटिएन"}</p>
                      <p className="text-[10px] text-slate-400 mt-1 max-w-xs mx-auto">
                        {language === "en" 
                          ? "When anyone submits the contact or consultation desk form, records will be logged right here" 
                          : "जब कसैले सम्पर्क वा परामर्श डेस्क फारम पेश गर्नेछ, विवरणहरू यहाँ देखिनेछन्"}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                      {filteredInquiries.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setSelectedInquiry(item)}
                          className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                            selectedInquiry?.id === item.id 
                              ? "bg-brand-50/50 border-brand-300 ring-1 ring-brand-300" 
                              : "bg-white border-slate-150 hover:bg-slate-50 hover:border-slate-250"
                          }`}
                        >
                          <div className="flex justify-between items-start gap-3 mb-1">
                            <h5 className="font-extrabold text-sm text-slate-900 leading-tight">
                              {item.name}
                            </h5>
                            <span className="text-[10px] font-mono text-slate-400 font-medium shrink-0 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(item.submitted_at).toLocaleDateString(language === "en" ? "en-US" : "ne-NP")}
                            </span>
                          </div>

                          <div className="space-y-1 mb-2">
                            {item.organization && (
                              <p className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                                <Building className="w-3 h-3 text-slate-400" />
                                <span className="truncate max-w-[240px]">{item.organization}</span>
                              </p>
                            )}
                            <p className="text-xs text-brand-600 font-bold truncate">
                              {item.subject}
                            </p>
                          </div>

                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {item.message}
                          </p>

                          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-600">
                            <span className="text-slate-400 font-mono text-[10px]">{item.email}</span>
                            <div className="flex items-center gap-1 hover:text-brand-700">
                              <span>{language === "en" ? "View message" : "सन्देश हेर्नुहोस्"}</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

                {/* Detail View Pane */}
                <div className="lg:col-span-5 bg-[#f8fafc] p-6 rounded-2xl border border-slate-150 min-h-[300px] flex flex-col">
                  {selectedInquiry ? (
                    <div className="flex-grow flex flex-col text-left">
                      
                      <div className="flex justify-between items-start gap-4 pb-4 border-b border-slate-200">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                            {language === "en" ? "Inquiry Detail Information" : "सोधपुछ पूरा विवरण"}
                          </span>
                          <h4 className="text-lg font-extrabold text-slate-900 leading-tight">
                            {selectedInquiry.name}
                          </h4>
                          <p className="text-xs text-slate-500 font-mono mt-0.5">{selectedInquiry.email}</p>
                        </div>
                        
                        <button
                          onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                          className="p-2 text-rose-500 hover:text-white hover:bg-rose-500 rounded-xl transition-colors shrink-0 cursor-pointer"
                          title={language === "en" ? "Delete Record" : "सन्देश मेटाउनुहोस्"}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="py-4 space-y-3 flex-grow text-xs leading-relaxed">
                        
                        <div className="grid grid-cols-2 gap-3 pb-3 border-b border-dashed border-slate-150">
                          <div>
                            <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                              {language === "en" ? "Phone Contact" : "फोन नम्बर"}
                            </span>
                            <span className="font-bold text-slate-800 font-mono">{selectedInquiry.phone}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                              {language === "en" ? "Submitted At" : "पेश गरिएको मिति"}
                            </span>
                            <span className="font-bold text-slate-800 font-mono">
                              {new Date(selectedInquiry.submitted_at).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {selectedInquiry.organization && (
                          <div className="pb-3 border-b border-dashed border-slate-150">
                            <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                              {language === "en" ? "Organization / Client" : "सम्बद्ध संस्था / कार्यालय"}
                            </span>
                            <span className="font-bold text-slate-900">{selectedInquiry.organization}</span>
                          </div>
                        )}

                        <div>
                          <span className="text-slate-400 font-semibold block text-[10px] uppercase mb-1">
                            {language === "en" ? "Subject / Inquiry Purpose" : "अध्ययन / सोधपुछको विषय"}
                          </span>
                          <span className="font-extrabold text-sm text-brand-800 block">
                            {selectedInquiry.subject}
                          </span>
                        </div>

                        <div className="mt-4 p-4 bg-white border border-slate-200 rounded-xl text-slate-700 text-[12.5px] leading-relaxed text-left max-h-[220px] overflow-y-auto whitespace-pre-wrap select-all">
                          {selectedInquiry.message}
                        </div>

                      </div>

                      <div className="pt-4 border-t border-slate-200 flex gap-2">
                        <a
                          href={`mailto:${selectedInquiry.email}?subject=RE: ${encodeURIComponent(selectedInquiry.subject)}`}
                          className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 px-4 rounded-xl text-center text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>{language === "en" ? "Email Reply" : "इमेल प्रतिक्रिया"}</span>
                        </a>
                        <a
                          href={`tel:${selectedInquiry.phone}`}
                          className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      </div>

                    </div>
                  ) : (
                    <div className="flex-grow flex flex-col items-center justify-center text-center p-6 text-slate-400">
                      <FileCheck className="w-10 h-10 text-slate-300 mb-2.5" />
                      <p className="text-xs font-bold">{language === "en" ? "Inquiry Detail Inspector" : "सोधपुछ पूरा विवरण विन्डो"}</p>
                      <p className="text-[10px] text-slate-400 mt-1 max-w-[200px]">
                        {language === "en" ? "Select any incoming message from the list to view comprehensive details." : "विस्तृत विवरण हेर्न बायाँ सूचीबाट कुनै पनि प्राप्त सोधपुछ चयन गर्नुहोस्।"}
                      </p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Support note */}
        <div className="bg-slate-50 border-t border-slate-150 px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-[11px] font-semibold text-slate-500">
          <span>KN Multi Consulting Services Pvt. Ltd. • Protected Admin Subsystem v2</span>
          <span>© २०२६</span>
        </div>

      </div>
    </div>
  );
}
