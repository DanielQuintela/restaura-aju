"use client";
import { motion } from "framer-motion";
import { Star, Clock, Bookmark } from "lucide-react";
import { useApp } from "../context/AppContext";
import { LOCAIS_DESCOBRIR } from "../constants/dadosMock";

export default function SalvosPage() {
  const { favorites, toggleFavorite } = useApp();

  const locaisSalvos = LOCAIS_DESCOBRIR.filter(l => favorites.includes(l.id));

  return (
    <div className="min-h-screen bg-[#f2e9d9] text-[#51433a] pb-32 font-sans">

      {/* HEADER */}
      <div className="px-6 pt-10 pb-2 flex justify-between items-center">
        <h2 className="text-3xl font-black tracking-tighter uppercase">Salvos</h2>
        <div className="bg-white/70 px-4 py-2 rounded-2xl">
          <span className="text-xs font-black text-[#b45309]">{locaisSalvos.length} {locaisSalvos.length === 1 ? "local" : "locais"}</span>
        </div>
      </div>

      {/* LISTA */}
      <div className="px-6 mt-6 space-y-4">
        {locaisSalvos.length > 0 ? locaisSalvos.map((local) => (
          <motion.div
            key={local.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/80 rounded-[30px] p-3 flex gap-4 border border-white shadow-md relative active:scale-[0.98] transition-transform"
          >
            <img src={local.img} className="w-24 h-24 rounded-[22px] object-cover" />
            <div className="flex flex-col justify-between py-1 flex-grow pr-8">
              <div>
                <span className="text-[8px] font-black text-[#b45309] uppercase">{local.tipo}</span>
                <h3 className="font-black text-[#51433a] leading-tight">{local.nome}</h3>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold opacity-60">
                <div className="flex items-center gap-1"><Clock size={12}/> {local.dist}</div>
                <div className="text-[#b45309] font-black">{local.nota} ★</div>
              </div>
            </div>
            <button
              onClick={() => toggleFavorite(local.id)}
              className="absolute top-4 right-4 p-2 transition-transform active:scale-125"
            >
              <Star size={22} fill="#b45309" className="text-[#b45309]" />
            </button>
          </motion.div>
        )) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 gap-4"
          >
            <Bookmark size={48} className="text-[#51433a]/15" />
            <p className="text-center opacity-30 font-black uppercase text-[10px] tracking-widest leading-relaxed">
              Você ainda não salvou{"\n"}nenhum local favorito
            </p>
            <p className="text-xs text-[#51433a]/40 font-semibold text-center max-w-[200px]">
              Explore o centro e toque na ⭐ para salvar seus lugares preferidos
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}