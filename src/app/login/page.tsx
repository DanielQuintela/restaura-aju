"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Store } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const rows = Array.from({ length: 10 });
  const cols = Array.from({ length: 6 });

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#f2e9d9] p-6 font-sans overflow-hidden">

      {/* --- PADRONAGEM (FUNDO) --- */}
      <div className="absolute inset-0 z-0 flex flex-col justify-around opacity-15 pointer-events-none mix-blend-multiply py-6">
        {rows.map((_, rowIndex) => (
          <div key={rowIndex} className="flex justify-around w-full px-2">
            {cols.map((_, colIndex) => {
              const isCaju = (rowIndex + colIndex) % 2 === 0;
              return (
                <motion.div 
                  key={colIndex} 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (rowIndex + colIndex) * 0.03 }}
                  className="relative w-20 h-20 md:w-28 md:h-28"
                >
                  <Image
                    src={isCaju ? "/caju.png" : "/caranguejo.png"}
                    alt="ícone cultural"
                    fill
                    sizes="(max-width: 768px) 80px, 112px"
                    className="object-contain p-1"
                  />
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-sm bg-[#f2e9d9]/80 backdrop-blur-md p-8 rounded-[32px] shadow-xl border border-white/40"
      >
        <h2 className="text-3xl font-bold mb-2 text-[#51433a]">
          Fico feliz em vê-lo novamente!😊👋
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

          <div className="relative flex items-center my-2">
            <div className="flex-1 border-t border-[#51433a]/20" />
            <span className="px-3 text-[10px] font-black uppercase tracking-widest text-[#51433a]/90">
              É novo por aqui? 🧐 Cadastre-se agora! 😊
            </span>
            <div className="flex-1 border-t border-[#51433a]/15" />
          </div>

          <button 
          // TODO:DESATIVADO
            // onClick={() => router.push('/cadastro')}
            onClick={() => toast("🚧 Funcionalidade em desenvolvimento")}
            className="w-full bg-[#b45309] text-[#f2e9d9] py-4 rounded-2xl font-bold shadow-md hover:bg-[#92400e] active:scale-95 transition-all"
          >
            Cadastre-se!
          </button>

          <div className="relative flex items-center my-2">
            <div className="flex-1 border-t border-[#51433a]/15" />
            <span className="px-3 text-[10px] font-black uppercase tracking-widest text-[#51433a]/90">
              ou
            </span>
            <div className="flex-1 border-t border-[#51433a]/15" />
          </div>

          <button 
            onClick={() => router.push('/comerciante')}
            className="w-full bg-[#51433a] text-[#f2e9d9] py-4 rounded-2xl font-bold shadow-md hover:bg-[#3d322d] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Store size={18} />
            Entrar como Comerciante
          </button>
        </div>
      </motion.div>
    </div>
  );
}