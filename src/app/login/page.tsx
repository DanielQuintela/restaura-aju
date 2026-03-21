"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-white p-8 rounded-[32px] shadow-xl border border-gray-100"
      >
        <h2 className="text-3xl font-bold mb-2">E aí, pronto? 👋</h2>
        <p className="text-gray-500 mb-8 text-sm">Faça login para salvar seus lugares favoritos.</p>
        
        <div className="space-y-4">
          <input type="email" placeholder="Seu e-mail" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-indigo-500" />
          <input type="password" placeholder="Sua senha" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-indigo-500" />
          
          <button 
            onClick={() => router.push('/home')}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-md hover:bg-indigo-700 active:scale-95 transition-all"
          >
            Acessar Centro
          </button>
        </div>
      </motion.div>
    </div>
  );
}