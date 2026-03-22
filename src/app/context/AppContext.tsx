"use client";
import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import type { Coupon } from "../types";

const STORAGE_KEY = "conecta-centro-data";
const POINTS_PER_CHECKIN = 50;
const POINTS_PER_COUPON = 100;

const COUPON_TEMPLATES = [
  { title: "10% no Mercado Thales Ferraz", discount: "10%" },
  { title: "Café grátis no centro", discount: "Grátis" },
  { title: "R$5 off no Restaurante Caçarola", discount: "R$5" },
  { title: "15% em artesanato local", discount: "15%" },
  { title: "Sobremesa grátis no almoço", discount: "Grátis" },
];

interface AppContextType {
  favorites: number[];
  visitedPlaceIds: number[];
  points: number;
  coupons: Coupon[];
  toast: string | null;
  toggleFavorite: (id: number) => void;
  checkIn: (id: number) => void;
  redeemCoupon: (id: number) => void;
}

const AppContext = createContext<AppContextType>({
  favorites: [],
  visitedPlaceIds: [],
  points: 0,
  coupons: [],
  toast: null,
  toggleFavorite: () => {},
  checkIn: () => {},
  redeemCoupon: () => {},
});

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [visitedPlaceIds, setVisitedPlaceIds] = useState<number[]>([]);
  const [points, setPoints] = useState(0);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.favorites) setFavorites(data.favorites);
        if (data.visitedPlaceIds) setVisitedPlaceIds(data.visitedPlaceIds);
        if (typeof data.points === "number") setPoints(data.points);
        if (data.coupons) setCoupons(data.coupons);
      }
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  // Persist
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ favorites, visitedPlaceIds, points, coupons }));
  }, [favorites, visitedPlaceIds, points, coupons, hydrated]);

  const showToast = useCallback((msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }, []);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites(prev => {
      const removing = prev.includes(id);
      showToast(removing ? "Removido dos salvos" : "Adicionado aos salvos ⭐");
      return removing ? prev.filter(f => f !== id) : [...prev, id];
    });
  }, [showToast]);

  const checkIn = useCallback((id: number) => {
    setVisitedPlaceIds(prev => {
      if (prev.includes(id)) return prev;

      setPoints(pp => {
        const np = pp + POINTS_PER_CHECKIN;
        if (Math.floor(np / POINTS_PER_COUPON) > Math.floor(pp / POINTS_PER_COUPON)) {
          setCoupons(cc => {
            const tpl = COUPON_TEMPLATES[cc.length % COUPON_TEMPLATES.length];
            return [...cc, { id: Date.now(), title: tpl.title, discount: tpl.discount, redeemed: false }];
          });
          showToast(`+${POINTS_PER_CHECKIN} pts! 🎉 Cupom desbloqueado!`);
        } else {
          showToast(`+${POINTS_PER_CHECKIN} pts pelo check-in!`);
        }
        return np;
      });

      return [...prev, id];
    });
  }, [showToast]);

  const redeemCoupon = useCallback((id: number) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, redeemed: true } : c));
    showToast("Cupom resgatado com sucesso!");
  }, [showToast]);

  return (
    <AppContext.Provider value={{ favorites, visitedPlaceIds, points, coupons, toast, toggleFavorite, checkIn, redeemCoupon }}>
      {children}
    </AppContext.Provider>
  );
}
