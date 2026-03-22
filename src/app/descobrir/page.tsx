
"use client";
import { motion } from "framer-motion";
import { Search, MapPin, Navigation, Star, Clock } from "lucide-react";
import Link from "next/link";

export default function ExplorePage() {
  // Mock de dados (Simulando o que viria de uma API)
  const sugestoes = [
    { id: 1, nome: "Mercado Municipal", categoria: "Turismo", distancia: "200m", nota: 4.8, img: "https://images.unsplash.com/photo-1596436805346-4356a142140b?q=80&w=300&h=200&auto=format&fit=crop" },
    { id: 2, nome: "Catedral Metropolitana", categoria: "Histórico", distancia: "450m", nota: 4.9, img: "https://images.unsplash.com/photo-1548543604-a87c9909abec?q=80&w=300&h=200&auto=format&fit=crop" },
    { id: 3, nome: "Sorveteria do Centro", categoria: "Gastronomia", distancia: "120m", nota: 4.7, img: "https://images.unsplash.com/photo-1501446522555-30dd0b5b95ed?q=80&w=300&h=200&auto=format&fit=crop" },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#f2e9d9] flex flex-col pb-20">
      
      {/* --- HEADER COM BUSCA --- */}
      <header className="sticky top-0 z-50 bg-[#f2e9d9]/80 backdrop-blur-md px-6 py-6 border-b border-[#51433a]/10">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#51433a]/60 font-black">Você está em</p>
              <div className="flex items-center gap-1 text-[#b45309] font-bold">
                <MapPin size={14} />
                <span>Centro, Aracaju</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#51433a] border-2 border-[#b45309] overflow-hidden">
               {/* Espaço para foto do usuário */}
            </div>
          </div>

          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#51433a]/40" size={20} />
            <input 
              type="text" 
              placeholder="O que você procura no centro?" 
              className="w-full bg-white/50 border border-[#51433a]/10 py-4 pl-12 pr-4 rounded-2xl text-[#51433a] font-semibold focus:outline-none focus:ring-2 focus:ring-[#b45309]/20 transition-all shadow-sm"
            />
          </div>
        </div>
      </header>

      {/* --- CATEGORIAS RÁPIDAS --- */}
      <section className="px-6 py-6">
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {["Tudo", "Lojas", "Comida", "Cultura", "Serviços"].map((cat, i) => (
            <motion.button 
              key={i}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-bold whitespace-nowrap text-sm border ${
                i === 0 ? "bg-[#b45309] text-white border-transparent shadow-lg shadow-[#b45309]/30" : "bg-white/40 text-[#51433a] border-[#51433a]/10"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </section>

      {/* --- ÁREA DO MAPA (SIMULADO) --- */}
      <section className="px-6 flex-grow">
        <div className="relative w-full h-[280px] bg-[#51433a]/5 rounded-[40px] border-2 border-white overflow-hidden shadow-inner flex items-center justify-center">
          {/* Aqui entraria o Google Maps ou Leaflet */}
          <div className="absolute inset-0 opacity-20 grayscale" style={{ backgroundImage: "radial-gradient(#51433a 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          <div className="flex flex-col items-center gap-2 opacity-40">
            <Navigation size={40} className="text-[#b45309] animate-pulse" />
            <p className="font-black text-[10px] uppercase tracking-widest text-[#51433a]">Carregando Mapa Local...</p>
          </div>
        </div>
      </section>

      {/* --- LUGARES PRÓXIMOS (CARDS) --- */}
      <section className="px-6 py-8">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-black text-[#51433a]">Próximos de você</h2>
          <span className="text-xs font-bold text-[#b45309] underline">Ver todos</span>
        </div>

        <div className="flex flex-col gap-6">
          {sugestoes.map((local) => (
            <motion.div 
              key={local.id}
              whileHover={{ x: 5 }}
              className="bg-white/60 backdrop-blur-sm p-4 rounded-[30px] border border-white/50 flex gap-4 shadow-sm"
            >
              <div className="w-24 h-24 rounded-2xl bg-[#51433a]/10 overflow-hidden flex-shrink-0">
                 <img src={local.img} alt={local.nome} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-between py-1 w-full">
                <div>
                  <h3 className="font-black text-[#51433a] leading-tight">{local.nome}</h3>
                  <p className="text-[10px] uppercase font-bold text-[#b45309] tracking-wider">{local.categoria}</p>
                </div>
                <div className="flex justify-between items-center text-[#51433a]">
                  <div className="flex items-center gap-1 text-xs font-bold">
                    <Clock size={12} /> <span>{local.distancia}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold bg-[#b45309]/10 text-[#b45309] px-2 py-1 rounded-lg">
                    <Star size={12} fill="#b45309" /> <span>{local.nota}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- MENU INFERIOR (TAB BAR) --- */}
      <nav className="fixed bottom-0 w-full bg-[#f2e9d9] border-t border-[#51433a]/5 px-8 py-4 flex justify-between items-center z-50">
        <Link href="/explore" className="text-[#b45309] flex flex-col items-center gap-1">
          <Search size={24} />
          <span className="text-[9px] font-black uppercase">Explorar</span>
        </Link>
        <button className="text-[#51433a]/40 flex flex-col items-center gap-1">
          <MapPin size={24} />
          <span className="text-[9px] font-black uppercase">Mapa</span>
        </button>
        <button className="text-[#51433a]/40 flex flex-col items-center gap-1">
          <Star size={24} />
          <span className="text-[9px] font-black uppercase">Favoritos</span>
        </button>
      </nav>

    </div>
  );
}