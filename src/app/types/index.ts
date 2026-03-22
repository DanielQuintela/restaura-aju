import type { LucideIcon } from "lucide-react";

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
}

export interface Coupon {
  id: number;
  title: string;
  discount: string;
  redeemed: boolean;
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
