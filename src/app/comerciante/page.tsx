"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Store,
  Ticket,
  CalendarDays,
  Megaphone,
  HelpCircle,
  LogOut,
  ChevronRight,
  Plus,
  TrendingUp,
  Users,
  Eye,
  Star,
  MapPin,
  Clock,
  X,
  Sparkles,
  PartyPopper,
  BadgePercent,
} from "lucide-react";

// ── Mock Data ──────────────────────────────────────────────
const LOJA = {
  nome: "Mercado Thales Ferraz",
  categoria: "Cultura & Comércio",
  endereco: "Av. Coelho e Campos, Centro – Aracaju/SE",
  avatar: "https://api.dicebear.com/7.x/icons/svg?seed=store",
  stats: { visitas: 342, favoritos: 87, cuponsUsados: 56 },
};

const CUPONS_MOCK = [
  { id: "1", titulo: "10% em artesanato", desconto: "10%", ativo: true, resgatados: 23 },
  { id: "2", titulo: "Café grátis acima de R$30", desconto: "Grátis", ativo: true, resgatados: 41 },
  { id: "3", titulo: "R$5 off no almoço", desconto: "R$5", ativo: false, resgatados: 56 },
];

const EVENTOS_MOCK = [
  { id: "1", titulo: "Feira de Artesanato Sergipano", data: "29 Mar 2026", horario: "08h–14h" },
  { id: "2", titulo: "Roda de Forró no Mercado", data: "05 Abr 2026", horario: "18h–21h" },
];

// ── Componente Principal ───────────────────────────────────
export default function ComerciantePage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Seções do painel
  const sections = [
    { id: "cupons", label: "Cupons e Promoções", icon: Ticket, count: CUPONS_MOCK.filter(c => c.ativo).length },
    { id: "eventos", label: "Eventos", icon: CalendarDays, count: EVENTOS_MOCK.length },
    { id: "impulsionar", label: "Impulsionar Comércio", icon: Megaphone, count: null },
    { id: "ajuda", label: "Ajuda e Suporte", icon: HelpCircle, count: null },
  ];

  return (
    <div className="min-h-screen bg-[#f2e9d9] text-[#51433a] pb-10 font-sans">

      {/* ── HEADER ──────────────────────────────────── */}
      <div className="px-6 pt-10 pb-2 flex justify-between items-center">
        <h2 className="text-3xl font-black tracking-tighter uppercase">Painel</h2>
        <div className="w-10 h-10 rounded-xl bg-white shadow-md border-2 border-[#b45309]/10 overflow-hidden flex items-center justify-center">
          <Store size={20} className="text-[#b45309]" />
        </div>
      </div>

      {/* ── CARD DA LOJA ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-6 mt-4 bg-white/80 rounded-[28px] p-6 border border-white shadow-md"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#b45309]/10 flex items-center justify-center">
            <Store size={28} className="text-[#b45309]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-black leading-tight">{LOJA.nome}</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#b45309] mt-1">{LOJA.categoria}</p>
            <div className="flex items-center gap-1 mt-1 opacity-50">
              <MapPin size={12} />
              <span className="text-[10px] font-bold">{LOJA.endereco}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── STATS ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-3 px-6 mt-5"
      >
        {[
          { icon: Eye, value: LOJA.stats.visitas, label: "Visitas" },
          { icon: Star, value: LOJA.stats.favoritos, label: "Favoritos" },
          { icon: Ticket, value: LOJA.stats.cuponsUsados, label: "Cupons usados" },
        ].map((stat) => (
          <div key={stat.label} className="flex-1 bg-white/80 rounded-[20px] p-4 border border-white shadow-md flex flex-col items-center gap-1">
            <stat.icon size={18} className="text-[#b45309]" />
            <span className="text-xl font-black">{stat.value}</span>
            <span className="text-[8px] font-black uppercase tracking-widest opacity-40 text-center">{stat.label}</span>
          </div>
        ))}
      </motion.div>

      {/* ── INSIGHT RÁPIDO ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mx-6 mt-5 bg-[#b45309]/10 rounded-[20px] p-4 flex items-center gap-3 border border-[#b45309]/20"
      >
        <TrendingUp size={20} className="text-[#b45309] shrink-0" />
        <div>
          <p className="text-xs font-black">Seu comércio cresceu 24% esta semana!</p>
          <p className="text-[10px] font-bold opacity-50 mt-0.5">Mais 18 pessoas favoritaram sua loja</p>
        </div>
      </motion.div>

      {/* ── SEÇÕES DO PAINEL ────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 mt-6"
      >
        <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3">Gerenciar</p>

        <div className="bg-white/80 rounded-[24px] border border-white shadow-md overflow-hidden divide-y divide-[#51433a]/5">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className="w-full flex items-center gap-4 px-5 py-4 active:bg-[#b45309]/5 transition-colors"
            >
              <sec.icon size={20} className="text-[#b45309]" />
              <span className="flex-1 text-left text-sm font-bold">{sec.label}</span>
              {sec.count !== null && (
                <span className="bg-[#b45309]/10 text-[#b45309] text-[10px] font-black px-2 py-1 rounded-lg">{sec.count}</span>
              )}
              <ChevronRight size={16} className="opacity-30" />
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── SAIR ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6 mt-6"
      >
        <button
          onClick={() => router.push("/login")}
          className="w-full bg-[#51433a] text-[#f2e9d9] py-4 rounded-2xl font-black shadow-md hover:bg-[#3d322d] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          Sair da conta
        </button>
      </motion.div>

      {/* ── MODAIS DAS SEÇÕES ───────────────────────── */}
      <AnimatePresence>
        {activeSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-end justify-center p-4"
            onClick={() => setActiveSection(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#f2e9d9] w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl max-h-[80vh] flex flex-col"
            >
              {/* Header do modal */}
              <div className="flex items-center justify-between p-6 pb-4">
                <h3 className="text-xl font-black uppercase tracking-tight">
                  {sections.find(s => s.id === activeSection)?.label}
                </h3>
                <button
                  onClick={() => setActiveSection(null)}
                  className="bg-[#51433a]/10 p-2 rounded-full active:scale-90 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Conteúdo do modal */}
              <div className="overflow-y-auto px-6 pb-8 flex-1">
                {activeSection === "cupons" && <CuponsSection />}
                {activeSection === "eventos" && <EventosSection />}
                {activeSection === "impulsionar" && <ImpulsionarSection />}
                {activeSection === "ajuda" && <AjudaSection />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Seção: Cupons e Promoções ──────────────────────────────
function CuponsSection() {
  return (
    <div className="space-y-4">
      <button className="w-full bg-[#b45309] text-[#f2e9d9] py-3 rounded-2xl font-black flex items-center justify-center gap-2 active:scale-95 transition-all">
        <Plus size={18} />
        Criar novo cupom
      </button>

      {CUPONS_MOCK.map((cupom) => (
        <div
          key={cupom.id}
          className="bg-white/80 rounded-[20px] p-4 border border-white shadow-md flex items-center gap-4"
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${cupom.ativo ? "bg-[#b45309]/10" : "bg-gray-100"}`}>
            <BadgePercent size={22} className={cupom.ativo ? "text-[#b45309]" : "text-gray-400"} />
          </div>
          <div className="flex-1">
            <p className={`text-sm font-bold ${!cupom.ativo ? "opacity-40 line-through" : ""}`}>{cupom.titulo}</p>
            <p className="text-[10px] font-black uppercase tracking-wider opacity-40">
              {cupom.desconto} • {cupom.resgatados} resgatados
            </p>
          </div>
          <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg ${cupom.ativo ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
            {cupom.ativo ? "Ativo" : "Encerrado"}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Seção: Eventos ─────────────────────────────────────────
function EventosSection() {
  return (
    <div className="space-y-4">
      <button className="w-full bg-[#b45309] text-[#f2e9d9] py-3 rounded-2xl font-black flex items-center justify-center gap-2 active:scale-95 transition-all">
        <Plus size={18} />
        Criar novo evento
      </button>

      {EVENTOS_MOCK.map((evento) => (
        <div
          key={evento.id}
          className="bg-white/80 rounded-[20px] p-4 border border-white shadow-md flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#b45309]/10 flex items-center justify-center">
            <PartyPopper size={22} className="text-[#b45309]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">{evento.titulo}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[10px] font-black uppercase tracking-wider opacity-40 flex items-center gap-1">
                <CalendarDays size={10} /> {evento.data}
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider opacity-40 flex items-center gap-1">
                <Clock size={10} /> {evento.horario}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Seção: Impulsionar Comércio ────────────────────────────
function ImpulsionarSection() {
  const planos = [
    { nome: "Destaque Local", preco: "Grátis", desc: "Apareça no mapa e nas buscas do centro.", beneficios: ["Pin no mapa", "Listagem em Descobrir"], atual: true },
    { nome: "Impulsionado", preco: "R$ 29/mês", desc: "Mais visibilidade e prioridade nos resultados.", beneficios: ["Tudo do Grátis", "Destaque no carrossel", "Notificações para visitantes", "Badge de destaque"] , atual: false },
    { nome: "Vitrine Premium", preco: "R$ 59/mês", desc: "Máxima exposição e ferramentas exclusivas.", beneficios: ["Tudo do Impulsionado", "Banner promocional", "Relatórios avançados", "Suporte prioritário"], atual: false },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 bg-[#b45309]/10 rounded-2xl p-3 border border-[#b45309]/20">
        <Sparkles size={18} className="text-[#b45309] shrink-0" />
        <p className="text-[11px] font-bold opacity-70">Impulsione sua loja e alcance mais clientes que visitam o centro de Aracaju.</p>
      </div>

      {planos.map((plano) => (
        <div
          key={plano.nome}
          className={`rounded-[20px] p-5 border shadow-md ${plano.atual ? "bg-[#b45309]/5 border-[#b45309]/30" : "bg-white/80 border-white"}`}
        >
          <div className="flex items-center justify-between">
            <h4 className="font-black text-sm">{plano.nome}</h4>
            <span className="text-[#b45309] font-black text-sm">{plano.preco}</span>
          </div>
          <p className="text-[10px] font-bold opacity-50 mt-1">{plano.desc}</p>
          <ul className="mt-3 space-y-1">
            {plano.beneficios.map((b) => (
              <li key={b} className="text-[10px] font-bold opacity-60 flex items-center gap-2">
                <div className="w-1 h-1 bg-[#b45309] rounded-full" />
                {b}
              </li>
            ))}
          </ul>
          <button
            className={`w-full mt-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider active:scale-95 transition-all ${
              plano.atual
                ? "bg-[#51433a]/10 text-[#51433a]/50 cursor-default"
                : "bg-[#b45309] text-[#f2e9d9]"
            }`}
            disabled={plano.atual}
          >
            {plano.atual ? "Plano atual" : "Selecionar plano"}
          </button>
        </div>
      ))}
    </div>
  );
}

// ── Seção: Ajuda e Suporte ─────────────────────────────────
function AjudaSection() {
  const faqs = [
    { q: "Como cadastro um novo cupom?", a: "Acesse a seção Cupons e Promoções e toque em 'Criar novo cupom'. Preencha o desconto, título e período de validade." },
    { q: "Como funciona o impulsionamento?", a: "Com os planos pagos, sua loja ganha destaque no mapa, aparece primeiro nas buscas e pode enviar notificações para visitantes próximos." },
    { q: "Como crio um evento?", a: "Na seção Eventos, toque em 'Criar novo evento' e preencha o nome, data, horário e descrição do evento." },
    { q: "Posso editar meu perfil de loja?", a: "Sim! Em breve teremos a edição completa. Por enquanto, entre em contato pelo suporte." },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 bg-[#b45309]/10 rounded-2xl p-3 border border-[#b45309]/20 mb-2">
        <Users size={18} className="text-[#b45309] shrink-0" />
        <p className="text-[11px] font-bold opacity-70">Dúvidas frequentes sobre o painel do comerciante.</p>
      </div>

      {faqs.map((faq, i) => (
        <div key={i} className="bg-white/80 rounded-[16px] border border-white shadow-md overflow-hidden">
          <button
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
            className="w-full flex items-center justify-between px-4 py-3 active:bg-[#b45309]/5 transition-colors"
          >
            <span className="text-sm font-bold text-left">{faq.q}</span>
            <ChevronRight size={16} className={`opacity-30 transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
          </button>
          <AnimatePresence>
            {openFaq === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="px-4 pb-3 text-xs font-semibold opacity-60">{faq.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      <button className="w-full bg-[#51433a] text-[#f2e9d9] py-3 rounded-2xl font-black flex items-center justify-center gap-2 active:scale-95 transition-all mt-4">
        <HelpCircle size={18} />
        Falar com o suporte
      </button>
    </div>
  );
}
