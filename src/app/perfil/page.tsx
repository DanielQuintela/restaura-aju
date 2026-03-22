"use client";
import { motion } from "framer-motion";
import { MapPin, Trophy, Pencil, Bell, ShieldCheck, HelpCircle, LogOut, ChevronRight, Ticket, Gift, Clapperboard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useApp } from "../context/AppContext";
import { CINEMA_TICKET_OPTIONS } from "../constants/dadosMock";

const PROFILE_DATA = {
  name: "João Silva",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
};

const SETTINGS_ITEMS = [
  { label: "Editar Perfil", icon: Pencil },
  { label: "Notificações", icon: Bell },
  { label: "Privacidade e Segurança", icon: ShieldCheck },
  { label: "Ajuda e Suporte", icon: HelpCircle },
];

export default function ProfilePage() {
  const router = useRouter();
  const { points, visitedPlaceIds, coupons, redeemCoupon, redeemTicket } = useApp();

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
          <span className="text-2xl font-black">{visitedPlaceIds.length}</span>
          <span className="text-[9px] font-black uppercase tracking-widest opacity-50">Locais visitados</span>
        </div>
        <div className="flex-1 bg-white/80 rounded-[24px] p-5 border border-white shadow-md flex flex-col items-center gap-2">
          <Trophy size={22} className="text-[#b45309]" />
          <span className="text-2xl font-black">{points}</span>
          <span className="text-[9px] font-black uppercase tracking-widest opacity-50">Pontos acumulados</span>
        </div>
      </motion.div>

      {/* INGRESSOS DE CINEMA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 mt-8"
      >
        <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3">Ingressos de Cinema</p>
        <div className="bg-[#51433a]/5 rounded-[20px] px-4 py-3 mb-3 flex items-center gap-2 border border-[#51433a]/10">
          <Clapperboard size={16} className="text-[#b45309] shrink-0" />
          <p className="text-[10px] font-bold opacity-60">Use seus pontos para resgatar ingressos do Cine Walmir Almeida.</p>
        </div>
        <div className="space-y-3">
          {CINEMA_TICKET_OPTIONS.map((opt) => {
            const canAfford = points >= opt.cost;
            return (
              <div key={opt.id} className="bg-white/80 rounded-[20px] p-4 border border-white shadow-md flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#b45309]/10 flex items-center justify-center shrink-0">
                  <Clapperboard size={22} className="text-[#b45309]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold leading-tight">{opt.title}</p>
                  <p className="text-[10px] font-black uppercase tracking-wider opacity-40 mt-0.5">{opt.description}</p>
                  <p className={`text-[10px] font-black uppercase tracking-wider mt-1 ${canAfford ? "text-[#b45309]" : "text-gray-400"}`}>
                    {opt.cost} pts
                  </p>
                </div>
                <button
                  onClick={() => redeemTicket(opt)}
                  disabled={!canAfford}
                  className={`text-[10px] font-black uppercase px-3 py-2 rounded-xl active:scale-95 transition-all ${
                    canAfford
                      ? "bg-[#b45309] text-white"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Resgatar
                </button>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* RECOMPENSAS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="px-6 mt-8"
      >
        <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3">Recompensas</p>

        {coupons.length > 0 ? (
          <div className="space-y-3">
            {coupons.map((coupon) => (
              <div key={coupon.id} className="bg-white/80 rounded-[20px] p-4 border border-white shadow-md flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${coupon.redeemed ? "bg-gray-100" : "bg-[#b45309]/10"}`}>
                  {coupon.type === "ticket" ? (
                    <Clapperboard size={22} className={coupon.redeemed ? "text-gray-400" : "text-[#b45309]"} />
                  ) : (
                    <Ticket size={22} className={coupon.redeemed ? "text-gray-400" : "text-[#b45309]"} />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-bold ${coupon.redeemed ? "line-through opacity-40" : ""}`}>{coupon.title}</p>
                  <p className="text-[10px] font-black uppercase tracking-wider opacity-40">{coupon.discount} de desconto</p>
                </div>
                {!coupon.redeemed && (
                  <button onClick={() => redeemCoupon(coupon.id)} className="bg-[#b45309] text-white text-[10px] font-black uppercase px-3 py-2 rounded-xl active:scale-95 transition-all">
                    Resgatar
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 rounded-[24px] p-8 border border-white shadow-md flex flex-col items-center gap-3">
            <Gift size={32} className="text-[#51433a]/15" />
            <p className="text-[10px] font-black uppercase tracking-widest opacity-30 text-center">
              Faça check-in nos locais{"\n"}para desbloquear cupons
            </p>
          </div>
        )}
      </motion.div>

      {/* CONFIGURAÇÕES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
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
        transition={{ delay: 0.35 }}
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