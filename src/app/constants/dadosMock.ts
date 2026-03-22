import { Map, Compass, Bookmark, User } from "lucide-react";

export const STORES_MOCK = [
  { id: 1, name: "Sneakers Retro", product: "Jordan 4 Blue", coords: "Rua Direita, 120", tags: ["Moda", "Jovem"] },
  { id: 2, name: "Cyber Café", product: "Latte Especial", coords: "Praça da Sé, 45", tags: ["Café", "Wi-Fi"] },
  { id: 3, name: "Game On", product: "Controle PS5", coords: "Rua 24 de Maio, 10", tags: ["Games", "Tech"] },
];

export const navItems = [
  { id: 'mapa', label: 'Mapa', icon: Map },
  { id: 'descobrir', label: 'Descobrir', icon: Compass },
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