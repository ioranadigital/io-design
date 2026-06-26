"use client";
import { useState } from "react";

type ModalType = "privacidad" | "terminos" | "cookies" | null;

export function useLegalModals() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  return {
    activeModal,
    openModal: (m: ModalType) => setActiveModal(m),
    closeModal: () => setActiveModal(null),
  };
}