"use client";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative w-full min-h-screen bg-[#f2e9d9] overflow-hidden flex items-center justify-center">
      
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[-100px] left-[-50px] w-[400px] h-[400px] bg-[#51433a]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-120px] right-[-60px] w-[400px] h-[400px] bg-[#b45309]/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(81,67,58,0.04)_100%)]" />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full max-w-md">
        
        {/* Título */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-black mb-3 leading-tight tracking-tight"
        >
          <span className="text-[#51433a]">Conecta</span>{" "}
          <span className="text-[#b45309]">Centro</span>
        </motion.h1>

        {/* Subtexto ajustado para Café Torrado (#51433a) */}
        <p className="text-[#51433a] text-sm mb-6 font-medium opacity-80">
          Descubra lojas, produtos e lugares do centro em tempo real.
        </p>

        {/* Typewriter ajustado para Café Torrado (#51433a) */}
        <div className="h-10 text-base text-[#51433a] font-bold">
          <Typewriter
            words={[
              "Encontre lojas sem se perder.",
              "Veja produtos antes de sair.",
              "Troque pontos por descontos.",
              "Descubra o que tem perto de você.",
              "O centro de Aracaju na sua mão."
            ]}
            loop={0}
            cursor
            cursorColor="#b45309" // Cursor no tom laranja para um detalhe fino
            typeSpeed={50}
            deleteSpeed={30}
            delaySpeed={1800}
          />
        </div>

        {/* Botão */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1 }}
          className="w-full"
        >
          <Link href="/login">
            <button className="mt-8 w-full bg-[#b45309] hover:bg-[#a14a08] text-[#f2e9d9] py-4 rounded-2xl font-bold shadow-lg shadow-[#b45309]/20 active:scale-95 transition-all">
              Entrar no Mapa
            </button>
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1.5 }}
          className="mt-12 text-[10px] uppercase tracking-[0.2em] text-[#51433a]/40 font-bold"
        >
          Aracaju • Sergipe • Brasil
        </motion.p>

      </main>
    </div>
  );
}