"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Star, Clock, X, Info, Utensils, ShoppingBag, Landmark, Navigation } from "lucide-react";
import { useState } from "react";

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState("Tudo");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);

  const todosLocais = [
    { 
      id: 1, 
      nome: "Mercado Thales Ferraz", 
      tipo: "Cultura", 
      status: "Aberto",
      horario: "Seg a Sáb: 06h às 17h | Dom: 06h às 12h",
      caracteristicas: "Artesanato local, queijos, castanhas e ervas medicinais. Famoso pela Passarela das Flores.",
      nota: 4.9, 
      dist: "150m",
      img: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=400"
    },
    { 
      id: 2, 
      nome: "Museu da Gente Sergipana", 
      tipo: "Cultura", 
      status: "Aberto",
      horario: "Ter a Dom: 10h às 16h (Entrada Grátis)",
      caracteristicas: "Museu multimídia interativo. Celebra o sotaque, a culinária e as festas de Sergipe.",
      nota: 5.0, 
      dist: "800m",
      img: "https://images.unsplash.com/photo-1518998053502-53cc8efd9aed?auto=format&fit=crop&w=400"
    },
    { 
      id: 3, 
      nome: "Catedral Metropolitana", 
      tipo: "Cultura", 
      status: "Aberto",
      horario: "Diariamente: 07h às 18h",
      caracteristicas: "Arquitetura neogótica e belíssimas pinturas internas. Localizada na Praça Olímpio Campos.",
      nota: 4.8, 
      dist: "300m",
      img: "https://images.unsplash.com/photo-1548543604-a87c9909abec?auto=format&fit=crop&w=400"
    },
    { 
      id: 4, 
      nome: "Restaurante Caçarola", 
      tipo: "Gastronomia", 
      status: "Aberto",
      horario: "Seg a Sáb: 11h às 16h",
      caracteristicas: "Culinária regional no terraço do mercado. Famoso pelo 'Camarão na Moringa'.",
      nota: 4.7, 
      dist: "160m",
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400"
    }
  ];

  // Filtro Combinado (Categoria + Busca)
  const locaisFiltrados = todosLocais.filter(local => {
    const matchesTab = activeTab === "Tudo" || local.tipo === activeTab;
    const matchesSearch = local.nome.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f2e9d9] text-[#51433a] pb-28">
      
      {/* HEADER */}
      <div className="px-6 pt-10 pb-4">
        <h2 className="text-3xl font-black tracking-tighter">Explore o Centro</h2>
        <p className="text-[10px] font-bold uppercase text-[#b45309] tracking-widest mt-1">Aracaju, Sergipe</p>
      </div>

      {/* BARRA DE PESQUISA FUNCIONAL */}
      <div className="px-6 py-4">
        <div className="relative">
          <input 
            type="text"
            placeholder="Pesquisar local..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/80 p-5 pl-14 rounded-3xl font-bold shadow-sm outline-none border-2 border-transparent focus:border-[#b45309]/20 transition-all"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#b45309]" size={20} />
        </div>
      </div>

      {/* CATEGORIAS */}
      <div className="flex gap-3 overflow-x-auto px-6 py-2 no-scrollbar">
        {["Tudo", "Gastronomia", "Lojas", "Cultura"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
              activeTab === cat ? "bg-[#b45309] text-white shadow-lg shadow-[#b45309]/30" : "bg-white/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* LISTA DE CARDS */}
      <div className="px-6 mt-6 space-y-4">
        <AnimatePresence mode="popLayout">
          {locaisFiltrados.map((local) => (
            <motion.div 
              key={local.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedPlace(local)}
              className="bg-white/80 rounded-[30px] p-3 flex gap-4 border border-white shadow-md cursor-pointer active:scale-95 transition-transform"
            >
              <img src={local.img} className="w-24 h-24 rounded-[22px] object-cover shadow-sm" alt={local.nome} />
              <div className="flex flex-col justify-between py-1 flex-grow">
                <div>
                  <span className="text-[8px] font-black text-[#b45309] uppercase">{local.tipo}</span>
                  <h3 className="font-black text-[#51433a] leading-tight">{local.nome}</h3>
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold opacity-60">
                   <div className="flex items-center gap-1"><Clock size={12}/> {local.dist}</div>
                   <div className="text-green-600 uppercase font-black">{local.status}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* MODAL DE DETALHES (SÓ ABRE AO CLICAR) */}
      <AnimatePresence>
        {selectedPlace && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          >
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="bg-[#f2e9d9] w-full max-w-md rounded-t-[40px] sm:rounded-[40px] overflow-hidden shadow-2xl relative"
            >
              <button onClick={() => setSelectedPlace(null)} className="absolute top-6 right-6 z-10 bg-black/10 p-2 rounded-full"><X size={20}/></button>
              
              <div className="h-56 w-full relative">
                <img src={selectedPlace.img} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#f2e9d9] to-transparent" />
              </div>

              <div className="p-8 -mt-10 relative">
                <span className="bg-[#b45309] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{selectedPlace.tipo}</span>
                <h2 className="text-3xl font-black text-[#51433a] mt-2">{selectedPlace.nome}</h2>
                
                <div className="mt-6 space-y-4 text-[#51433a]">
                  <div className="flex gap-3">
                    <Clock className="text-[#b45309] flex-shrink-0" size={20} />
                    <div>
                      <p className="text-xs font-black uppercase opacity-50">Horários</p>
                      <p className="font-bold text-sm">{selectedPlace.horario}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Info className="text-[#b45309] flex-shrink-0" size={20} />
                    <div>
                      <p className="text-xs font-black uppercase opacity-50">Sobre</p>
                      <p className="font-bold text-sm leading-relaxed">{selectedPlace.caracteristicas}</p>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-[#51433a] text-white py-4 rounded-2xl font-black mt-8 flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
                  <Navigation size={20} /> COMO CHEGAR
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TAB BAR */}
      <nav className="fixed bottom-6 left-6 right-6 h-20 bg-[#51433a] rounded-[30px] shadow-2xl flex items-center justify-around px-4 z-50">
        <button className="p-3 text-[#b45309] bg-[#f2e9d9] rounded-2xl"><Search size={24} /></button>
        <button className="p-3 text-white/40"><MapPin size={24} /></button>
        <button className="p-3 text-white/40"><Star size={24} /></button>
      </nav>
    </div>
  );
}