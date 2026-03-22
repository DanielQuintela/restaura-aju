import type { LucideIcon } from "lucide-react";

export interface Address {
  street: string;
  number: string;
  neighborhood: "Centro";
  city: "Aracaju";
  state: "SE";
}

export interface LocalDescobrir {
  id: number;
  nome: string;
  tipo: string;
  status: string;
  horario: string;
  caracteristicas: string;
  nota: number;
  dist: string;
  coords: { top: string; left: string };
  img: string;
  address: Address;
}

export interface Coupon {
  id: string;
  title: string;
  discount: string;
  redeemed: boolean;
  type?: "coupon" | "ticket";
}

export interface CinemaTicketOption {
  id: string;
  title: string;
  cost: number;
  description: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
