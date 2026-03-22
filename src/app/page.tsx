"use client";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import Image from "next/image";


export default function LandingPage() {
  return (
    <div className="relative w-full flex flex-col items-center min-h-screen bg-gray-200 overflow-hidden">
      <div className="relative w-[95vw] mt-6 h-[80vh] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
        {/* <Image src="/centro.jpg" alt="Centro" fill className="object-cover brightness-50" /> */}
      </div>

      <main className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white px-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-center mb-4"
        >
          <div>
            <span className="text-gray-700">Conecta</span> <span className="text-amber-700">Centro</span>
          </div>
         
        </motion.h1>
        
        <div className="h-12 text-xl text-zinc-300 font-light">
          <Typewriter words={["Não se perca.", "Ache os melhores picos.", "Explore o centro."]} loop={0} cursor />
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <Link href="/login">
            <button className="mt-8 bg-white text-black px-10 py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-all">
              Entrar no Mapa
            </button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}