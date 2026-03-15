'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ImageRevealProps {
  src: string;
  alt: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide';
  overlay?: boolean;
  overlayContent?: React.ReactNode;
  className?: string;
  priority?: boolean;
}

const aspectClasses = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  wide: 'aspect-[16/9]',
};

export default function ImageReveal({
  src,
  alt,
  aspectRatio = 'landscape',
  overlay = false,
  overlayContent,
  className,
  priority = false,
}: ImageRevealProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn(
      'relative overflow-hidden bg-earth-100',
      aspectClasses[aspectRatio],
      className
    )}>
      {/* Loading shimmer */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-shimmer" />
      )}
      
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ 
          scale: isLoaded ? 1 : 1.1, 
          opacity: isLoaded ? 1 : 0 
        }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setIsLoaded(true)}
          priority={priority}
        />
      </motion.div>

      {/* Hover zoom effect */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute inset-0 cursor-pointer"
      >
        {/* Gradient overlay */}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-earth-900/70 via-earth-900/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-400" />
        )}
        
        {/* Overlay content */}
        {overlayContent && (
          <div className="absolute inset-0 flex items-end p-6 opacity-0 hover:opacity-100 transition-opacity duration-400">
            {overlayContent}
          </div>
        )}
      </motion.div>
    </div>
  );
}
