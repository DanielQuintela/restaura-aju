"use client";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  const rows = Array.from({ length: 10 });
  const cols = Array.from({ length: 6 });

  return (
    <div className="relative w-full min-h-screen bg-[#f2e9d9] overflow-hidden flex items-center justify-center">
      
      {/* --- CAMADA DE PADRONAGEM (Z-INDEX 0) --- */}
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
                  className="relative w-24 h-24 md:w-32 md:h-32"
                >
                  <Image
                    src={isCaju ? "/caju.png" : "/caranguejo.png"}
                    alt="ícone cultural"
                    fill
                    className="object-contain p-1"
                  />
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      {/* --- CONTEÚDO PRINCIPAL (Z-INDEX 10) --- */}
      {/* ALTERAÇÃO AQUI: Baixei para /30 para ficar BEM transparente e aumentei o Blur */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-[92%] max-w-lg bg-[#f2e9d9]/30 backdrop-blur-xl p-10 rounded-[50px] shadow-2xl shadow-[#51433a]/10 border border-white/40">
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-black mb-4 leading-tight tracking-tight text-[#51433a] drop-shadow-sm"
        >
          Conecta <span className="text-[#b45309]">Centro</span>
        </motion.h1>

        <p className="text-[#51433a] text-lg mb-6 font-bold opacity-90">
          O centro de Aracaju na sua mão.
        </p>

        <div className="h-12 text-lg text-[#51433a] font-extrabold">
          <Typewriter
            words={[
              "Encontre lojas agora.",
              "Ganhe pontos e descontos.",
              "Valorize o comércio local.",
              "Descubra Aracaju."
            ]}
            loop={0}
            cursor
            cursorColor="#b45309"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </div>

        {/* BOTÃO TREMENDO E BRILHANDO */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.8 }}
          className="w-full mt-10"
        >
          <Link href="/login">
            <motion.button 
              animate={{ 
                x: [0, -10, 10, -10, 10, 0],
                rotate: [0, -1, 1, -1, 1, 0]
              }}
              transition={{ 
                duration: 0.5, 
                repeat: Infinity, 
                repeatDelay: 4,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden w-full bg-[#b45309] text-[#f2e9d9] py-6 rounded-[30px] font-black text-2xl shadow-2xl shadow-[#b45309]/50"
            >
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-30deg]" 
              />
              <span className="relative z-10 uppercase tracking-wider">Entrar no Mapa</span>
            </motion.button>
          </Link>
        </motion.div>

        <footer className="mt-12 text-[12px] uppercase tracking-[0.4em] text-[#51433a]/60 font-black">
          Aracaju • SE
        </footer>
      </main>
    </div>
  );
}