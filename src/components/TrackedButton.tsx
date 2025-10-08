'use client';

import { Button } from "@/components/ui/button";
import { useTicketTracking, type TicketType } from "@/hooks/useTicketTracking";

interface TrackedButtonProps {
  ticketType: TicketType;
  style: React.CSSProperties;
  className: string;
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
}

export function TrackedButton({ ticketType, style, className, children, href, onClick }: TrackedButtonProps) {
  const { trackTicketClick } = useTicketTracking();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Empêcher la propagation pour éviter que le clic remonte
    e.stopPropagation();
    
    // Tracking du clic
    await trackTicketClick(ticketType);
    
    // Callback personnalisé si fourni
    if (onClick) {
      onClick();
    }
    
    // Redirection vers l'URL
    // Gérer le clic droit et Ctrl+clic pour ouvrir dans un nouvel onglet
    if (e.ctrlKey || e.metaKey || e.button === 1) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  const handleMouseDown = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Gérer le clic molette (bouton du milieu) et clic droit
    if (e.button === 1 || e.button === 2) {
      e.preventDefault();
      await trackTicketClick(ticketType);
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  const handleContextMenu = () => {
    // Ne pas empêcher le menu contextuel, mais tracker le clic si "ouvrir dans un nouvel onglet"
    // Le tracking sera fait via l'event mousedown
  };

  return (
    <Button 
      className={className} 
      style={style}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onContextMenu={handleContextMenu}
    >
      {children}
    </Button>
  );
}