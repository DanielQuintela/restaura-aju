"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Star, Clock, X, Info, Navigation, Heart, ChevronLeft, Utensils, ShoppingBag, Landmark } from "lucide-react";
import { useState, useMemo } from "react";

export default function ExplorePage() {
  const [view, setView] = useState("explore"); // 'explore', 'map', 'favorites'
  const [activeTab, setActiveTab] = useState("Tudo");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [favorites, setFavorites] = useState([1]);

  const todosLocais = [
    { 
      id: 1, 
      nome: "Mercado Thales Ferraz", 
      tipo: "Cultura", 
      status: "Aberto",
      horario: "06h às 17h",
      caracteristicas: "Artesanato, queijos e a famosa Passarela das Flores.",
      nota: 4.9, 
      dist: "150m",
      coords: { top: "35%", left: "50%" },
      img: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=400"
    },
    { 
      id: 2, 
      nome: "Museu da Gente Sergipana", 
      tipo: "Cultura", 
      status: "Aberto",
      horario: "10h às 16h",
      caracteristicas: "Experiência tecnológica sobre a identidade de Sergipe.",
      nota: 5.0, 
      dist: "800m",
      coords: { top: "55%", left: "25%" },
      img: "/museuSergipana.jpg"
    },
    { 
      id: 4, 
      nome: "Restaurante Caçarola", 
      tipo: "Gastronomia", 
      status: "Aberto",
      horario: "11h às 16h",
      caracteristicas: "Famoso pelo Camarão na Moringa e vista do rio.",
      nota: 4.7, 
      dist: "160m",
      coords: { top: "25%", left: "40%" },
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400"
    },
    { 
      id: 5, 
      nome: "Lojas do Calçadão", 
      tipo: "Lojas", 
      status: "Aberto",
      horario: "08h às 18h",
      caracteristicas: "O coração do comércio popular de Aracaju.",
      nota: 4.5, 
      dist: "100m",
      coords: { top: "45%", left: "60%" },
      img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400"
    }
  ];

  // FILTRO MESTRE: Busca + Categoria + Favoritos
  const locaisFiltrados = useMemo(() => {
    return todosLocais.filter(local => {
      const matchesSearch = local.nome.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === "Tudo" || local.tipo === activeTab;
      const matchesFavorite = view === "favorites" ? favorites.includes(local.id) : true;
      return matchesSearch && matchesTab && matchesFavorite;
    });
  }, [searchQuery, activeTab, view, favorites]);

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const categorias = [
    { id: "Tudo", icon: null },
    { id: "Gastronomia", icon: <Utensils size={14} /> },
    { id: "Lojas", icon: <ShoppingBag size={14} /> },
    { id: "Cultura", icon: <Landmark size={14} /> }
  ];

  return (
    <div className="min-h-screen bg-[#f2e9d9] text-[#51433a] pb-28 font-sans">
      
      {/* HEADER */}
      <div className="px-6 pt-10 pb-2 flex justify-between items-center">
        <h2 className="text-3xl font-black tracking-tighter uppercase">
          {view === "explore" ? "Descubra" : view === "map" ? "No Mapa" : "Favoritos"}
        </h2>
        <div className="w-10 h-10 rounded-xl bg-white shadow-md border-2 border-[#b45309]/10 overflow-hidden">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
        </div>
      </div>

      {/* LUPA DE PESQUISA */}
      <div className="px-6 py-4">
        <div className="relative">
          <input 
            type="text" placeholder="O que você procura?" value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/70 p-4 pl-12 rounded-2xl font-bold shadow-sm outline-none border-2 border-transparent focus:border-[#b45309]/30 transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b45309]" size={18} />
        </div>
      </div>

      {/* BOTÕES DE CATEGORIA (SEMPRE VISÍVEIS) */}
      <div className="flex gap-3 overflow-x-auto px-6 py-2 no-scrollbar">
        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
              activeTab === cat.id 
              ? "bg-[#b45309] text-white border-[#b45309] shadow-lg" 
              : "bg-white/40 text-[#51433a]/60 border-transparent hover:border-white/50"
            }`}
          >
            {cat.icon}
            {cat.id}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {view !== "map" ? (
          /* VIEW: LISTA */
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6 mt-6 space-y-4">
            {locaisFiltrados.length > 0 ? locaisFiltrados.map((local) => (
              <motion.div 
                key={local.id} layout onClick={() => setSelectedPlace(local)}
                className="bg-white/80 rounded-[30px] p-3 flex gap-4 border border-white shadow-md relative"
              >
                <img src={local.img} className="w-24 h-24 rounded-[22px] object-cover" />
                <div className="flex flex-col justify-between py-1 flex-grow pr-8">
                  <div>
                    <span className="text-[8px] font-black text-[#b45309] uppercase">{local.tipo}</span>
                    <h3 className="font-black text-[#51433a] leading-tight">{local.nome}</h3>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-bold opacity-60">
                    <div className="flex items-center gap-1"><Clock size={12}/> {local.dist}</div>
                    <div className="flex items-center gap-1"><Star size={12} fill="#EAB308" className="text-yellow-500"/> {local.nota}</div>
                  </div>
                </div>
                <button onClick={(e) => toggleFavorite(local.id, e)} className="absolute top-4 right-4 p-2">
                  <Star size={20} fill={favorites.includes(local.id) ? "#b45309" : "transparent"} className={favorites.includes(local.id) ? "text-[#b45309]" : "text-[#51433a]/20"} />
                </button>
              </motion.div>
            )) : (
              <div className="text-center py-20 opacity-30 font-black uppercase text-[10px] tracking-widest">Nada nesta categoria</div>
            )}
          </motion.div>
        ) : (
          /* VIEW: MAPA */
          <motion.div key="map" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="px-6 py-4 h-[450px]">
            <div className="w-full h-full bg-[#51433a]/5 rounded-[40px] relative overflow-hidden border-4 border-white shadow-inner">
              {locaisFiltrados.map(local => (
                <motion.button
                  key={local.id}
                  onClick={() => setSelectedPlace(local)}
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute p-2 bg-white rounded-full shadow-xl border-2 border-[#b45309] text-[#b45309] z-10"
                  style={{ top: local.coords.top, left: local.coords.left }}
                >
                  <MapPin size={22} fill="currentColor" className="text-white" />
                </motion.button>
              ))}
              <div className="absolute bottom-6 left-6 right-6 bg-[#51433a] p-4 rounded-2xl text-white shadow-2xl">
                <p className="text-[9px] font-black uppercase opacity-60">Filtro Ativo</p>
                <p className="text-xs font-bold">Mostrando {locaisFiltrados.length} locais em {activeTab}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE DETALHES */}
      <AnimatePresence>
        {selectedPlace && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-end justify-center p-4">
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="bg-[#f2e9d9] w-full max-w-md rounded-[40px] overflow-hidden shadow-2xl relative">
              <button onClick={() => setSelectedPlace(null)} className="absolute top-6 right-6 z-10 bg-black/20 p-2 rounded-full text-white"><X size={20}/></button>
              <img src={selectedPlace.img} className="h-48 w-full object-cover" />
              <div className="p-8">
                <h2 className="text-2xl font-black text-[#51433a] uppercase">{selectedPlace.nome}</h2>
                <div className="mt-6 space-y-4">
                  <div className="flex gap-3"><Clock className="text-[#b45309]" size={18}/> <div><p className="text-[10px] font-black uppercase opacity-40">Aberto das</p><p className="text-sm font-bold">{selectedPlace.horario}</p></div></div>
                  <div className="flex gap-3"><Info className="text-[#b45309]" size={18}/> <div><p className="text-[10px] font-black uppercase opacity-40">Sobre</p><p className="text-sm font-semibold opacity-80">{selectedPlace.caracteristicas}</p></div></div>
                </div>
                <button className="w-full bg-[#b45309] text-white py-4 rounded-2xl font-black mt-8 flex items-center justify-center gap-2">
                   COMO CHEGAR
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}