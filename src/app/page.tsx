"use client";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="relative w-full min-h-screen bg-[#f5f1ea] overflow-hidden flex items-center justify-center">
      
      {/* Background decorativo */}
      <div className="absolute inset-0">
        <div className="absolute top-[-100px] left-[-50px] w-[300px] h-[300px] bg-amber-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-60px] w-[300px] h-[300px] bg-amber-300/30 rounded-full blur-3xl" />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full max-w-md">
        
        {/* Título */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-black mb-3 leading-tight"
        >
          <span className="text-zinc-800">Conecta</span>{" "}
          <span className="text-amber-700">Centro</span>
        </motion.h1>

        {/* Subtexto */}
        <p className="text-zinc-600 text-sm mb-6">
          Descubra lojas, produtos e lugares do centro em tempo real.
        </p>

        {/* Typewriter */}
        <div className="h-10 text-base text-zinc-700 font-medium">
          <Typewriter
            words={[
              "Encontre lojas sem se perder.",
              "Veja produtos antes de sair.",
              "Descubra o que tem perto de você.",
              "O centro na sua mão."
            ]}
            loop={0}
            cursor
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
            <button className="mt-8 w-full bg-amber-700 text-white py-4 rounded-2xl font-semibold shadow-md active:scale-95 transition-all">
              Entrar no Mapa
            </button>
          </Link>
        </motion.div>

        {/* Mockup (mobile-first, menor e elegante) */}
        {/* <motion.img
          src="/phone.png" // usa sua imagem
          alt="App preview"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 w-[220px] sm:w-[260px] drop-shadow-2xl"
        /> */}

      </main>
    </div>
  );
}