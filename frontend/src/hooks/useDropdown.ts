import { useEffect, useRef, useState } from "react";

export default function useDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !event.composedPath().includes(dropdownRef.current)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);
  return { dropdownRef, isOpen, toggleIsOpen, closeDropdown };
}
