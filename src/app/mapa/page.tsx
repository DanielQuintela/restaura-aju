"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Navigation, Target, MapPin, X } from 'lucide-react';
import { LOCAIS_ARACAJU } from '../constants/dadosMock';


// Dados mockados de Aracaju


export default function MapaCentro() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  const isSearching = searchTerm.trim().length > 0;

  const localAtual = LOCAIS_ARACAJU[selectedIdx];
  const addr = localAtual.address;

  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(
    `${localAtual.name}, ${addr.street}, ${addr.city}, ${addr.state}`
  )}`;

  return (
    <div className="relative h-screen w-full bg-[#FDF8F4] overflow-hidden">
      
      {/* MAPA */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <iframe 
          src={googleMapsUrl} 
          width="100%" 
          height="100%" 
          style={{ 
            border: 0,
            filter: 'brightness(0.9) contrast(1.2) saturate(1.2)'
          }} 
          loading="eager"
        />
      </div>

      {/* BUSCA */}
      <div className="absolute top-14 left-0 right-0 px-6 z-20">
        <div className="bg-white/95 backdrop-blur-md h-14 rounded-full shadow-lg flex items-center px-5 border border-zinc-100">
          <Search size={18} className="text-zinc-400 mr-3" />
          
          <input 
            type="text" 
            placeholder="O que vamos fazer no Centro hoje?" 
            className="bg-transparent outline-none w-full text-sm font-medium text-zinc-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {isSearching ? (
            <X 
              size={18} 
              className="text-zinc-400 cursor-pointer" 
              onClick={() => setSearchTerm("")}
            />
          ) : (
            <>
              <div className="h-6 w-[1px] bg-zinc-200 mx-3" />
              <MapPin size={18} className="text-indigo-500" />
            </>
          )}
        </div>
      </div>

      {/* BOTÕES LATERAIS */}
      <div className="absolute right-6 top-[40%] flex flex-col gap-3 z-10">
        <button className="bg-white p-3 rounded-full shadow-md text-zinc-600 active:scale-90 transition-all border border-zinc-100">
          <Target size={20} />
        </button>
        <button className="bg-indigo-600 p-3 rounded-full shadow-lg text-white active:scale-90 transition-all">
          <Navigation size={20} fill="currentColor" />
        </button>
      </div>

      {/* CARROSSEL */}
     <AnimatePresence>
      {!isSearching &&  showSuggestions && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          className="absolute bottom-0 left-0 right-0 z-20"
        >
          <div className="bg-[#FDF8F4] rounded-t-[32px] pt-8 pb-30 shadow-[0_-10px_40px_rgba(0,0,0,0.15)]">
            
            <div className="w-10 h-1.5 bg-zinc-300 rounded-full mx-auto mb-4" />
            {/* Header */}
           <div className="relative px-6 mb-4">
            <div>
              <h3 className="text-xl font-black text-zinc-800">
                Sugestões
              </h3>
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">
                Explorar o Centro
              </p>
            </div>
            <button
              onClick={() => setShowSuggestions(false)}
              className="absolute -top-5 right-6 w-9 h-9 flex items-center justify-center rounded-full bg-[#b45309] text-[#6b350b] active:scale-90 transition"
            >
              <X size={18} />
            </button>
          </div>

            {/* Carrossel */}
            <div className="flex gap-4 overflow-x-auto px-6 no-scrollbar pb-2">
              {LOCAIS_ARACAJU.map((local, index) => (
                <motion.div
                  key={index}
                  onClick={() => setSelectedIdx(index)}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex-shrink-0 w-40 h-60 rounded-[28px] overflow-hidden cursor-pointer transition-all duration-300 shadow-xl ${
                    selectedIdx === index
                      ? 'ring-4 ring-white scale-105 z-30'
                      : 'opacity-100 grayscale-[0.3]'
                  }`}
                >
                  <Image 
                    src={local.image} 
                    alt={local.name} 
                    fill 
                    className="object-cover" 
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4">
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
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  );
}