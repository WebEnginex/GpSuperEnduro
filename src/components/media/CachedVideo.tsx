'use client';

import { useState, useEffect, useRef } from 'react';
import { MediaCacheService } from '@/lib/cache/mediaCache';

interface CachedVideoProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  poster?: string;
  onLoad?: () => void;
  onError?: (error: string) => void;
}

export function CachedVideo({ 
  src, 
  className = '', 
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
  poster,
  onLoad,
  onError 
}: CachedVideoProps) {
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let mounted = true;

    const loadVideo = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        console.log('🎬 [CachedVideo] Loading video:', src);
        
        // Utiliser le service de cache pour récupérer la vidéo
        const cachedVideoUrl = await MediaCacheService.getOrFetchMedia(src, 'video');
        
        if (mounted) {
          setVideoSrc(cachedVideoUrl);
          console.log('✅ [CachedVideo] Video loaded successfully');
          onLoad?.();
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erreur de chargement vidéo';
        console.error('❌ [CachedVideo] Error loading video:', errorMessage);
        
        if (mounted) {
          setError(errorMessage);
          // En cas d'erreur, utiliser l'URL originale
          setVideoSrc(src);
          onError?.(errorMessage);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadVideo();

    return () => {
      mounted = false;
    };
  }, [src, onLoad, onError]);

  const handleVideoError = () => {
    console.error('❌ [CachedVideo] Video playback error');
    setError('Erreur de lecture vidéo');
    onError?.('Erreur de lecture vidéo');
  };

  const handleVideoLoad = () => {
    console.log('🎬 [CachedVideo] Video ready to play');
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className={`${className} flex items-center justify-center bg-black`}>
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Chargement de la vidéo...</p>
        </div>
      </div>
    );
  }

  if (error && !videoSrc) {
    return (
      <div className={`${className} flex items-center justify-center bg-black`}>
        <div className="text-white text-center">
          <p>Erreur de chargement</p>
          <p className="text-sm text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      src={videoSrc}
      className={className}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        minWidth: '100%',
        minHeight: '100%',
        width: 'auto',
        height: 'auto',
        transform: 'translate(-50%, -50%)',
        objectFit: 'cover'
      }}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      controls={controls}
      poster={poster}
      onLoadedData={handleVideoLoad}
      onError={handleVideoError}
      playsInline
    >
      Votre navigateur ne supporte pas la lecture vidéo.
    </video>
  );
}