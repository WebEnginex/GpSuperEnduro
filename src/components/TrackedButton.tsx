'use client';

import { Button } from "@/components/ui/button";
import { useTicketTracking, type TicketType } from "@/hooks/useTicketTracking";

interface TrackedButtonProps {
  ticketType: TicketType;
  style: React.CSSProperties;
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function TrackedButton({ ticketType, style, className, children, onClick }: TrackedButtonProps) {
  const { trackTicketClick } = useTicketTracking();

  const handleClick = async () => {
    // Tracking du clic
    await trackTicketClick(ticketType);
    
    // Callback personnalisé si fourni
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button 
      className={className} 
      style={style}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}