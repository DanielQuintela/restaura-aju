"use client";
import { useState } from 'react';
import { STORES_MOCK } from '../constants/dadosMock';
import BottomNav from '../components/bottonNav';

export default function HomePage() {
  const [showResults, setShowResults] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="relative h-screen w-full bg-gray-200 overflow-hidden">
      {/* MAPA MOCADO (Simulação visual) */}
      <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-46.63,-23.55,14/800x1200?access_token=YOUR_TOKEN')] bg-cover bg-center">
        <div className="absolute inset-0 flex items-center justify-center">
            {/* Ponto azul representando o usuário */}
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
        </div>
      </div>

      {/* BARRA DE BUSCA SUPERIOR */}
      <div className="absolute top-6 left-0 right-0 px-4">
        <div className="bg-white p-2 rounded-2xl shadow-xl flex items-center gap-2 border">
          <input 
            type="text" 
            placeholder="O que você procura no centro?" 
            className="flex-1 p-2 outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button 
            onClick={() => setShowResults(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold"
          >
            Encontrar
          </button>
        </div>
      </div>

      {/* DRAWER DE RESULTADOS (Aparece ao pesquisar) */}
      {showResults && (
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-6 shadow-[0_-10px_25px_rgba(0,0,0,0.1)] max-h-[60vh] overflow-y-auto">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
          <h2 className="text-xl font-bold mb-4">Lojas próximas</h2>
          
          <div className="space-y-4">
            {STORES_MOCK.map(store => (
              <div key={store.id} className="flex gap-4 p-3 border-b border-gray-100 last:border-0">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">🏬</div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{store.name}</h3>
                  <p className="text-xs text-indigo-600 mb-1">{store.product}</p>
                  <p className="text-xs text-gray-400">📍 {store.coords}</p>
                </div>
                <button className="self-center bg-gray-50 p-2 rounded-full">➡️</button>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => setShowResults(false)}
            className="w-full mt-6 py-3 text-gray-400 text-sm font-medium"
          >
            Fechar busca
          </button>
        </div>
      )}
      <BottomNav />
    </div>
  );
}