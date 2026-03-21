import { Map, Compass, Bookmark, User } from "lucide-react";

export const STORES_MOCK = [
  { id: 1, name: "Sneakers Retro", product: "Jordan 4 Blue", coords: "Rua Direita, 120", tags: ["Moda", "Jovem"] },
  { id: 2, name: "Cyber Café", product: "Latte Especial", coords: "Praça da Sé, 45", tags: ["Café", "Wi-Fi"] },
  { id: 3, name: "Game On", product: "Controle PS5", coords: "Rua 24 de Maio, 10", tags: ["Games", "Tech"] },
];

export const navItems = [
  { id: 'mapa', label: 'Mapa', icon: Map },
  { id: 'descobrir', label: 'Descobrir', icon: Compass },
  { id: 'salvos', label: 'Salvos', icon: Bookmark },
  { id: 'perfil', label: 'Perfil', icon: User },
];