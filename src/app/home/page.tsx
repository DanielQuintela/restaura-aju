"use client";

import React, { useState } from 'react'
import MapaCentro from '../mapa/page';
import BottomNav from '../components/bottonNav';


export default function Home() {
  

  return (
   <div>
    <MapaCentro/>

    
    <BottomNav />
   </div>
  );
}