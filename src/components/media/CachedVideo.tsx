'use client';

import { useMediaCache } from '@/hooks/useMediaCache';
import { useState, useRef } from 'react';
import { Loader2, Play, Pause } from 'lucide-react';

interface CachedVideoProps {
  src: string;
  className?: string;
  width?: number;
  height?: number;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  poster?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: (error: string) => void;
}

export function CachedVideo({ 
  src, 
  className, 
  width, 
  height,
  autoPlay = false,
  muted = true,
  loop = false,
  controls = true,
  poster,
  priority = false,
  onLoad,
  onError 
}: CachedVideoProps) {
  const { src: cachedSrc, isLoading, error } = useMediaCache(src, 'video', {
    strategy: 'cache-first',
    preload: priority
  });
  
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    onLoad?.();
  };

  const handleVideoError = () => {
    const errorMsg = error || 'Erreur de chargement de la vidéo';
    onError?.(errorMsg);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (error && !cachedSrc) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-200 text-gray-500 ${className}`}
        style={{ width, height }}
      >
        <span className="text-sm">Erreur de chargement</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Indicateur de chargement */}
      {(isLoading || !videoLoaded) && (
        <div 
          className={`absolute inset-0 flex items-center justify-center bg-gray-100 z-10 ${className}`}
          style={{ width, height }}
        >
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      )}
      
      {/* Bouton play/pause custom si pas de controls */}
      {!controls && videoLoaded && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
        >
          {isPlaying ? (
            <Pause className="h-12 w-12 text-white" />
          ) : (
            <Play className="h-12 w-12 text-white" />
          )}
        </button>
      )}
      
      {/* Vidéo */}
      {cachedSrc && (
        <video
          ref={videoRef}
          src={cachedSrc}
          className={`${className} ${videoLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          width={width}
          height={height}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          controls={controls}
          poster={poster}
          preload={priority ? 'auto' : 'metadata'}
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}
    </div>
  );
}
