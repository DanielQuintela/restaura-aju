"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Navigation, Target, MapPin, X, Clock, Star } from 'lucide-react';
import { LOCAIS_ARACAJU, LOCAIS_DESCOBRIR } from '../constants/dadosMock';

type SearchResult = {
  id: string;
  name: string;
  category: string;
  image: string;
  extra: string;
  mapaIdx: number | null;
};

export default function MapaCentro() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  const isSearching = searchTerm.trim().length > 0;

  const searchResults = useMemo<SearchResult[]>(() => {
    if (!isSearching) return [];
    const q = searchTerm.toLowerCase();

    const fromMapa: SearchResult[] = LOCAIS_ARACAJU
      .map((l, i) => ({
        id: `mapa-${i}`,
        name: l.name,
        category: l.category,
        image: l.image,
        extra: `${l.address.street}, ${l.address.number}`,
        mapaIdx: i,
      }))
      .filter(r => r.name.toLowerCase().includes(q) || r.category.toLowerCase().includes(q));

    const mapaNames = new Set(fromMapa.map(r => r.name.toLowerCase()));

    const fromDescobrir: SearchResult[] = LOCAIS_DESCOBRIR
      .filter(l => !mapaNames.has(l.nome.toLowerCase()))
      .filter(l =>
        l.nome.toLowerCase().includes(q) ||
        l.tipo.toLowerCase().includes(q) ||
        l.caracteristicas.toLowerCase().includes(q) ||
        l.address.street.toLowerCase().includes(q)
      )
      .map(l => ({
        id: `desc-${l.id}`,
        name: l.nome,
        category: l.tipo,
        image: l.img,
        extra: `${l.address.street}, ${l.address.number} · ${l.nota} ★`,
        mapaIdx: null,
      }));

    return [...fromMapa, ...fromDescobrir];
  }, [searchTerm, isSearching]);

  const localAtual = LOCAIS_ARACAJU[selectedIdx];
  const addr = localAtual.address;

  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(
    `${localAtual.name}, ${addr.street}, ${addr.city}, ${addr.state}`
  )}`;

  const handleSelectResult = (result: SearchResult) => {
    if (result.mapaIdx !== null) {
      setSelectedIdx(result.mapaIdx);
    }
    setSearchTerm("");
    setShowSuggestions(true);
  };

  return (
    <div className="relative h-screen w-full bg-[#FDF8F4] overflow-hidden">
      
      {/* MAPA */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
          <iframe 
            src={googleMapsUrl} 
            width="100%" 
            height="100%" 
            style={{ 
              border: 0,
              filter: 'grayscale(0.3) sepia(0.2) contrast(1.1) brightness(0.9)'
            }} 
            loading="eager"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-[#e8dcc8] to-[#d4c4a8] flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="text-[#b45309]/30 mx-auto mb-3" />
              <p className="text-[#51433a]/40 font-black text-sm uppercase tracking-widest">Centro de Aracaju</p>
              <p className="text-[#51433a]/25 text-xs font-bold mt-1">Modo demonstração</p>
            </div>
          </div>
        )}
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

        {/* RESULTADOS DA BUSCA */}
        <AnimatePresence>
          {isSearching && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-3 bg-white/95 backdrop-blur-xl rounded-[24px] shadow-xl border border-zinc-100 overflow-hidden max-h-[60vh] overflow-y-auto"
            >
              {searchResults.length > 0 ? (
                <div className="divide-y divide-zinc-100">
                  <div className="px-4 py-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#51433a]/40">
                      {searchResults.length} {searchResults.length === 1 ? "resultado" : "resultados"}
                    </span>
                  </div>
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleSelectResult(result)}
                      className="w-full flex items-center gap-3 px-4 py-3 active:bg-[#b45309]/5 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 relative">
                        <Image src={result.image} alt={result.name} fill sizes="48px" className="object-cover" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-bold text-[#51433a] leading-tight">{result.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[9px] font-black uppercase tracking-wider text-[#b45309]">{result.category}</span>
                          <span className="text-[9px] font-bold text-[#51433a]/40">{result.extra}</span>
                        </div>
                      </div>
                      {result.mapaIdx !== null && (
                        <MapPin size={16} className="text-[#b45309] shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center">
                  <Search size={24} className="text-[#51433a]/15 mx-auto mb-2" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#51433a]/30">
                    Nenhum resultado para &ldquo;{searchTerm}&rdquo;
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
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
        {!isSearching && showSuggestions && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}

            onDragEnd={(event, info) => {
              if (info.offset.y > 100) {
                setShowSuggestions(false);
              }
            }}

            className="absolute bottom-0 left-0 right-0 z-20"
          >

          <div className="bg-[#FDF8F4] rounded-t-[32px] pt-8 pb-24 shadow-[0_-10px_40px_rgba(0,0,0,0.15)]">
            
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
              className="absolute -top-5 right-6 w-9 h-9 flex items-center justify-center rounded-full bg-[#b45309] text-[#6b350b] active:scale-80 transition"
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
                  className={`relative flex-shrink-0 w-40 h-60  rounded-[28px] overflow-hidden cursor-pointer transition-all duration-300 shadow-xl ${
                    selectedIdx === index
                      ? 'ring-4 ring-white scale-105 z-30'
                      : 'opacity-100 grayscale-[0.3]'
                  }`}
                >
                  <Image 
                    src={local.image} 
                    alt={local.name} 
                    fill 
                    sizes="160px"
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