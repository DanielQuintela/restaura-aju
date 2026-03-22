"use client";
import { motion } from "framer-motion";
import { MapPin, Trophy, Pencil, Bell, ShieldCheck, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const PROFILE_DATA = {
  name: "John Doe",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  visitedPlaces: 12,
  points: 340,
};

const SETTINGS_ITEMS = [
  { label: "Editar Perfil", icon: Pencil },
  { label: "Notificações", icon: Bell },
  { label: "Privacidade e Segurança", icon: ShieldCheck },
  { label: "Ajuda e Suporte", icon: HelpCircle },
];

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f2e9d9] text-[#51433a] pb-32 font-sans">

      {/* HEADER */}
      <div className="px-6 pt-10 pb-2">
        <h2 className="text-3xl font-black tracking-tighter uppercase">Perfil</h2>
      </div>

      {/* AVATAR + NOME */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center mt-6"
      >
        <div className="w-24 h-24 rounded-full bg-white shadow-lg border-4 border-[#b45309]/20 overflow-hidden">
          <img src={PROFILE_DATA.avatar} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <h3 className="text-xl font-black mt-4">{PROFILE_DATA.name}</h3>
      </motion.div>

      {/* STATS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-4 px-6 mt-6"
      >
        <div className="flex-1 bg-white/80 rounded-[24px] p-5 border border-white shadow-md flex flex-col items-center gap-2">
          <MapPin size={22} className="text-[#b45309]" />
          <span className="text-2xl font-black">{PROFILE_DATA.visitedPlaces}</span>
          <span className="text-[9px] font-black uppercase tracking-widest opacity-50">Locais visitados</span>
        </div>
        <div className="flex-1 bg-white/80 rounded-[24px] p-5 border border-white shadow-md flex flex-col items-center gap-2">
          <Trophy size={22} className="text-[#b45309]" />
          <span className="text-2xl font-black">{PROFILE_DATA.points}</span>
          <span className="text-[9px] font-black uppercase tracking-widest opacity-50">Pontos acumulados</span>
        </div>
      </motion.div>

      {/* CONFIGURAÇÕES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 mt-8"
      >
        <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3">Configurações</p>

        <div className="bg-white/80 rounded-[24px] border border-white shadow-md overflow-hidden divide-y divide-[#51433a]/5">
          {SETTINGS_ITEMS.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-4 px-5 py-4 active:bg-[#b45309]/5 transition-colors"
            >
              <item.icon size={20} className="text-[#b45309]" />
              <span className="flex-1 text-left text-sm font-bold">{item.label}</span>
              <ChevronRight size={16} className="opacity-30" />
            </button>
          ))}
        </div>
      </motion.div>

      {/* SAIR */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6 mt-4"
      >
        <button
          onClick={() => router.push("/login")}
          className="w-full bg-[#b45309] text-[#f2e9d9] py-4 rounded-2xl font-black shadow-md hover:bg-[#92400e] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          Sair da conta
        </button>
      </motion.div>
    </div>
  );
}