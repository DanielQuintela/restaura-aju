"use client";

import React, { useState } from 'react'
import MapaCentro from '../mapa/page';
import BottomNav from '../components/bottonNav';
import ExplorePage from '../descobrir/page';
import ProfilePage from '../perfil/page';
import SalvosPage from '../salvos/page';
import { AppProvider } from '../context/AppContext';
import Toast from '../components/Toast';

export default function Home() {
  const [activeTab, setActiveTab] = useState('mapa');

  const renderScreen = () => {
    switch (activeTab) {
      case 'mapa':
        return <MapaCentro />;
      case 'descobrir':
        return <ExplorePage />;
      case 'salvos':
        return <SalvosPage />;
      case 'perfil':
        return <ProfilePage />;
      default:
        return <MapaCentro />;
    }
  };

  return (
    <AppProvider>
      <Toast />
      {renderScreen()}

      <BottomNav 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </AppProvider>
  );
}