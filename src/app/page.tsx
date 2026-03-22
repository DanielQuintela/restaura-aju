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
        <h2 className="text-4xl font-bold mb-2 text-[#51433a]">
          Entrar! 👋
        </h2>

        <p className="text-[#51433a]/70 mb-8 text-sm">
          Faça login para salvar seus lugares favoritos. Caso seja novo por aqui, cadastre-se.
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
          className="w-full py-3 rounded-2xl font-bold transition-all bg-transparent border-2 border-[#b45309] text-[#b45309] hover:bg-[#b45309] hover:text-[#f2e9d9]">
            Fazer login
            </button>

  {/* BOTÃO CADASTRO */}
        <button 
          onClick={() => router.push('/cadastro')}
          className="w-full py-3 rounded-2xl font-bold transition-all bg-transparent border-2 border-[#b45309] text-[#b45309] hover:bg-[#b45309] hover:text-[#f2e9d9]">
          Cadastre-se!
          </button>
        </div>
      </motion.div>
    </div>
  );
}