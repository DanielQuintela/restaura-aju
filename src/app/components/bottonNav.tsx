"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { navItems } from "../constants/dadosMock";


export default function BottomNav() {
  const [activeTab, setActiveTab] = useState('mapa');

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-50">
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-[28px] px-4 py-3 flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative flex flex-col items-center gap-1 flex-1 transition-all outline-none"
            >
              {/* Efeito de destaque atrás do ícone */}
              {isActive && (
                <motion.div
                  layoutId="bubble"
                  className="absolute inset-0 bg-indigo-600/10 rounded-2xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              <Icon 
                size={22} 
                className={`transition-colors duration-300 ${isActive ? 'text-[#b45309]' : 'text-gray-400'}`} 
              />

              <span className={`text-[10px] font-bold ${isActive ? 'text-[#b45309]' : 'text-gray-400'}`}>
                {item.label}
              </span>

              {/* Ponto indicador */}
              {isActive && (
                <motion.div 
                  layoutId="activeDot"
                  className="absolute -bottom-1 w-1 h-1 bg-[#b45309] rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}