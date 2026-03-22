interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  info: Record<string, unknown>;
}