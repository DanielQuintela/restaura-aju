import { Map, Compass, Bookmark, User } from "lucide-react";
import type { LocalDescobrir, NavItem } from "../types";

export const STORES_MOCK = [
  { id: 1, name: "Sneakers Retro", product: "Jordan 4 Blue", coords: "Rua Direita, 120", tags: ["Moda", "Jovem"] },
  { id: 2, name: "Cyber Café", product: "Latte Especial", coords: "Praça da Sé, 45", tags: ["Café", "Wi-Fi"] },
  { id: 3, name: "Game On", product: "Controle PS5", coords: "Rua 24 de Maio, 10", tags: ["Games", "Tech"] },
];

export const navItems: NavItem[] = [
  { id: 'mapa', label: 'Mapa', icon: Map },
  { id: 'descobrir', label: 'Descobrir', icon: Compass },
  { id: 'salvos', label: 'Salvos', icon: Bookmark },
  { id: 'perfil', label: 'Perfil', icon: User },
];


export const LOCAIS_ARACAJU = [
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

export const LOCAIS_DESCOBRIR: LocalDescobrir[] = [
  {
    id: 1,
    nome: "Mercado Thales Ferraz",
    tipo: "Cultura",
    status: "Aberto",
    horario: "06h às 17h",
    caracteristicas: "Artesanato, queijos e a famosa Passarela das Flores.",
    nota: 4.9,
    dist: "150m",
    coords: { top: "35%", left: "50%" },
    img: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=400"
  },
  {
    id: 2,
    nome: "Museu da Gente Sergipana",
    tipo: "Cultura",
    status: "Aberto",
    horario: "10h às 16h",
    caracteristicas: "Experiência tecnológica sobre a identidade de Sergipe.",
    nota: 5.0,
    dist: "800m",
    coords: { top: "55%", left: "25%" },
    img: "/museuSergipana.jpg"
  },
  {
    id: 3,
    nome: "Restaurante Caçarola",
    tipo: "Gastronomia",
    status: "Aberto",
    horario: "11h às 16h",
    caracteristicas: "Famoso pelo Camarão na Moringa e vista do rio.",
    nota: 4.7,
    dist: "160m",
    coords: { top: "25%", left: "40%" },
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400"
  },
  {
    id: 4,
    nome: "Lojas do Calçadão",
    tipo: "Lojas",
    status: "Aberto",
    horario: "08h às 18h",
    caracteristicas: "O coração do comércio popular de Aracaju.",
    nota: 4.5,
    dist: "100m",
    coords: { top: "45%", left: "60%" },
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400"
  }
];