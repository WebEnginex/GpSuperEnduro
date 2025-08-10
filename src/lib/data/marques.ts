export interface Marque {
  id: string;
  nom: string;
  logo: string;
}

export const MARQUES: Record<string, Marque> = {
  yamaha: {
    id: 'yamaha',
    nom: 'Yamaha',
    logo: '/images/marques/yamaha.svg'
  },
  honda: {
    id: 'honda',
    nom: 'Honda',
    logo: '/images/marques/honda.svg'
  },
  kawasaki: {
    id: 'kawasaki',
    nom: 'Kawasaki',
    logo: '/images/marques/kawasaki.svg'
  },
  husqvarna: {
    id: 'husqvarna',
    nom: 'Husqvarna',
    logo: '/images/marques/husqvarna.svg'
  },
  ktm: {
    id: 'ktm',
    nom: 'KTM',
    logo: '/images/marques/ktm.svg'
  },
  gasgas: {
    id: 'gasgas',
    nom: 'GasGas',
    logo: '/images/marques/gasgas.svg'
  },
  stark: {
    id: 'stark',
    nom: 'StarkFuture',
    logo: '/images/marques/stark.webp'
  },
  suzuki: {
    id: 'suzuki',
    nom: 'Suzuki',
    logo: '/images/marques/suzuki.svg'
  },
} as const;

export type MarqueId = keyof typeof MARQUES;
