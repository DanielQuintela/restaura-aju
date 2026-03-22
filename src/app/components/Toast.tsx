"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";

export default function Toast() {
  const { toast } = useApp();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast}
          initial={{ y: -80, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -80, opacity: 0, scale: 0.9 }}
          className="fixed top-10 left-1/2 -translate-x-1/2 z-[200] bg-[#51433a] text-[#f2e9d9] px-6 py-3 rounded-2xl font-bold text-sm shadow-2xl pointer-events-none"
        >
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
