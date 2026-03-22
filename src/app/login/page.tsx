"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f2e9d9] p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-[#f2e9d9]/80 backdrop-blur-md p-8 rounded-[32px] shadow-xl border border-white/40"
      >
        <h2 className="text-3xl font-bold mb-2 text-[#51433a]">
          E aí, pronto? 👋
        </h2>

        <p className="text-[#51433a]/70 mb-8 text-sm">
          Faça login para salvar seus lugares favoritos.
        </p>
        
        <div className="space-y-4">
          
          <input 
            type="email" 
            placeholder="Seu e-mail" 
            className="w-full p-4 bg-white/70 text-[#51433a] rounded-2xl outline-none focus:ring-2 focus:ring-[#b45309] placeholder:text-[#51433a]/50"
          />

          <input 
            type="password" 
            placeholder="Sua senha" 
            className="w-full p-4 bg-white/70 text-[#51433a] rounded-2xl outline-none focus:ring-2 focus:ring-[#b45309] placeholder:text-[#51433a]/50"
          />
          
          <button 
            onClick={() => router.push('/home')}
            className="w-full bg-[#b45309] text-[#f2e9d9] py-4 rounded-2xl font-bold shadow-md hover:bg-[#92400e] active:scale-95 transition-all"
          >
            Acessar Centro
          </button>
        </div>
      </motion.div>
    </div>
  );
}