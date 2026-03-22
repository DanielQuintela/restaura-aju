"use client";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  // Ajuste da densidade da grade (Linhas e Colunas)
  const rows = Array.from({ length: 10 });
  const cols = Array.from({ length: 8 });

  return (
    <div className="relative w-full min-h-screen bg-[#f2e9d9] overflow-hidden flex items-center justify-center">
      
      {/* --- CAMADA DE PADRONAGEM (Z-INDEX 0) --- */}
      {/* Restaurado para 15% de opacidade e mix-blend-multiply */}
      <div className="absolute inset-0 z-0 flex flex-col justify-around opacity-15 pointer-events-none mix-blend-multiply py-10">
        {rows.map((_, rowIndex) => (
          <div key={rowIndex} className="flex justify-around w-full px-4">
            {cols.map((_, colIndex) => {
              // Lógica de Xadrez Clássica: Alterna apenas entre 0 e 1 (Caju e Caranguejo)
              const isCaju = (rowIndex + colIndex) % 2 === 0;
              
              return (
                <motion.div 
                  key={colIndex} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (rowIndex + colIndex) * 0.05 }}
                  // Tamanho mantido grande conforme sua preferência
                  className="relative w-20 h-20 md:w-28 md:h-28"
                >
                  <Image
                    src={isCaju ? "/caju.png" : "/caranguejo.png"}
                    alt="ícone cultural"
                    fill
                    className="object-contain p-2"
                  />
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      {/* --- CONTEÚDO PRINCIPAL (Z-INDEX 10) --- */}
      {/* Painel central com leve transparência para garantir leitura sobre os ícones grandes */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full max-w-lg bg-[#f2e9d9]/40 backdrop-blur-[2px] p-8 rounded-[40px]">
        
        {/* Título: Café Torrado (#51433a) & Laranja Queimado (#b45309) */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-black mb-4 leading-tight tracking-tight"
        >
          <span className="text-[#51433a]">Conecta</span>{" "}
          <span className="text-[#b45309]">Centro</span>
        </motion.h1>

        {/* Subtexto */}
        <p className="text-[#51433a] text-base mb-6 font-semibold opacity-90">
          Descubra lojas, produtos e lugares do centro em tempo real.
        </p>

        {/* Typewriter */}
        <div className="h-10 text-lg text-[#51433a] font-bold">
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
            cursorColor="#b45309"
            typeSpeed={50}
            deleteSpeed={30}
            delaySpeed={1800}
          />
        </div>

        {/* Botão de Ação */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          transition={{ delay: 1, duration: 0.8 }}
          className="w-full mt-10 px-4"
        >
          <Link href="/login">
            {/* O botão (motion.button) controla o tremor (shake) físico */}
            <motion.button 
              // 1. ANIMAÇÃO DE TREMOR FÍSICO (Shake lateral + Rotação)
              animate={{ 
                // x: deslocamento lateral | rotate: inclinação (SÉRIE RÁPIDA)
                x: [0, -10, 10, -10, 10, 0],
                rotate: [0, -1, 1, -1, 1, 0]
              }}
              transition={{ 
                duration: 0.5,        // Tremor rápido e impactante (meio segundo)
                repeat: Infinity,     // Repetir para sempre
                repeatDelay: 4,       // Espera 4 segundos PARADO antes de tremer de novo
                ease: "easeInOut"     // Suavidade no movimento
              }}
              // Feedback visual ao tocar/passar o mouse (Indispensável para UX)
              whileHover={{ scale: 1.05 }} // Aumenta 5% ao passar o mouse
              whileTap={{ scale: 0.95 }}   // Diminui 5% ao clicar
              // Classes CSS: relative e overflow-hidden são essenciais para o brilho interno
              className="relative overflow-hidden w-full bg-[#b45309] text-[#f2e9d9] py-5 rounded-3xl font-black text-xl shadow-2xl shadow-[#b45309]/50 transition-colors"
            >
              
              {/* 2. O ELEMENTO DO BRILHO (DIV ABSOLUTA DENTRO DO BOTÃO) */}
              <motion.div
                animate={{
                  x: ["-100%", "200%"], // Começa fora à esquerda, termina fora à direita
                }}
                transition={{
                  duration: 1.5,      // Duração da "passagem" do feixe de luz
                  repeat: Infinity,   // Repetir para sempre
                  repeatDelay: 4,     // Sincronizado para passar logo após o tremor
                  ease: "linear"      // Movimento constante e rápido
                }}
                // Gradiente diagonal (fino no meio, transparente nas pontas)
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-30deg]" 
              />
              
              {/* O texto precisa ter z-index para ficar ACIMA do brilho e do gradiente */}
              <span className="relative z-10">Entrar no Mapa</span>

            </motion.button>
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 text-[11px] uppercase tracking-[0.3em] text-[#51433a]/60 font-black"
        >
          Aracaju • Sergipe • Brasil
        </motion.p>
      </main>
    </div>
  );
}