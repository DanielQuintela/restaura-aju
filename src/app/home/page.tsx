"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Navigation, Target, MapPin } from 'lucide-react';
import BottomNav from '../components/bottonNav';

// Seus dados mocados de Aracaju
const LOCAIS_ARACAJU = [
   {
    name: "Mercado Central",
    category: "Comércio",
    image: "/mercado.jpg",
    address: { street: "Av. Coelho e Campos", number: "s/n", neighborhood: "Centro", city: "Aracaju", state: "SE" }
  },
  {
    name: "Museu da Gente Sergipana",
    category: "Cultura",
    image: "/museuSergipana.jpg",
    address: { street: "Av. Ivo do Prado", number: "398", neighborhood: "Centro", city: "Aracaju", state: "SE" }
  },
  {
    name: "Praça Fausto Cardoso",
    category: "Praça",
    image: "/faustoCardoso.jpg",
    address: { street: "Av. Ivo do Prado", number: "s/n", neighborhood: "Centro", city: "Aracaju", state: "SE" }
  },
  {
    name: "Palácio Museu Olímpio Campos",
    category: "Museu",
    image: "/campos.jpg",
    address: { street: "Praça Fausto Cardoso", number: "s/n", neighborhood: "Centro", city: "Aracaju", state: "SE" }
  }

];

export default function MapaAracaju() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const localAtual = LOCAIS_ARACAJU[selectedIdx];
  const addr = localAtual.address;
  
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(`${localAtual.name}, ${addr.street}, ${addr.city}, ${addr.state}`)}`;

  return (
    <div className="relative h-screen w-full bg-[#FDF8F4] overflow-hidden">
      
      {/* 1. MAPA (Sua lógica de iframe) */}
      <div className="absolute inset-0 z-0">
       <iframe 
        src={googleMapsUrl} 
        width="100%" 
        height="100%" 
        style={{ 
          border: 0, 
          // Filtro para remover o "esbranquiçado" e dar profundidade
          filter: 'brightness(0.9) contrast(1.2) saturate(1.2) hue-rotate(-5deg)' 
        }} 
        loading="eager"
      />
      </div>

      {/* 2. BARRA DE PESQUISA (Visual AráConecta) */}
      <div className="absolute top-14 left-0 right-0 px-6 z-20">
        <div className="bg-white/95 backdrop-blur-md h-14 rounded-full shadow-lg flex items-center px-5 border border-zinc-100">
          <Search size={18} className="text-zinc-400 mr-3" />
          <input 
            type="text" 
            placeholder="Onde vamos no Centro hoje?" 
            className="bg-transparent outline-none w-full text-sm font-medium text-zinc-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="h-6 w-[1px] bg-zinc-200 mx-3" />
          <MapPin size={18} className="text-indigo-500" />
        </div>
      </div>

      {/* 3. BOTÕES DE CONTROLE LATERAIS */}
      <div className="absolute right-6 top-[40%] flex flex-col gap-3 z-10">
        <button className="bg-white p-3 rounded-full shadow-md text-zinc-600 active:scale-90 transition-all border border-zinc-100">
          <Target size={20} />
        </button>
        <button className="bg-indigo-600 p-3 rounded-full shadow-lg text-white active:scale-90 transition-all">
          <Navigation size={20} fill="currentColor" />
        </button>
      </div>

      {/* 4. CARROSSEL DE DESTINOS (Aracaju Edition) */}
      <div className="absolute bottom-32 left-0 right-0 z-20">
        <div className="flex justify-between items-end px-8 mb-4">
          <div>
            <h3 className="text-2xl font-black text-zinc-800 tracking-tight">Aracaju</h3>
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Descobrindo o Centro</p>
          </div>
          <button className="text-xs text-indigo-600 font-bold bg-indigo-50 px-3 py-1 rounded-full">Ver todos</button>
        </div>

        <div className="flex gap-4 overflow-x-auto px-8 no-scrollbar pb-6">
          {LOCAIS_ARACAJU.map((local, index) => (
            <motion.div
              key={index}
              onClick={() => setSelectedIdx(index)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex-shrink-0 w-48 h-64 rounded-[32px] overflow-hidden cursor-pointer transition-all duration-300 shadow-2xl ${
                selectedIdx === index 
                ? 'border-[4px] border-white scale-105 z-30' 
                : 'border-transparent opacity-70 grayscale-[0.3]'
              }`}
            >
              <Image 
                src={local.image} 
                alt={local.name} 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest bg-indigo-900/40 px-2 py-1 rounded-md mb-2 inline-block backdrop-blur-sm">
                  {local.category}
                </span>
                <p className="text-white text-sm font-extrabold leading-tight">
                  {local.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}