"use client";

import React, { useState } from 'react'
import MapaCentro from '../mapa/page';
import BottomNav from '../components/bottonNav';
import ExplorePage from '../descobrir/page';

export default function Home() {
  const [activeTab, setActiveTab] = useState('mapa');

  const renderScreen = () => {
    switch (activeTab) {
      case 'mapa':
        return <MapaCentro />;
      case 'descobrir':
        return <ExplorePage/>;

      case 'salvos':
        return <div>Salvos</div>;
      case 'perfil':
        return <div>Perfil</div>;
      default:
        return <MapaCentro />;
    }
  };

  return (
    <div>
      {renderScreen()}

      <BottomNav 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}