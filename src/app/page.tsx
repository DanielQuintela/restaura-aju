"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ChevronRight, MapPin } from "lucide-react";

// Componente de Ícone de Peão Estilizado (SVG para garantir qualidade e controle)
const ChessPawn = ({ progress }: { progress: any }) => {
  return (
    <motion.div
      style={{ x: progress }}
      className="relative z-50 flex items-center justify-center w-12 h-12 md:w-16 md:h-16"
    >
      {/* Efeito de Rastro (Glow) */}
      <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full scale-150" />
      
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-full h-full drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C10.3431 2 9 3.34315 9 5C9 6.38116 9.93245 7.54415 11.1962 7.89201C9.27419 8.44105 8 10.1812 8 12.2361V15H16V12.2361C16 10.1812 14.7258 8.44105 12.8038 7.89201C14.0675 7.54415 15 6.38116 15 5C15 3.34315 13.6569 2 12 2Z"
          fill="white"
        />
        <path
          d="M7 17V19C7 20.1046 7.89543 21 9 21H15C16.1046 21 17 20.1046 17 19V17H7Z"
          fill="white"
        />
      </svg>
    </motion.div>
  );
};

export default function LandingPageEnPassant() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Controle de animação: de -50% (fora à esquerda) até 100% (fim do texto)
  const xTranslation = useSpring(0, { stiffness: 40, damping: 20 });
  
  // Sincronização do texto (Clip Path) baseado no movimento da peça
  // O texto será revelado conforme o 'inset' do clip-path diminui da direita para a esquerda
  const revealProgress = useTransform(xTranslation, [-200, 400], [100, 0]);

  // Animação inicial ao carregar
  React.useEffect(() => {
    // Simula o movimento de "passagem"
    setTimeout(() => {
        xTranslation.set(450); // Valor final para cobrir o texto
    }, 800);
  }, [xTranslation]);

  return (
    <main className="relative min-h-screen w-full bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center font-sans">
      
      {/* BACKGROUND COM OVERLAY */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] hover:scale-110"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1596431718042-45e076628994?q=80&w=2070&auto=format&fit=crop')`, // Imagem urbana/Aracaju estilizada
        }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

      {/* HEADER / LOGO */}
      <nav className="absolute top-0 w-full p-8 z-50 flex justify-between items-center max-w-7xl">
        <div className="text-white font-bold tracking-tighter text-xl border-l-4 border-emerald-500 pl-3">
          EN PASSANT <span className="text-emerald-500 text-xs block font-light tracking-widest uppercase">Aracaju</span>
        </div>
        <div className="hidden md:flex gap-8 text-gray-400 text-sm tracking-widest uppercase">
          <a href="#" className="hover:text-white transition-colors">O Projeto</a>
          <a href="#" className="hover:text-white transition-colors">O Centro</a>
        </div>
      </nav>

      {/* HERO SECTION - ÁREA DA ANIMAÇÃO */}
      <section className="relative z-20 w-full max-w-5xl px-6 flex flex-col items-center text-center">
        
        <p className="text-emerald-500 font-medium tracking-[0.3em] uppercase mb-6 text-sm md:text-base opacity-80">
          O Tabuleiro Urbano de Sergipe
        </p>

        {/* CONTAINER DA ANIMAÇÃO SINCRONIZADA */}
        <div className="relative flex items-center justify-start w-full h-32 md:h-48 overflow-visible">
          
          {/* A PEÇA (PEÃO) */}
          <div className="absolute left-0 z-30 pointer-events-none transform -translate-x-full">
            <ChessPawn progress={xTranslation} />
          </div>

          {/* O TEXTO REVELADO */}
          <div className="relative w-full overflow-visible">
            {/* Texto de Fundo (Ghost/Sombra) */}
            <h1 className="text-6xl md:text-9xl font-black text-white/5 select-none tracking-tighter uppercase leading-none">
              En Passant
            </h1>
            
            {/* Texto Revelado (Frente) */}
            <motion.h1 
              style={{ 
                clipPath: useTransform(revealProgress, (v) => `inset(0 ${v}% 0 0)`) 
              }}
              className="absolute top-0 left-0 text-6xl md:text-9xl font-black text-white select-none tracking-tighter uppercase leading-none drop-shadow-2xl"
            >
              En Passant
            </motion.h1>
          </div>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-8 text-gray-400 max-w-lg text-lg leading-relaxed font-light"
        >
          Explore o comércio no quadrilátero histórico de Pirro. <br className="hidden md:block"/> 
          Toda a cidade em um movimento estratégico.
        </motion.p>

        {/* CTA BOTÃO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, type: "spring" }}
          className="mt-12"
        >
          <button className="group relative bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-full font-bold transition-all duration-300 flex items-center gap-3 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)]">
            <MapPin size={20} className="group-hover:animate-bounce" />
            ENTRAR NO MAPA
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* FOOTER / ELEMENTOS DECORATIVOS */}
      <div className="absolute bottom-10 z-20 flex gap-4 opacity-20 hover:opacity-100 transition-opacity">
        <div className="w-12 h-1 bg-white" />
        <div className="w-12 h-1 bg-white/20" />
        <div className="w-12 h-1 bg-white/20" />
      </div>
    </main>
  );
}