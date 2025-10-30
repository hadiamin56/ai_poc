// import { useNavigate } from "react-router-dom";
// import { useContext, useEffect } from "react";
// import { AuthContext } from "../context/Authcontext"; // adjust path if needed

// export default function LandingPage() {
//   const navigate = useNavigate();
//   const { user, loading } = useContext(AuthContext);

//   // if user already logged in → skip landing page
//   useEffect(() => {
//     if (!loading && user) {
//       navigate("/dashboard");
//     }
//   }, [user, loading, navigate]);

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
//       <h1 className="text-4xl font-bold mb-4 text-gray-800">
//         Welcome to Invoice Portal
//       </h1>
//       <p className="text-gray-600 mb-6">
//         Manage all your invoices efficiently and securely.
//       </p>
//       <button
//         onClick={() => navigate("/login")}
//         className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//       >
//         Get Started
//       </button>
//     </div>
//   );
// }















// import { useNavigate } from "react-router-dom";
// import { useContext, useEffect } from "react";
// import { AuthContext } from "../context/Authcontext";

// function IllustrationSVG({ className = "" }) {
//   return (
//     <svg
//       className={className}
//       viewBox="0 0 800 600"
//       xmlns="http://www.w3.org/2000/svg"
//       preserveAspectRatio="xMidYMid meet"
//     >
//       <defs>
//         <linearGradient id="g1" x1="0" x2="1">
//           <stop offset="0%" stopColor="#60a5fa" />
//           <stop offset="100%" stopColor="#7c3aed" />
//         </linearGradient>
//         <linearGradient id="g2" x1="0" x2="1">
//           <stop offset="0%" stopColor="#34d399" />
//           <stop offset="100%" stopColor="#06b6d4" />
//         </linearGradient>
//         <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
//           <feGaussianBlur stdDeviation="8" result="b" />
//           <feBlend in="SourceGraphic" in2="b" />
//         </filter>
//       </defs>

//       <g opacity="0.16" filter="url(#soft)">
//         <ellipse cx="140" cy="120" rx="120" ry="90" fill="url(#g1)" />
//         <ellipse cx="640" cy="460" rx="160" ry="110" fill="url(#g2)" />
//       </g>

//       <g transform="translate(110,90)">
//         <rect x="0" y="40" width="480" height="320" rx="18" fill="#fff" stroke="#e6edf5" strokeWidth="2" />
//         <rect x="24" y="58" width="432" height="8" rx="4" fill="#edf2f7" />

//         <g transform="translate(36,80)">
//           <rect x="0" y="0" width="160" height="76" rx="8" fill="#f8fafc" />
//           <rect x="0" y="96" width="160" height="76" rx="8" fill="#fbfbff" />
//           <rect x="0" y="192" width="160" height="76" rx="8" fill="#f8fafc" />
//         </g>

//         <g transform="translate(216,80)">
//           <rect x="0" y="0" width="200" height="188" rx="8" fill="url(#g1)" opacity="0.08" />
//           <g transform="translate(18,16)">
//             <rect x="0" y="120" width="22" height="48" rx="4" fill="#60a5fa" />
//             <rect x="38" y="80" width="22" height="88" rx="4" fill="#7c3aed" />
//             <rect x="76" y="40" width="22" height="128" rx="4" fill="#34d399" />
//             <rect x="114" y="60" width="22" height="108" rx="4" fill="#06b6d4" />
//             <rect x="152" y="20" width="22" height="148" rx="4" fill="#f59e0b" />
//           </g>
//         </g>

//         <g transform="translate(470,-8)">
//           <circle cx="0" cy="0" r="28" fill="url(#g2)" stroke="#fff" strokeWidth="4" />
//           <text x="-6" y="6" fontSize="18" fontWeight="700" fill="#fff">AI</text>
//         </g>
//       </g>
//     </svg>
//   );
// }

// export default function LandingPage() {
//   const navigate = useNavigate();
//   const { user, loading } = useContext(AuthContext);

//   useEffect(() => {
//     if (!loading && user) {
//       navigate("/dashboard");
//     }
//   }, [user, loading, navigate]);

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <p className="text-lg text-gray-600">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <style>{`
//         @keyframes floatSlow {
//           0% { transform: translateY(0px); opacity: 0.95; }
//           50% { transform: translateY(-18px); opacity: 1; }
//           100% { transform: translateY(0px); opacity: 0.95; }
//         }
//         @keyframes floatSlow2 {
//           0% { transform: translateY(0px) translateX(0px); }
//           50% { transform: translateY(-12px) translateX(6px); }
//           100% { transform: translateY(0px) translateX(0px); }
//         }
//       `}</style>

//       <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900">
//         {/* Background Blobs */}
//         <div
//           style={{ animation: "floatSlow 8s ease-in-out infinite" }}
//           className="absolute -left-16 -top-16 w-80 h-80 rounded-full bg-gradient-to-tr from-blue-200 to-indigo-300 opacity-25 blur-3xl transform-gpu"
//         />
//         <div
//           style={{ animation: "floatSlow2 10s ease-in-out infinite" }}
//           className="absolute -right-28 bottom-10 w-96 h-96 rounded-full bg-gradient-to-tr from-green-200 to-cyan-300 opacity-22 blur-3xl transform-gpu"
//         />

//         {/* Header */}
//         <header className="relative z-20 w-full py-6">
//           <div className="max-w-[1600px] mx-auto px-20 flex items-center justify-between">
//             {/* Logo */}
//             <div className="flex items-center gap-3">
//               <div className="flex items-center justify-center rounded-md bg-gradient-to-tr from-blue-600 to-indigo-600 text-white w-9 h-9 font-extrabold">
//                 I
//               </div>
//               <div className="text-lg font-semibold">R</div>
//               <div className="text-sm font-semibold text-gray-700 ml-1">InvoiceRealm</div>
//             </div>

//             <button
//               onClick={() => navigate("/login")}
//               className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
//             >
//               Login
//             </button>
//           </div>
//         </header>

//         {/* Hero */}
//         <main className="relative z-20 w-full py-24">
//           <div className="max-w-[1600px] mx-auto px-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
//             {/* Text */}
//             <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
//               <h1 className="text-5xl font-extrabold leading-tight text-gray-900 max-w-2xl">
//                 Simplify Your <span className="text-blue-600">Invoice Management</span> with AI
//               </h1>
//               <p className="mt-6 text-lg text-gray-600 max-w-lg">
//                 Automate invoice uploads, verification, and tracking seamlessly — your intelligent business assistant.
//               </p>
//               <div className="mt-8">
//                 <button
//                   onClick={() => navigate("/login")}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transform transition hover:scale-105"
//                 >
//                   Get Started →
//                 </button>
//               </div>
//             </div>

//             {/* Illustration */}
//             <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
//               <div className="w-[440px] md:w-[540px] lg:w-[580px] drop-shadow-2xl">
//                 <IllustrationSVG />
//               </div>
//             </div>
//           </div>
//         </main>

//         {/* Features */}
//         <section className="relative z-20 bg-white/60 backdrop-blur-sm py-20">
//           <div className="max-w-[1500px] mx-auto px-20">
//             <h3 className="text-3xl font-bold text-center mb-10">Why InvoiceRealm?</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//               {[
//                 { title: "AI Extraction", desc: "Auto-read invoice fields & reduce manual work." },
//                 { title: "Secure Storage", desc: "Encrypted files and access control." },
//                 { title: "Real-time Insights", desc: "Track payments and trends at a glance." },
//               ].map((f, i) => (
//                 <div key={i} className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition">
//                   <div className="text-4xl mb-4">⚡</div>
//                   <h4 className="font-semibold mb-2 text-lg">{f.title}</h4>
//                   <p className="text-gray-600">{f.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Agency */}
//         <section className="relative z-20 py-24 bg-gradient-to-br from-white via-indigo-50 to-blue-50">
//           <div className="max-w-[1500px] mx-auto px-20 text-left">
//             <h2 className="text-3xl font-bold mb-4 text-gray-800">
//               We are an Agency that believes in Automation
//             </h2>
//             <p className="text-gray-600 max-w-3xl mb-6">
//               At InvoiceRealm, we combine artificial intelligence and business automation to help companies process
//               thousands of invoices with zero manual effort. Our mission is to make financial operations efficient,
//               scalable, and effortless.
//             </p>
//             <p className="text-gray-700 font-medium max-w-2xl">
//               Whether you're a startup or an enterprise, our AI-powered platform adapts to your needs and accelerates
//               your growth journey with speed and precision.
//             </p>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="relative z-20 border-t bg-white/50">
//           <div className="max-w-[1600px] mx-auto px-20 py-6 text-sm text-gray-600 text-center">
//             © {new Date().getFullYear()} InvoiceRealm — Built with React & Tailwind
//           </div>
//         </footer>
//       </div>
//     </>
//   );
// }









import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

function IllustrationSVG({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="g2" x1="0" x2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="b" />
          <feBlend in="SourceGraphic" in2="b" />
        </filter>
      </defs>

      <g opacity="0.16" filter="url(#soft)">
        <ellipse cx="140" cy="120" rx="120" ry="90" fill="url(#g1)" />
        <ellipse cx="640" cy="460" rx="160" ry="110" fill="url(#g2)" />
      </g>

      <g transform="translate(110,90)">
        <rect x="0" y="40" width="480" height="320" rx="18" fill="#fff" stroke="#e6edf5" strokeWidth="2" />
        <rect x="24" y="58" width="432" height="8" rx="4" fill="#edf2f7" />

        <g transform="translate(36,80)">
          <rect x="0" y="0" width="160" height="76" rx="8" fill="#f8fafc" />
          <rect x="0" y="96" width="160" height="76" rx="8" fill="#fbfbff" />
          <rect x="0" y="192" width="160" height="76" rx="8" fill="#f8fafc" />
        </g>

        <g transform="translate(216,80)">
          <rect x="0" y="0" width="200" height="188" rx="8" fill="url(#g1)" opacity="0.08" />
          <g transform="translate(18,16)">
            <rect x="0" y="120" width="22" height="48" rx="4" fill="#60a5fa" />
            <rect x="38" y="80" width="22" height="88" rx="4" fill="#7c3aed" />
            <rect x="76" y="40" width="22" height="128" rx="4" fill="#34d399" />
            <rect x="114" y="60" width="22" height="108" rx="4" fill="#06b6d4" />
            <rect x="152" y="20" width="22" height="148" rx="4" fill="#f59e0b" />
          </g>
        </g>

        <g transform="translate(470,-8)">
          <circle cx="0" cy="0" r="28" fill="url(#g2)" stroke="#fff" strokeWidth="4" />
          <text x="-6" y="6" fontSize="18" fontWeight="700" fill="#fff">AI</text>
        </g>
      </g>
    </svg>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && user) navigate("/dashboard");
  }, [user, loading, navigate]);

  if (loading) return <div className="h-screen flex items-center justify-center text-gray-500 text-lg">Loading...</div>;

  const featureList = [
    { title: "AI Extraction", desc: "Auto-read invoice fields & reduce manual work." },
    { title: "Secure Storage", desc: "Encrypted files and access control." },
    { title: "Real-time Insights", desc: "Track payments and trends at a glance." },
  ];

  return (
    <>
      <style>{`
        @keyframes floatUpDown {
          0% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0); }
        }
        @keyframes letterSpread {
          0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(-6px) scale(1.05); opacity: 0.9; }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        {/* floating background */}
        <div className="absolute -left-40 top-0 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-200 to-blue-200 rounded-full blur-3xl opacity-25 animate-[floatUpDown_14s_ease-in-out_infinite]" />
        <div className="absolute -right-32 bottom-0 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-200 to-green-200 rounded-full blur-3xl opacity-25 animate-[floatUpDown_18s_ease-in-out_infinite]" />

        {/* Header */}
        <header className="max-w-[1600px] mx-auto px-20 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <span className="text-blue-600">I</span>nvoice<span className="text-indigo-600">Realm</span>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
          >
            Login
          </button>
        </header>

        {/* Hero Section */}
        <main className="max-w-[1600px] mx-auto px-20 py-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-14">
          <div className="lg:w-1/2 w-full flex flex-col items-center lg:items-start animate-[floatUpDown_10s_ease-in-out_infinite]">
           
          <h1
  className="text-5xl font-extrabold text-gray-900 leading-tight mb-6 select-none 
  hover:[&_span]:animate-[letterSpread_0.6s_ease-in-out]"
>
  {[
    "Simplify Your Invoice",
    "Management with AI",
  ].map((line, lineIndex) => (
    <div key={lineIndex}>
      {Array.from(line).map((ch, i) => (
        <span
          key={i}
          className={`inline-block transition-transform ${
            ch === " " ? "w-2" : ""
          }`}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </div>
  ))}
</h1>



            <p className="text-lg text-gray-600 max-w-md mb-8">
              Automate invoice uploads, verification, and tracking seamlessly — your intelligent business assistant.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transform transition hover:scale-105"
            >
              Get Started →
            </button>
          </div>

          <div className="lg:w-1/2 w-full flex justify-center animate-[floatUpDown_12s_ease-in-out_infinite]">
            <div className="w-[480px] md:w-[580px] drop-shadow-2xl">
              <IllustrationSVG />
            </div>
          </div>
        </main>

        {/* Feature Cards with animation */}
        <section className="bg-white/70 backdrop-blur-sm py-20">
          <div className="max-w-[1500px] mx-auto px-20">
            <h3 className="text-3xl font-bold text-center mb-12">Why InvoiceRealm?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {featureList.map((f, i) => (
                <div
                  key={i}
                  className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-indigo-100/30 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  <div className="text-4xl mb-4 group-hover:rotate-6 transition-transform duration-500">⚡</div>
                  <h4 className="font-semibold mb-2 text-lg text-gray-800 group-hover:text-indigo-700 transition-colors">
                    {f.title}
                  </h4>
                  <p className="text-gray-600 group-hover:text-gray-800 transition-colors">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>







<section className="relative bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-24 overflow-hidden">
  {/* floating blurred gradient shapes */}
  <div className="absolute -left-40 top-20 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-300 to-blue-300 rounded-full blur-3xl opacity-20 animate-[floatUpDown_14s_ease-in-out_infinite]" />
  <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-200 to-green-200 rounded-full blur-3xl opacity-25 animate-[floatUpDown_18s_ease-in-out_infinite]" />

  <div className="relative max-w-[1500px] mx-auto px-8 md:px-20 flex flex-col-reverse md:flex-row items-center justify-between gap-16">
    {/* Left Side - Illustration */}
    <div className="w-full md:w-1/2 flex justify-center animate-[floatUpDown_12s_ease-in-out_infinite]">
      <svg
        viewBox="0 0 400 300"
        className="w-[380px] md:w-[460px] drop-shadow-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="30" y="50" width="340" height="200" rx="16" fill="white" stroke="#e5e7eb" strokeWidth="3" />
        <rect x="50" y="70" width="300" height="40" rx="6" fill="#e0f2fe" />
        <circle cx="70" cy="180" r="40" fill="#bfdbfe" />
        <path
          d="M50 180 C80 160, 120 200, 150 180"
          stroke="#2563eb"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <rect x="200" y="140" width="130" height="80" rx="10" fill="#e0e7ff" />
        <text x="218" y="185" fill="#3730a3" fontWeight="600" fontSize="16">
          🔒 Secure
        </text>
      </svg>
    </div>

    {/* Right Side - Text */}
    <div className="w-full md:w-1/2 space-y-6">
      <h2 className="text-4xl font-bold text-gray-900">
        We Secure Your <span className="text-blue-600">Invoice Data</span>
      </h2>
      <p className="text-lg text-gray-600 max-w-lg">
        Every document you upload is protected with enterprise-grade encryption and stored safely in
        our servers. Your data privacy is our top priority — so you can focus on business, not
        breaches.
      </p>

      <ul className="space-y-4 text-gray-700">
        <li className="flex items-center gap-2">
          <span className="text-blue-600 text-xl">✅</span>
          End-to-end encryption
        </li>
        <li className="flex items-center gap-2">
          <span className="text-blue-600 text-xl">✅</span>
          Role-based access control
        </li>
        <li className="flex items-center gap-2">
          <span className="text-blue-600 text-xl">✅</span>
          Regular security audits
        </li>
      </ul>

      <button
        onClick={() => navigate("/login")}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:shadow-lg hover:bg-blue-700 transform hover:scale-105 transition"
      >
        Learn More →
      </button>
    </div>
  </div>
</section>









{/* 
{/* How It Works Section *
<section className="relative z-20 py-28 bg-gradient-to-br from-white via-blue-50 to-indigo-100 overflow-hidden">
  {/* Floating blobs for subtle motion *
  <div className="absolute top-0 left-[-100px] w-[400px] h-[400px] bg-indigo-300 opacity-20 blur-3xl rounded-full animate-[float_12s_ease-in-out_infinite]" />
  <div className="absolute bottom-0 right-[-150px] w-[450px] h-[450px] bg-blue-200 opacity-25 blur-3xl rounded-full animate-[float_14s_ease-in-out_infinite]" />

  <div className="relative max-w-[1300px] mx-auto px-6 md:px-20 text-center">
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-500 bg-clip-text text-transparent animate-[fadeInUp_0.8s_ease-out_forwards]">
      How It Works
    </h2>
    <p className="text-gray-600 text-lg mb-16 max-w-2xl mx-auto animate-[fadeInUp_1s_ease-out_forwards]">
      Drive end-to-end process automation with AI-powered data extraction, validation, and seamless integration.
    </p>

    {/* Steps Grid *
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      {/* Step 1 *
      <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden border border-gray-100 
        hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.1s_ease-out_forwards]">
        <div className="text-5xl font-bold text-blue-600 opacity-20 absolute top-4 right-6 select-none">1</div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Ingest</h3>
        <p className="text-gray-600 text-base">
          Upload files or data from emails, cloud storage, support tickets, or any source effortlessly.
        </p>
      </div>

      {/* Step 2 *
      <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden border border-gray-100 
        hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.2s_ease-out_forwards]">
        <div className="text-5xl font-bold text-blue-600 opacity-20 absolute top-4 right-6 select-none">2</div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Understand</h3>
        <p className="text-gray-600 text-base">
          Extract data accurately using advanced AI models that adapt to structure — no templates needed.
        </p>
      </div>

      {/* Step 3 *
      <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden border border-gray-100 
        hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.3s_ease-out_forwards]">
        <div className="text-5xl font-bold text-blue-600 opacity-20 absolute top-4 right-6 select-none">3</div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Take Action</h3>
        <p className="text-gray-600 text-base">
          Automate decision-making, validation, and enrichment — all powered by intelligent logic engines.
        </p>
      </div>

      {/* Step 4 *
      <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden border border-gray-100 
        hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.4s_ease-out_forwards]">
        <div className="text-5xl font-bold text-blue-600 opacity-20 absolute top-4 right-6 select-none">4</div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Export</h3>
        <p className="text-gray-600 text-base">
          Send structured data directly into CRMs, databases, or export as XLS, CSV, or XML with ease.
        </p>
      </div>
    </div>
  </div>

  {/* Animations 
  <style>{`
    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(40px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-25px); }
    }
  `}</style>
</section> */}



{/* How It Works Section (with inline SVG icons) */}
<section className="relative z-20 py-28 bg-gradient-to-br from-white via-blue-50 to-indigo-100 overflow-hidden">
  {/* Floating blobs for subtle motion */}
  <div className="absolute top-0 left-[-100px] w-[400px] h-[400px] bg-indigo-300 opacity-20 blur-3xl rounded-full animate-[float_12s_ease-in-out_infinite]" />
  <div className="absolute bottom-0 right-[-150px] w-[450px] h-[450px] bg-blue-200 opacity-25 blur-3xl rounded-full animate-[float_14s_ease-in-out_infinite]" />

  <div className="relative max-w-[1300px] mx-auto px-6 md:px-20 text-center">
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-500 bg-clip-text text-transparent animate-[fadeInUp_0.8s_ease-out_forwards]">
      How It Works
    </h2>
    <p className="text-gray-600 text-lg mb-16 max-w-2xl mx-auto animate-[fadeInUp_1s_ease-out_forwards]">
      Drive end-to-end process automation with AI-powered data extraction, validation, and seamless integration.
    </p>

    {/* Steps Grid */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      {/* Step 1 - Ingest */}
      <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden border border-gray-100 
        hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.1s_ease-out_forwards]">
        {/* SVG Icon */}
        <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-lg bg-gradient-to-tr from-blue-50 to-indigo-50">
          <svg viewBox="0 0 64 64" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <rect x="8" y="12" width="48" height="34" rx="4" fill="#eef2ff" />
            <path d="M16 22h32M16 30h20" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M32 48v6" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="32" cy="52" r="2" fill="#60a5fa" />
          </svg>
        </div>

        <div className="text-5xl font-bold text-blue-600 opacity-20 absolute top-4 right-6 select-none">1</div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Ingest</h3>
        <p className="text-gray-600 text-base">
          Upload files or data from emails, cloud storage, support tickets, or any source effortlessly.
        </p>
      </div>

      {/* Step 2 - Understand */}
      <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden border border-gray-100 
        hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.2s_ease-out_forwards]">
        {/* SVG Icon */}
        <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-lg bg-gradient-to-tr from-blue-50 to-indigo-50">
          <svg viewBox="0 0 64 64" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <circle cx="32" cy="24" r="8" fill="#eef2ff"/>
            <path d="M10 48c8-8 18-8 22-8s14 0 22 8" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <path d="M26 36l4 6 8-10" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>

        <div className="text-5xl font-bold text-blue-600 opacity-20 absolute top-4 right-6 select-none">2</div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Understand</h3>
        <p className="text-gray-600 text-base">
          Extract data accurately using advanced AI models that adapt to structure — no templates needed.
        </p>
      </div>

      {/* Step 3 - Take Action */}
      <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden border border-gray-100 
        hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.3s_ease-out_forwards]">
        {/* SVG Icon */}
        <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-lg bg-gradient-to-tr from-blue-50 to-indigo-50">
          <svg viewBox="0 0 64 64" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <rect x="10" y="14" width="44" height="36" rx="6" fill="#fff7ed" stroke="#f59e0b" strokeWidth="2"/>
            <path d="M20 34h24M20 26h14" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M44 18l6-6" stroke="#fb923c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="text-5xl font-bold text-blue-600 opacity-20 absolute top-4 right-6 select-none">3</div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Take Action</h3>
        <p className="text-gray-600 text-base">
          Automate decision-making, validation, and enrichment — all powered by intelligent logic engines.
        </p>
      </div>

      {/* Step 4 - Export */}
      <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden border border-gray-100 
        hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.4s_ease-out_forwards]">
        {/* SVG Icon */}
        <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-lg bg-gradient-to-tr from-blue-50 to-indigo-50">
          <svg viewBox="0 0 64 64" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <rect x="12" y="14" width="40" height="28" rx="4" fill="#ecfeff" stroke="#06b6d4" strokeWidth="2"/>
            <path d="M20 38v6h24v-6" stroke="#0891b2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M32 18v14" stroke="#0891b2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M26 12h12" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="text-5xl font-bold text-blue-600 opacity-20 absolute top-4 right-6 select-none">4</div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Export</h3>
        <p className="text-gray-600 text-base">
          Send structured data directly into CRMs, databases, or export as XLS, CSV, or XML with ease.
        </p>
      </div>
    </div>
  </div>

  {/* Animations */}
  <style>{`
    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(40px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-25px); }
    }
  `}</style>
</section>







{/* Agency Section */}
<section className="relative z-20 py-24 overflow-hidden bg-gradient-to-br from-white via-indigo-50 to-blue-50">
  {/* Animated background orbs */}
  <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-indigo-200 rounded-full blur-3xl opacity-25 animate-[float_12s_ease-in-out_infinite]" />
  <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-200 rounded-full blur-3xl opacity-20 animate-[float_16s_ease-in-out_infinite]" />

  <div
    className="max-w-[1500px] mx-auto px-8 md:px-20 text-left relative 
    opacity-0 translate-y-10 animate-[fadeInUp_1s_ease-out_forwards]"
  >
    <h2
      className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-500 
      bg-clip-text text-transparent hover:scale-[1.03] transition-transform duration-300"
    >
      We are an Agency that believes in Automation
    </h2>

    <p
      className="text-gray-700 max-w-3xl mb-6 leading-relaxed text-lg hover:text-gray-800 
      transition-colors duration-300"
    >
      At <span className="font-semibold text-blue-700">InvoiceRealm</span>, we combine artificial intelligence and
      business automation to help companies process thousands of invoices with zero manual effort. Our mission is to
      make financial operations efficient, scalable, and effortless.
    </p>

    <p
      className="text-gray-800 font-medium max-w-2xl text-lg leading-relaxed hover:translate-x-2 
      transition-transform duration-500"
    >
      Whether you're a startup or an enterprise, our AI-powered platform adapts to your needs and accelerates your
      growth journey with speed and precision.
    </p>

    <div className="mt-10">
      <button
        onClick={() => navigate("/about")}
        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg 
        hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
      >
        Learn More →
      </button>
    </div>
  </div>

  {/* Keyframe animations */}
  <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(40px); }
      100% { opacity: 1; transform: translateY(0px); }
    }
  `}</style>
</section>








{/* Contact Section */}
<section className="relative z-20 py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-white overflow-hidden">
  {/* Floating gradient blobs for animation */}
  <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-300 rounded-full blur-3xl opacity-20 animate-[float_14s_ease-in-out_infinite]" />
  <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-blue-200 rounded-full blur-3xl opacity-25 animate-[float_16s_ease-in-out_infinite]" />

  <div className="max-w-[1200px] mx-auto px-8 md:px-20 relative text-center">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-500 bg-clip-text text-transparent animate-[fadeInUp_1s_ease-out_forwards]">
      Have more questions?
    </h2>
    <p className="text-gray-700 mb-12 text-lg animate-[fadeInUp_1.2s_ease-out_forwards]">
      Send us a message and our AI experts will reach out to you shortly.
    </p>

    {/* Contact Form */}
    <form
      className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl max-w-2xl mx-auto p-8 space-y-6 border border-gray-200 
      animate-[fadeInUp_1.4s_ease-out_forwards]"
    >
      <div className="flex flex-col text-left">
        <label className="text-gray-800 font-medium mb-2">Your work email*</label>
        <input
          type="email"
          placeholder="you@company.com"
          className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 text-left">
        <div className="flex-1">
          <label className="text-gray-800 font-medium mb-2 block">Country Code</label>
          <input
            type="text"
            placeholder="+1"
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <div className="flex-1">
          <label className="text-gray-800 font-medium mb-2 block">Contact Number</label>
          <input
            type="text"
            placeholder="1234567890"
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col text-left">
        <label className="text-gray-800 font-medium mb-2">How can we help you?*</label>
        <textarea
          rows="4"
          placeholder="Tell us a bit about your query..."
          className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all hover:scale-[1.02]"
      >
        Talk to an AI Expert →
      </button>
    </form>
  </div>

  {/* Animations */}
  <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(40px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `}</style>
</section>




        {/* Footer */}
        <footer className="border-t bg-white/50 text-center py-6 text-sm text-gray-600">
          © {new Date().getFullYear()} InvoiceRealm — Built with React & Tailwind
        </footer>
      </div>
    </>
  );
}
